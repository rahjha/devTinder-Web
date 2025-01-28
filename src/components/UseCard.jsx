import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) =>{
    const {_id, firstName, lastName, gender, emailId, photoUrl, age, about} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async(status, userId)=>{
        try{
            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials: true});
            dispatch(removeFeed(userId));
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="card bg-base-300 w-80 shadow-xl ">
            <figure>
                <img
                src={user.photoUrl}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName +" "+ lastName}</h2>
                {age && gender && <p>{age+" "+ gender}</p>}
                {about && <p>{about}</p>}
                <div className="card-actions justify-end mr-8 mt-1">
                <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
};

export default UserCard;