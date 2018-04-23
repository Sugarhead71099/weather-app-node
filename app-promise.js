const yargs = require('yargs'),
	  axios = require('axios');

// Configure yargs commands
const argv = yargs
	.options({
		address: {
			describe: 'Address to fetch weather for',
			demand: true,
			string: true,
			alias: 'a',
			default: '00000',
		},
	})
	.help()
	.alias('help', 'h')
	.argv;

// Encode address, given by user, for use in url
let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBggJlx-CpvvZDDiCmgjm0cSVW8DTp5ciY`;

// Send get request to url (Google Maps Geocoding API)
axios.get(geocodeUrl).then((response) => {

	// Throw an error if no results were found (Invalid Address Given)
	if ( response.data.status === 'ZERO_RESULTS' )
	{
		throw new Error('Unable to find that address.');
	}

	let latitude = response.data.results[0].geometry.location.lat;
	let longitude = response.data.results[0].geometry.location.lng;
	let formatted_address = response.data.results[0].formatted_address;

	let forecastUrl = `https://api.darksky.net/forecast/630b12c338e19c1588708133fe023d9e/${latitude},${longitude}`;

	console.log(formatted_address);

	// return sent get request (Promise) to url (Forecast.io API) for chaining additional Promise
	return axios.get(forecastUrl);

}).then((response) => {

	let temperature = response.data.currently.temperature;
	let apparentTemperature = response.data.currently.apparentTemperature;
	let temperatureHigh = response.data.daily.data[0].temperatureHigh;
	let temperatureLow = response.data.daily.data[0].temperatureLow;
	let percipitationChance = response.data.currently.precipProbability;

	console.log(`It is currently ${temperature}\u00B0F. It feels like ${apparentTemperature}\u00B0F.
				 Today's low was ${temperatureLow}\u00B0F, while the high will be ${temperatureHigh}\u00B0F.
				 There will be a ${percipitationChance}% chance of percipition.`);

}).catch((error) => { // Catch all errors and perform the following

	if ( error.code === 'ENOTFOUND' )
	{
		console.log('Unable to connect to API serevrs.');
	} else
	{
		console.log(error.message);
	}

});