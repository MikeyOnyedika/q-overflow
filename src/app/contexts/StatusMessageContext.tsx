
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { StatusMessage } from "../components/StatusMessage"


const StatusContext = createContext<any>(null)
export default function Provider({ children }) {
    const [statusMessages, setStatusMessages] = useState([])

    // remove last message every 2 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            if (statusMessages.length > 0) {
                setStatusMessages(prev => {
                    const copy = [...prev]
                    copy.pop()
                    return copy
                })
            }
        }, 2000)

        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    }, [statusMessages])

    function addStatusMessage({ message, type }) {
        const _id = Math.floor(Math.random() * 1000000000)
        setStatusMessages((prev) => {
            return [{ message, type, _id }, ...prev]
        })
    }

    return (
        <StatusContext.Provider value={{
            statusMessages, addStatusMessage
        }}>
            <div className="fixed  top-7  right-2 left-2  m-auto w-full max-w-[20rem] flex flex-col gap-1">
                {
                    statusMessages.map(sMessage => (
                        <StatusMessage message={sMessage.message} type={sMessage.type} key={sMessage._id} />
                    ))
                }
            </div>
            {children}
        </StatusContext.Provider>
    )

}

export function useStatusMessageContext() {
    return useContext(StatusContext)
}