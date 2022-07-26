import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {
    const baseUrl = "http://localhost:3000/api/users";

    const [ user, setUser ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getUsers();
        }
        fetchData();
    }, []);

    function getUsers() {
        return axios.get(baseUrl).then(response => setUser(response.data));
    }

    function getOneUser(id) {
        return axios.get( `${baseUrl}/profiles/${id}`)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function createUser(user) {       
        
        return axios.post(baseUrl, user)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let user = { username, password };
    
        return axios.post(`${baseUrl}/login`, user)
            .then(response => {
                localStorage.setItem('myRantToken', response.data.token)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <UserContext.Provider value ={{
            user,
            getUsers,
            getOneUser,
            createUser,
            signInUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}