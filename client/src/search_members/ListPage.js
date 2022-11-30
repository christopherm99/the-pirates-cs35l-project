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
        <p className="warning">No Matching Posts</p>
      </div>
    </article>
  );
  return <main>{content}</main>;
};
export default ListPage;
