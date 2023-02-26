import { Plus } from "phosphor-react";
import { useEffect, useState } from "preact/hooks";
import CreatePost from "./CreatePost";
import Post from "./Post";
import QRModal from "./QRModal";
import QRReaderButton from "./QRReaderButton";

interface PostProps {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

interface PostsProps {
  isQRVisible: boolean;
  setIsQRVisible: Function;
  setIsNewPostOpen: Function;
  isLoading: boolean;
  setIsLoading: Function;
  isNewPostOpen: boolean;
}

function Posts({
  isQRVisible,
  setIsQRVisible,
  setIsNewPostOpen,
  isLoading,
  setIsLoading,
  isNewPostOpen,
}: PostsProps) {
  const [loadPosts, setLoadPosts] = useState(true);
  const [posts, setPosts] = useState<PostProps[]>([]);

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
    <div className="posts-wrapper">
      {" "}
      <div>
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
          {posts.map((post) => (
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
export default Posts;
