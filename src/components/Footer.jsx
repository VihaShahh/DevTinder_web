
const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-center 
            bg-neutral text-neutral-content p-4 w-full text-center gap-3">

            <div className="flex items-center gap-2 justify-center">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current">
                    <path d="M22.672 15.226l-2.432.811..."></path>
                </svg>

                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </div>

            <div className="flex gap-4 justify-center">
                <a><svg width="24" height="24" className="fill-current"><path d="M24 4.557..." /></svg></a>
                <a><svg width="24" height="24" className="fill-current"><path d="M19.615 3.184..." /></svg></a>
                <a><svg width="24" height="24" className="fill-current"><path d="M9 8h-3..." /></svg></a>
            </div>

        </footer>
    )
}

export default Footer;
