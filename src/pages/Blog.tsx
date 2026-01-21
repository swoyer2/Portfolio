import React from "react";
import { Link } from "react-router-dom";

type BlogPost = {
  title: string;
  slug: string;
  date: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "This site",
    slug: "this-site",
    date: "Jan 21, 2026",
  },
];

const Blog: React.FC = () => {
  return (
    <>
      <style>
        {`
          .blog-row {
            transition: border-color 0.2s ease;
          }

          .blog-row .blog-date {
            transition: color 0.2s ease;
          }

          .blog-row:hover {
            border-color: var(--bs-light) !important;
          }

          .blog-row:hover .blog-date {
            color: var(--bs-light) !important;
          }

          .blog-row:hover .blog-title {
            color: var(--bs-primary) !important;
          }
        `}
      </style>

      <main className="container mt-5 pt-5 w-50">
        <div className="d-flex flex-column gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="text-decoration-none text-light w-100"
            >
              <div className="blog-row d-flex justify-content-between align-items-center w-100 border-bottom border-secondary pb-2">
                <span className="blog-title fs-4">{post.title}</span>
                <span className="blog-date text-secondary fs-4">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Blog;

