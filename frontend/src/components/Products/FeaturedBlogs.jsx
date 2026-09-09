// src/components/Products/FeaturedBlogs.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPublishedBlogs } from "../../redux/slices/blogsSlice.js";

const categoryColors = {
  Education: "text-sage border-sage/30 bg-sage/5",
  Lifestyle: "text-wood border-wood/30 bg-wood/5",
  Wellness: "text-gray-500 border-gray-200 bg-gray-50",
};

const getPostImage = (post) => {
  if (!post?.blocks || !Array.isArray(post.blocks)) return null;
  const imageBlock = post.blocks.find((b) => b.type === "image" && b.imageUrl);
  return imageBlock ? imageBlock.imageUrl : null;
};

const FeaturedBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { published, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchPublishedBlogs());
  }, [dispatch]);

  // Guard — ensure published is always an array
  const posts = Array.isArray(published) ? published : [];

  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id).slice(0, 3);

  // Don't render if loading or no posts
  if (loading || posts.length === 0 || !featured) return null;

  const featuredImage = getPostImage(featured);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-gray-500 uppercase mb-3">
              From the Journal
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 leading-tight">
              Reads Worth Your Time
            </h2>
            <div className="w-8 h-px bg-wood mt-5" />
          </div>
          <button
            onClick={() => navigate("/journal")}
            className="hidden md:inline-block font-body text-xs tracking-[0.15em] uppercase text-gray-500 border border-gray-300 px-5 py-2.5 hover:border-sage hover:text-sage transition-all duration-300"
          >
            View all
          </button>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Featured — spans 2 columns */}
          <div
            onClick={() => navigate(`/journal/${featured.slug}`)}
            className="xl:col-span-2 group cursor-pointer flex flex-col border border-gray-100 rounded-sm overflow-hidden hover:border-gray-200 transition-colors duration-300"
          >
            <div className="h-56 overflow-hidden flex-shrink-0">
              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-sage/20 flex items-center justify-center">
                  <p className="font-body text-xs tracking-widest uppercase text-sage/50">
                    {featured.category}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-body text-xs px-2.5 py-1 border rounded-full ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
                <span className="font-body text-xs text-gray-500">
                  {featured.date} · {featured.readTime} min read
                </span>
              </div>

              <h3 className="font-heading text-2xl text-gray-800 leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
                {featured.title}
              </h3>

              <p className="font-body text-sm text-gray-600 leading-relaxed flex-1">
                {featured.excerpt}
              </p>

              <div className="mt-5">
                <span className="font-body text-xs tracking-[0.15em] uppercase text-sage border-b border-sage/30 pb-0.5">
                  Read more
                </span>
              </div>
            </div>
          </div>

          {/* Rest — 1 column each */}
          {rest.map((post) => {
            const postImage = getPostImage(post);
            return (
              <div
                key={post._id}
                onClick={() => navigate(`/journal/${post.slug}`)}
                className="group cursor-pointer flex flex-col border border-gray-100 rounded-sm overflow-hidden hover:border-gray-200 transition-colors duration-300"
              >
                <div className="h-36 overflow-hidden flex-shrink-0">
                  {postImage ? (
                    <img
                      src={postImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-sand flex items-center justify-center">
                      <p className="font-body text-xs tracking-widest uppercase text-gray-400">
                        {post.category}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`font-body text-xs px-2 py-0.5 border rounded-full ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="font-body text-xs text-gray-500">
                      {post.readTime} min read
                    </span>
                  </div>

                  <h3 className="font-heading text-lg text-gray-800 leading-snug mb-2 group-hover:text-sage transition-colors duration-300 line-clamp-3">
                    {post.title}
                  </h3>

                  <p className="font-body text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-4">
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-gray-400 group-hover:text-sage transition-colors duration-300">
                      Read more
                    </span>
                    <div className="mt-1.5 h-px bg-gray-100">
                      <div className="h-px bg-sage w-0 group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 md:hidden">
          <button
            onClick={() => navigate("/journal")}
            className="font-body text-xs tracking-[0.15em] uppercase text-gray-500 border border-gray-300 px-5 py-2.5 hover:border-sage hover:text-sage transition-all duration-300 w-full"
          >
            View all posts
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedBlogs;