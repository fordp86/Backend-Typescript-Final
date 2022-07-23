import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const SignUp = () => {

    let [ newUser, setNewUser ] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        city: "",
        state: ""
    });

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        createUser(newUser).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>REGISTER</h1>
            <br></br><br></br>
            <span>Username  </span>
            <input placeholder="Enter Username" type="text" name="username" value={newUser.username} onChange={handleChange} />
            <br></br><br></br>
            <span>Password  </span>
            <input placeholder="Enter Password" type="password" name="password" value={newUser.password} onChange={handleChange} />
            <br /><br></br>
            <span>First Name</span>
            <input placeholder="First Name" type="text" name="firstName" value={newUser.firstName} onChange={handleChange}/>
            <br /><br></br>
            <span>Last Name</span>
            <input placeholder="Last Name" type="text" name="lastName" value={newUser.lastName} onChange={handleChange} />
            <br /><br></br>
            <span>City</span>
            <input placeholder="City" type="text" name="city" value={newUser.city} onChange={handleChange} />
            <br /><br></br>
            <span>State</span>
            <input placeholder="State" type="text" name="state" value={newUser.state} onChange={handleChange}/>
            <br /><br></br>
            <button>Sign Up</button>
        </form>
    )
};

export default SignUp;