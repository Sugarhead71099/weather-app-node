const yargs = require('yargs');
const _ = require('lodash');
const geocode = require('./geocode/geocode');

const argv = yargs.options({
	address: {
		describe: 'Address to fetch weather for',
		demand: true,
		string: true,
		alias: 'a',
	},
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address);