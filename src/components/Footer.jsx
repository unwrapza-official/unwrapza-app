var currentYear = new Date().getFullYear();

const Footer = () => {
    return(
        <footer className="w-full">
            {/* Top Colors */}
            <div className="w-full h-1.5 flex justify-evenly">
                <div className="flex-1 h-full" style={{ backgroundColor: "#FFFB84" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84FF96" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84F3FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#84B9FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#9084FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#DC84FF" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#FF84F7" }}></div>
                <div className="flex-1 h-full" style={{ backgroundColor: "#FF787A" }}></div>
            </div>

            {/* Top Footer */}
            <div className="md:max-w-[1200px] min-h-[300px] mx-auto flex flex-col md:flex-row flex-wrap mt-[30px] gap-10 px-4 md:px-0">
                {/* Need Help */}
                <div className="flex-1 flex flex-col gap-5 text-center md:text-left items-center md:items-start">
                    <h1 className="font-semibold text-[20px]">
                        Need help?
                    </h1>
                    <button className="border-2 border-[#44A77D] w-[200px] h-[50px] font-semibold hover:cursor-pointer hover:bg-[#44A77D] hover:text-white transition">
                        Contact us
                    </button>
                </div>

                {/* Pages */}
                <div className="flex-1 flex flex-col gap-5 text-center md:text-left items-center md:items-start">
                    <h1 className="font-semibold text-[20px]">
                        Pages
                    </h1>
                    <ul className="w-auto space-y-2">
                        <li><a href="/">About</a></li>
                        <li><a href="/disclaimer">Disclaimer</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-1 flex-col gap-5 text-center md:text-left items-center md:items-start">
                    <h1 className="font-semibold text-[20px]">
                        Sign up for emails 
                    </h1>
                    <div className="flex sm:flex-row w-full justify-center md:justify-start gap-3 sm:gap-2">
                        <input 
                            type="email" 
                            className="sm:w-[300px] h-[50px] border-1 pl-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44A77D]" 
                            placeholder="Your email"
                        />
                        <button className="bg-[#44A77D] text-white md:px-4 rounded-md font-semibold hover:bg-[#004a31] duration-200 w-full sm:w-auto">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle Footer */}
            <div className="bg-[#44A77D] mt-8">
                <div className="md:max-w-[1200px] mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-8 p-6 text-white text-center md:text-left">
                    <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                        <h1 className="font-medium">Company</h1>
                        <ul className="space-y-1">
                            <li><a href="/about">About</a></li>
                            <li><a href="/newsletter">Newsletter</a></li>
                            <li><a href="/newsletter">Contact</a></li>
                        </ul>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                        <h2 className="font-medium">Legal</h2>
                        <ul className="space-y-1">
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms & Conditions</a></li>
                            <li><a href="/disclaimer">Disclaimer</a></li>
                        </ul>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                        <h2 className="font-medium">Connect</h2>
                        <ul className="space-y-1">
                            <li><a href="https://instagram.com/unwrapza" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://tiktok.com/@unwrapza" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
                            <li><a href="https://x.com/unwrapza" target="_blank" rel="noopener noreferrer">X</a></li>
                            <li><a href="mailto:info@unwrapza.com">Email</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="bg-[#44A77D]">
                <div className="md:max-w-[1200px] mx-auto text-center py-4 px-4 md:px-0">
                    <p className="text-white font-semibold">
                        © {currentYear} Unwrapza
                    </p>
                    <p className="text-white text-xs opacity-80 mt-1 max-w-[800px] mx-auto">
                        Unwrapza participates in various affiliate programs and may earn commissions from qualifying purchases made through links on this website.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
