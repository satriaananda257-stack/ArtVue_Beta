"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
import { Post, GetPostsResponse } from "@/types/posts"

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
          headers: { Authorization: `Bearer ${token}` }
        })
        setPosts(res.data.data.posts)
      } catch (err) {
        console.error("gagal fetch:", err)
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
    <div className="p-4 md:p-6">
      {/* masonry grid: 2 col mobile, 3 col tablet, 4 col desktop */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-5 space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="break-inside-avoid block group relative overflow-hidden rounded-xl cursor-pointer"
          >
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                <span className="text-sm text-neutral-400">No Image</span>
              </div>
            )}
            {/* overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col justify-end p-3">
              <p className="text-white text-sm font-semibold line-clamp-2">{post.title}</p>
              <p className="text-white/70 text-xs mt-1">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">Belum ada post.</p>
      )}
    </div>
  )
}
