import { useCallback, useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface CoverImageUploadProps {
  value: string;
  onChange: (dataUrl: string) => void;
}

export default function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Formato no soportado. Usa JPG, PNG o WEBP.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("La imagen excede el límite de 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (value) {
    return (
      <div className="relative border border-border bg-card overflow-hidden group">
        <img src={value} alt="Portada" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-card text-foreground font-body text-xs font-semibold px-4 py-2 hover:bg-muted transition-colors"
          >
            Reemplazar
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="bg-destructive text-destructive-foreground font-body text-xs font-semibold px-4 py-2 hover:bg-destructive/90 transition-colors"
          >
            <X size={14} className="inline mr-1" />
            Eliminar
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed cursor-pointer transition-colors flex flex-col items-center justify-center py-12 gap-3 ${
        dragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted-foreground"
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        {dragging ? <ImageIcon size={20} className="text-primary" /> : <Upload size={20} className="text-muted-foreground" />}
      </div>
      <p className="font-body text-sm text-muted-foreground">
        {dragging ? "Suelta la imagen aquí" : "Arrastra una imagen o haz clic para seleccionar"}
      </p>
      <p className="font-body text-xs text-muted-foreground/60">
        JPG, PNG o WEBP · Máximo 5 MB
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
