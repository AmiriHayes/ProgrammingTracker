// Declare let variables
let nav = 0;
let date_num = [];
let time_dif =[];
let word = [];
let clicked = null;
let today_row = 0;
let today_cell = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// Declare const variables
const user = document.getElementById('user');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayCounts = document.getElementsByClassName('day-start');
const lengthFrom = document.getElementsByClassName('length-from');
const statElement = document.getElementById('stat-element');
const dates = document.getElementById('dates');
const languages = document.getElementById('languages');
const settingsPg = document.getElementById('settings-pg')
const menuButton = document.getElementById('menu');
const exitSettings = document.getElementById('exit')
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

// Declare time variables
const date = new Date();
const one_day = 1000 * 60 * 60 * 24;
const calendar = document.getElementById('calendar');
const today = document.getElementById('today');
const dateNow = date.toLocaleDateString('en-us', {month: 'short',day: 'numeric',year: 'numeric',});
today.textContent = dateNow;
user.textContent = "amiri";

// Set time variables
function setTime () {
  for (i = 0; i < dayCounts.length; i++) {
    word[i] = dayCounts[i].innerHTML.slice(1,-1);
    date_num[i] = new Date(`${word[i]}`);
    time_dif[i] = (Math.round(date_num[i].getTime() - date.getTime()) / one_day); 
    time_dif[i] = time_dif[i].toFixed(0);
    if (window.matchMedia("(min-width: 950px)").matches || 
    window.matchMedia("(max-width: 800px)").matches){
      lengthFrom[i].textContent = time_dif[i]  + ' days';
    } 
    if (window.matchMedia("(max-width: 500px)").matches) {
      lengthFrom[i].textContent = time_dif[i];
    }
  }
}
setTime();

// Declare color schemes 
const color_options = document.querySelectorAll('.color');
const root = document.querySelector(':root');
const colors = [
  // Outer Arrays: (ROYGBIV), Inner Arrays: (Black, White, Accent, Dark, Light)
  ['#161a1d', '#f5f3f4', '#A52422', '#660708', '#a4161a', '#e5383b'],
  ['#f3722c','#FFF9F5','#ffbf69', '#F6BE00', '#'],
  ['#657070', '#F7FFFF', '#A5BAA4', '#30552e', '#283618'],
  ['#657070', '#F7FFFF', '#457b9d', '#bde0fe', '#'],
  ['#657070', '#F7FFFF', '#cdb4db', '#ffc8dd', '#ffc8dd'],
];
color_options.forEach(function(color, index) {
  switch (index) {
    case 0:
      color.style.backgroundColor = `${colors[0][2]}`;
      color.setAttribute('data-index', '0');
      break;
    case 1:
      color.style.backgroundColor = `${colors[1][2]}`; 
      color.setAttribute('data-index', '1');
      break;
    case 2:
      color.style.backgroundColor = `${colors[2][2]}`; 
      color.setAttribute('data-index', '2');
      break;
    case 3:
      color.style.backgroundColor = `${colors[3][2]}`; 
      color.setAttribute('data-index', '3');
      break;
    case 4:
      color.style.backgroundColor = `${colors[4][2]}`; 
      color.setAttribute('data-index', '4');
      break;
  }
  color.addEventListener('click', function(e) {
    const colorScheme = e.currentTarget.dataset.index;
    root.style.setProperty('--clr-accent-0', `${colors[colorScheme][2]}`);
    root.style.setProperty('--clr-accent-1', `${colors[colorScheme][3]}`);
  });
});

