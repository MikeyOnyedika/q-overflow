import Image from "next/image"
import trash from "../assets/trash.svg"
import linkchain from "../assets/linkchain.svg"
import { useEffect, useState } from "react"
import { usePostContext } from "../contexts/PostContext"
import ObjectId from "bson-objectid"


const initialLinkData = {
    title: "",
    url: ""
}


export function PostForm({ formData, handleOnChange, closePostForm, clearFormData }) {
    const [isEdit, setIsEdit] = useState(false)
    const { addPost, updatePost } = usePostContext()
    const [newLink, setNewLink] = useState(initialLinkData)

    useEffect(() => {
        setIsEdit(formData.title !== "")
    }, [])

    function adjustHeight(el) {
        el.style.height = "1px"
        el.style.height = (25 + el.scrollHeight) + "px"
    }

    function addLink() {
        if (newLink.title !== "" && newLink.url !== "") {
            handleOnChange({ links: [...formData.links, { _id: ObjectId().str, title: newLink.title, url: newLink.url }] })
            setNewLink(initialLinkData)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        const title = formData.title
        const description = formData.description
        const answer = formData.answer
        const links = formData.links

        // create a post if no essential fields are empty and the links is an array. It can be an empty array though
        if ((title !== "" || description !== "" || answer !== "") && Array.isArray(links)) {
            if (isEdit === true) {
                const isUpdated = await updatePost({ _id: formData._id, title, description, answer, links })
            } else {
                const isAdded = await addPost({ title, description, answer, links })
                if (isAdded) {
                    //clear forminputs
                    clearFormData()
                }
            }
        }
    }

    function updateNewLink(update) {
        setNewLink(
            prev => {
                return { ...prev, ...update }
            }
        )
    }

    return (
        <div className="w-full flex items-start gap-3 px-4 py-2 border-2 border-fuchsia-200 bg-fuchsia-100 rounded-2xl ">
            <button className="h-fit w-fit" onClick={() => closePostForm()}>
                <svg className="w-5 fill-fuchsia-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </button>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 w-full">
                <input placeholder="Title" className="text-2xl text-gray-800 outline-none w-full bg-transparent" value={formData.title} onChange={(e) => handleOnChange({ title: e.target.value })} />
                <textarea onKeyUp={(e) => adjustHeight(e.target)} placeholder="Describe the problem" className="text-base resize-none h-fit text-gray-800 outline-none w-full bg-transparent" value={formData.description} onChange={(e) => handleOnChange({ description: e.target.value })} ></textarea>
                <textarea onKeyUp={(e) => adjustHeight(e.target)} placeholder="Describe the solution" className="text-base resize-none text-gray-800 outline-none w-full bg-transparent " value={formData.answer} onChange={(e) => handleOnChange({ answer: e.target.value })} />
                <div className="flex flex-col gap-1">
                    <ul className="w-full">
                        {
                            formData.links && (
                                formData.links.map(link => (
                                    <li className="flex items-center gap-5 w-full justify-between max-w-[30rem]" key={link._id}>
                                        <a href={link.url} className="hover:underline flex items-center gap-2">
                                            <p className="line-clamp-1">{link.title}</p>
                                            <div>
                                                <Image src={linkchain} alt="link chain icon" className="w-5" />
                                            </div>
                                        </a>
                                        <div>
                                            <Image src={trash} alt="trash icon" className="w-5" />
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    <div className="w-fit flex items-center gap-3 border-2 border-fuchsia-200 bg-fuchsia-100 rounded-full ">
                        <input placeholder="title" className="text-sm text-gray-800 outline-none w-full bg-transparent px-2 py-1 " value={newLink.title} onChange={(e) => updateNewLink({ title: e.target.value })} />
                        <input placeholder="https://..." className="text-sm text-gray-800 outline-none w-full bg-transparent px-2 py-1 " value={newLink.url} onChange={(e) => updateNewLink({ url: e.target.value })} />
                        <button onClick={() => addLink()} type="button" className="whitespace-nowrap w-fit self-end text-fuchsia-600  rounded-full px-4 py-2 hover:text-fuchsia-50 hover:bg-fuchsia-400 duration-100  text-sm">Add link</button>
                    </div>
                </div>

                <div className="w-full h-[2px] rounded-full bg-fuchsia-300"></div>
                <button className="whitespace-nowrap w-fit self-end bg-fuchsia-600 rounded-full px-4 py-2 text-fuchsia-50 shadow-md">{isEdit ? "Update" : "Create"} Post</button>
            </form>
        </div>

    )
}