import React from 'react';
import dateFormat from 'dateformat';
import { shape, arrayOf, instanceOf, object, string } from 'prop-types';


DetailsHeader.propTypes = {
        event: shape({
            images: arrayOf(shape({url: string})),
            name: string,
            localStartDate: string,
            venue: shape({city: string}),
        }).isRequired,
}

function DetailsHeader(props) {
    return (
        <div className="event-details-header container">
            <img src={props.event.images[0].url} className="col-sm-3 centrate" />
            <div className="col-sm-9 centrate">
                <p>{props.event.name}</p>
                <span>{dateFormat(new Date(props.event.localStartDate), 'ddd, mmm d')} </span>
                <span>{props.event.venue.city}</span>
            </div>
        </div>
    );
}

export default DetailsHeader;