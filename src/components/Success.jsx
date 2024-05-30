import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackgroundBeams } from "../components/ui/background-beams";
import FileUpload from './FileUpload';

export default function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state?.data;

    const currentTime = new Date();
    const timeString = currentTime.toTimeString().split(' ')[0]; // Better time formatting

    useEffect(() => {
        if (!data) {
            navigate('/');
        }
    }, [data, navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <BackgroundBeams />

            

            <div className="min-h-screen bg-gray-700 bg-gradient-to-b from-gray-950 flex justify-center items-center">
                <div className="w-3/5 max-w-5xl p-5 md:p-10 z-10">
                    <FileUpload/>
                    
                </div>
                <button className="absolute top-5 right-5 text-white bg-red-500 px-4 py-2 rounded text-lg" onClick={logout}>Logout</button>
            </div>  
        </div>
    );
}


