const yargs = require('yargs'),
	  geocode = require('./geocode/geocode'),
	  forecast = require('./forecast/forecast');

const argv = yargs
	.options({
		address: {
			describe: 'Address to fetch weather for',
			demand: true,
			string: true,
			alias: 'a',
		},
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
	if ( errorMessage )
	{
		console.log(errorMessage);
	} else
	{
		let latitude = geocodeResults.results[0].geometry.location.lat;
		let longitude = geocodeResults.results[0].geometry.location.lng;

		forecast.getForecast(latitude, longitude, (errorMessage, forecastResults) => {
			if ( errorMessage )
			{
				console.log(errorMessage);
			} else
			{
				let temperature = forecastResults.currently.temperature;
				let apparentTemperature = forecastResults.currently.apparentTemperature;
				let formatted_address_components = ( geocodeResults.results[0].formatted_address ).split(',');
				let city = ( formatted_address_components[1] ).trim();

				console.log(`It is currently ${temperature}\u00B0F in ${city} and feels like ${apparentTemperature}\u00B0F`);
			}
		});
	}
});