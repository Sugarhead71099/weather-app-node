const request = require('request');

let printAddressInfo = (geocodeData) => {
	let full_address = geocodeData.results[0].formatted_address;
	let latitude = geocodeData.results[0].geometry.location.lat;
	let longitude = geocodeData.results[0].geometry.location.lng;

	console.log('Address:', full_address);
	console.log('Latitude:', latitude);
	console.log('Longitude:', longitude);
};

let geocodeAddress = (address) => {
	let encodedAddress = encodeURIComponent(address);

	request({
		url: `https://mapgsdfs.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBggJlx-CpvvZDDiCmgjm0cSVW8DTp5ciY`,
		json: true,
	}, (error, response, body) => {

		if ( error )
		{

			console.log('Error:', JSON.stringify(error, undefined, 2));

		} else if ( body.status === 'ZERO_RESULTS' )
		{

			console.log('Invalid address');

		} else if ( body.status === 'OK' )
		{

			printAddressInfo(body);

		} else if ( response.statusCode )
		{

			console.log('An unknown error occured');
			console.log(error);

		}

	});
};

module.exports = {
	geocodeAddress,
};