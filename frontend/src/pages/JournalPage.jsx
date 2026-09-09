// src/pages/JournalPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedBlogs } from "../redux/slices/blogSlice.js";
import { useNavigate } from "react-router-dom";

const categoryColors = {
  Education: "text-sage border-sage/30 bg-sage/5",
  Lifestyle: "text-wood border-wood/30 bg-wood/5",
  Wellness: "text-gray-500 border-gray-200 bg-gray-50",
};

const JournalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { published, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchPublishedBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-body text-xs tracking-widest uppercase text-gray-300">
          Loading...
        </p>
      </div>
    );
  }

  const featured = published.find((p) => p.featured) || published[0];
  const rest = published.filter((p) => p._id !== featured?._id);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Header */}
      <div className="bg-sage px-8 lg:px-16 pt-16 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
            Green Leaf · Salt Rock
          </p>
          <h1 className="font-heading text-6xl md:text-7xl text-gray-800 leading-none mb-6">
            Journal
          </h1>
          <div className="w-10 h-px bg-wood mb-6" />
          <p className="font-body text-sm text-gray-500 max-w-md leading-relaxed font-light">
            Guides, stories, and honest conversations about cannabis, wellness,
            and living well.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 lg:px-16 py-16">

        {published.length === 0 ? (
          <p className="font-body text-sm text-gray-300 text-center py-20">
            No posts published yet.
          </p>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div
                onClick={() => navigate(`/journal/${featured.slug}`)}
                className="mb-10 border-b border-gray-100 pb-10 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`font-body text-xs px-2.5 py-1 border rounded-full ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                  <span className="font-body text-xs text-gray-300">
                    {featured.date} · {featured.readTime} min read
                  </span>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-gray-800 leading-tight mb-4 group-hover:text-sage transition-colors duration-300 max-w-2xl">
                  {featured.title}
                </h2>
                <p className="font-body text-sm text-gray-400 leading-relaxed max-w-xl font-light mb-5">
                  {featured.excerpt}
                </p>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-sage border-b border-sage/30 pb-0.5">
                  Read more
                </span>
              </div>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {rest.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/journal/${post.slug}`)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-body text-xs px-2.5 py-1 border rounded-full ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="font-body text-xs text-gray-300">
                        {post.date}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl text-gray-800 leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-gray-400 leading-relaxed font-light flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-6">
                      <span className="font-body text-xs tracking-[0.15em] uppercase text-gray-300 group-hover:text-sage transition-colors duration-300">
                        Read more
                      </span>
                      <div className="mt-2 h-px bg-gray-100">
                        <div className="h-px bg-sage w-0 group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;