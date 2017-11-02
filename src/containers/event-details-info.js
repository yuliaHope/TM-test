import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AVAILABLE_SEATS } from '../graphql/available-seats';
import { shape, arrayOf, object, string } from 'prop-types';

class DetailsInfo extends Component {
    static propTypes = {
        event: shape({
            attractions: arrayOf(shape({name: string})),
        }).isRequired,
    }

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
        if (this.props.seatsLoading) {
            return (
                <div>Loading available seats...</div>
            );
        }
        return (
            <div className="container">
                <div>Available: {this.props.availableSeats.count}</div>
                <div>Total: {this.props.availableSeats.total}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <ul>
                    Attractions: {this.renderAttractionsList()}
                </ul>
                {this.renderAvailableSeats()}
            </div>
        );
    }
}

const mapResultsToProps = ({ data: { loading, availableSeats, error } }) => ({
    error,
    seatsLoading: loading,
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