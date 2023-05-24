


const trainNumberInput = document.querySelector("#trainNumber1");
const form = document.querySelector('#form1');
const resultBox = document.querySelector('.resultBox1');
const tableBody = document.querySelector('#tableAppend tbody');

const trainClass = new Map([
  ["1A", "First AC"],
  ["EA", "Executive Anubhati"],
  ["EC", "AC Executive Class"],
  ["2A", "Second AC"],
  ["FC", "First Class"],
  ["3A", "Third AC"],
  ["3E", "Third AC Economy"],
  ["CC", "AC Chair Car"],
  ["SL", "Sleeper"],
]);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form input
  const trainNumber = trainNumberInput.value.trim();
  if (!trainNumber) {
    alert('Please select train number');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/getTrainClasses?trainNo=${trainNumber}`, {
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

    // Create table rows for each train class
    tableBody.innerHTML = '';
    for (const classCode of data.data) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const nameLink = document.createElement('a');
      nameLink.href = '#';
      nameLink.textContent = classCode;
      nameCell.appendChild(nameLink);
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = trainClass.get(classCode);
      row.appendChild(nameCell);
      row.appendChild(descriptionCell);
      tableBody.appendChild(row);
    }

    // Show the result box if it's not already visible
    resultBox.classList.add('visible');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});


