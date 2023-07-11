"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Posts() {
  const router = useRouter()
  useEffect(() => router.push("/posts"), [])
  return (
    <></>
  )
}