import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const SignUp = ()=>{
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        createUser(email, password, firstName).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user')
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>REGISTER</h1>
            <span>E-mail  </span>
            <input placeholder="Enter Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <br></br><br></br>
            <span>First name  </span>
            <input placeholder="Enter First Name" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <br></br><br></br>
            <span>Password  </span>
            <input placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <button>Sign Up</button>
        </form>
    )
};

export default SignUp;