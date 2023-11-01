import { useState } from "react";
import "./App.css";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "./redux/users";

function App() {
  const [gender, setGender] = useState("all");
  const { data = [], isLoading } = useGetUsersQuery({ gender });
  const [addUser, addUserResult] = useAddUserMutation();
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();
  const [updateUser, updateUserResult] = useUpdateUsersMutation();

  const [editedUser, setEditedUser] = useState({
    id: null,
    name: "",
    gender: "",
  });

  const handleSubmitUsers = async (e) => {
    e.preventDefault();
    const person = {
      name: e.target[0].value,
      gender: e.target[1].checked ? "men" : "women",
    };
    await addUser(person);
    e.target[0].value = "";
    e.target[1].checked = false;
  };

  const handleDeleteUsers = async (userId) => {
    await deleteUser(userId);
  };

  const handleEditClick = (user) => {
    setEditedUser(user);
  };

  const handleEditChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUsers = async () => {
    await updateUser({
      userId: editedUser.id,
      updateUser: {
        name: editedUser.name,
        gender: editedUser.gender,
      },
    });
    setEditedUser({
      id: null,
      name: "",
      gender: "",
    });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(data);
  return (
    <div className='max-w-6xl m-auto' >
      {gender}
      <div>
        <button
          style={{ background: gender === "men" ? "red" : "buttonface" }}
          onClick={() => setGender("men")}
        >
          Men
        </button>
        <button
          style={{ background: gender === "women" ? "red" : "buttonface" }}
          onClick={() => setGender("women")}
        >
          Women
        </button>
        <button
          style={{ background: gender === "all" ? "red" : "buttonface" }}
          onClick={() => setGender("all")}
        >
          All
        </button>
      </div>
      <br />
      <br />
      <form action="" onSubmit={handleSubmitUsers}>
        <div className='flex  gap-2  '>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
           </div>

        <br />
        <div>
          <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="radio" value="men" name='gender' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">men <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        <div className="flex items-center h-5">
        <input id="remember" type="radio" value="women" name='gender' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">women <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
        </div>
        <br />

      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {editedUser.id === item.id ? (
              <div className='flex gap-2 bg-blue-400 px-4 py-5 rounded mt-3'>

 <input name='name' value={editedUser.name} onChange={handleEditChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />

 <input name='name' value={editedUser.gender} onChange={handleEditChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />

                {/*<button onClick={handleUpdateUsers}>Save</button>*/}
                <button onClick={handleUpdateUsers} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>Save</span>
</button>
              </div>
            ) : (
              <div className='flex justify-between bg-amber-600 mt-2 py-4 px-5 rounded'>
                <div className='flex gap-2 text-xl'>
                  <p> {item.name}</p>
                  <p className='text-amber-50' >{item.gender}</p>
                </div>

<div className='flex gap-6'>
    <button onClick={() => handleDeleteUsers(item.id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  delete
        </span>
                </button>
                {/*<button onClick={() => handleEditClick(item)}>edit</button>*/}
  <button onClick={() => handleEditClick(item)} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
  <svg className="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
  edit
</button>
</div>

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
