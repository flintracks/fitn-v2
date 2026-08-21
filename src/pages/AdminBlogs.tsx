import { useState, useEffect, FormEvent } from "react";
import { getAllPosts, createPost, updatePost, deletePost, slugify, type BlogPost } from "@/lib/blogData";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logoRed from "@/assets/logo-red.svg";
import RichTextEditor from "@/components/blog/RichTextEditor";
import CoverImageUpload from "@/components/blog/CoverImageUpload";

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "change_me_now";

export default function AdminBlogs() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "",
    authorRole: "",
    date: new Date().toISOString().split("T")[0],
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    if (authenticated) {
      setPosts(getAllPosts());
    }
  }, [authenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      toast.error("Credenciales inválidas");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "",
      authorRole: "",
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    });
    setEditing(null);
    setCreating(false);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.author) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    if (editing) {
      updatePost(editing.id, {
        ...form,
        slug: slugify(form.title),
      });
      toast.success("Publicación actualizada exitosamente");
    } else {
      createPost({
        ...form,
        slug: slugify(form.title),
      });
      toast.success("Publicación creada exitosamente");
    }

    setPosts(getAllPosts());
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(true);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      author: post.author,
      authorRole: post.authorRole,
      date: post.date,
      status: post.status,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      deletePost(id);
      setPosts(getAllPosts());
      toast.success("Publicación eliminada");
    }
  };

  const toggleStatus = (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    updatePost(post.id, { status: newStatus });
    setPosts(getAllPosts());
    toast.success(`Publicación ${newStatus === "published" ? "publicada" : "marcada como borrador"}`);
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-iron flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-10">
            <img src={logoRed} alt="Flint Racks" className="h-8 w-auto mx-auto" />
            <p className="font-body text-iron-foreground/60 text-sm mt-4">Panel de Administración del Blog</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="font-body text-xs text-iron-foreground/60 uppercase tracking-wider mb-2 block">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-iron-foreground/5 border border-iron-foreground/20 px-4 py-3 font-body text-sm text-iron-foreground focus:border-primary focus:outline-none"
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div>
              <label className="font-body text-xs text-iron-foreground/60 uppercase tracking-wider mb-2 block">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-iron-foreground/5 border border-iron-foreground/20 px-4 py-3 font-body text-sm text-iron-foreground focus:border-primary focus:outline-none"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm hover:bg-red-deep transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Editor Form
  if (creating) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-brand section-padding">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a Publicaciones
            </button>
          </div>

          <h1 className="font-heading text-4xl tracking-wide text-foreground mb-8">
            {editing ? "EDITAR PUBLICACIÓN" : "CREAR NUEVA PUBLICACIÓN"}
          </h1>

          <form onSubmit={handleSave} className="max-w-4xl flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Estado
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Imagen de Portada
              </label>
              <CoverImageUpload
                value={form.coverImage}
                onChange={(dataUrl) => setForm({ ...form, coverImage: dataUrl })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Nombre del Autor *
                </label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Rol del Autor
                </label>
                <input
                  type="text"
                  value={form.authorRole}
                  onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Extracto
              </label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-card border border-border px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none resize-none"
                placeholder="Breve resumen del artículo..."
              />
            </div>

            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Contenido *
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm hover:bg-red-deep transition-colors"
              >
                {editing ? "Actualizar Publicación" : "Crear Publicación"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-border text-foreground font-body font-semibold px-8 py-4 text-sm hover:border-foreground transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Posts List
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-brand section-padding">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-4xl tracking-wide text-foreground">
              ADMIN BLOG
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Administra tus publicaciones del blog
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver Sitio
            </Link>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 text-sm hover:bg-red-deep transition-colors"
            >
              <Plus size={16} />
              Nueva Publicación
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="inline-flex items-center gap-2 border border-border text-foreground font-body text-sm px-4 py-3 hover:border-foreground transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Portada
                  </th>
                  <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Título
                  </th>
                  <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Autor
                  </th>
                  <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Fecha
                  </th>
                  <th className="text-left font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Estado
                  </th>
                  <th className="text-right font-body text-xs uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 bg-iron overflow-hidden">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-iron/80" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body text-sm font-medium text-foreground">
                        {post.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body text-sm text-muted-foreground">
                        {post.author}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("es-MX")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider px-3 py-1 ${
                          post.status === "published"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.status === "published" ? <Eye size={12} /> : <EyeOff size={12} />}
                        {post.status === "published" ? "Publicado" : "Borrador"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
