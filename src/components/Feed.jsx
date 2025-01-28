import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UseCard";

const Feed = ()=>{
    const dispatch = useDispatch();
    const feedData = useSelector((store)=>store.feed);
    const getFeed = async()=>{
        if(feedData) return;
        try{
            const res = await axios.get(BASE_URL+"/user/feed",{withCredentials: true});
            dispatch(addFeed(res.data.users));
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getFeed();
    },[])

    if(!feedData) return;

    if(feedData.length <= 0) return <h1 className="flex justify-center my-10">No users left</h1>

    return(
        feedData && <div className="flex justify-center m-10">
            <UserCard user={feedData[0]}/>
        </div>
    )
};

export default Feed;