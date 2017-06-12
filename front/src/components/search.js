import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import PubSub from 'pubsub-js';

export default class Search extends Component {
    constructor() {
        super();

        this.countries = [];
        this.state = {
            value: ''
        };
    }

    componentWillMount() {
        fetch('/country')
            .then((res) => res.json())
            .then(items => this.countries = items.map(item => ({label: item})));
    }

    publishUpdates(val) {
        this.setState({value: val});
        PubSub.publish('update-cities', val)
    }

    render() {
        return (
            <form className="pure-form">
                <fieldset>
                <label>Country </label>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={this.countries}
                    renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {item.label}
                            </div>
                    }
                    value={this.state.value}
                    autoHighlight={true}
                    onChange={(e) => this.setState({value: e.target.value})}
                    onSelect={(val) => this.publishUpdates(val) }
                />
                </fieldset>
            </form>
        );
    }
}
