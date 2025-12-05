import { Link } from "react-router-dom";
import { User, Calendar, Users, Heart, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AccountSidebar = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try{
            await signOut(auth);
            navigate('/');
        }
        catch(err){
            console.log("Logout error: " + err);
        }
    }

    return (
        <nav className="w-56 bg-white border-r border-gray-200 p-4">
            <ul className="divide-y divide-gray-200">

                <li>
                    <Link
                        to="/account"
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md text-green-800 hover:text-green-900 transition hover:cursor-pointer"
                    >
                        <User size={18} />
                        <span>My Account</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/account/calendar"
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-600 transition hover:cursor-pointer"
                    >
                        <Calendar size={18} />
                        <span>Calendar</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/account/people"
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md text-yellow-500 hover:text-yellow-600 transition hover:cursor-pointer"
                    >
                        <Users size={18} />
                        <span>My People</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/account/wishlist"
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md text-purple-500 hover:text-purple-600 transition hover:cursor-pointer"
                    >
                        <Heart size={18} />
                        <span>Wishlist</span>
                    </Link>
                </li>

                <li>
                    <button 
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md text-red-500 hover:text-red-600 transition hover:cursor-pointer"
                    onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default AccountSidebar;
