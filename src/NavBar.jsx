import React from 'react'

const NavBar = () => {
    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl text-neutral-content">👩‍💻 DevTinder</a>
                </div>

                <div className="flex gap-2">
                    <div className="dropdown dropdown-end nx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li><a className="justify-between">Profile</a></li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
