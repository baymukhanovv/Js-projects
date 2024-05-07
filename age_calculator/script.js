const age = document.querySelector('#birthday'),
      calcBtn = document.querySelector('#calc-btn')

const years = document.querySelector('.years')
const month = document.querySelector('.month')
const days = document.querySelector('.days')

function buttonHandler() {
    const currentTime = new Date()
    const userDate = new Date(age.value)
    const birthDetails = {
        date: userDate.getDate(),
        month: userDate.getMonth() + 1,
        year: userDate.getFullYear()
    }
    let currentDate = currentTime.getDate()
    let currentMonth = currentTime.getMonth() + 1
    let currentYears = currentTime.getFullYear()

    if (
        birthDetails.year > currentYears || 
        (birthDetails.month > currentMonth && birthDetails.year === currentYears) || 
        (birthDetails.date > currentDate && birthDetails.month === currentMonth && birthDetails.year === currentYears) 
    ) {
        console.log('Еще не родился')
        return
    } 
    else {
        years.textContent = (currentMonth < birthDetails.month) ? `${currentYears - birthDetails.year - 1}` : `${currentYears - birthDetails.year}`;
        month.textContent = (currentMonth < birthDetails.month) ? `${12 - (birthDetails.month - currentMonth)}` : `${currentMonth - birthDetails.month}` 
        days.textContent = (currentDate < birthDetails.date) ? `${new Date(currentYears, currentMonth - 1, 0).getDate() - birthDetails.date + currentDate}` : `${currentDate - birthDetails.date}`
    }
}


calcBtn.addEventListener('click', buttonHandler)