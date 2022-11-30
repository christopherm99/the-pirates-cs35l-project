import "./Users.css";
const Users = ({ user }) => {

  const handleClick = id => {
    window.location.href = `/profile/${id}`
  }

  return (
    <div className="box-container">
      <article className="box" onClick={() => handleClick(user.id)}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <img className="image" src={user.pfp} referrerpolicy="no-referrer"></img>
      </article>
    </div>
  );
};
export default Users;
