
const Users = ({ users }) => {
    return (
        <article>
            <h2>{users.name}</h2>
            <p>{users.email}</p>
            <p>User ID: {users.id}</p>
        </article>
    )
}
export default Users;