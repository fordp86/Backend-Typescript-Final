import axios from "axios";
import { useEffect, useState } from "react";
import RantContext from './RantContext';

export const RantProvider = (props) => {

    const [ rant, setRant ] = useState([]);

    const baseUrl = "https://rantbook.herokuapp.com/api/rants/";

    useEffect(() => {
        async function fetchData() {
            await getRants();
        }
        fetchData();
    }, []);

    function getRants() {
        return axios.get(baseUrl).then(response => setRant(response.data));
    }

    function getOneRant(id) {
        return axios.get( baseUrl + id)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function addRant(rant) {        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myRantToken')}`
        }

        return axios.post(baseUrl, rant, { headers: myHeaders })
        .then(response => {
            getRants();
            return new Promise(resolve => resolve(response.data));
        }
    );
    }

    function editRant(rant, id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myRantToken')}`
        };

        return axios.put(baseUrl + id, rant, { headers: myHeaders })
            .then(response => {
                getRants();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deleteRant(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myRantToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders })
            .then(response => {
                getRants();
                return new Promise(resolve => resolve(response.data));
            }
        );
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