import './Users.css';
const Users = ({ users }) => {
    return (
        <article className="box">
            <h2>{users.name}</h2>
            <p>{users.email}</p>
            <img className="image" src={users.pfp} referrerpolicy="no-referrer"></img>
        </article>
    )
}
export default Users;