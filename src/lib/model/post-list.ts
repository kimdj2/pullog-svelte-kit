export type PostList = {
  posts: Post[]
  pageInfo: PageInfo
}

export type Post = {
	id: number
	title: string
	contents: string
	contents_html: string
	description: string
  image_path: string
  created_at: string
  tag_list: string[]
  view: number
};

export type PageInfo = {
  count: number
  current: number
  limit_value: number
  next: number
  pages: number
  previous: number
}

