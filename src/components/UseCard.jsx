const UserCard = ({user}) =>{
    const {firstName, lastName, gender, emailId, photoUrl, age, about} = user;
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
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
};

export default UserCard;