import {Divider} from "@nextui-org/react";

/**
 * Renders an info card component.
 *
 * @param {Object} info - The information object.
 * @param {Object} user - The user object.
 * @return {JSX.Element} The rendered info card component.
 */

export default function InfoCard({info, user}) {
    return (
        <div className={"mx-2"}>
            <Divider className="my-2.5"/>
            <div className="flex items-center justify-between text-small">
                <p className="text-left">Name</p>
                <p className="text-right">{info?.Name}</p>
            </div>

            <Divider className="my-2.5"/>
            <div className="flex items-center justify-between text-small">
                <p className="text-left">Date</p>
                <p className="text-right">{info?.Date}</p>
            </div>

            <Divider className="my-2.5"/>
            <div className="flex items-center justify-between text-small">
                <p className="text-left">Type</p>
                <p className="text-right">{info?.Type}</p>
            </div>

            <Divider className="my-2.5"/>
            <div className="flex items-center justify-between text-small">
                <p className="text-left">Organization</p>
                <p className="text-right">{info?.Organization}</p>
            </div>

            <Divider className="my-2.5"/>
            <div className="flex items-center justify-between text-small">
                <p className="text-left">Serial Number</p>
                <p className="text-right">{info['Serial Number']}</p>
            </div>
            {user && (
                <>
                    <Divider className="my-2.5"/>
                    <div className="flex items-center justify-between text-small">
                        <p className="text-left">Verified At 📌</p>
                        <p className="text-right h-auto">{user?.address}</p>
                    </div>
                </>
            )}
            <Divider className="my-2.5"/>
            <div className="flex h-15 items-center justify-between text-small">
                <a href="James-Demo_financial-planner-certificate.pdf" className="flex text-left">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwuD0SIaY4WF0wh41EdeZSTN-xdzknP-m2LT4YmVDWA&s"
                        alt=""
                        width={40}
                    />
                    <div>
                        <p>James-Demo_financial-planner-certificate.pdf</p>
                        <p>100kb</p>
                    </div>
                </a>
                <a className="text-right" href="James-Demo_financial-planner-certificate.pdf">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlTJRWJF0TxP6a5IlUOcXJPlv9reOaQM5C_w&usqp=CAU"
                        alt=""
                        width={20}
                        className="mr-2"
                    />
                </a>
            </div>

        </div>
    );
}
