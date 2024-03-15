import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const SignUp = ()=>{
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        createUser(email, fullName, location, photo, password).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user')
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
         
            <input placeholder="Enter Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <br></br><br></br>
            
            <input placeholder="Enter Full Name" type="text" name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
            <br></br><br></br>
         
            <input placeholder="Location" type="text" name="text" value={location} onChange={e => setLocation(e.target.value)} />
            <br /><br></br>
            
            <input placeholder="Photo URL" type="img" name="img" value={photo} onChange={e => setPhoto(e.target.value)} />
            <br /><br></br>

            <input placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <button>Sign Up</button>
        </form>
    )
};

export default SignUp;