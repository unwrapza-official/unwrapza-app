import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase";

const AccountProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsub;
    }, []);

    if (!user) return <p className="text-gray-500">Loading...</p>;

    return (
        <div className="w-full flex flex-col gap-10">

            {/* PROFILE HEADER */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-5">
                <img 
                    src={`https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=5e62ff&color=fff&size=128`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full shadow"
                />

                <div>
                    <h2 className="text-2xl font-semibold">{user.displayName || "Unnamed User"}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>


            {/* PERSONAL INFO */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

                <form className="flex flex-col gap-4 max-w-sm">

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text"
                            defaultValue={user.displayName || ""}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            defaultValue={user.email}
                            disabled
                            className="border border-gray-200 rounded-md p-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <button className="mt-2 px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition w-fit">
                        Save Changes
                    </button>
                </form>
            </div>


            {/* PASSWORD */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>

                <form className="flex flex-col gap-4">

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input 
                            type="password"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input 
                            type="password"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition w-fit">
                        Update Password
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AccountProfilePage;
