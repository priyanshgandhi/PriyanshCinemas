const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatContainer = document.querySelector(".row-container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
// const SubmitButton = document.getElementsByClassName("submit");


populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".container .selected");

  seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function(seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", function(e) {

  ticketPrice = +movieSelect.value;
 
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Adding selected class to only non-occupied seats on 'click'
seatContainer.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

document.getElementById("SubmitButton").addEventListener("click", function() {
  const selectedSeatsCount = parseInt(count.textContent);
  if (selectedSeatsCount == 0) {
    // Show an alert if count is 0
    alert("Count is 0, you cannot see the result.");
  } else {
    // Redirect to result.html if count is greater than 0
    window.location.href = "result.html";
  }
});
//timerstart
const timer = document.getElementById('timer');

function updateTimer() {
  // Calculate the time left until 9:00 PM
  const endTime = new Date();
  endTime.setHours(22, 0, 0, 0);
  const timeLeft = endTime - Date.now();

  if (timeLeft <= 0) {
    // If the time is up, display a message and stop the timer
    timer.innerText = "The next show is starting now!";
  } else {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    // Display the timer on the page
    timer.innerText = `Next show will be in ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  }

  // Request the next animation frame to update the timer
  requestAnimationFrame(updateTimer);
}

// Start the timer
updateTimer();

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  // Filter movies based on the search text
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchText));
  // Display the filtered movies on the page
  displayMovies(filteredMovies);
});


// Initial count and total rendering
updateSelectedCount();
