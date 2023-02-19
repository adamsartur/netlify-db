import { Trash } from "phosphor-react";
import { useEffect, useState } from "preact/hooks";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  published: boolean;
};

export function App() {
  const [loadPosts, setLoadPosts] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      if (!loadPosts) {
        return;
      }
      const allPosts = await fetch("/.netlify/functions/posts").then((res) =>
        res.json()
      );

      setPosts(allPosts);
      setLoadPosts(false);
    }
    load();
  }, [loadPosts]);

  async function handleRemove(postId: number) {
    await fetch("/.netlify/functions/removePost", {
      method: "POST",
      body: JSON.stringify({ postId }),
    });
    setLoadPosts(true);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    await fetch("/.netlify/functions/post", {
      method: "POST",
      body: JSON.stringify({ title, content, authorId: 2 }),
    });
    setTitle("");
    setContent("");
    setLoadPosts(true);
  }

  return (
    <>
      <h1>My posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <h3>
              {post.title}
              <a
                onClick={() => {
                  handleRemove(post.id);
                }}
              >
                <Trash />
              </a>
            </h3>
            <p>Created {new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <h2>Create post</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent((e.target as HTMLInputElement).value)}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
