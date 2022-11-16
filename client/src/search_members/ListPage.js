import Users from "./Users"
const ListPage = ({ searchResults }) => {
    const results = searchResults.map(users => <Users key={users.id} users ={users}/> )
    const content = results?.length ? results: <article><p>No Matching Posts</p></article>
    return (
        <main>{content}</main>
    )
}
export default ListPage