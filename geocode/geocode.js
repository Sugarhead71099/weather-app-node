const request = require('request');

// Prints the address info of the given google maps object
let printAddressInfo = (geocodeData) => {
	let full_address = geocodeData.results[0].formatted_address;
	let latitude = geocodeData.results[0].geometry.location.lat;
	let longitude = geocodeData.results[0].geometry.location.lng;

	console.log('Address:', full_address);
	console.log('Latitude:', latitude);
	console.log('Longitude:', longitude);
};

// Print address details from address given to user, via the google maps geocoding api
let geocodeAddress = (address, callback) => {

	// Format user address for url
	let encodedAddress = encodeURIComponent(address);

	// Create request to google maps geocoding api
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBggJlx-CpvvZDDiCmgjm0cSVW8DTp5ciY`,
		json: true,
	}, (error, response, body) => {

		// if elseif & else chain for error checking
		if ( error )
		{

			callback(`Error: ${JSON.stringify(error, null, 2)}`);

		}  else if ( body.status === 'OK' )
		{

			callback(null, body);

		} else if ( body.status === 'ZERO_RESULTS' )
		{

			callback('Argument(s) Error - Invalid address');

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
	printAddressInfo,
	geocodeAddress,
};