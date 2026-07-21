import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ComparisonSlider({
  selectedFile,
  uploadData,
}) {
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const [position, setPosition] = useState(50);

  const beforeImage = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const afterImage = useMemo(() => {
    if (!uploadData?.prediction?.output) return null;

    return `${API_URL}/${uploadData.prediction.output}?t=${Date.now()}`;
  }, [uploadData]);

  useEffect(() => {
    return () => {
      if (beforeImage) URL.revokeObjectURL(beforeImage);
    };
  }, [beforeImage]);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const pct = ((clientX - rect.left) / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    updatePosition(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  if (!beforeImage || !afterImage) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl border border-white/10 bg-space-900 text-mist-400">
        Upload an image to compare before & after.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      className="relative aspect-video w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-white/10"
    >
      {/* AFTER IMAGE */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="AI Reconstructed"
          className="h-full w-full object-cover"
          draggable={false}
        />

        <span className="absolute right-4 top-4 rounded-full bg-space-950/70 px-3 py-1 text-[11px] font-medium text-mist-100 backdrop-blur">
          AI Reconstructed
        </span>
      </div>

      {/* BEFORE IMAGE */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Cloud Covered"
          className="h-full w-full object-cover"
          draggable={false}
        />

        <span className="absolute left-4 top-4 rounded-full bg-space-950/70 px-3 py-1 text-[11px] font-medium text-mist-100 backdrop-blur">
          Cloud-covered
        </span>
      </div>

      {/* DIVIDER */}
      <div
        className="absolute top-0 h-full w-[2px] bg-white"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-space-950 shadow-xl">
          <MoveHorizontal className="h-5 w-5" strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}