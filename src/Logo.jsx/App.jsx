

import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import jwt_decode from "jwt-decode";
import "react-phone-input-2/lib/style.css";
import { useTimer } from "react-timer-hook";
import { toast, Toaster } from "react-hot-toast";
import useQueryParams from "../hooks/useQueryParams.js";
import InfoCard from "../components/InfoCard.jsx";
import { sendNotificationApi, verifyAuthUserApi } from "../apis/services.js";
import { Loader } from "../components/Loader.jsx";
import { ErrorMessage } from "../components/ErrorMessage.jsx";
import { Form } from "../componentsForm.jsx";
import { BackgroundBeams } from "../components/ui/background-beams";





function Logo() {
  return (
    <div className="flex justify-center mb-4 md:mt-5">
      <img
        src="https://ivalt.com/wp-content/uploads/2017/07/logo.png.webp"
        alt="logo"
        className="w-2/5 my-3 drop-shadow-md"
      />
    </div>
  );
}

const TIMEOUT = 40;

export default function App() 
{
  // const history = useHistory();
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const [btnTitle, setBtnTitle] = useState("Send Request to iVALT");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnVariant, setBtnVariant] = useState("primary");
  const [userVerified, setUserVerified] = useState(null);
  const [decodedData, setDecodedData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("1");
  const timeoutOccurred = useRef(false);
  const userAgent = navigator.userAgent;
  const isMobileDevice =
    userAgent.includes("Android") || userAgent.includes("iPhone");

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TIMEOUT);

  const { seconds, minutes, start, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      showErrorMessage("Timeout", "Request Timeout");
    },
    autoStart: false,
  });

  /**
   * Executes the showErrorMessage function.
   *
   * @param {string} title - The title of the error message.
   * @param {string} detail - The detailed description of the error.
   */
  function showErrorMessage(title, detail) {
    toast.error(title);
    setBtnLoading(false);
    setLoading(false);
    setErrorMessage(detail);
    setBtnTitle("Send Request to iVALT");
    setBtnVariant("danger");
    setTimeout(() => setBtnVariant("primary"), 2000);
    setMobileNumber("1");
  }

  /**
   * Sends a notification to the given mobile number.
   *
   * @param {string} mobileNumber - The mobile number to send the notification to.
   * @return {Promise<void>} - A promise that resolves when the notification is sent.
   */
  async function sendNotification(mobileNumber) {
    try {
      setBtnTitle("Sending notification....");
      setBtnLoading(true);
      setErrorMessage("");
      setBtnVariant("default");

      const response = await sendNotificationApi(mobileNumber);
      const jsonResponse = await response.json();

      if (response.ok) {
        setBtnVariant("success");
        start();
        await verifyAuthUser(mobileNumber);
        toast.success(jsonResponse.data.message);
      } else {
        showErrorMessage(jsonResponse.error.title, jsonResponse.error.detail);
        setMobileNumber("1");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFormSubmit() {
    return () => {
      if (mobileNumber.length < 6) {
        showErrorMessage(
          "Enter a valid mobile number !",
          "Please enter a valid phone number"
        );
        return false;
      }
      sendNotification(`+${mobileNumber}`);
    };
  }

  /**
   * A function to verify the authentication of a user.
   *
   * @param {string} mobileNumber - The mobile number of the user to verify.
   * @return {Promise<void>} - A promise that resolves when the authentication is verified.
   */
  async function verifyAuthUser(mobileNumber) {
    try {
      // console.log(mobileNumber, timeoutOccurred.current);

      if (timeoutOccurred.current) return; // Check if timeout occurred before making the API call
      setBtnTitle("Requesting authentication....");
      const response = await verifyAuthUserApi(mobileNumber);
      const jsonResponse = await response.json();

      if (response.status === 422 && !timeoutOccurred.current) {
        setTimeout(() => verifyAuthUser(mobileNumber), 2000);
      }

      if (response.status === 200) {
        setLoading(false);
        setBtnLoading(false);
        toast.success(jsonResponse.data.message);
        setBtnTitle("User Verified");
        setTimeout(() => {
          setMobileNumber("1");
          setUserVerified(jsonResponse.data.details);
          pause();
          navigate('/success', { state: { data: jsonResponse.data.details} });
        }, 1500);
      }

      if (response.status === 401) {
        showErrorMessage(jsonResponse.error.title, jsonResponse.error.detail);
      }
    } catch (error) {
      console.log(error);
      showErrorMessage("Error", "Something went wrong");
    }
  }

  useEffect(() => {
    if (queryParams.token) {
      const decoded = jwt_decode(queryParams?.token);
      setDecodedData(decoded);
      if (decoded.Mobile) {
        sendNotification(decoded?.Mobile).then(() => null);
        setMobileNumber(decoded?.Mobile);
      } else {
        setLoading(false);
      }
    }
  }, [queryParams.token]);

  useEffect(() => {
    
    if (seconds === 0 && minutes === 0) {
      // Set timeoutOccurred flag when timeout occurs
      timeoutOccurred.current = true;
    }
  }, [seconds, minutes]);

  return (
    
    <div className="flex flex-col justify-between min-h-screen h-screen  bg-gray-700 bg-gradient-to-b from-gray-950 ">
      <BackgroundBeams />
      
      
      <section className="flex flex-col gap-2 items-center p-4 z-50 ">
        {/* <Logo /> */}
        {/* <h4 className="text-center text-white text-3xl my-8"><Link to="/success">Success Page   -   </Link></h4> */}
        
        <Card className="h-auto rounded-sm shadow-md py-3 md:min-w-[425px] overflow-visible mt-28">
          <CardBody className="overflow-visible">
            <p className="text-2xl text-center font-semibold font-sans my-3">
              “Zero Trust” Endpoint IDENTITY
            </p>
            <Loader loading={loading} />
            <Form
              loading={loading}
              userVerified={userVerified}
              value={mobileNumber}
              onChange={(phone) => setMobileNumber(phone)}
              disabled={btnLoading}
              color={btnVariant}
              onClick={handleFormSubmit()}
              btnTitle={btnTitle}
              minutes={minutes}
              seconds={seconds}
            />
            <ErrorMessage errorMessage={errorMessage} />

            {userVerified && (
              <>
                <span className="ml-1 text-center my-2">User Verified ✅</span>
                <InfoCard info={decodedData} user={userVerified} />
                
              </>
            )}
          </CardBody>
        </Card>
        <Toaster
          position={isMobileDevice ? "bottom-center" : "top-right"}
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "4px",
            },
          }}
        />
      </section>
      
    </div>
  );
}
