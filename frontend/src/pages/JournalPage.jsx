import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedBlogs } from "../redux/slices/blogSlice.js";
import { useNavigate } from "react-router-dom";

const categoryColors = {
  Education: "text-sage border-sage/30 bg-sage/5",
  Lifestyle: "text-wood border-wood/30 bg-wood/5",
  Wellness: "text-gray-500 border-gray-200 bg-gray-50",
};

// Get the first image associated with a blog post
// Images are stored inside the blocks array in MongoDB
const getBlogImage = (post) => {
  const imageBlock = post?.blocks?.find(
    (block) => block.type === "image" && block.imageUrl
  );

  return imageBlock?.imageUrl || null;
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
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gray-400">
          Loading Journal
        </p>
      </div>
    );
  }

  const featured = published.find((p) => p.featured) || published[0];

  const rest = published.filter(
    (p) => p._id !== featured?._id
  );

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-gray-800">

      {/* HERO */}
      <section className="px-5 sm:px-8 lg:px-16 pt-12 sm:pt-16 lg:pt-24 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">

            <p className="font-body text-[10px] sm:text-xs tracking-[0.28em] uppercase text-gray-400 mb-4">
              Green Leaf · Salt Rock
            </p>

            <h1
              className="font-heading text-[4rem] sm:text-6xl lg:text-7xl text-gray-800 leading-[0.9]"
            >
              Journal
            </h1>

            <div className="w-10 h-px bg-sage mt-7 mb-6" />

            <p className="font-body text-sm sm:text-base text-gray-500 max-w-lg leading-7 sm:leading-8 font-light">
              Guides, stories and thoughtful conversations about cannabis,
              wellness and living well.
            </p>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 pb-20 sm:pb-28 lg:pb-36">

        {published.length === 0 ? (
          <div className="border-t border-gray-200 py-20 text-center">
            <p className="font-body text-sm text-gray-400">
              No posts published yet.
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featured && (
              <article
                onClick={() =>
                  navigate(`/journal/${featured.slug}`)
                }
                className="group cursor-pointer border-t border-gray-200 pt-7 sm:pt-9 pb-12 sm:pb-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">

                  {/* FEATURED IMAGE */}
                  <div className="overflow-hidden bg-[#E9E7DF] aspect-[16/10]">

                    {getBlogImage(featured) ? (
                      <img
                        src={getBlogImage(featured)}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-heading text-3xl text-gray-400">
                          Green Leaf
                        </span>
                      </div>
                    )}

                  </div>

                  {/* FEATURED CONTENT */}
                  <div className="max-w-xl">

                    <div className="flex items-center gap-3 flex-wrap mb-5">

                      <span
                        className={`font-body text-[10px] uppercase tracking-wider px-3 py-1.5 border rounded-full ${
                          categoryColors[featured.category] ||
                          "text-gray-500 border-gray-200 bg-gray-50"
                        }`}
                      >
                        {featured.category}
                      </span>

                      <span className="font-body text-[10px] text-gray-400">
                        Featured
                      </span>

                    </div>

                    <p className="font-body text-xs text-gray-400 mb-5">
                      {featured.date} · {featured.readTime} min read
                    </p>

                    <h2
                      className="font-heading text-3xl sm:text-4xl lg:text-5xl text-gray-800 leading-[1.05] mb-5 group-hover:text-sage transition-colors duration-300"
                    >
                      {featured.title}
                    </h2>

                    <p className="font-body text-sm sm:text-base text-gray-500 leading-7 sm:leading-8 font-light">
                      {featured.excerpt}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-3">

                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gray-700">
                        Read article
                      </span>

                      <span className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>

                    </div>

                  </div>
                </div>
              </article>
            )}

            {/* LATEST ARTICLES */}
            {rest.length > 0 && (
              <section>

                <div className="flex items-center gap-5 mb-8">

                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gray-400">
                    Latest
                  </p>

                  <div className="h-px bg-gray-200 flex-1" />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12 lg:gap-y-16">

                  {rest.map((post) => {
                    const postImage = getBlogImage(post);

                    return (
                      <article
                        key={post._id}
                        onClick={() =>
                          navigate(`/journal/${post.slug}`)
                        }
                        className="group cursor-pointer"
                      >

                        {/* ARTICLE IMAGE */}
                        {postImage && (
                          <div className="aspect-[16/10] overflow-hidden bg-[#E9E7DF] mb-6">

                            <img
                              src={postImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />

                          </div>
                        )}

                        {/* META */}
                        <div className="flex items-center justify-between gap-3 mb-5">

                          <span
                            className={`font-body text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-full ${
                              categoryColors[post.category] ||
                              "text-gray-500 border-gray-200 bg-gray-50"
                            }`}
                          >
                            {post.category}
                          </span>

                          <span className="font-body text-[10px] text-gray-400">
                            {post.date}
                          </span>

                        </div>

                        {/* TITLE */}
                        <h2
                          className="font-heading text-2xl sm:text-[1.7rem] text-gray-800 leading-[1.1] mb-4 group-hover:text-sage transition-colors duration-300"
                        >
                          {post.title}
                        </h2>

                        {/* EXCERPT */}
                        <p className="font-body text-sm text-gray-500 leading-7 font-light">
                          {post.excerpt}
                        </p>

                        {/* READ MORE */}
                        <div className="mt-6 flex items-center gap-3">

                          <span className="font-body text-[10px] tracking-[0.18em] uppercase text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
                            Read more
                          </span>

                          <span className="text-gray-300 group-hover:text-sage group-hover:translate-x-1 transition-all duration-300">
                            →
                          </span>

                        </div>

                        {/* HOVER LINE */}
                        <div className="mt-5 h-px bg-gray-200 overflow-hidden">

                          <div className="h-px bg-sage w-0 group-hover:w-full transition-all duration-500" />

                        </div>

                      </article>
                    );
                  })}

                </div>
              </section>
            )}
          </>
        )}

      </main>

    </div>
  );
};

export default JournalPage;
