
const fromCodeInput = document.querySelector('#fromCode6');
const toCodeInput = document.querySelector('#toCode6');
const tableBody = document.querySelector('#tableBody6');
const submitForm = document.querySelector('#submitForm6');
const resultBox = document.querySelector('.resultBox6');
let resultBoxVisible = false;

submitForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Validate the form inputs
  const fromCode = fromCodeInput.value.trim();
  const toCode = toCodeInput.value.trim();
  if (!fromCode || !toCode) {
    alert('Please fill in all the details');
    return;
  }

  // Make the API call
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a1e0032c9amsh0c59e81fe5967c8p1e443bjsn602da0c29fd4', // Change rapidapi key here
      'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
    }
  };
  fetch(`https://irctc1.p.rapidapi.com/api/v2/trainBetweenStations?fromStationCode=${fromCode}&toStationCode=${toCode}`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      // Clear the table body before adding new rows
      tableBody.innerHTML = '';
      for (let i = 0; i < response.data.length - 1; i++) {
        const trainNumber = response.data[i].train_number;
        const trainName = response.data[i].train_name;
        const row = `<tr><td><a href="#">${trainNumber}</a></td><td class="amount">${trainName}</td></tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
      }
      // Show the result box if it's not already visible
      if (!resultBoxVisible) {
        resultBox.style.display = 'grid';
        resultBoxVisible = true;
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching the data');
    });
});


