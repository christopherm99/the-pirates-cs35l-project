import db from "../../db.js";

export async function getUser(user_id) {
  if (!user_id) {
    return null;
  }

  let [user] = await db.query("SELECT * FROM users where user_id = ?", user_id);
  if (!user[0]) {
    throw `User not found with id: ${user_id}`;
  }
  return user[0];
}
