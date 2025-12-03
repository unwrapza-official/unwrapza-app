import AccountSidebar from "../../components/account/accountSidebar"
import { Outlet } from "react-router-dom"

const AccountLayout = () => {
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
