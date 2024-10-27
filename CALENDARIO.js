const calendar = document.getElementById('calendar');
const dateInput = document.getElementById('date');
const form = document.getElementById('form');
const currentMonthYear = document.getElementById('current-month-year');
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const renderCalendar = (year, month) => {
    const daysOfWeekContainer = document.getElementById('days-of-week');
    const daysContainer = document.getElementById('days');
    daysOfWeekContainer.innerHTML = '';
    daysContainer.innerHTML = '';

    // Mostrar días de la semana
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        daysOfWeekContainer.appendChild(dayElement);
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    currentMonthYear.textContent = new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    // Rellenar días del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        daysContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.addEventListener('click', () => {
            dateInput.value = `${year}-${month + 1}-${i}`;
        });
        daysContainer.appendChild(day);
    }
};

const today = new Date();
renderCalendar(today.getFullYear(), today.getMonth());

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = document.getElementById('time').value;
    alert(`Cita agendada para el ${dateInput.value} a las ${time}`);
});
