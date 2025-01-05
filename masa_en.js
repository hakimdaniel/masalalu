// Language EN
// Author @hakimdaniel
// Read to understand the code better, if you're a girl, well, no need to understand it, just accept it.

function timeAgo(datetime) {
  const time = new Date(datetime).getTime();
  const now = new Date().getTime();
  const seconds = Math.floor((now - time) / 1000);

  // If time passed is more than one year (365 days), return the original date in DD/MM/YYYY format
  const oneYear = 365 * 24 * 60 * 60; // Seconds in a year
  if (seconds > oneYear) {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months in JavaScript start from 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  }

  // Time formats for various time ranges
  const time_formats = [
    [60, 'seconds', 1],
    [120, '1 minute ago', 'in 1 minute'],
    [3600, 'minutes', 60],
    [7200, '1 hour ago', 'in 1 hour'],
    [86400, 'hours', 3600],
    [172800, 'Yesterday', 'Tomorrow'],
    [604800, 'days', 86400],
    [1209600, 'Last week', 'Next week'],
    [2419200, 'weeks', 604800],
    [4838400, 'Last month', 'Next month'],
    [29030400, 'months', 2419200]
  ];

  let token = 'ago';
  let list_choice = 1;

  if (seconds < 0) {
    token = 'from now';
    list_choice = 2;
  }

  for (let format of time_formats) {
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') {
        return format[list_choice];
      } else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    }
  }

  return 'Just now';
}

// Function to dynamically update each <time> element with the class `time-ago` every 1 minute
function startDynamicUpdate(element) {
  const datetime = element.getAttribute('datetime');

  function updateIfNeeded() {
    const newText = timeAgo(datetime);
    if (element.innerText !== newText) {
      element.innerText = newText;
    }
  }

  updateIfNeeded();
  setInterval(updateIfNeeded, 60000); // Repeat every 1 minute
}

// Start the `timeAgo` function for all elements with the class `time-ago`
document.querySelectorAll('.time-ago').forEach(el => startDynamicUpdate(el));

console.log("Success running");
console.log("Function timeAgo : made with GitHub @hakimdaniel");
