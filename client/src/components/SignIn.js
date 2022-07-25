import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/rants');
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
    <Container>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" name="username" onChange={e => setUsername(e.target.value)} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={e => setPassword(e.target.value)} />
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </form>
    </Container>
    );
};

export default SignIn;