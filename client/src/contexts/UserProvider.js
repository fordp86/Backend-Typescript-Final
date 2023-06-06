import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {
    const baseUrl = "https://hometasktic.herokuapp.com/api/users";

    const [ user, setUser ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getUsers();
        }
        fetchData();
    }, []);

    function getUsers() {
        return axios.get(`${baseUrl}/profiles/`).then(response => setUser(response.data));
    }

    // Get One User
    function getOneUser(id) {
        return axios.get(`${baseUrl}/profiles/${id}`)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    // Get User Posts
    function getUserRants(id){
        return axios.get(`${baseUrl}/profiles/${id}`)
            .then(response => {
                return new Promise(resolve => resolve(response.data))
            })
    }

    // User Profile Access
    function userProfilePage(user, id){
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myRantToken')}`
        }

        return axios.get(`${baseUrl}/profiles/${id}`, user, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data))
        })
    }

    function editUser(user, id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myRantToken')}`
        };

        return axios.put(`${baseUrl}/profiles/${id}`, user, { headers: myHeaders })
            .then(response => {
                getUsers();
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
            userProfilePage,
            getUserRants,
            editUser,
            createUser,
            signInUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}