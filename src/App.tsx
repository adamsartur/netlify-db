import { Spinner } from "phosphor-react";
import { useState } from "preact/hooks";
import Posts from "./components/Posts";

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isQRVisible, setIsQRVisible] = useState(false);

  return (
    <div className="page-wrapper">
      {isLoading && (
        <div className="overlay-loader">
          <span>
            <Spinner size={32} />
          </span>
        </div>
      )}
      <Posts
        isLoading={isLoading}
        isNewPostOpen={isNewPostOpen}
        isQRVisible={isQRVisible}
        setIsLoading={setIsLoading}
        setIsNewPostOpen={setIsNewPostOpen}
        setIsQRVisible={setIsQRVisible}
      />
    </div>
  );
}
