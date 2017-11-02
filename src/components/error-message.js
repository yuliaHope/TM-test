import stylesheet from '../../styles/index.scss';

export default ({ message }) => (
  <aside>
    {message}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} ></style>
  </aside>
)
