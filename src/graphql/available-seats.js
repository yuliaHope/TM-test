import gql from 'graphql-tag';

export const AVAILABLE_SEATS = gql`
  query availableSeats($eventIds: [ID]!) {
    availableSeats(eventIds: $eventIds){
    count
    total
    eventId
  }
}`;