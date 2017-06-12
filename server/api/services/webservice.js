import rp from 'request-promise';
import parse from 'xml-parser';

export default class Client {

    getCountries(callback) {
        let options = {
            uri: 'http://www.webservicex.com/country.asmx/GetCountries',
            method: 'GET'
        };

        rp(options)
            .then(xml => parse(xml).root.content)
            .then(xml => xml.replace(/&lt;/g, '<'))
            .then(xml => xml.replace(/&gt;/g, '>'))
            .then(xml => parse(xml).root.children)
            .then(items => items.map(item => item.children[0].content))
            .then(callback)
            .catch((err) => console.log(err));
    }

    getCitiesByCountry(country, page=1, callback) {
        let options = {
            uri: 'http://www.webservicex.com/globalweather.asmx/GetCitiesByCountry',
            method: 'POST',
            form: {
                CountryName: country
            }
        };

        rp(options)
            .then(xml => parse(xml).root.content)
            .then(xml => xml.replace(/&lt;/g, '<'))
            .then(xml => xml.replace(/&gt;/g, '>'))
            .then(xml => parse(xml).root.children)
            .then(items => items.slice((page-1)*8, (page)*8))
            .then(items => items.map(item => item.children[1].content))
            .then(callback)
            .catch((err) => console.log(err));
    }
}