// Set button events
menuButton.addEventListener('click', function(){
  settingsPg.style.display = "block";
});
statElement.addEventListener('click', function(){
  if (!dates.style.transition) {
    dates.style.transition = "var(--transition)";
    languages.style.transition = "var(--transition)";
  }
  if (!dates.style.transform) {
    dates.style.transform = "translate(100%)";
    languages.style.transform = "translate(-100%)";
  } else  {
    dates.style.transform = "translate(0%)";
    languages.style.transform = "translate(100%)";
    dates.style.transform = "";
    languages.style.transform = "";
  }
});
for (i = 0; i < dayCounts.length; i++) {
  dayCounts[i].addEventListener('dblclick', function(dayCount){
    textContent = dayCount.target.parentElement.children[1].textContent;
    dayCount.target.parentElement.children[1].textContent = " ";
    let dayEdit = document.createElement("INPUT");
    dayEdit.setAttribute("type", "text");
    dayEdit.setAttribute("placeholder", textContent);
    dayEdit.classList.add("day-edit")
    dayCount.target.parentElement.children[1].appendChild(dayEdit);
    console.log(dayEdit);
    dayEdit.addEventListener('keyup', function(e){
      if (e.key === 'Enter' && e.target.value) {
        newText  = e.target.value;
        dayCount.target.parentElement.children[1].removeChild(dayEdit);
        dayCount.target.parentElement.children[1].textContent = newText;
        setTime();
      }
    })
  });
};
exitSettings.addEventListener('click', function(){
  settingsPg.style.display = "none";
});
nextButton.addEventListener('click', function(){
  nav++;
  loadCalendar();
})
prevButton.addEventListener('click', function(){
  nav--;
  loadCalendar();
})

// Load Calendar Functionality
function loadCalendar() {
  calendar.innerHTML = '';
  calendar.innerHTML += ' <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th> '
  const dt = new Date();
  if (nav !== 0 ) {
    dt.setMonth(new Date().getMonth() + nav)
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, (month+1), 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  const shownWeeks = (Math.floor((paddingDays+daysInMonth) / 7))+1;
  document.getElementById('current-month').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;
  template = ' <tr><td></td><td></td><td></td><td></td><td><td></td><td></td></tr>'
  for (let i = 0; i < shownWeeks; i++) {
    calendar.innerHTML += template;
  }

  for (let i = 0; i < (shownWeeks * 7); i++) {
    if (i < paddingDays ) {
      calendar.rows[1].cells[i].style.backgroundColor = "transparent";
    } 
    if ((i >= paddingDays) && (i < (paddingDays+daysInMonth))) {
      setCalendarStyles(i, paddingDays);
      if (i < 7) { calendar.rows[1].cells[i].innerHTML = (i - paddingDays + 1)}
      else if (i < 14) { calendar.rows[2].cells[(i-7)].innerHTML = (i - paddingDays + 1); }
      else if (i < 21) { calendar.rows[3].cells[(i-14)].innerHTML = (i - paddingDays + 1); }
      else if (i < 28) { calendar.rows[4].cells[(i-21)].innerHTML = (i - paddingDays + 1); }
      else if (i < 35) { calendar.rows[5].cells[(i-28)].innerHTML = (i - paddingDays + 1); }
      else if (i < 42) { calendar.rows[6].cells[(i-35)].innerHTML = (i - paddingDays + 1); }
    } 
    if (i > (paddingDays + daysInMonth)) {
      today_row = Math.floor((i / 7) + 1);
      today_cell = ((i % 7) - 1);
      if ((i+1) % 7 ===  0) {
        today_row = ((i+1) / 7);
        today_cell = 6;
        calendar.rows[today_row].cells[today_cell-1].style.backgroundColor = "transparent";
      }
      calendar.rows[today_row].cells[today_cell].style.backgroundColor = "transparent";
    }
  }

  function setCalendarStyles(i, paddingDays) {
    // if day is today:
    if ((i - paddingDays === day) && (nav == 0)) {
      if (i % 7 ===  0) {
        today_row = (i / 7);
        today_cell = 6;
      } else if ((i-1) % 7 === 0){
        today_row = Math.floor((i / 7) + 1);
        today_cell = 0;
      } else {
        today_row = Math.floor((i / 7) + 1);
        if (i > 6) {
          today_cell = ((i % 7) + paddingDays - 1);
        } else {
          today_cell = i - 1;
        }
      }
      today_cal = calendar.rows[today_row].cells[today_cell];
      today_cal.style.backgroundColor = "#657070";
    } 
  }
}

loadCalendar();