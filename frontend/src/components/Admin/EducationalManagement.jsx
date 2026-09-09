import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchAllBlogs,
  createBlog,
  deleteBlog,
  toggleBlogStatus,
  toggleBlogFeatured,
} from "../../redux/slices/blogSlice.js";

const CATEGORIES = ["Education", "Lifestyle", "Wellness"];
const STATUSES = ["Draft", "Published"];

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const estimateReadTime = (blocks) => {
  const text = blocks.map((b) => b.content || "").join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const BLOCK_TYPES = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "quote", label: "Pull Quote" },
  { type: "takeaway", label: "Key Takeaway" },
  { type: "image", label: "Image" },
];

const initialForm = {
  title: "",
  author: "",
  date: "",
  category: "Education",
  excerpt: "",
  tags: "",
  status: "Draft",
  featured: false,
  slug: "",
  metaTitle: "",
  metaDescription: "",
  references: "",
  blocks: [
    { id: 1, type: "paragraph", label: "Introduction", content: "", imageUrl: "", caption: "" },
    { id: 2, type: "paragraph", label: "Body", content: "", imageUrl: "", caption: "" },
    { id: 3, type: "paragraph", label: "Conclusion", content: "", imageUrl: "", caption: "" },
  ],
};

// ── Block Editor ─────────────────────────────────────────────────────────────

