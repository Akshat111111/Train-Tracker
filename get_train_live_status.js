const trainNumberInputs = document.querySelectorAll('.train-number-input');
const form = document.querySelector('#form5');
const resultBox = document.querySelector('.resultBox5');
const tableBody = document.querySelector('#tableAppend5 tbody');

const stationMap = new Map([
  ['BJU', 'Barauni Junction'],
  ['BDTS', 'Bandra Terminus'],
  // Add more stations to the map as needed
]);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form inputs
  const trainNumbers = [];
  for (const input of trainNumberInputs) {
    const trainNumber = input.value.trim();
    if (!trainNumber) {
      alert('Please enter a train number');
      return;
    }
    trainNumbers.push(trainNumber);
  }

  try {
    // Make the API call for each train number
    tableBody.innerHTML = '';
    for (const trainNumber of trainNumbers) {
      const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`, {
        headers: {
          'X-RapidAPI-Key': 'a1e0032c9amsh0c59e81fe5967c8p1e443bjsn602da0c29fd4', // Change rapidapi key here
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data');
      }
      const data = await response.json();
      console.log(data);

      // Update the table with the API data
      const currentStationName = data.data.current_station_name;
      const currentStation = currentStationName.slice(0, currentStationName.length - 1);
      const currentLocationInfo = data.data.current_location_info || [];
      const rows = [
        ['Update Time', data.data.update_time],
        ['Source', stationMap.get(data.data.source)],
        ['Destination', stationMap.get(data.data.destination)],
        ['Total Distance', `${data.data.total_distance} km`],
        ['Distance from Source', `${data.data.distance_from_source} km`],
        ['Current Station', currentStation],
        ['Current State Code', data.data.current_state_code],
        ...currentLocationInfo.map((location, index) => [`Message ${index + 1}`, location.readable_message]),
      ];
      for (const [label, value] of rows) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${label}</td>
          <td class="amount">${value}</td>
        `;
        tableBody.appendChild(row);
      }
    }

    // Show the result box if it's not already visible
    resultBox.classList.add('visible');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});


