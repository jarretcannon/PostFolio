import UserContext from "./UserContext"
import axios from "axios";


export const UserProvider = (props) => {
    const baseUrl = "http://localhost:3001"

    function createUser(email, password){
        let user = { email, password };

        return axios.post(`${baseUrl}/users`, user)
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        })
    };

    function signInUser(email, password) {
        let user = { email, password };
    
        return axios.post(`${baseUrl}/login`, user)
            .then(response => {
                localStorage.setItem('myCoffeeToken', response.data.token)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <UserContext.Provider value={{
            createUser,
            signInUser
        }}>{props.children}</UserContext.Provider>
    )
}