const taskForm = document.getElementById('taskForm'); 
const taskList = document.getElementById('taskList'); 
const completedTasks = document.getElementById('completedTasks'); 
taskForm.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const taskName = document.getElementById('taskName').value; 
    const category = document.getElementById('taskCategory').value; 
    const li = document.createElement('li'); li.innerHTML = `${taskName} - <strong>${category}</strong> <button class="delete-task">Delete</button>`; 
    taskList.appendChild(li); 
    taskForm.reset(); 
    li.querySelector('.delete-task').addEventListener('click', () => { 
        li.remove(); 
    }); 
}); 
const modeToggle = document.getElementById('mode-toggle'); 
const body = document.body;
const header = document.querySelector('header');
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});
    
function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    document.getElementById('local-time').textContent = formattedTime; 
}
setInterval(updateTime, 1000);
updateTime();
const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.querySelector('#current-day p').textContent = `Today is ${days[today.getDay()]}.`;

const startOfYear = new Date(today.getFullYear(), 0, 1);
const weekNumber = Math.ceil(((today - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
document.querySelector('#week-number p').textContent = `We are in week ${weekNumber} of the year.`;

const endOfYear = new Date(today.getFullYear(), 11, 31);
const daysLeft = Math.ceil((endOfYear - today) / (1000 * 60 * 60 * 24));
document.querySelector('#days-left p').textContent = `${daysLeft} days left in the year.`;

let season;
const month = today.getMonth();
if (month <= 1 || month === 11) {
    season = "Winter";
} else if (month <= 4) {
        season = "Spring";
} else if (month <= 7) {
        season = "Summer";
} else {
        season = "Autumn";
}
document.querySelector('#season p').textContent = `It's currently ${season}.`;