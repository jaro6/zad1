import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import api from './API/api';

function App() {

  // const deleteUsers = async () => {
  //   setLoading(true);
  //   setUsers([]);
  // }

  // const logUsers = () => {
  //   console.log(users);
  // }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get('/')
        setUsers(res.data);
      }
      catch (e) {
        console.log(e);
      }
    }
    getUsers();
  }, [])
  
  const addUser = async (user) => {
    console.log(users);
    const name = user.firstname;
    setMessage("Congratulations " + name + ". Your registration is succesfull.")
    setLoading(true);
    setUsers(prevUsers => [...prevUsers, user]);
  }

  useEffect(() => {
    if(loading){
      add(users);
    }
  }, [users])

  const add = (users) => {
    try {
      api.put('/', users).then(res => {
        console.log(res.data)
      }).finally(()=> {setLoading(false)})
    }
    catch (e) {
      console.log(e);
    }
  }
  


  return (
    <div className="App">
        <h1 style = {{textAlign : "center", color: "green"}}>{message}</h1>
        <LoginForm addUser={addUser}></LoginForm>
        {/* <button onClick={() => deleteUsers()}>delete</button>
        <button onClick={() => logUsers()}>log users</button> */}
    </div>
  );
}

export default App;
