import React, { Component } from 'react';
import Pagination from './pagination';
import PubSub from 'pubsub-js';

export default class CitiesTable extends Component {
    constructor() {
        super();
        this.state = {
            cities: [],
            country: '',
            page: 1,
            total: 0
        };
    }

    componentDidMount() {
        PubSub.subscribe("update-cities", (msg, country) => {
            fetch(`/country/cities?country=${country}&page=${this.state.page}`)
                .then(res => res.json())
                .then(data => this.setState({
                        country: country,
                        cities: data.items,
                        page: data.page,
                        total: data.total
                    }));
        });

        PubSub.subscribe("update-page", (msg, page) => {
            fetch(`/country/cities?country=${this.state.country}&page=${page}`)
                .then(res => res.json())
                .then(data => this.setState({
                        country: this.state.country,
                        cities: data.items,
                        page: data.page,
                        total: data.total
                    }));
        });
    }

    render() {
        return (
            <div>
                <table className="pure-table" style={{margin: 'auto'}}>
                    <thead>
                        <tr>
                            <th>Number #</th>
                            <th>City name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cities.map((city, i) => {
                            return (<tr className={(i%2) ? 'pure-table-odd' : ''}>
                                <td>{(this.state.page - 1) * 8 + i + 1}</td>
                                <td>{city}</td>
                            </tr>);
                        })}
                    </tbody>
                </table>
                <br/>
                <Pagination total={this.state.total} page={this.state.page}/>
            </div>
        );
    }
}
