import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2 } from "lucide-react";

import { generateReport } from "../../utils/generateReport";

export default function ReportButton({
  uploadedImage,
  outputImage,
  cloudCoverage,
  processingTime,
  resolution,
  model,
  device,
  timestamp,
}) {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    try {
      setGenerating(true);

      await generateReport({
        uploadedImage,
        outputImage,
        cloudCoverage,
        processingTime,
        resolution,
        model,
        device,
        timestamp,
      });
    } catch (err) {
      console.error("Failed to generate report:", err);
      alert("Failed to generate analysis report.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      disabled={generating}
      onClick={handleGenerate}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-cyan-glow/30 bg-gradient-to-r from-cyan-glow/10 to-violet-glow/10 px-6 py-4 transition-all duration-300 hover:border-cyan-glow hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {/* Animated Glow */}
      <motion.div
        animate={{
          x: ["-100%", "150%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-y-0 w-24 bg-white/10 blur-xl"
      />

      {generating ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin text-cyan-glow" />

          <span className="font-medium text-mist-100">
            Generating Report...
          </span>
        </>
      ) : (
        <>
          <FileText
            className="h-5 w-5 text-cyan-glow"
            strokeWidth={2}
          />

          <span className="font-medium text-mist-100">
            Generate Analysis Report
          </span>
        </>
      )}
    </motion.button>
  );
}