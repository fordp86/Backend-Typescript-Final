import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';

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
        <Stack gap={3} className="col-md-7 mx-auto p-3 signin">
            <h1>LOGIN</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" name="username" onChange={e => setUsername(e.target.value)} />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" name="password" onChange={e => setPassword(e.target.value)} />
                <br />
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
        </Stack>
    </Container>
    );
};

export default SignIn;