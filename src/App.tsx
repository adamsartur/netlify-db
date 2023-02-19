import { Trash, Spinner, Plus } from "phosphor-react";
import { useEffect, useState } from "preact/hooks";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import QRModal from "./components/QRModal";
import QRReaderButton from "./components/QRReaderButton";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isQRVisible, setIsQRVisible] = useState(false);

  useEffect(() => {
    async function load() {
      if (!loadPosts) {
        return;
      }
      setIsLoading(true);
      const allPosts = await fetch("/.netlify/functions/posts").then((res) =>
        res.json()
      );
      console.log("posts retrieved");
      setPosts(allPosts);
      setLoadPosts(false);
    }
    setIsLoading(false);
    load();
  }, [loadPosts]);

  return (
    <div className="page-wrapper">
      {isLoading && (
        <div className="overlay-loader">
          <span>
            <Spinner size={32} />
          </span>
        </div>
      )}
      <div className="posts-wrapper">
        <h1>
          <QRModal isQRVisible={isQRVisible} setIsQRVisible={setIsQRVisible} />
          <QRReaderButton
            isQRVisible={isQRVisible}
            setIsQRVisible={setIsQRVisible}
          />
          Post list{" "}
          <a
            title="Create a new entry"
            className="create-post-button"
            onClick={() => {
              setIsNewPostOpen(true);
            }}
            disabled={isLoading}
          >
            <Plus size={24} />
          </a>
        </h1>
        <ul>
          {posts.map((post: Post) => (
            <Post
              post={post}
              setLoadPosts={setLoadPosts}
              setIsLoading={setIsLoading}
            />
          ))}
        </ul>
      </div>
      <CreatePost
        setLoadPosts={setLoadPosts}
        setIsNewPostOpen={setIsNewPostOpen}
        isNewPostOpen={isNewPostOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
