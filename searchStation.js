


const stationCodeInput = document.querySelector("#stationCode8");
const submitForm = document.querySelector('#submitForm8');
const resultBox = document.querySelector('.resultBox8');
const errorBox = document.querySelector('.errorBox8');
const tableBody = document.querySelector('#tableAppend8 tbody');

const handleFormSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Validate the form input
  const stationCode = stationCodeInput.value.trim();
  if (!stationCode) {
    alert('Please select station code');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/searchStation?query=${stationCode}`, {
      headers: {
        'X-RapidAPI-Key': 'a1e0032c9amsh0c59e81fe5967c8p1e443bjsn602da0c29fd4', // Change rapidapi key here
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data');
    }
    const data = await response.json();
    console.log(data);

    // Find the station with code "BJU"
    const station = data.data.find(s => s.code === 'BJU');
    if (station) {
      // Create a new table row for the station
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const nameLink = document.createElement('a');
      nameLink.href = '#';
      nameLink.textContent = station.eng_name;
      nameCell.appendChild(nameLink);
      const stateCell = document.createElement('td');
      stateCell.textContent = station.state_name;
      row.appendChild(nameCell);
      row.appendChild(stateCell);
      tableBody.appendChild(row);

      // Clear the input field
      stationCodeInput.value = '';

      // Show the result box if it's not already visible
      if (!resultBox.classList.contains('visible')) {
        resultBox.classList.add('visible');
      }
      errorBox.classList.remove('visible');
    } else {
      alert('Station not found');
      errorBox.classList.add('visible');
      resultBox.classList.remove('visible');
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
    errorBox.classList.add('visible');
    resultBox.classList.remove('visible');
  }
};

submitForm.addEventListener('submit', handleFormSubmit);


