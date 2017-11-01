import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AVAILABLE_SEATS } from '../graphql/available-seats';
import Currency from 'react-currency-formatter';

class DetailsInfo extends Component {
    renderAttractionsList() {
        return this.props.event.attractions.map((attraction) => {
            return (
                <li className="attraction-item"
                    key={attraction.name}>
                    <div>{attraction.name}</div>
                </li>
            );
        });
    }

    renderAvailableSeats() {
        if (this.props.error) {
            return <ErrorMessage message='Error loading available seats.' />
        }
        if (this.props.loading) {
            return (
                <div>Loading available seats...</div>
            );
        }
        return (
            <div>
                <div>Available: {this.props.availableSeats.count}</div>
                <div>Total: {this.props.availableSeats.total}</div>
            </div>
        );
    }

    render() {
        const price = {
            min: 100,
            max: 500,
        };
        const defaultCurrency = "USD"
        return (
            <div className="details-info container">
                <ul>
                    Attractions: {this.renderAttractionsList()}
                </ul>
                <div>Price: &nbsp;
                    <Currency
                        currency={defaultCurrency}
                        quantity={price.min} pattern="##,###!" /> - 
                        <Currency
                        currency={defaultCurrency}
                        quantity={price.max} pattern="##,###!" />
                </div>
                {this.renderAvailableSeats()}
            </div>
        );
    }
}

const mapResultsToProps = ({ data: { loading, availableSeats, error } }) => ({
    error,
    loading,
    availableSeats: availableSeats ? availableSeats[0] : availableSeats,
});

const DetailsInfoWithData = graphql(AVAILABLE_SEATS, {
    options: (ownProps) => ({
        variables: {
            eventIds: [ownProps.event.id],
        }
    }),
    props: mapResultsToProps,
})(DetailsInfo);

export default DetailsInfoWithData;