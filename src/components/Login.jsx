import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () =>{

    const [emailId, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

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
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <label className="form-control w-full max-w-xs">
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
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;