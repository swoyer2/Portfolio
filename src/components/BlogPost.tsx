import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const posts = import.meta.glob("../blogs/*.md", { as: "raw" });

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    const path = `../blogs/${slug}.md`;

    if (posts[path]) {
      posts[path]().then(setContent);
    } else {
      setContent("# Post not found");
    }
  }, [slug]);

  return (
    <main className="container mt-5 pt-5 w-50 text-light">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </main>
  );
};

export default BlogPost;

