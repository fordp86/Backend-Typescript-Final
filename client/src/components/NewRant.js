import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RantContext from '../contexts/RantContext';

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
        <form onSubmit={handleSubmit}>
            <h1>New Rant</h1>
            <span>Rant Info  </span>
            <input placeholder="Enter Rant" type="text" name="rantBody" value={newRant.rantBody} onChange={handleChange} />
            <br></br><br></br>
            <button>Create New Rant</button>
        </form>
    )
};

export default NewRant;