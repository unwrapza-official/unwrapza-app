import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) =>{
            if(!user){
                setAllowed(false);
                setLoading(false);
                return;
            }

            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);

            if(snap.exists() && snap.data().role === "admin"){
                setAllowed(true);
            }else{
                setAllowed(false);
            }

            setLoading(false)
        });

        return () => unsub();
    }, []);

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return allowed ? children : <Navigate to="/"/>
}

export default AdminRoute