const BlockEditor = ({ block, index, onChange, onDelete, onMove, onUpload, uploading, totalBlocks }) => {
  const isFirst = index === 0;
  const isLast = index === totalBlocks - 1;

  return (
    <div className="border border-gray-100 rounded-sm bg-white group">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs tracking-widest uppercase text-gray-400">
            {block.type}
          </span>
          <input
            value={block.label}
            onChange={(e) => onChange(block.id, "label", e.target.value)}
            className="font-body text-xs text-gray-500 bg-transparent border-none outline-none w-32"
            placeholder="Block label..."
          />
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onMove(index, -1)} disabled={isFirst} className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors">↑</button>
          <button onClick={() => onMove(index, 1)} disabled={isLast} className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors">↓</button>
          <button onClick={() => onDelete(block.id)} className="p-1.5 text-gray-300 hover:text-red-400 transition-colors ml-1">×</button>
        </div>
      </div>

      <div className="p-5">
        {block.type === "image" ? (
          <div>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-sm cursor-pointer hover:border-sage transition-colors bg-gray-50">
              {block.imageUrl ? (
                <img src={block.imageUrl} alt="Block" className="h-full w-full object-cover rounded-sm" />
              ) : (
                <div className="text-center">
                  <p className="font-body text-sm text-gray-400">
                    {uploading === block.id ? "Uploading..." : "Click to upload image"}
                  </p>
                  <p className="font-body text-xs text-gray-300 mt-1">PNG, JPG, WEBP</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(e, block.id)} />
            </label>
            <input
              value={block.caption}
              onChange={(e) => onChange(block.id, "caption", e.target.value)}
              placeholder="Image caption (optional)"
              className="font-body text-xs text-gray-400 w-full mt-2 border-none outline-none placeholder-gray-300 italic"
            />
          </div>
        ) : block.type === "heading" ? (
          <input
            value={block.content}
            onChange={(e) => onChange(block.id, "content", e.target.value)}
            placeholder="Section heading..."
            className="font-heading text-2xl text-gray-800 w-full border-none outline-none placeholder-gray-200 bg-transparent"
          />
        ) : block.type === "quote" ? (
          <textarea
            value={block.content}
            onChange={(e) => onChange(block.id, "content", e.target.value)}
            placeholder="Pull quote — a sentence worth highlighting..."
            rows={2}
            className="font-subheading text-xl italic text-gray-600 w-full border-none outline-none resize-none placeholder-gray-200 bg-transparent leading-relaxed"
          />
        ) : block.type === "takeaway" ? (
          <textarea
            value={block.content}
            onChange={(e) => onChange(block.id, "content", e.target.value)}
            placeholder="Key takeaway — what should the reader remember?"
            rows={2}
            className="font-body text-sm text-sage w-full border-none outline-none resize-none placeholder-gray-200 bg-transparent leading-relaxed"
          />
        ) : (
          <textarea
            value={block.content}
            onChange={(e) => onChange(block.id, "content", e.target.value)}
            placeholder="Write here..."
            rows={5}
            className="font-body text-sm text-gray-600 w-full border-none outline-none resize-none placeholder-gray-200 bg-transparent leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};

// ── Add Block Row ─────────────────────────────────────────────────────────────

const AddBlockRow = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gray-100" />
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 rounded-full border border-gray-200 text-gray-400 hover:border-sage hover:text-sage flex items-center justify-center text-lg transition-colors flex-shrink-0"
      >
        +
      </button>
      <div className="flex-1 h-px bg-gray-100" />
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-9 bg-white border border-gray-100 rounded-sm shadow-md z-10 py-1 min-w-[160px]">
          {BLOCK_TYPES.map((b) => (
            <button
              key={b.type}
              onClick={() => { onAdd(b.type, b.label); setOpen(false); }}
              className="w-full text-left font-body text-xs text-gray-600 hover:bg-sand px-4 py-2 transition-colors"
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Field ─────────────────────────────────────────────────────────────────────

const Field = ({ label, children }) => (
  <div>
    <label className="font-body text-xs tracking-widest uppercase text-gray-400 block mb-2">{label}</label>
    {children}
  </div>
);

const inputClass = "font-body text-sm w-full border border-gray-200 rounded-sm px-4 py-2.5 bg-white focus:outline-none focus:border-sage transition-colors placeholder-gray-300";
const textareaClass = `${inputClass} resize-none`;

// ── Main Component ────────────────────────────────────────────────────────────

const EducationalManagement = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(null);
  const [activeTab, setActiveTab] = useState("content");

  // Load all blogs on mount
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleTitleChange = (val) => {
    setForm((f) => ({ ...f, title: val, slug: generateSlug(val) }));
  };

  // ── Block Operations ────────────────────────────────────────────────────────

  const updateBlock = useCallback((id, key, val) => {
    setForm((f) => ({
      ...f,
      blocks: f.blocks.map((b) => (b.id === id ? { ...b, [key]: val } : b)),
    }));
  }, []);

  const deleteBlock = (id) =>
    setForm((f) => ({ ...f, blocks: f.blocks.filter((b) => b.id !== id) }));

  const moveBlock = (index, dir) => {
    setForm((f) => {
      const blocks = [...f.blocks];
      const target = index + dir;
      if (target < 0 || target >= blocks.length) return f;
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      return { ...f, blocks };
    });
  };

  const addBlockAt = (index, type, label) => {
    const newBlock = { id: Date.now(), type, label, content: "", imageUrl: "", caption: "" };
    setForm((f) => {
      const blocks = [...f.blocks];
      blocks.splice(index + 1, 0, newBlock);
      return { ...f, blocks };
    });
  };

  // ── Image Upload ────────────────────────────────────────────────────────────

  const handleImageUpload = async (e, blockId) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    try {
      setUploading(blockId);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      updateBlock(blockId, "imageUrl", res.data.imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(null);
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!form.title || !form.author) return alert("Title and author are required.");
    const post = { ...form, readTime: estimateReadTime(form.blocks) };
    await dispatch(createBlog(post));
    setForm(initialForm);
    setActiveTab("content");
  };

  // ── Blog List Actions ───────────────────────────────────────────────────────

  const handleDelete = (id) => {
    if (window.confirm("Delete this post?")) dispatch(deleteBlog(id));
  };

  const handleToggleStatus = (id) => dispatch(toggleBlogStatus(id));
  const handleToggleFeatured = (id) => dispatch(toggleBlogFeatured(id));

  const readTime = estimateReadTime(form.blocks);

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-gray-400 uppercase mb-1">Admin</p>
            <h1 className="font-heading text-3xl text-gray-900">Journal</h1>
            <div className="w-8 h-px bg-wood mt-3" />
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <p className="font-body text-xs text-red-400">{error}</p>
            )}
            <button
              onClick={() => set("status", form.status === "Draft" ? "Published" : "Draft")}
              className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-sm border transition-colors ${
                form.status === "Published"
                  ? "bg-sage/10 text-sage border-sage/30"
                  : "bg-gray-50 text-gray-400 border-gray-200"
              }`}
            >
              {form.status}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="font-body text-xs tracking-[0.15em] uppercase bg-sage text-white px-6 py-2 rounded-sm hover:bg-sage/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : form.status === "Published" ? "Publish" : "Save Draft"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex gap-8">

          {/* Main Editor */}
          <div className="flex-1 min-w-0">

            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-gray-100">
              {["content", "seo", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-body text-xs tracking-widest uppercase pb-3 transition-colors ${
                    activeTab === tab
                      ? "text-gray-800 border-b border-gray-800"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div>
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Post title..."
                    className="font-heading text-4xl text-gray-800 w-full border-none outline-none placeholder-gray-200 bg-transparent"
                  />
                  <div className="h-px bg-gray-100 mt-3" />
                </div>

                <Field label="Excerpt">
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => set("excerpt", e.target.value)}
                    placeholder="Short summary shown on the Journal page..."
                    rows={2}
                    className={textareaClass}
                  />
                </Field>

                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-4">Content Blocks</p>
                  <div className="space-y-2">
                    {form.blocks.map((block, index) => (
                      <div key={block.id}>
                        <BlockEditor
                          block={block}
                          index={index}
                          totalBlocks={form.blocks.length}
                          onChange={updateBlock}
                          onDelete={deleteBlock}
                          onMove={moveBlock}
                          onUpload={handleImageUpload}
                          uploading={uploading}
                        />
                        <AddBlockRow onAdd={(type, label) => addBlockAt(index, type, label)} />
                      </div>
                    ))}
                  </div>
                </div>

                <Field label="References">
                  <textarea
                    value={form.references}
                    onChange={(e) => set("references", e.target.value)}
                    placeholder="One reference link per line..."
                    rows={3}
                    className={textareaClass}
                  />
                </Field>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <Field label="URL Slug">
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                    <span className="font-body text-xs text-gray-300 px-3 py-2.5 bg-gray-50 border-r border-gray-200">/journal/</span>
                    <input
                      value={form.slug}
                      onChange={(e) => set("slug", e.target.value)}
                      className="font-body text-sm flex-1 px-3 py-2.5 outline-none bg-white"
                    />
                  </div>
                </Field>
                <Field label="Meta Title">
                  <input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className={inputClass} placeholder="SEO title (60 chars max)..." />
                  <p className="font-body text-xs text-gray-300 mt-1">{form.metaTitle.length} / 60</p>
                </Field>
                <Field label="Meta Description">
                  <textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} rows={3} className={textareaClass} placeholder="SEO description (160 chars max)..." />
                  <p className="font-body text-xs text-gray-300 mt-1">{form.metaDescription.length} / 160</p>
                </Field>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <div className="bg-white border border-gray-100 rounded-sm p-10">
                <p className="font-body text-xs tracking-widest uppercase text-gray-300 mb-2">{form.category}</p>
                <h1 className="font-heading text-4xl text-gray-800 mb-3 leading-tight">
                  {form.title || "Untitled Post"}
                </h1>
                <p className="font-body text-xs text-gray-400 mb-6">
                  By {form.author || "Author"} · {form.date || "Date"} · {readTime} min read
                </p>
                <div className="w-8 h-px bg-wood mb-8" />
                {form.excerpt && (
                  <p className="font-subheading text-xl italic text-gray-500 mb-8 leading-relaxed">
                    {form.excerpt}
                  </p>
                )}
                <div className="space-y-6">
                  {form.blocks.map((block) => (
                    <div key={block.id}>
                      {block.type === "heading" && <h2 className="font-heading text-2xl text-gray-800">{block.content}</h2>}
                      {block.type === "paragraph" && <p className="font-body text-sm text-gray-600 leading-relaxed">{block.content}</p>}
                      {block.type === "quote" && (
                        <blockquote className="border-l-2 border-wood pl-6 font-subheading text-xl italic text-gray-500">{block.content}</blockquote>
                      )}
                      {block.type === "takeaway" && (
                        <div className="bg-sage/5 border border-sage/20 rounded-sm px-5 py-4">
                          <p className="font-body text-xs tracking-widest uppercase text-sage mb-1">Key Takeaway</p>
                          <p className="font-body text-sm text-gray-600">{block.content}</p>
                        </div>
                      )}
                      {block.type === "image" && block.imageUrl && (
                        <div>
                          <img src={block.imageUrl} alt={block.caption} className="w-full rounded-sm object-cover" />
                          {block.caption && <p className="font-body text-xs italic text-gray-400 mt-2 text-center">{block.caption}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {form.references && (
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">References</p>
                    {form.references.split("\n").filter(Boolean).map((ref, i) => (
                      <p key={i} className="font-body text-xs text-gray-400">{ref}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-6">
            <div className="bg-white border border-gray-100 rounded-sm p-5 space-y-4">
              <p className="font-body text-xs tracking-widest uppercase text-gray-400">Details</p>

              <Field label="Author">
                <input value={form.author} onChange={(e) => set("author", e.target.value)} className={inputClass} placeholder="Author name" />
              </Field>

              <Field label="Publish Date">
                <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputClass} />
              </Field>

              <Field label="Category">
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Tags">
                <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputClass} placeholder="CBD, Sleep, Edibles..." />
              </Field>

              <div className="flex items-center justify-between pt-1">
                <span className="font-body text-xs tracking-widest uppercase text-gray-400">Featured</span>
                <button
                  onClick={() => set("featured", !form.featured)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? "bg-sage" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="font-body text-xs text-gray-300">~{readTime} min read · {form.blocks.length} blocks</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm p-5">
              <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-3">Status</p>
              <div className="flex flex-col gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => set("status", s)}
                    className={`font-body text-xs text-left px-3 py-2 rounded-sm border transition-colors ${
                      form.status === s
                        ? "border-sage/30 bg-sage/5 text-sage"
                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        {blogs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <p className="font-body text-xs tracking-widest uppercase text-gray-400">All Posts</p>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="font-body text-xs text-gray-300">
                {blogs.length} post{blogs.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading && (
              <p className="font-body text-xs text-gray-300 text-center py-4">Loading...</p>
            )}

            <div className="space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white border border-gray-100 rounded-sm p-5 flex items-center gap-5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`font-body text-xs px-2 py-0.5 rounded-full border ${
                        blog.status === "Published"
                          ? "bg-sage/5 text-sage border-sage/20"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}>
                        {blog.status}
                      </span>
                      <span className="font-body text-xs text-gray-300">{blog.category}</span>
                      {blog.featured && (
                        <span className="font-body text-xs text-wood">Featured</span>
                      )}
                    </div>
                    <h4 className="font-heading text-lg text-gray-800 leading-snug">
                      {blog.title || "Untitled"}
                    </h4>
                    <p className="font-body text-xs text-gray-400 mt-1">
                      By {blog.author} · {blog.readTime} min read
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(blog._id)}
                      className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                        blog.featured
                          ? "border-wood/40 text-wood hover:bg-wood/10"
                          : "border-gray-200 text-gray-400 hover:border-wood/40 hover:text-wood"
                      }`}
                    >
                      {blog.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() => handleToggleStatus(blog._id)}
                      className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                        blog.status === "Published"
                          ? "border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400"
                          : "border-sage/40 text-sage hover:bg-sage/10"
                      }`}
                    >
                      {blog.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="font-body text-xs px-3 py-1.5 rounded-sm border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalManagement;