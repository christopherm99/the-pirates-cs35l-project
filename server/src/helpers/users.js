import db from "../../db.js";

export async function getUser(user_id) {
  let [user] = await db.query("SELECT * FROM users where user_id = ?", user_id);
  if (!user[0]) {
    throw "User not found";
  }
  return user[0];
}
