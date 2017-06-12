import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Pagination extends Component {
    publishUpdates(page) {
        PubSub.publish('update-page', page)
    }

    render() {
        let buttons = [];
        for (let i=1; i < this.props.total/8; i++) {
            buttons.push(
                <div className={i == this.props.page ? "pure-button pure-button-active" : "pure-button"}
                    onClick={(e) => this.publishUpdates(i)}>
                    {i}
                </div>
            );
        }

        return (
            <div class="pure-button-group" role="group">
                {buttons}
            </div>
        );
    }
}
