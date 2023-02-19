import { X } from "phosphor-react";
import { useState } from "preact/hooks";

interface CreatePostProps {
  setLoadPosts: Function;
  setIsNewPostOpen: Function;
  setIsLoading: Function;
  isNewPostOpen: boolean;
  isLoading: boolean;
}

function CreatePost({
  setLoadPosts,
  setIsNewPostOpen,
  isNewPostOpen,
  isLoading,
  setIsLoading,
}: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    await fetch("/.netlify/functions/post", {
      method: "POST",
      body: JSON.stringify({ title, content, authorId: 2 }),
    });
    setTitle("");
    setContent("");
    setLoadPosts(true);
    setIsNewPostOpen(false);
  }
  return (
    <div
      className={
        isNewPostOpen ? "post-form-modal visible" : "post-form-modal hidden"
      }
    >
      <div className="post-form-modal">
        <a
          onClick={() => {
            setIsNewPostOpen(false);
          }}
          className="close-modal"
        >
          <X />
        </a>
        <h2>New Entry</h2>
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
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent((e.target as HTMLInputElement).value)}
          />
          <button
            className="post-form-modal-button"
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreatePost;
