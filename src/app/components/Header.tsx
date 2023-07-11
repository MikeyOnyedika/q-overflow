"use client"
import Image from "next/image"
import stackOverflow from "../assets/stackoverflow.svg"
import { useCompStateContext } from "../contexts/ComponentStateContext"

export default function Header() {
    const {openSOSearch} = useCompStateContext()

    return (
        <header className='px-3 py-2 shadow-md flex gap-2 justify-between'>
            <p className='flex text-base text-fuchsia-900'>
                <p className="text-fuchsia-500 text-3xl">Q</p>
                <p>Overflow</p>
            </p>
            <button onClick={openSOSearch} className="flex self-center justify-center items-center gap-1 rounded-full px-3 py-2 border-2 border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900 hover:shadow-lg">
                <span>
                    Search
                </span>
                <span className="w-4 h-4">
                    <Image src={stackOverflow} alt="stackoverflow icon" />
                </span>
            </button>
        </header>
    )
}