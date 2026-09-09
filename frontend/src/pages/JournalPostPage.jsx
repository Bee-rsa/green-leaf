// src/pages/JournalPostPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogBySlug } from "../redux/slices/blogSlice.js";

const JournalPostPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlog: blog, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-body text-xs tracking-widest uppercase text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-sand px-8 lg:px-16 pt-16 pb-14">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/journal")}
            className="font-body text-xs tracking-widest uppercase text-gray-400 hover:text-gray-600 transition-colors mb-8 block"
          >
            ← Back to Journal
          </button>
          <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-4">
            {blog.category}
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-gray-800 leading-tight mb-6">
            {blog.title}
          </h1>
          <div className="w-10 h-px bg-wood mb-6" />
          <p className="font-body text-xs text-gray-400">
            By {blog.author} · {blog.date} · {blog.readTime} min read
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 lg:px-0 py-14 space-y-8">

        {blog.excerpt && (
          <p className="font-subheading text-2xl italic text-gray-500 leading-relaxed border-l-2 border-wood pl-6">
            {blog.excerpt}
          </p>
        )}

        {blog.blocks.map((block) => (
          <div key={block.id}>
            {block.type === "heading" && (
              <h2 className="font-heading text-3xl text-gray-800 leading-snug">
                {block.content}
              </h2>
            )}
            {block.type === "paragraph" && (
              <div>
                {block.label && (
                  <p className="font-body text-xs tracking-widest uppercase text-gray-300 mb-3">
                    {block.label}
                  </p>
                )}
                <p className="font-body text-base text-gray-600 leading-relaxed">
                  {block.content}
                </p>
              </div>
            )}
            {block.type === "quote" && (
              <blockquote className="border-l-2 border-wood pl-6 py-2">
                <p className="font-subheading text-2xl italic text-gray-500 leading-relaxed">
                  {block.content}
                </p>
              </blockquote>
            )}
            {block.type === "takeaway" && (
              <div className="bg-sage/5 border border-sage/20 rounded-sm px-6 py-5">
                <p className="font-body text-xs tracking-widest uppercase text-sage mb-2">
                  Key Takeaway
                </p>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  {block.content}
                </p>
              </div>
            )}
            {block.type === "image" && block.imageUrl && (
              <div>
                <img
                  src={block.imageUrl}
                  alt={block.caption || ""}
                  className="w-full rounded-sm object-cover"
                />
                {block.caption && (
                  <p className="font-body text-xs italic text-gray-400 mt-2 text-center">
                    {block.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* References */}
        {blog.references && (
          <div className="pt-8 border-t border-gray-100">
            <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-4">
              References
            </p>
            {blog.references.split("\n").filter(Boolean).map((ref, i) => (
              <p key={i} className="font-body text-xs text-gray-400 mb-1">
                {ref.startsWith("http") ? (
                  <a href={ref} target="_blank" rel="noopener noreferrer" className="text-sage hover:underline">
                    {ref}
                  </a>
                ) : ref}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPostPage;