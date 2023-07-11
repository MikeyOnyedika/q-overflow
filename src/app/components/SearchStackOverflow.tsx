import Image from "next/image"
import xmark from "../assets/xmark.svg"
import { Searchbar } from "./Searchbar"
import { useCompStateContext } from "../contexts/ComponentStateContext"
import { SOSearchItem } from "./SOSearchItem"

export const SearchStackoverflow = function () {
    const { closeSOSearch } = useCompStateContext()
    function handleSearchStackOverflow() {

    }

    return (
        <section className=" fixed inset-0 bg-fuchsia-50 bg-opacity-70 p-5 flex  justify-center">
            <div className="max-w-[35rem] w-full flex flex-col gap-5">
                <button type="button" className="self-end w-fit" onClick={closeSOSearch}>
                    <Image src={xmark} alt="x mark" className="w-6" />
                </button>
                <div className="w-full flex flex-col ">
                    <Searchbar handleBtnAction={() => handleSearchStackOverflow()} actionBtnText="Search" />

                </div>
                <div>

                    <ul className="flex flex-col gap-2">
                        <SOSearchItem soPost={{ url: "htts://findvuln" }} />

                    </ul>

                </div>
            </div>

        </section>
    )
}