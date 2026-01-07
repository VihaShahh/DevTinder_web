import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Correct: useSelector must return something
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return; // if already available, skip API call

        try {
            const response = await axios.get("/api/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(response.data.data));
        } catch (error) {
            console.error("Error fetching user:", error);
            navigate("/login");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []); // empty array => runs only once on mount

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;
