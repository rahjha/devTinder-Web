import axios from "axios";
import { useState } from "react";

const Login = () =>{

    const [emailId, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async()=>{
        try{
            const res = axios.post("http://localhost:7777/login",{
                emailId, 
                password
                }, 
                {withCredentials: true}
            );
        }catch(err){
            console.err(err)
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
                    <div className="card-actions justify-center my-2">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;