"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { Post, GetPostResponse } from "@/types/posts"


export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ6eWV4cnl1a0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc5MDU2MTM0NiwiZXhwIjoxNzkxMTY2MTQ2fQ.8oedJTIEAKU7w2c9H4z2iaFdhqwS0mscsFdw471NlGk"
        const res = await api.get<GetPostResponse>(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log("response:", res.data)
        setPost(res.data.data.post)
      } catch (err) {
        console.error("gagal fetch:", err)
        setError("Gagal memuat post")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>
  if (!post) return <div className="p-6">Post tidak ditemukan</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {new Date(post.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-lg mb-4 object-cover"
        />
      )}
      <p className="leading-relaxed">{post.content}</p>
    </div>
  )
}
