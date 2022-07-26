import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RantContext from '../contexts/RantContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewRant = () => {
    let [ newRant, setNewRant ] = useState({
        rantBody: ""
    });

    let { addRant } = useContext(RantContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewRant((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addRant(newRant).then(() => {
            navigate('/rants');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <Container>
            <h1>New Rant</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label></Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter Your Rant" name="rantBody" value={newRant.rantBody} onChange={handleChange} />
                <br />
                <Button variant="primary" type="submit">
                    Create New Rant
                </Button>
            </Form>
        </Container>
    )
};

export default NewRant;