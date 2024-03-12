import UserContext from "./UserContext"
import React, { useEffect, useState } from "react";
import axios from "axios";


export const UserProvider = (props) => {
    const baseUrl = "http://localhost:3001"
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
          await loadUser();
        }
        fetchData();
      }, []);

    function loadUser() {
        const userString = localStorage.getItem('user');
        console.log(userString);
        if (userString) {
            setUser(JSON.parse(userString));
        }
        console.log(user);
    }

    function createUser(email, password, firstName){
        let user = { email, password, firstName };

        return axios.post(`${baseUrl}/users`, user)
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        })
    };

    function signInUser(email, password) {
        let user = { email, password };
    
        return axios.post(`${baseUrl}/login`, user)
            .then(response => {
                localStorage.setItem('myCoffeeToken', response.data.accessToken)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                setUser(response.data.user);
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <UserContext.Provider value={{
            createUser,
            signInUser,
            user
        }}>{props.children}</UserContext.Provider>
    )
}