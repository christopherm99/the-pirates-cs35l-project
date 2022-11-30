import db from "../../db.js";

export async function getUser(user_id) {
  if (!user_id) {
    return {user_id: 0, username: null, email: null, pfp: null, isadmin: 0, google_id: null, bio: null};
  }

  let [user] = await db.query("SELECT * FROM users where user_id = ?", user_id);
  if (!user[0]) {
    throw `User not found with id: ${user_id}`;
  }
  return user[0];
}
