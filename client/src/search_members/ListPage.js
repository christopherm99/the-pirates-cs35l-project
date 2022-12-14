import Users from "./Users";
const ListPage = ({ searchResults }) => {
  const results = searchResults.map((user) => (
    <Users key={user.id} user={user} />
  ));
  const content = results?.length ? (
    <div className="list-container">
      {results}
    </div>
  ) : (
    <article>
      <div className="centerSearch">
        <p className="warning">No Matching Users</p>
      </div>
    </article>
  );
  return <main align-items="center">{content}</main>;
};
export default ListPage;
