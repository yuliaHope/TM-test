export const SELECT_EVENT = 'Select event from event list';

export function selectEvent(event) {
    return {
        type: SELECT_EVENT,
        payload: event,
    };
}