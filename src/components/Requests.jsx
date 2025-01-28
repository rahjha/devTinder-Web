import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = ()=>{
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.request)
    const fetchRequest = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials: true});
            console.log(res);
            dispatch(addRequest(res?.data?.data));
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchRequest();
    },[]);

    if(!requests) return;

    if(requests.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-2xl text-black">No request found!!</h1>
            </div>
        )
    }

    return(
        <div className="text-center my-10">
            <h1 className="text-3xl text-black">Connection Request</h1>
            {
                requests.map((request)=>{
                    
                    const {_id, firstName, lastName, phototUrl, age, gender, about} = request.fromUserId;

                    return(
                        <div key={_id} className="flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div className="flex ">
                                <div>
                                    <img alt="photo" className="w-20 h-20 rounded-full" src={phototUrl}/>
                                </div>
                                <div className="text-left mx-4">
                                    <h2 className="font-bold text-lg">{firstName+" "+lastName}</h2>
                                    <h2>{about}</h2>
                                    {age && gender && <p>{age+" "+gender}</p>}
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2">Accept</button>
                                <button className="btn btn-secondary mx-2">Reject</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Requests;