const request = require('request')

const geocode = (address, callback) => {
    address = encodeURIComponent(address)
    const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`
    const token = '?access_token=pk.eyJ1IjoidG9ueWdhZGR5IiwiYSI6ImNqdHppd2ZxZzJ3NGo0YXBpYjFwYWl6aGYifQ.DHg2dt6IDznKt64WUbTtsA'
    const options = '&limit=1'
    const url = api + token + options

    request({url, json: true}, (err, {body:res}) => {//res) => {
        if(err) {
            callback('Unable to connect to geocoding service')
        } else if (res.features.length === 0) {
            callback('Unable to geocode that location')
        } else {
            callback(undefined, {
                latitude: res.features[0].center[1],
                longitude: res.features[0].center[0],
                location: res.features[0].place_name
            })
        }
    })
}

module.exports = {geocode};