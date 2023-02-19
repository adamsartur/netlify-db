import { Trash } from "phosphor-react";

interface PostProps {
  post: {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
  };
  setIsLoading: Function;
  setLoadPosts: Function;
}

function Post({ post, setIsLoading, setLoadPosts }: PostProps) {
  async function handleRemove(postId: number) {
    //setIsLoading(true);
    await fetch("/.netlify/functions/removePost", {
      method: "POST",
      body: JSON.stringify({ postId }),
    });
    setLoadPosts(true);
    //setIsLoading(false);
  }

  return (
    <li key={post.id}>
      <div className="post-header">
        <h3>
          {post.title}
          <a
            title="Remove entry"
            className="remove-post-button"
            onClick={() => {
              handleRemove(post.id);
            }}
          >
            <Trash />
          </a>
        </h3>
        <p>Created {new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <p>{post.content}</p>
    </li>
  );
}
export default Post;
