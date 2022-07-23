import axios from "axios";
import { useEffect, useState } from "react";
import RantContext from './RantContext';

export const RantProvider = (props) => {

    const [ rant, setRant ] = useState([]);
    const baseUrl = "http://localhost:3000/api/rants/";

    function getRants() {

    }

    function getOneRant(id) {
        
    }

    function addRant(rant) {        

    }

    function editRant(rant) {

    }

    function deleteRant(id) {

    }

    return (
        <RantContext.Provider value={{
            rant,
            getRants,
            getOneRant,
            addRant,
            editRant,
            deleteRant
        }}>
            { props.children }
        </RantContext.Provider>
    )
};