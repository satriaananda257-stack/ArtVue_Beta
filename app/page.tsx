"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
import { Post, GetPostsResponse } from "@/types/posts"
import { Button } from "@/components/ui/button"

const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ5dWtpdGVydUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc5MDU2MDUxNywiZXhwIjoxNzkxMTY1MzE3fQ.YlbsXWJS0fiNPRou4zqRymZzimBZgI6PKdH0n7Af8AA"

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token") || TEMP_TOKEN
        const res = await api.get<GetPostsResponse>("/posts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log("response:", res.data)
        setPosts(res.data.data.posts)
      } catch (error) {
        console.error("gagal fetch:", error)
        setError("Gagal memuat posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <body className="flex flex-col min-h-screen min-w-screen pb-6 gap-7">
        <h1 className="text-2xl font-bold">Posts</h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
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
                className="w-full rounded-lg object-cover"
              />
            )}
            <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>
            <Link href={`/posts/${post.id}`}>
              <Button>Lihat Postingan</Button>
            </Link>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground">Belum ada post.</p>
        )}
      </div>
    </body>
  )
}
