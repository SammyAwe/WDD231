const taskData = { 
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{ 
        label: 'Tasks Completed', 
        data: [3, 7, 4, 6, 5, 8, 10], 
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
        borderColor: 'rgba(54, 162, 235, 1)', 
        borderWidth: 1 
    }] 
}; 
const config = { 
    type: 'bar', 
    data: taskData, 
    options: {
         responsive: true, 
         plugins: { 
            title: {
                 display: true, 
                 text: 'Productivity Trend (Tasks Completed per Day)' 
                }, 
                legend: { 
                    display: true, 
                    position: 'top' 
                } 
            }, 
            scales: { 
                y: { beginAtZero: true, 
                    ticks: { stepSize: 2 

                    } 
                } 
            } 
        } 
    }; 
    const ctx = document.getElementById('productivityTrendChart').getContext('2d'); 
    const productivityTrendChart = new Chart(ctx, config);