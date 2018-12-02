// Set Launch Date (ms)
const launchDate = new Date("May 12, 2019 13:00:00").getTime();

// Context object
const c = {
  context: {},
  values: {},
  times: {}
};

// Convert radians to degrees
function deg(d) {
  return (Math.PI/180)*d-(Math.PI/180)*90;
}

function render() {
  c.context.seconds.clearRect(0, 0, 200, 200);
  c.context.seconds.beginPath();
  c.context.seconds.strokeStyle = "#3A55FF";
  c.context.seconds.arc(100, 100, 90, deg(0), deg(6 * (60 - c.times.seconds)));
  c.context.seconds.lineWidth = 20;
  c.context.seconds.lineCap = "round";
  c.context.seconds.stroke();

  c.context.minutes.clearRect(0, 0, 200, 200);
  c.context.minutes.beginPath();
  c.context.minutes.strokeStyle = "#E834B1";
  c.context.minutes.arc(100, 100, 90, deg(0), deg(6 * (60 - c.times.minutes)));
  c.context.minutes.lineWidth = 20;
  c.context.minutes.lineCap = "round";
  c.context.minutes.stroke();

  c.context.hours.clearRect(0, 0, 200, 200);
  c.context.hours.beginPath();
  c.context.hours.strokeStyle = "#FFA246";
  c.context.hours.arc(100, 100, 90, deg(0), deg(15 * (24 - c.times.hours)));
  c.context.hours.lineWidth = 20;
  c.context.hours.lineCap = "round";
  c.context.hours.stroke();

  c.context.days.clearRect(0, 0, 200, 200);
  c.context.days.beginPath();
  c.context.days.strokeStyle = "#47FFAF";
  c.context.days.arc(100, 100, 90, deg(0), deg(365 - c.times.days));
  c.context.days.lineWidth = 20;
  c.context.days.lineCap = "round";
  c.context.days.stroke();
}

function init() {
  // Get 2D contexts
  c.context.seconds = document.getElementById('seconds-canvas').getContext('2d');
  c.context.minutes = document.getElementById('minutes-canvas').getContext('2d');
  c.context.hours = document.getElementById('hours-canvas').getContext('2d');
   c.context.days = document.getElementById('days-canvas').getContext('2d');

  // Get displayed values
  c.values.seconds = document.getElementById('seconds-value');
  c.values.minutes = document.getElementById('minutes-value');
  c.values.hours = document.getElementById('hours-value');
  c.values.days = document.getElementById('days-value');

  setInterval(function() {
    // Get todays date and time (ms)
    const now = new Date().getTime();

    // Get distance from now to launchDate
    const distance = launchDate - now;

    // Time calculations
    c.times.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    c.times.hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    c.times.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    c.times.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    c.values.days.innerText = c.times.days;
    c.values.hours.innerText = c.times.hours;
    c.values.minutes.innerText = c.times.minutes;
    c.values.seconds.innerText = c.times.seconds;

    render(); // Draw!
  }, 1000);
}

init();
