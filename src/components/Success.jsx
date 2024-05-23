import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackgroundBeams } from "../components/ui/background-beams";

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

    return (
        <div>
            <BackgroundBeams />
            

            <div className="min-h-screen bg-gray-700 bg-gradient-to-b from-gray-950 flex justify-center items-center">
                <div className="w-3/5 max-w-5xl p-5 md:p-10 z-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">User Verified</h2>
                    <h4 className="text-lg font-semibold text-white text-center mb-4">Five Dimensions of IDENTITY in 1-Click</h4>
                    <div className="bg-white shadow-md rounded-lg p-6 divide-y divide-gray-200">
                        <DetailRow label="Biometric ID" subLabel="Who" detail={data?.name} bgColor="bg-red-500" />
                        <DetailRow label="Trusted Device" subLabel="What" detail={data?.imei} bgColor="bg-gray-900" />
                        <DetailRow label="GPS Location" subLabel="Where" detail={data?.address} bgColor="bg-purple-900" />
                        <DetailRow label="Time Stamp" subLabel="When" detail={timeString} bgColor="bg-yellow-400" />
                        <DetailRow label="Source ID" subLabel="Why" detail={<>On-DemanId ID Application <br /><div className="text-sm text-slate-500">(Five DIMENSIONS Workflow)</div></>} bgColor="bg-orange-500" />
                    </div>
                </div>
            </div>  
        </div>
    );
}

function DetailRow({ label, subLabel, detail, bgColor }) {
    return (
        <div className="flex flex-col  sm:flex-row items-center py-1">
            <div className="flex flex-col flex-1">
                <div className="font-bold p-1">{label}</div>
                <h5 className={`text-center text-white ${bgColor} p-2 w-full  md:w-36 sm:w-36 rounded`}>{subLabel}</h5>
            </div>
            <div className="flex-1 mt-2 sm:mt-0">
                <span className="font-semibold">{detail}</span>
            </div>
        </div>
    );
}
