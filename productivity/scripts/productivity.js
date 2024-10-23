
const taskForm = document.getElementById('taskForm'); 
const taskInput = document.getElementById('taskInput'); 
const taskList = document.getElementById('taskList'); 
const tasksProgress = document.getElementById('tasksProgress')
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const goalTargetInput = document.getElementById('goalTarget');
let currentGoal = { name: '', target: 0, progress: 0 };
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadGoal();
}); 
taskForm.addEventListener('submit', (e) => {
     e.preventDefault(); 
     const taskText = taskInput.value.trim(); 
     if (taskText) {
        const task = { text: taskText, 
            completed: false }; 
        addTaskToList(task); 
        saveTask(task); 
        taskInput.value = '';
        updateCharts();
     }
    }); 
goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const goalName = goalInput.value.trim();
    const goalTarget = parseInt(goalTargetInput.value.trim(), 10);
    if (goalName && goalTarget > 0) {
        currentGoal = { name: goalName, target: goalTarget, progress: 0};
        saveGoal(currentGoal);
        updateCharts();
    }
});
    function addTaskToList(task) {
         const li = document.createElement('li'); 
         const checkbox = document.createElement('input');
         checkbox.type = 'checkbox';
         checkbox.checked = task.completed;
         checkbox.addEventListener('change', 
            () => ToggleTaskStatus(task.text, checkbox.checked));
            li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        taskList.appendChild(li);
        } 
    function saveTask(task) {
         let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
         tasks.push(task); 
         localStorage.setItem('tasks', JSON.stringify(tasks)); 
        } 
    function loadTasks() { 
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
        tasks.forEach(addTaskToList);  
        updateCharts();
    }
    function ToggleTaskStatus(taskText, isCompleted) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.text === taskText ? { ...task, completed: 
            isCompleted } : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateCharts();
    }
    function saveGoal(goal) {
        localStorage.setItem('currentGoal', JSON.stringify(goal));
    }
    function loadGoal() {
        const goal = JSON.parse(localStorage.getItem('currentGoal'));
        if (goal) currentGoal = goal;
        updateCharts();
    }
    function updateCharts() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        tasksProgress.style.background = `conic-gradient(#1abc9c ${progress}%, #ecf0f1 ${progress}% 100%)`;
        console.log('Completed Tasks:', completedTasks);
        console.log('Goal Progress:', goalProgress);
    productivityChart.data.datasets[0].data = [completedTasks];
    productivityChart.update();
    currentGoal.progress = completedTasks;
    const goalProgress = currentGoal.target === 0 ? 0 : (currentGoal.progress / currentGoal.target) * 100;
    goalsChart.data.datasets[0].data = [currentGoal.progress, currentGoal.target - currentGoal.progress];
    goalsChart.update();
    }

    function handleClientLoad() {
         gapi.load('client:auth2', initClient); 
        } 
    function initClient() {
         gapi.client.init({
             apiKey: 'AIzaSyD77ABDtysp79WovNxhzqbMtkh7FiGbeH4', 
             clientId: '234667254173-2hflbq31qh1bh048rci7dopgs02219ec.apps.googleusercontent.com', 
             discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'], 
             scope: 'https://www.googleapis.com/auth/calendar.events' 
            }).then(() => {
                 const authorizeButton = document.getElementById('authorizeButton'); 
                 const signOutButton = document.getElementById('signOutButton'); 
                 authorizeButton.onclick = () => gapi.auth2.getAuthInstance().signIn(); 
                 signOutButton.onclick = () => gapi.auth2.getAuthInstance().signOut(); 
                 gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus); 
                 updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); }); 
                } 
    async function fetchTodoistTasks() {
         const TODOIST_API_TOKEN = '7bc7a7e9ad3772c384861f119e0ef815aeb33289'; 
         const response = await fetch('https://api.todoist.com/rest/v1/tasks', { 
            headers: { 'Authorization': `Bearer ${TODOIST_API_TOKEN}` } }); 
            const tasks = await response.json(); 
            tasks.forEach(task => addTaskToList({ text: task.content, completed: false })); 
        } 
    async function fetchWeather() { 
        const API_KEY = 'b4104434e81750c6d6d0181b4fc5cb07'; 
        const city = 'Lagos'; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); 
        const data = await response.json(); 
        weatherDiv.innerHTML = `<h3>${data.name} Weather</h3><p>${data.weather[0].description}</p><p>Temp: ${data.main.temp}°C</p>`; 
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error('Weather data not available');
            const data = await response.json();
            weatherDiv.innerHTML = `<h3>${data.name} Weather</h3><p>${data.weather[0].description}</p><p>Temp: ${data.main.temp}°C</p>`;
        } catch (error) {
            console.error('Weather fetch error:', error);
            weatherDiv.innerHTML = `<p>Unable to load weather data.</p>`;
        }
    } 
    async function fetchQuote() {
         const response = await fetch('https://zenquotes.io/api/today'); 
         const data = await response.json(); 
         quoteDiv.innerHTML = `<p>"${data[0].q}" - ${data[0].a}</p>`; 
        }

    const ctx1 = document.getElementById('productivityChart').getContext('2d'); 
    const productivityChart = new Chart(ctx1, { 
    type: 'line', 
    data: { 
        labels: ['Tasks'], 
        datasets: [{ 
            label: 'Completed Tasks', 
            data: [0], 
            borderColor: '#3498db', 
            tension: 0.4 
        }] 
    }, 
    options: { 
        responsive: true, 
        plugins: { 
            legend: { 
                display: true, 
                position: 'top' 
            } 
        } 
    } 
}); 
    const ctx2 = document.getElementById('goalsChart').getContext('2d'); 
    const goalsChart = new Chart(ctx2, { 
    type: 'doughnut', 
    data: { 
        labels: ['Progress', 'Remaining'], 
        datasets: [{  
            data: [0, 1], 
            backgroundColor: ['#2ecc71', '#ecf0f1'] 
        }] 
    }, 
    options: { 
        responsive: true, 
        plugins: { 
            legend: { 
                display: true, 
                position: 'top' 
            } 
        } 
    } 
}); 
