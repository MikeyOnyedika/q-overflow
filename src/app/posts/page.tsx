"use client"
import { Searchbar } from "../components/Searchbar";
import { Post } from "../components/Post"
import { usePostContext } from "../contexts/PostContext";
import { ChangeEvent, useEffect, useState } from "react";
import { PostForm } from "../components/PostForm";
import { useCompStateContext } from "../contexts/ComponentStateContext";
import { SearchStackoverflow } from "../components/SearchStackOverflow";

const initialFormState = {
  _id: "", // TODO: clean this up later. initalFormState should not have _id
  title: "",
  description: "",
  answer: "",
  links: []
}

export default function Posts() {
  const { posts, addPost } = usePostContext()
  const { showPostForm, openPostForm, showSOSearch, closePostForm } = useCompStateContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState(initialFormState)



  // useEffect(() => {
  //   filterPosts(searchTerm)
  // }, [searchTerm])


  // function filterPosts(){
  // }



  function handleOnChange(update) {
    setFormData(prev => ({ ...prev, ...update }))
  }

  function prepopulatePostForm(e: ChangeEvent<HTMLButtonElement>, post) {
    e.stopPropagation()

    setFormData({
      _id: post._id,
      title: post.title,
      description: post.description,
      answer: post.answer,
      links: post.links
    })

    openPostForm()
  }





  function clearFormData() {
    setFormData(initialFormState)
  }

  return (
    <section className="p-3 flex flex-col gap-3">
      {
        showPostForm === true ? (
          <PostForm formData={formData} handleOnChange={handleOnChange} clearFormData={clearFormData} closePostForm={() => {
            clearFormData()
            closePostForm()
          }} />
        ) : (
            <Searchbar  handleSetValue={(e) => setSearchTerm(e.target.value)} value={searchTerm} handleBtnAction={() => openPostForm()} actionBtnText={"Create Post"} />
          )
      }
      <ul className="flex flex-col gap-3 p-2">
        {
          posts ? (posts.length > 0 ? posts.map(post => ( 
            <Post key={post._id} post={post} onEditAction={(e) => prepopulatePostForm(e, post)} />)
          ):  (
              <p className="text-gray-400 text-3xl text-center">You have no posts yet. Create one already</p>
            )
          ): (
              <p className="text-gray-400 text-3xl text-center">Loading...</p>
            )
        }
      </ul>

      {
        showSOSearch && (
          <SearchStackoverflow />
        )
      }
    </section>
  )
}
