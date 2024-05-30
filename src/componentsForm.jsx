import PhoneInput from "react-phone-input-2";
import { Button } from "@nextui-org/react";
import { Timer } from "./components/Timer.jsx";
import * as PropTypes from "prop-types";
import { auth, facebookProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

Form.propTypes = {
  loading: PropTypes.bool,
  userVerified: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  btnTitle: PropTypes.string,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

/**
 * Render a form component.
 *
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.loading - Indicates if the form is in a loading state.
 * @param {boolean} props.userVerified - Indicates if the user is verified.
 * @param {string} props.value - The value of the phone input.
 * @param {function} props.onChange - The function called when the phone input value changes.
 * @param {boolean} props.disabled - Indicates if the form is disabled.
 * @param {string} props.color - The color of the button.
 * @param {function} props.onClick - The function called when the button is clicked.
 * @param {string} props.btnTitle - The title of the button.
 * @param {number} props.minutes - The number of minutes for the timer.
 * @param {number} props.seconds - The number of seconds for the timer.
 * @return {JSX.Element} The rendered form component.
 */
export function Form(props) {
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      // The signed-in user info.
      const user = result.user;
      console.log("User Info:", user);
      // You can save the user info to your state, context, or store it in local storage/session storage
    } catch (error) {
      console.error("Error during Facebook login:", error);
      // Handle errors here
    }
  };

  return (
    <>
      {!props.loading && !props.userVerified && (
        <div className="flex flex-col items-center mt-4">
          <div className="md:w-4/5 w-full">
            <p className="text-slate-600 mb-2">
              Enter User{"'"}s Mobile Number{" "}
              <span className="text-red-500 text-1xl font-bold">*</span>
            </p>
            <PhoneInput
              className="text-center w-full"
              country="us"
              value={props.value}
              onChange={props.onChange}
              enableSearch={true}
              countryCodeEditable={false}
              autoFormat={false}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              disabled={props.disabled}
              dropdownClass="w-full"
              disableSearchIcon={true}
              inputStyle={{
                width: "100%",
              }}
              inputClass="w-full"
              prefix="+"
              defaultErrorMessage="Please enter a valid phone number"
              specialLabel="Please enter a valid phone number"
            />
            <Button
              isLoading={props.disabled}
              className="mt-4 bg-slate-800 w-full rounded-md  shadow-sm text-black"
              size="md"
              color={props.color}
              onClick={props.onClick}
            >
              <span className="flex flex-row gap-3 items-center justify-between">
                <img
                  src="https://ivalt.com/wp-content/themes/t466jHjHxHAGxHAGqd_ivalt/images/favicon.png"
                  width="25px"
                />
                <span className="text-white">{props.btnTitle}</span>
              </span>
            </Button>

            {props.disabled && (
              <div>
                <Timer minutes={props.minutes} seconds={props.seconds} />
              </div>
            )}
            <div className="text-slate-600 text-sm mt-2 my-1 text-center">
              {" "}
              OR
            </div>
            <Button
              className="mt-2 w-full rounded-md bg-blue-200 shadow-sm text-white"
              size="md"
              onClick={handleFacebookLogin}
            >
              <span className="flex items-center justify-between gap-4">
                <img
                  width="25px"
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="facebook"
                />
                <span className="text-slate-900">Login with Facebook</span>
              </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
