import Users from "./Users";
const ListPage = ({ searchResults }) => {
  const results = searchResults.map((user) => (
    <Users key={user.id} user={user} />
  ));
  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Posts</p>
    </article>
  );
  return <main>{content}</main>;
};
export default ListPage;
