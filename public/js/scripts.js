const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const search = input.value
    const request = `http://localhost:3000/weather?search=${search}`
    const message = document.querySelector('#message')
    const info = document.querySelector('#info')
    
    message.textContent = 'Loading...'
    message.classList.add('loading')
    info.textContent = ''
    
    fetch(request).then(response => {
        response.json().then( ({error, location, forecast}) => {
            message.classList.remove('loading')
            message.classList.remove('error')

            if (error) {
                message.textContent = error
                message.classList.add('error')
            } else {
                message.textContent = location
                info.textContent = forecast
            }
        })
    })
    
})