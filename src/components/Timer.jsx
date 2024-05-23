export function Timer({minutes, seconds}) {
    let textColor = minutes === 0 ? "text-red-500 " : "text-slate-900";
    return (
        <div className="flex justify-end flex-col items-end mt-4">
            <p className={"text-sm"}>Request Expire in</p>
            <div className="flex items-center justify-end mt-1">
                <div className="px-2 py-2 flex justify-center items-center bg-slate-100 rounded-md text-center">
                    <span className="text-sm font-semibold">{minutes}</span>
                    <span className="text-sm">&nbsp;min</span>
                </div>
                <div
                    className={`${"bg-slate-100 px-2 py-2 flex justify-center items-center rounded-md text-center ml-1"}`}
                >
                      <span className={`${textColor + "text-sm font-semibold"}`}>
                        {seconds}
                      </span>
                    <span className="text-sm">&nbsp;sec</span>
                </div>
            </div>
        </div>
    );
}