import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogBySlug } from "../redux/slices/blogSlice.js";
import { trackBlogView } from "../utils/analytics";

const JournalPostPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentBlog: blog, loading } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch, slug]);

  // ---------------------------------------------
  // ANALYTICS - TRACK JOURNAL/BLOG VIEW
  // ---------------------------------------------
  useEffect(() => {
    if (blog?._id || blog?.id) {
      trackBlogView({
        id: blog._id || blog.id,
        title: blog.title,
      });
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gray-400">
          Loading Journal
        </p>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-gray-800">
      {/* HEADER */}
      <header className="px-5 sm:px-8 lg:px-16 pt-10 sm:pt-14 lg:pt-20 pb-10">
        <div className="max-w-4xl mx-auto">

          {/* BACK */}
          <button
            onClick={() => navigate("/journal")}
            className="group inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-700 transition-colors mb-12"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Back to Journal
          </button>

          {/* CATEGORY */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-sage">
              {blog.category}
            </span>

            <span className="w-1 h-1 rounded-full bg-gray-300" />

            <span className="font-body text-[10px] tracking-[0.15em] uppercase text-gray-400">
              {blog.readTime} min read
            </span>
          </div>

          {/* TITLE */}
          <h1 className="font-heading text-[2.8rem] sm:text-5xl lg:text-6xl text-gray-800 leading-[1.02] max-w-4xl">
            {blog.title}
          </h1>

          {/* DIVIDER */}
          <div className="w-10 h-px bg-sage mt-8 mb-6" />

          {/* AUTHOR / DATE */}
          <p className="font-body text-xs text-gray-400">
            By {blog.author} · {blog.date}
          </p>
        </div>
      </header>

      {/* ARTICLE */}
      <main className="px-5 sm:px-8 pb-20 sm:pb-28 lg:pb-32">
        <article className="max-w-3xl mx-auto">

          {/* EXCERPT */}
          {blog.excerpt && (
            <div className="mb-12 sm:mb-16">
              <p className="font-heading text-xl sm:text-2xl italic text-gray-500 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* CONTENT */}
          <div className="space-y-10">
            {blog.blocks.map((block) => (
              <div key={block.id}>

                {/* HEADING */}
                {block.type === "heading" && (
                  <h2 className="font-heading text-2xl sm:text-3xl text-gray-800 leading-tight pt-5">
                    {block.content}
                  </h2>
                )}

                {/* PARAGRAPH */}
                {block.type === "paragraph" && (
                  <div>
                    {block.label && (
                      <p className="font-body text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-4">
                        {block.label}
                      </p>
                    )}

                    <p className="font-body text-[15px] sm:text-base text-gray-600 leading-[1.9] font-light">
                      {block.content}
                    </p>
                  </div>
                )}

                {/* QUOTE */}
                {block.type === "quote" && (
                  <blockquote className="my-12 pl-6 sm:pl-8 border-l border-sage">
                    <p className="font-heading text-xl sm:text-2xl italic text-gray-500 leading-relaxed">
                      {block.content}
                    </p>
                  </blockquote>
                )}

                {/* TAKEAWAY */}
                {block.type === "takeaway" && (
                  <div className="my-12 bg-[#EFEEE8] px-6 sm:px-8 py-7 sm:py-8">
                    <p className="font-body text-[10px] tracking-[0.22em] uppercase text-sage mb-3">
                      Key Takeaway
                    </p>

                    <p className="font-body text-sm sm:text-[15px] text-gray-600 leading-7 font-light">
                      {block.content}
                    </p>
                  </div>
                )}

                {/* IMAGE */}
                {block.type === "image" && block.imageUrl && (
                  <figure className="my-12 sm:my-16">
                    <div className="flex justify-center">
                      <img
                        src={block.imageUrl}
                        alt={block.caption || blog.title}
                        className="w-full max-w-2xl max-h-[420px] object-cover"
                      />
                    </div>

                    {block.caption && (
                      <figcaption className="font-body text-[10px] sm:text-xs italic text-gray-400 mt-3 text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>

          {/* REFERENCES */}
          {blog.references && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="font-body text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-5">
                References
              </p>

              <div className="space-y-2">
                {blog.references
                  .split("\n")
                  .filter(Boolean)
                  .map((ref, i) => (
                    <p
                      key={i}
                      className="font-body text-xs text-gray-400 leading-relaxed"
                    >
                      {ref.startsWith("http") ? (
                        <a
                          href={ref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage hover:text-gray-700 transition-colors break-all"
                        >
                          {ref}
                        </a>
                      ) : (
                        ref
                      )}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {/* BACK TO JOURNAL */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate("/journal")}
              className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-gray-700 transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Journal
            </button>
          </div>

        </article>
      </main>
    </div>
  );
};

export default JournalPostPage;