import Link from "next/link"
import { useRouter } from "next/navigation"

export const Post = ({ post, onEditAction }) => {
    const router = useRouter()
    function openPost(){
        router.push(`posts/${post._id}`)
    }
    return (
        <li role="button" className="flex">
            <button onClick={() => openPost()}   className="flex w-full gap-3 bg-fuchsia-50 rounded-md border-w border-2 border-fuchsia-100 p-2 hover:bg-fuchsia-100 hover:border-fuchsia-300 transition duration-200">
                <div className="flex flex-col gap-3 w-full items-start">
                    <h2 className="font-medium text-fuchsia-950 text-3xl">{post.title}</h2>
                    <p className="text-fuchsia-950 line-clamp-1">{post.description}</p>
                </div>
                <button onClick={(e) => onEditAction(e)}  type="button" className="whitespace-nowrap w-fit h-fit text-sm bg-fuchsia-300 rounded-full px-4 py-2 text-fuchsia-800 shadow-md">Edit</button>
                {/* <div className="flex gap-1 items-center text-sm">
                    <div className="w-5 border-2 p-[3px] rounded-md bg-fuchsia-800 ">
                        <svg className="fill-fuchsia-50 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                        </svg>
                    </div>
                    <span>11</span>
                </div> */}
            </button>
        </li>
    )

}