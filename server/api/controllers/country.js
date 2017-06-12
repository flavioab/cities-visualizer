import Client from '../services/webservice';

function countries(req, res) {
    let client = new Client();
    client.getCountries((data) => res.json(data));
    console.log('/country');
}

module.exports = {
  countries: countries
};
