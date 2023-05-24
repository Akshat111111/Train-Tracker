
const trainNumberInput = document.querySelector('#trainNumber4');
const form = document.querySelector('#form4');
const resultBox = document.querySelector('.resultBox4');
const tableBody = document.querySelector('#tableAppend4 tbody');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form inputs
  const trainNumber = trainNumberInput.value.trim();
  if (!trainNumber || trainNumber === 'number') {
    alert('Please select train number');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule?trainNo=${trainNumber}`, {
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
    for (let i = 0; i < data.data.route.length; i++) {
      const route = data.data.route[i];
      if (route.stop) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><a href="#">${route.day}</a></td>
          <td class="amount">${route.station_name}</td>
          <td class="amount">${route.state_name}</td>
        `;
        tableBody.appendChild(tr);
      }
    }

    // Show the result box if it's not already visible
    resultBox.classList.add('visible');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});


