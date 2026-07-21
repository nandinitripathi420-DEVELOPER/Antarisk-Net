import { motion } from "framer-motion";
import { Download, Sparkles, ImageIcon } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import ReactCompareImage from "react-compare-image";
import Card from "../ui/Card.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function OutputCard({ uploadData, selectedFile }) {
  const [imageError, setImageError] = useState(false);

  const beforeImage = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const outputImage = useMemo(() => {
    if (!uploadData?.prediction?.output) return null;

    return `${API_URL}/${uploadData.prediction.output}?t=${Date.now()}`;
  }, [uploadData]);

  useEffect(() => {
    console.log("========== OUTPUT CARD ==========");
    console.log("API_URL:", API_URL);
    console.log("uploadData:", uploadData);
    console.log("prediction:", uploadData?.prediction);
    console.log("Before:", beforeImage);
    console.log("After:", outputImage);
    console.log("===============================");

    return () => {
      if (beforeImage) {
        URL.revokeObjectURL(beforeImage);
      }
    };
  }, [uploadData, beforeImage, outputImage]);

  const handleDownload = () => {
    if (!outputImage) return;
    window.open(outputImage, "_blank");
  };

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-mist-100">
          Reconstruction Comparison
        </h3>

        <span className="flex items-center gap-1 rounded-full bg-cyan-glow/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cyan-glow">
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          AI Restored
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-space-900">
        {beforeImage && outputImage && !imageError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ReactCompareImage
              leftImage={beforeImage}
              rightImage={outputImage}
              leftImageLabel="Cloudy"
              rightImageLabel="Reconstructed"
              sliderLineColor="#22d3ee"
              handleSize={42}
            />

            <div className="absolute bottom-3 left-3 rounded-lg bg-space-950/80 px-3 py-1 text-[10px] font-medium text-mist-100 backdrop-blur">
              ← Cloudy &nbsp;&nbsp;|&nbsp;&nbsp; Drag Slider &nbsp;&nbsp;|&nbsp;&nbsp; AI Restored →
            </div>
          </motion.div>
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center gap-3 text-mist-500">
            <ImageIcon className="h-10 w-10 opacity-50" />

            <span className="text-center text-sm">
              Reconstructed image will appear here
            </span>

            <span className="text-[11px] opacity-70">
              Upload an image to compare before & after
            </span>
          </div>
        )}
      </div>

      {uploadData?.prediction && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-space-900 p-3">
            <p className="text-mist-500">Cloud Coverage</p>
            <p className="mt-1 font-semibold text-cyan-glow">
              {uploadData.cloud_coverage ?? "--"}%
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-space-900 p-3">
            <p className="text-mist-500">Processing Time</p>
            <p className="mt-1 font-semibold text-cyan-glow">
              {uploadData.prediction.processing_time_seconds?.toFixed(2) ??
                "--"}{" "}
              sec
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={!outputImage}
        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs font-medium text-mist-300 transition-all duration-300 hover:border-cyan-glow hover:bg-cyan-glow/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        Download Result
      </button>
    </Card>
  );
}