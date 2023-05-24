const trainNumberInput = document.getElementById('trainNumber0');
const fromCodeInput = document.getElementById('fromCode');
const toCodeInput = document.getElementById('toCode');
const form = document.querySelector('#form0');
const resultBox = document.querySelector('.resultBox0');
const tableBody = document.querySelector('#tableAppend0 tbody');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form inputs
  const trainNumber = trainNumberInput.value.trim();
  const fromCode = fromCodeInput.value.trim();
  const toCode = toCodeInput.value.trim();
  if (!trainNumber || trainNumber === 'number' || !fromCode || fromCode === 'code' || !toCode || toCode === 'code') {
    alert('Please fill all the details');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v2/getFare?trainNo=${trainNumber}&fromStationCode=${fromCode}&toStationCode=${toCode}`, {
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

    // Check if there's any data to show
    if (data.data.general.length === 0 && data.data.tatkal.length === 0) {
      alert('No such train route exists');
      return;
    }

    // Update the table with the API data
    tableBody.innerHTML = '';
    for (let i = 0; i < data.data.general.length; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><a href="#">${data.data.general[i].classType}</a></td>
        <td class="amount">${data.data.general[i].fare}</td>
        <td class="amount">${data.data.tatkal[i].fare}</td>
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


