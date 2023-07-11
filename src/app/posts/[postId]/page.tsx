"use client"
import { usePostContext } from "@/app/contexts/PostContext"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
export default function Post() {
    const router = useRouter()
    const { postId } = useParams()
    const { posts, deletePost } = usePostContext()
    const [post, setPost] = useState()

    useEffect(() => {
        const post = posts.find(p => p._id === postId)
        setPost(post)
    }, [posts])

    async function handleDelete() {
        const isDeleted = await deletePost(postId)
        if (isDeleted === true){
            router.back()
        }
    }

    if (!post) {
        return (
            <></>
        )
    } else {
        return (
            <section className="p-3 flex flex-col gap-5">
                <div className="flex gap-5 items-center justify-between">
                    <Link href={"/posts"} className="flex justify-stretch items-stretch w-fit rounded-full bg-fuchsia-50 border-fuchsia-100 border-2">
                        <svg className="w-8 h-8 fill-fuchsia-700  p-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Link>

                </div>

                <div className="px-3 flex flex-col gap-14 w-full">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-lg">Question</h3>
                        <h2 className="text-4xl break-all">{post?.title}</h2>
                        <p className="break-all">{post.description}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Answer</h3>
                        <p className="break-all whitespace-pre">{post.answer}</p>
                    </div>
                    {
                        post.links && post.links?.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg">Helpful Links</h3>
                                <ul className="mt-3 flex flex-col gap-3">
                                    {
                                        post.links.map(link => (
                                            <li className="w-fit text-gray-800" key={link._id}>
                                                <a href={link.url} className="flex gap-2 items-center bg-fuchsia-50  border-2 px-2 py-1 rounded-md border-fuchsia-100 hover:border-fuchsia-200 outline-none duration-300">
                                                    <p className="line-clamp-1">
                                                        {link.title}
                                                    </p>
                                                    <div>
                                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>


                <button onClick={handleDelete} type="button" className="whitespace-nowrap bg-red-50 rounded-full px-4 py-2 text-red-500 border-2 border-red-200 hover:border-red-400 shadow-md w-fit duration-200">Delete</button>

            </section>

        )
    }
}