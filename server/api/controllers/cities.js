import Client from '../services/webservice';

function citiesByCountry(req, res) {
    let client = new Client();
    let country = req.swagger.params.country.value || '';
    let page = req.swagger.params.page.value || 1;
    client.getCitiesByCountry(country, page, (data) => res.json(data));
}

module.exports = {
  citiesByCountry: citiesByCountry
};
