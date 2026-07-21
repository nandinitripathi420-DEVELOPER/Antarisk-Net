import { useRef, useMemo } from "react";
import { CloudUpload, ImageIcon } from "lucide-react";
import Card from "../ui/Card.jsx";

export default function UploadCard({
  onUpload,
  selectedFile,
  uploadData,
}) {
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    await onUpload(file);
  };

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-mist-100">
          Input Frame
        </h3>

        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-mist-500">
          Cloud-covered
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.tif,.tiff"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/12 bg-space-900 transition hover:border-cyan-glow"
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Uploaded Satellite"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute bottom-3 left-3 rounded-lg bg-space-950/70 px-2.5 py-1 text-[10px] font-medium text-mist-100 backdrop-blur">
              {selectedFile.name}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 text-mist-100/90">
            <CloudUpload className="h-10 w-10" strokeWidth={1.5} />

            <span className="text-center text-sm font-medium">
              Click to upload satellite image
            </span>

            <span className="text-[11px] text-mist-500">
              PNG • JPG • GeoTIFF
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-mist-500">
        <ImageIcon className="h-3.5 w-3.5" strokeWidth={2} />

        <span>
          {uploadData
            ? uploadData.filename
            : "Supports PNG, JPG, JPEG and GeoTIFF"}
        </span>
      </div>
    </Card>
  );
}