const trainNumberInput = document.querySelector("#trainNumber7");
const tableCells = document.querySelectorAll('#tableAppend7 td');
const submitForm = document.querySelector('#submitForm7');
const resultBox = document.querySelector('.resultBox7');
const errorBox = document.querySelector('.errorBox7');

submitForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Validate the form input
  const trainNumber = trainNumberInput.value.trim();
  if (!trainNumber) {
    alert('Please select train number');
    return;
  }

  // Make the API call
  const url = `https://irctc1.p.rapidapi.com/api/v1/searchTrain?query=${trainNumber}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a1e0032c9amsh0c59e81fe5967c8p1e443bjsn602da0c29fd4', // Change rapidapi key here
      'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    // Update the table cells with data from the API response
    tableCells[0].innerText = trainNumber;
    tableCells[1].innerText = data.data[0].train_name.slice(-2);
    tableCells[2].innerText = data.data[0].train_name.slice(0, -3);
    tableCells[3].innerText = data.data[0].new_train_number;

    // Clear the input field
    trainNumberInput.value = '';

    // Show the result box if it's not already visible
    if (!resultBox.classList.contains('visible')) {
      resultBox.classList.add('visible');
    }
    errorBox.classList.remove('visible');
  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching the data');
    errorBox.classList.add('visible');
    resultBox.classList.remove('visible');
  }
});


