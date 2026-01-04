import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const user = useSelector((state) => state.user)

    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-neutral-content">
                    👩‍💻 DevTinder
                </Link>
            </div>

            {!user && (
                <div className="flex-none">
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                </div>
            )}

            {user && (
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="avatar"
                                    src={user.photoUrl
                                    }
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar
