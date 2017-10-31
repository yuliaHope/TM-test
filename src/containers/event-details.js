import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsHeder from '../components/event-details-header';
import DetailsInfo from './event-details-info';
import stylesheet from '../../styles/index.scss'

class EventDetails extends Component {
    render() {
        if (!this.props.event) {
            return <div>Select a event to get started.</div>;
        }

        return (
            <div className="event-details">
                <DetailsHeder event={this.props.event} />
                <DetailsInfo event={this.props.event} />
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} ></style>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.activeEvent,
    }
}

export default connect(mapStateToProps)(EventDetails);