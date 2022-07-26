import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';

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
    <Container>
        <Stack gap={3} className="col-md-7 mx-auto p-3 signup">
            <h1>REGISTER</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" name="username" value={newUser.username}  onChange={handleChange} />
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Enter Password" name="password" value={newUser.password}  onChange={handleChange} />
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstName" value={newUser.firstName}  onChange={handleChange} />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name="lastName" value={newUser.lastName}  onChange={handleChange} />
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" name="city" value={newUser.city}  onChange={handleChange} />
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" name="state" value={newUser.state}  onChange={handleChange} />
                <br />
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Stack>
    </Container>
    )
};

export default SignUp;