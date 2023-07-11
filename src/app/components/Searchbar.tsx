import search from "../assets/search.svg"
import Image from "next/image"
export const Searchbar = ({ handleBtnAction, actionBtnText }) => {
    return (
        <div className="sticky top-2 w-full flex items-center gap-3 px-4 py-2 border-2 border-fuchsia-200 bg-fuchsia-100 rounded-2xl ">
            <div className="flex justify-center items-center">
                <Image src={search} alt="search icon"  />
            </div>
            <input placeholder="Search or Create post" className="text-lg text-gray-800 outline-none w-full bg-transparent " />
            <button className="whitespace-nowrap bg-fuchsia-600 rounded-full px-4 py-2 text-fuchsia-50 shadow-md" onClick={() => handleBtnAction()}>{ actionBtnText }</button>
        </div>
    )

}