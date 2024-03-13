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

    function createUser(email, password, fullName){
        let user = { email, password, fullName };

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

    function signOutUser() {
        localStorage.removeItem("myCoffeeToken");
        localStorage.removeItem("user");
        setUser({});
      }
    
    return (
        <UserContext.Provider value={{
            createUser,
            signInUser,
            signOutUser,
            user
        }}>{props.children}</UserContext.Provider>
    )
}