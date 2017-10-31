import gql from 'graphql-tag';

export const ALL_EVENTS_QUERY = gql`
  query allEvents($attractionIds: [ID]!, $limit: Int!) {
    events(attractionIds: $attractionIds limit: $limit) {
        id
        name
        venue {
            id
            name
            city
            stateCode
            stateOrCountryCode
        }
        attractions{
            name
        }
        images{
            url
            width
            height
        }
        localStartDate
    }
}`;