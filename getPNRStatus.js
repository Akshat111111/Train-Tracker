

const pnrNumberInput = document.querySelector("#PNRNo3");
const form = document.querySelector('#form3');
const resultBox = document.querySelector('.resultBox3');
const tableRows = document.querySelectorAll('#tableAppend3 tbody tr');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Validate the form input
  const pnrNumber = pnrNumberInput.value.trim();
  if (pnrNumber.length !== 10) {
    alert('Please enter a valid PNR number');
    return;
  }

  try {
    // Make the API call
    const response = await fetch(`https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnrNumber}`, {
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

    // Update the table rows with the API data
    tableRows[0].cells[1].textContent = data.data.TrainNo;
    tableRows[1].cells[1].textContent = data.data.TrainName;
    tableRows[2].cells[1].textContent = data.data.PassengerStatus[0].CurrentStatusNew;
    tableRows[3].cells[1].textContent = data.data.PassengerStatus[0].CurrentBerthNo;
    tableRows[4].cells[1].textContent = data.data.PassengerStatus[0].CurrentCoachId;
    tableRows[5].cells[1].textContent = data.data.BookingDate;
    tableRows[6].cells[1].textContent = data.data.SourceDoj;
    tableRows[7].cells[1].textContent = data.data.DepartureTime;
    tableRows[8].cells[1].textContent = data.data.DestinationDoj;
    tableRows[9].cells[1].textContent = data.data.ArrivalTime;
    tableRows[10].cells[1].textContent = data.data.Duration;
    tableRows[11].cells[1].textContent = data.data.ExpectedPlatformNo;
    tableRows[12].cells[1].textContent = data.data.BookingFare;
    tableRows[13].cells[1].textContent = data.data.TicketFare;

    // Show the result box if it's not already visible
    resultBox.classList.add('visible');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});


