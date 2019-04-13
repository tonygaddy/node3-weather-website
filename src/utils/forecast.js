const request = require('request')

const forecast = (lat, long, callback) => {
    const token = '1aec2db102b54ba940fd4493dc92a2a1'
    const api = `https://api.darksky.net/forecast/${token}/${lat},${long}`
    const options = '?'
    const url = api + options

    request({url, json: true}, (err, {body:res}) => {
        if(err){
            callback('Unable to connect to weather service')
        } else if(res.error) {
            callback('Unable to find location')
        } else {
            const temp = res.currently.temperature
            const rain = res.currently.precipProbability
            const daily = res.daily.data[0].summary

            const high = res.daily.data[0].temperatureHigh
            const low = res.daily.data[0].temperatureLow

            callback(undefined, `${daily} It is currently ${temp} degrees out with a high of ${high} and a low of ${low}. There is a ${rain}% chance of rain.`)
        }
})

}

module.exports = {forecast};