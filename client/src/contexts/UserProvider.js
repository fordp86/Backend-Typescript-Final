import axios from "axios";
import UserContext from "./UserContext";

export const UserProvider = (props) => {

    const baseUrl = "http://localhost:3000/api/users/";

    function createUser(username, password) {       
        
    }

    function signInUser(username, password) {
        
    }

    return (
        <UserContext.Provider value={{
            createUser,
            signInUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}