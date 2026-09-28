export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  status: "published" | "delete";
  createdAt: string;
  updatedAt: string;
};

export type GetPostsResponse = {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
};
export type GetPostResponse = {
  success: boolean;
  message: string;
  data: {
    post: Post;
  };
};

