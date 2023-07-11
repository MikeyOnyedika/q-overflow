import { NextResponse } from "next/server"
import { deletePost, updatePost } from "../../models/posts"


export async function PUT(req: Request, { params }) {
    const body = await req.json()
    const { id } = params
    console.log(id)

    console.log("body: ", body)
    if (!body.title || !body.description || !body.answer) {
        return NextResponse.json({ message: "Some fields are missing" }, { status: 400 })
    }

    if (body.link) {
        if (Array.isArray(body.link) === false) {
            return NextResponse.json({ message: "The links are not valid" }, { status: 400 })
        }
    }

    const update = await updatePost({ _id: id, title: body.title, description: body.description, answer: body.answer, links: body.links || [] })
    if (typeof update === "string") {
        const message = update
        return NextResponse.json({ message }, { status: 500 })
    } else {
        console.log(update)
        return NextResponse.json(update)
    }
}

export async function DELETE(req: Request, { params }) {
    const { id } = params

    const deleted = await deletePost(id)
    if (typeof deleted === "string") {
        const message = deleted
        return NextResponse.json({ message }, { status: 500 })
    } else {
        return NextResponse.json(deleted)
    }
}