import type { Post } from "./post-list"

export type PostDetail = {
  beforePost: Post
  nextPost: Post
  post: Post
  relatedPosts: Post[]
}
