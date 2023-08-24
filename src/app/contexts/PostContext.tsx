"use client"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useStatusMessageContext } from "./StatusMessageContext"
import { StatusType } from "../components/StatusMessage"

const api = axios.create({
    baseURL: "/api"
})

const PostContext = createContext<any>(null)
export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    const { addStatusMessage } = useStatusMessageContext()

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const { data, status } = await api.get("/posts")
        if (status === 200) {
            setPosts(data)
        }
    }

    async function addPost(newPost) {
        const { data, status } = await api.post("/posts", { title: newPost.title, description: newPost.description, answer: newPost.answer, links: newPost.links })
        if (status === 200) {
            addStatusMessage({ type: StatusType.SUCCESS, message: "Post Created!" })
            setPosts(prev => {
                const update = [{ ...data }, ...prev]
                return update
            })
            return true
        } else {
            addStatusMessage({ type: StatusType.ERROR, message: "Post not created, try again!" })
            return false
        }

    }

    async function updatePost(post) {
        const { data, status } = await api.put(`/posts/${post._id}`, { title: post.title, description: post.description, answer: post.answer, links: post.links })
        if (status === 200) {
            addStatusMessage({ type: StatusType.SUCCESS, message: "Post has been updated!" })
            setPosts(prev => {
                return prev.map(
                    post => {
                        // replace the updated one with it's updated version returned
                        if (post._id === data._id) {
                            return data
                        }
                        return post
                    }
                )
            })
            return true
        } else {
            addStatusMessage({ type: StatusType.ERROR, message: "Post not created, try again!" })
            return false
        }
    }

    async function deletePost(id) {
        const { data, status } = await api.delete(`/posts/${id}`)
        if (status === 200) {
            addStatusMessage({ type: StatusType.SUCCESS, message: "Post successfully deleted!" })
            setPosts(prev => {
                return prev.filter(
                    post => {
                        if (post._id !== id) {
                            return post
                        }
                    }
                )
            })
            return true
        } else {
            addStatusMessage({ type: StatusType.ERROR, message: "Post not deleted, try again!" })
            return false
        }

    }

    return (
        <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
            {children}
        </PostContext.Provider>
    )

}

export function usePostContext() {
    return useContext(PostContext)
}