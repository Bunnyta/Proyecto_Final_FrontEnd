import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile= () => {

 const {user} = useContext(AuthContext)

    return <div className="profile">
        <h1>Profile</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

       
    </div>
    
}

export default Profile;