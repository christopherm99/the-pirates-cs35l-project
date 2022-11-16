import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./Profile.css"

export default function Profile() {
  let { id } = useParams();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    axios.get(`/api/users/${id}`).then((response) => {
      console.log(response.data)
      setUser(response.data);
    });
  }, []);
  let items = Object.keys(user).filter((key) => key !== "pfp" && key !== "name" && key !== "id").map(key => {
    return <li><span className="capitalize">{key}</span>: {user[key]}</li>
  })
  return (
    <>
      <div className="flex bg-white w-1/2 p-10 rounded-xl place-self-center mt-10 hover:drop-shadow-lg">
        <div className="flex-auto">
          <h1 className="font-medium text-xl">{user.name}</h1>
          <ul className="p-2 font-light">
            {items}
          </ul>
        </div>
        <img className="rounded-full h-16" src={user.pfp} referrerPolicy="no-referrer"/>
      </div>
    </>
  )
}
