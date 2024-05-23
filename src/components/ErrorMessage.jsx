import * as PropTypes from "prop-types";
ErrorMessage.propTypes = { errorMessage: PropTypes.string };

/**
 * Renders an error message component.
 *
 * @param {Object} props - The props object containing the errorMessage property.
 * @return {JSX.Element} - The JSX element representing the error message component.
 */
export function ErrorMessage(props) {
  return (
    <div className="text-center flex justify-center">
      {props.errorMessage && (
        <div>
          <p className="text-center my-4 mt-5 w-4/5 flex justify-center text-red-500"></p>
          <p>
            ❌ <span>{props?.errorMessage || "Something went wrong"}</span>
          </p>
        </div>
      )}
    </div>
  );
}
