import withData from '../lib/withData';
import ListHeader from '../src/components/event-list-header';
import EventList from '../src/containers/event-list';
import stylesheet from '../styles/index.scss'

const IndexPage = () => {
    return (
        <div className="events">
            <ListHeader />
            <EventList />
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} ></style>
        </div>
    );
};

export default withData(IndexPage);