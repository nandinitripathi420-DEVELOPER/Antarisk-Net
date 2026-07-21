import { motion } from "framer-motion";

export default function Metrics({ uploadData }) {
  const processingTime =
    uploadData?.prediction?.processing_time_seconds ?? null;

  const cloudCoverage =
    uploadData?.cloud_coverage ??
    uploadData?.prediction?.cloud_coverage ??
    null;

  const metrics = [
    {
      label: "Cloud Coverage",
      display:
        cloudCoverage !== null
          ? `${cloudCoverage.toFixed(1)}%`
          : "--",
      value: cloudCoverage !== null ? Math.min(cloudCoverage, 100) : 0,
    },
    {
      label: "Processing Time",
      display:
        processingTime !== null
          ? `${processingTime.toFixed(2)} s`
          : "--",
      value:
        processingTime !== null
          ? Math.min((processingTime / 5) * 100, 100)
          : 0,
    },
    {
      label: "Model",
      display: "ANTARISK-Net",
      value: 100,
    },
    {
      label: "Inference Status",
      display: uploadData ? "Completed" : "Waiting",
      value: uploadData ? 100 : 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {metrics.map((metric, i) => (
        <div key={metric.label} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-mist-500">
              {metric.label}
            </span>

            <span className="font-display text-sm font-semibold text-mist-100">
              {metric.display}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${metric.value}%` }}
              transition={{
                duration: 1,
                delay: i * 0.15,
              }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow"
            />
          </div>
        </div>
      ))}
    </div>
  );
}