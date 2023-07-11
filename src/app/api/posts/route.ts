import { NextResponse } from "next/server";
import { createPost, getPosts } from "../models/posts";

export async function GET(req: Request) {
    const posts = await getPosts()
    if (typeof posts === "string") {
        const message = posts
        return NextResponse.json({ message }, { status: 500 })
    } else {
        return NextResponse.json(posts)
    }
}

export async function POST(req: Request) {
    const body = await req.json()
    console.log("body: ", body)
    if (!body.title || !body.description || !body.answer) {
        return NextResponse.json({ message: "Some fields are missing" }, { status: 400 })
    }

    if (body.link) {
        if (Array.isArray(body.link) === false) {
            return NextResponse.json({ message: "The links are not valid" }, { status: 400 })
        }
    }

    const newPost = await createPost({ title: body.title, description: body.description, answer: body.answer, links: body.links || [] })
    if (typeof newPost === "string") {
        const message = newPost
        return NextResponse.json({ message }, { status: 500 })
    } else {
        return NextResponse.json(newPost)
    }
}