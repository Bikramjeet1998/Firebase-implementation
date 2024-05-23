import {Spinner} from "@nextui-org/react";
import * as PropTypes from "prop-types";
Loader.propTypes = {loading: PropTypes.bool};

/**
 * Renders a Loader component.
 *
 * @param {boolean} loading - Determines if the Loader is in a loading state.
 * @return {ReactNode} - The JSX representation of the Loader component.
 */
export function Loader({loading = false}) {
    return <>
        {loading && (
            <div className="flex justify-center h-3/5 my-5">
                <Spinner size="lg"/>
            </div>
        )}
    </>;
}