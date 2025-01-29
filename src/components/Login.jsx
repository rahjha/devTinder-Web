import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () =>{

    const [emailId, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleSingup = async()=>{
        try{
            const res = await axios.post(BASE_URL+"/signup",
                                        {firstName, lastName, emailId, password},
                                        {withCredentials: true});                                        
            dispatch(addUser(res.data.savedUser));
            navigate("/profile");                                        
        }catch(err){
            console.error(err);
        }
    }

    const handleLogin = async()=>{
        try{
            const res = await axios.post(BASE_URL+"/login",{
                emailId, 
                password
                }, 
                {withCredentials: true}
            );
            dispatch(addUser(res.data));
            navigate("/feed");
        }catch(err){
            setError(err?.response?.data)
            console.error(err)
        }
    };
    return(
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login": "Sign Up"}</h2>
                    <div>
                        <label className="form-control w-full max-w-xs">
                        {!isLoginForm && 
                            <>
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input type="text" value={firstName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)}/>
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)}/>
                            </>
                        }
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input type="text" value={emailId} className="input input-bordered w-full max-w-xs" onChange={(e)=>setEmailid(e.target.value)}/>
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="text" value={password} className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)}/>
                        </label>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <div className="card-actions justify-center my-2">
                        <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSingup}>{!isLoginForm? "Signup" : "Login"}</button>
                    </div>
                    <p className="text-sm font-medium underline cursor-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New user? signup here" : "Existing user? login here"}</p>
                </div>
            </div>
        </div>
    )
}
export default Login;