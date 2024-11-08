import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage(){
    const [redirect, setRedirect] = useState(null);
    const {ready , user, setUser} = useContext(UserContext);
    
    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);

    }
    
    async function deleteUser(){
        try {
            const response = await axios.delete("/deleteUser");
            console.log(response.data);
            setUser(null); 
            setRedirect("/"); 
          } catch (error) {
            console.error("Error deleting user:", error);
          }

    }

    if (!ready) {
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/Login'} />
    }


    if(redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    <h1 className="text-3xl">Account Infos</h1>
                    <div className="mt-8 rounded-lg p-8">
                        <div className="py-3 px-2 text-left">
                            <label className="text-lg text-gray-700">UserName</label>
                            <input type="text" value={user.name} />
                        </div>
                        <div className="py-3 px-2 text-left">
                            <label className="text-lg text-gray-700">Email</label>
                            <input type="text" value={user.email} />
                        </div>
                        <div className="py-3 px-2 text-left">
                            <label className="text-lg text-gray-700">Password</label>
                            <input type="text" value="*******" />
                        </div>
                        <div className="flex flex-row gap-2">
                        <button onClick={logout} className="primary max-w-sm mt-6">Logout</button>
                        <button onClick={deleteUser} className="secondary max-w-sm mt-6">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}