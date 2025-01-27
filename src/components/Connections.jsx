import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = ()=>{
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);

    const fetchConnection = async()=>{
        const connection = await axios.get(BASE_URL+"/user/connection",{withCredentials: true});
        dispatch(addConnection(connection.data.data));
    }

    useEffect(()=>{
        fetchConnection();
    },[])

    if(!connections) return;

    if(connections.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-2xl text-black">No connections found!!</h1>
            </div>
        )
    }

    return(
        <div className="text-center my-10">
            <h1 className="text-3xl text-black">Connections</h1>
            {
                connections.map((connection)=>{
                    
                    const {firstName, lastName, phototUrl, age, gender, about} = connection;

                    return(
                        <div className="flex m-4 p-4 border rounded-lg bg-base-300 w-1/3 mx-auto">
                            <div>
                                <img alt="photo" className="w-20 h-20 rounded-full" src={phototUrl}/>
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-lg">{firstName+" "+lastName}</h2>
                                <h2>{about}</h2>
                                {age && gender && <p>{age+" "+gender}</p>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Connections;