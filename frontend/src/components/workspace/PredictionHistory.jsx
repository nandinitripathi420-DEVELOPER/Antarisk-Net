import { motion } from "framer-motion";
import {
  Satellite,
  Clock3,
  Cloud,
  Cpu,
  Download,
  Eye,
} from "lucide-react";

export default function PredictionHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <Satellite className="mx-auto mb-4 h-12 w-12 text-cyan-glow/60" />

        <h3 className="mb-2 font-display text-xl text-mist-100">
          Prediction History
        </h3>

        <p className="text-sm text-mist-400">
          Your completed reconstructions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-2xl text-mist-100">
          Prediction History
        </h3>

        <p className="mt-2 text-sm text-mist-400">
          Review previous ANTARISK-Net reconstructions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
          >
            {/* Images */}

            <div className="grid grid-cols-2">
              <div>
                <img
                  src={item.uploadedImage}
                  alt="Original"
                  className="h-36 w-full object-cover"
                />
              </div>

              <div>
                <img
                  src={item.outputImage}
                  alt="Prediction"
                  className="h-36 w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyan-glow/10 px-3 py-1 text-xs font-semibold text-cyan-glow">
                  Prediction #{history.length - index}
                </span>

                <Satellite
                  className="h-5 w-5 text-violet-glow"
                  strokeWidth={1.8}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-cyan-glow" />

                  <span className="text-mist-300">
                    {item.cloudCoverage}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-cyan-glow" />

                  <span className="text-mist-300">
                    {item.processingTime}s
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-glow" />

                  <span className="text-mist-300">
                    {item.device}
                  </span>
                </div>

                <div className="text-mist-300">
                  {item.model}
                </div>
              </div>

              {item.resolution && (
                <div className="rounded-xl bg-white/[0.03] p-3 text-xs text-mist-400">
                  Resolution

                  <div className="mt-1 font-semibold text-mist-100">
                    {item.resolution.width} ×{" "}
                    {item.resolution.height}
                  </div>
                </div>
              )}

              <div className="text-xs text-mist-500">
                {item.timestamp}
              </div>

              {/* Buttons */}

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    window.open(item.outputImage, "_blank")
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-2 text-sm font-medium text-cyan-glow transition hover:bg-cyan-glow/20"
                >
                  <Eye className="h-4 w-4" />

                  View
                </button>

                <a
                  href={item.outputImage}
                  download
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-glow/30 bg-violet-glow/10 px-4 py-2 text-sm font-medium text-violet-glow transition hover:bg-violet-glow/20"
                >
                  <Download className="h-4 w-4" />

                  Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}