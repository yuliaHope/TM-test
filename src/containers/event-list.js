import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectEvent } from '../actions/index';
import { bindActionCreators, compose } from 'redux';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import dateFormat from 'dateformat';
import { ALL_EVENTS_QUERY } from '../graphql/events';

class EventList extends Component {
    renderList() {
        return this.props.events.map((event) => {
            return (
                <li className="events-list-item row"
                    onClick={() => { this.selectEvent(event) }}
                    key={event.id}>
                    <img src={event.images[0].url} className="col-sm-3" />
                    <div className="col-sm-7">
                        <p >{event.name}</p>
                        <p>{event.venue.city}</p>
                    </div>
                    <div className="date col-sm-2">{dateFormat(event.localStartDate, 'ddd, mmm d')}</div>
                </li>
            );
        });
    }

    render() {
        if (this.props.error) {
            return <ErrorMessage message='Error loading events.' />
        }
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <ul className="events-list">
                {this.renderList()}
            </ul>
        );
    }

    selectEvent(event) {
        this.props.selectEvent(event);
        Router.push('/details');
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectEvent }, dispatch);
}

const mapResultsToProps = ({ data: { loading, events, error } }) => ({
    error,
    loading,
    events,
});

const ATTRACTIONS_IDS = ['K8vZ91719t0'];
const LIMIT = 100;

const EventListWithData = graphql(ALL_EVENTS_QUERY, {
    options: {
        variables: {
            attractionIds: ATTRACTIONS_IDS,
            limit: LIMIT,
        }
    },
    props: mapResultsToProps,
})(EventList);

export default connect(null, mapDispatchToProps)(EventListWithData);