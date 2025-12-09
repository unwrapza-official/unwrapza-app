import AccountSidebar from "../../components/account/AccountSidebar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase";
import toast from "react-hot-toast";

const AccountLayout = () => {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);

            if(!u){
                navigate('/login')
            }
        });
        return unsub;
    }, []);

    if (user === undefined) {
       return <div className="text-center py-10">Loading...</div>;
    }
    
    return(
        <div className="w-full max-w-[1200px] mx-auto px-4 flex gap-6 py-6">
            <AccountSidebar/>
            <div className="flex-1">
                <Outlet/>
            </div>    
        </div>
    )
}

export default AccountLayout
