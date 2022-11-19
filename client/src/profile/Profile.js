import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./Profile.css";

const MAX_BIO_LENGTH = 500;

export default function Profile() {
  let { id } = useParams();
  // user is the user whose profile we are viewing
  const [user, setUser] = React.useState({});
  // currentUser is the user who is logged in right now.
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ currentBio, setCurrentBio ] = React.useState("");
  const [ isEditing, setIsEditing ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState("");

  const isViewingSelf = JSON.stringify(currentUser) !== "{}" && currentUser.id === user.id;

  React.useEffect(() => {
    axios.get(`/api/users/${id}`).then((response) => {
      setUser(response.data);
    });
    axios.get(`/api/users`).then((response) => {
      // querying without an id field gives the currently logged in user.
      console.log(response);
      if (response.status === 200) {
        setCurrentUser(response.data);
        if (response.data.bio !== null) {
          setCurrentBio(response.data.bio);
        }
      }
    });
  }, []);

  const updateBio = () => {
    if (currentBio.length >= MAX_BIO_LENGTH) {
      setErrorMessage(`There is a 500 character limit for the bio (your text is ${currentBio.length} chars).`);
      return;
    }

    axios.post('/api/users', {
      user_id: currentUser.id,
      bio: currentBio,
    })
    .then(function () {
      setIsEditing(false);
      setUser({
        ...user,
        bio: currentBio,
      });
      setErrorMessage("");
    })
    .catch(function (error) {
      setErrorMessage(`There was an error saving your bio.`);
    });
  }

  let items = Object.keys(user)
    .filter((key) => key !== "pfp" && key !== "name" && key !== "id" && key !== "bio")
    .map((key) => {
      return (
        <li>
          <span className="capitalize">{key}</span>: {user[key]}
        </li>
      );
    });
  return (
    <>
      <div className="flex bg-white w-1/2 p-10 rounded-xl place-self-center mt-10 hover:drop-shadow-lg">
        <div className="flex-auto">
          <h1 className="font-medium text-xl">{user.name}</h1>
          <ul className="p-2 font-light">{items}</ul>
        </div>
        <img
          className="rounded-full h-16"
          src={user.pfp}
          referrerPolicy="no-referrer"
          alt="user profile"
        />
      </div>
      {((!isViewingSelf && user.bio) || (isViewingSelf && !isEditing)) && 
        <div className="flex flex-col bg-white p-10 rounded-xl place-self-center mt-10 hover:drop-shadow-lg whitespace-pre-wrap max-w-md">
          <div className="font-medium  text-2xl mt-0 mb-2 text-blue-600">
            {user.name}'s Bio:
          </div>
          <div>
            {user.bio}
          </div>
          {isViewingSelf && 
            <button 
              className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-fit rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          }
        </div>
      }
      {(isViewingSelf && isEditing) && 
        <div className="flex flex-col bg-white p-10 rounded-xl place-self-center mt-10 hover:drop-shadow-lg whitespace-pre-wrap max-w-lg">
          <div className="font-medium  text-2xl mt-0 mb-2 text-blue-600">
            Edit your Bio:
          </div>
          <textarea
            className="block p-2.5 w-full mb-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={currentBio}
            onChange={({ target: { value } }) => setCurrentBio(value)}
            rows="15"
            cols="200"
          >
          </textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-fit rounded"
            onClick={() => updateBio()}
          >
            Save
          </button>
          {errorMessage &&
            <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              {errorMessage}
            </div>
          }
        </div>
      }
    </>
  );
}
