
"use client"
import { createContext, useContext, useState } from "react"


const CompStateContext = createContext<any>(null)
export default function Provider({ children }) {
    const [showPostForm, setShowPostForm] = useState(false)
    const [showSOSearch, setSOSearch] = useState(false)

    function closePostForm() {
        setShowPostForm(false)
    }

    function openPostForm() {
        setShowPostForm(true)
    }

    return (
        <CompStateContext.Provider value={{
            closePostForm,
            showPostForm,
            openPostForm,
            openSOSearch: () => setSOSearch(true),
            showSOSearch,
            closeSOSearch: () => setSOSearch(false)
        }}>
            {children}
        </CompStateContext.Provider>
    )

}

export function useCompStateContext() {
    return useContext(CompStateContext)
}