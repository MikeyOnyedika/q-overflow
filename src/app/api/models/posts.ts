import { ObjectId } from "mongodb"
import { mongoClient } from "../config/dbconfig"


export async function createPost(post: any) {
    const client = mongoClient
    const conn = await client.connect()
    try {
        const collection = conn.db("q-overflow").collection("posts")
        let query = {}
        const dbResponse = await collection.insertOne(post)

        // get inserted document
        query = { _id: dbResponse.insertedId }
        const newPost = await collection.findOne(query)

        return newPost
    } catch (err) {
        console.log(err)
        return err.toString()
    }
}

export async function updatePost(post) {
    const client = mongoClient
    const conn = await client.connect()
    try {
        const collection = conn.db("q-overflow").collection("posts")
        let query = { _id: new ObjectId(post._id) }
        const update = await collection.findOneAndUpdate(
            query,
            {
                $set:
                    { title: post.title, description: post.description, answer: post.answer, links: post.links }
            },
            {
                returnDocument: "after"
            })

        if (update.lastErrorObject?.updatedExising === false) {
            throw new Error("This post does not exist in the database")
        }

        return update.value
    } catch (err) {
        console.log(err)
        return err.toString()
    }
}

export async function deletePost(id){
     const conn = await mongoClient.connect()
    try {
        const collection = conn.db("q-overflow").collection("posts")
        const query = { _id: new ObjectId(id) }
        const deletedP = await collection.findOneAndDelete(query)
        return deletedP.value
    } catch (err) {
        console.log(err)
        return err.tostring()
    }
}

export async function getPosts() {
    const conn = await mongoClient.connect()
    try {
        const collection = conn.db("q-overflow").collection("posts")
        const query = {}
        const cursor = collection.find(query)
        let results;

        if (await collection.countDocuments(query) === 0) {
            results = []
        } else {
            results = []
            for await (const doc of cursor) {
                results.push(doc)
            }
        }
        return results
    } catch (err) {
        console.log(err)
        return err.tostring()
    }
}