import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log(values)
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    renderSeenIndexes = () => {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderCalculatedValues = () => {
        const entries = [];

        console.log(this.state.values)

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.index) {
            axios.post('/api/values', {
                index: this.state.index
            });
            this.setState({ index: '' });
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Hey there
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your index:
                    </label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>
                        Submit
                    </button>
                </form>

                <h3>
                    Indexes I have seen:
                </h3>
                {this.renderSeenIndexes()}
                <h3>
                    Calculated values:
                </h3>
                {this.renderCalculatedValues()}
            </div>
        )
    }
}

export default Fib;