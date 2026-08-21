import { useRef, useCallback, useState } from "react";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Youtube,
  List,
  ListOrdered,
  Pilcrow,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(sanitizeHtml(editorRef.current.innerHTML));
    }
  }, [onChange]);

  const formatBlock = useCallback((tag: string) => {
    document.execCommand("formatBlock", false, tag);
    if (editorRef.current) {
      onChange(sanitizeHtml(editorRef.current.innerHTML));
    }
  }, [onChange]);

  const insertImage = () => {
    if (imageUrl.trim()) {
      exec("insertHTML", `<img src="${imageUrl}" alt="Imagen del blog" style="max-width:100%;height:auto;margin:16px 0;" />`);
      setImageUrl("");
      setShowImageDialog(false);
    }
  };

  const extractYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const insertYoutube = () => {
    const videoId = extractYoutubeId(youtubeUrl.trim());
    if (videoId) {
      exec(
        "insertHTML",
        `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:16px 0;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`
      );
      setYoutubeUrl("");
      setShowYoutubeDialog(false);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(sanitizeHtml(editorRef.current.innerHTML));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Cmd/Ctrl + Alt + 0 => Paragraph
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === '0') {
      e.preventDefault();
      formatBlock("p");
      return;
    }
    // Double Enter in list exits to paragraph
    if (e.key === 'Enter' && !e.shiftKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const node = sel.anchorNode;
        const li = node?.parentElement?.closest?.('li');
        if (li && li.textContent?.trim() === '') {
          e.preventDefault();
          const list = li.closest('ul, ol');
          if (list) {
            li.remove();
            if (list.children.length === 0) list.remove();
          }
          document.execCommand('insertParagraph', false);
          formatBlock('p');
          return;
        }
      }
    }
  };

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-1.5 hover:bg-iron-foreground/10 transition-colors ${active ? "bg-iron-foreground/10" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border bg-muted/30">
        <ToolBtn onClick={() => formatBlock("h1")} title="Título H1"><Heading1 size={16} /></ToolBtn>
        <ToolBtn onClick={() => formatBlock("h2")} title="Título H2"><Heading2 size={16} /></ToolBtn>
        <ToolBtn onClick={() => formatBlock("h3")} title="Título H3"><Heading3 size={16} /></ToolBtn>
        <ToolBtn onClick={() => formatBlock("h4")} title="Título H4"><Heading4 size={16} /></ToolBtn>
        <ToolBtn onClick={() => formatBlock("h5")} title="Título H5"><Heading5 size={16} /></ToolBtn>
        <ToolBtn onClick={() => formatBlock("h6")} title="Título H6"><Heading6 size={16} /></ToolBtn>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolBtn onClick={() => exec("bold")} title="Negrita"><Bold size={16} /></ToolBtn>
        <ToolBtn onClick={() => exec("italic")} title="Itálica"><Italic size={16} /></ToolBtn>
        <ToolBtn onClick={() => exec("underline")} title="Subrayado"><Underline size={16} /></ToolBtn>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolBtn onClick={() => exec("insertUnorderedList")} title="Lista"><List size={16} /></ToolBtn>
        <ToolBtn onClick={() => exec("insertOrderedList")} title="Lista numerada"><ListOrdered size={16} /></ToolBtn>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolBtn onClick={() => setShowImageDialog(true)} title="Insertar imagen"><Image size={16} /></ToolBtn>
        <ToolBtn onClick={() => setShowYoutubeDialog(true)} title="Insertar video de YouTube"><Youtube size={16} /></ToolBtn>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolBtn onClick={() => formatBlock("p")} title="Párrafo (⌘+Alt+0)"><Pilcrow size={16} /></ToolBtn>
      </div>

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/20">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de la imagen..."
            className="flex-1 bg-transparent border border-border px-3 py-1.5 font-body text-sm focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={insertImage}
            className="bg-primary text-primary-foreground px-4 py-1.5 font-body text-xs font-semibold"
          >
            Insertar
          </button>
          <button
            type="button"
            onClick={() => setShowImageDialog(false)}
            className="text-muted-foreground hover:text-foreground px-2 py-1.5 font-body text-xs"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* YouTube Dialog */}
      {showYoutubeDialog && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/20">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="URL del video de YouTube..."
            className="flex-1 bg-transparent border border-border px-3 py-1.5 font-body text-sm focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={insertYoutube}
            className="bg-primary text-primary-foreground px-4 py-1.5 font-body text-xs font-semibold"
          >
            Insertar
          </button>
          <button
            type="button"
            onClick={() => setShowYoutubeDialog(false)}
            className="text-muted-foreground hover:text-foreground px-2 py-1.5 font-body text-xs"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[400px] px-4 py-3 font-body text-sm text-foreground focus:outline-none prose prose-sm max-w-none [&_h1]:font-heading [&_h1]:text-3xl [&_h1]:tracking-wide [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:tracking-wide [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:tracking-wide [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:mt-4 [&_h4]:mb-2 [&_h5]:font-heading [&_h5]:text-base [&_h5]:mt-3 [&_h5]:mb-1 [&_h6]:font-heading [&_h6]:text-sm [&_h6]:mt-3 [&_h6]:mb-1 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_iframe]:w-full"
      />
    </div>
  );
}
