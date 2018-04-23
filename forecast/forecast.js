const request = require('request');

// Get current forecast of the given location (latitude & longitude)
let getForecast = (latitude, longitude, callback) => {

	// Create request to forecast.io api
	request({
		url: `https://api.darksky.net/forecast/630b12c338e19c1588708133fe023d9e/${latitude},${longitude}`,
		json: true,
	}, (error, response, body) => {

		// if elseif & else chain for error checking
		if ( error )
		{

			callback(`Error: ${JSON.stringify(error, null, 2)}`);

		} else if ( body.error || response.statusCode === 400 )
		{

			callback(`400 Error - ${body.error}`);

		} else if ( response.statusCode === 200 )
		{

			callback(null, body);

		} else if ( response.statusCode === 404 )
		{

			callback('404 Error - Server Timeout');

		} else if ( response.statusCode === 401 )
		{

			callback('401 Error - Invalid Credentials');

		} else if ( response.statusCode === 502 )
		{

			callback('502 Error - Invalid Response From Server')

		} else
		{

			callback('Error - An Unknown Error Occured');

		}

	});

};

// Export function(s) expressions for external use, via an object
module.exports = {
	getForecast,
};