const classTypeInput = document.querySelector('#classType2');
const fromCodeInput = document.querySelector('#fromCode2');
const toCodeInput = document.querySelector('#toCode2');
const trainNumberInput = document.querySelector('#trainNumber2');
const dateInput = document.querySelector('#date2');
const form = document.querySelector('#form2');
const resultBox = document.querySelector('.resultBox2');
const tableBody = document.querySelector('#tableAppend2 tbody');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form inputs
  const classType = classTypeInput.value.trim();
  const fromCode = fromCodeInput.value.trim();
  const toCode = toCodeInput.value.trim();
  const trainNumber = trainNumberInput.value.trim();
  const date = dateInput.value.trim();
  if (!classType || classType === 'class' ||
      !fromCode || fromCode === 'code' ||
      !toCode || toCode === 'code' ||
      !trainNumber || trainNumber === 'number' ||
      !date || date === 'date') {
    alert('Please fill all the details');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability?classType=${classType}&fromStationCode=${fromCode}&quota=${quota}&toStationCode=${toCode}&trainNo=${trainNumber}&date=${date}`, {
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

    // Update the table with the API data
    tableBody.innerHTML = '';
    for (let i = 0; i < data.data.length - 1; i++) {
      const seat = data.data[i];
      let probabilityClass = '';
      if (seat.confirm_probability_percent === undefined) {
        probabilityClass = 'high';
        seat.confirm_probability_percent = '100';
      } else if (seat.confirm_probability_percent >= 85) {
        probabilityClass = 'high';
      } else if (seat.confirm_probability_percent >= 75) {
        probabilityClass = 'mid';
      } else {
        probabilityClass = 'low';
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><a href="#">${seat.date}</a></td>
        <td class="amount ${probabilityClass}">${seat.confirm_probability_percent}%</td>
        <td class="amount">${seat.current_status}</td>
      `;
      tableBody.appendChild(tr);
    }

    // Show the result box if it's not already visible
    resultBox.classList.add('visible');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

