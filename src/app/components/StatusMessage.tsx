export const StatusType = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}

type IStatusMessage = {
    type: "SUCCESS" | "ERROR",
    message: string
}

export const StatusMessage = ({ type, message }: IStatusMessage) => {
    return (
        <div className={`rounded-md shadow-md  bg-white flex gap-1 w-full  `}>
            <div className={`w-[2px] h-full ${type === StatusType.SUCCESS ? "bg-green-400" : "bg-red-200"} px-4 py-2`}></div>
            <p className={`w-full text-center px-1 py-2 h-full ${type === StatusType.SUCCESS ? "text-green-700" : "text-red-700"}`}>{message}</p>
        </div>

    )
}