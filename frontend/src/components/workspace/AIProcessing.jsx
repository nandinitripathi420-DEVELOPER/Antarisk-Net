import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Check,
  Loader2,
} from "lucide-react";

const STEPS = [
  "Image Uploaded",
  "Detecting Cloud Coverage",
  "Preparing Satellite Tile",
  "Running ANTARISK-Net",
  "Reconstructing Surface",
  "Final Enhancement",
];

export default function AIProcessing({ loading }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    let interval;

    if (loading) {
      setActiveStep(0);

      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= STEPS.length - 1) {
            return prev;
          }
          return prev + 1;
        });
      }, 600);
    } else {
      if (activeStep >= 0) {
        setActiveStep(STEPS.length);
      }
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex flex-col items-center gap-6 px-2">
      {/* AI Orb */}
      <motion.div
        animate={{
          rotate: loading ? 360 : 0,
        }}
        transition={{
          duration: 4,
          repeat: loading ? Infinity : 0,
          ease: "linear",
        }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-cyan-glow), var(--color-violet-glow), var(--color-cyan-glow))",
        }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-space-900">
          <BrainCircuit
            className="h-7 w-7 text-cyan-glow"
            strokeWidth={1.75}
          />
        </div>
      </motion.div>

      {/* Status */}
      <div className="w-full space-y-3">
        {STEPS.map((step, index) => {
          const completed =
            !loading && activeStep >= STEPS.length;

          const isDone =
            completed || index < activeStep;

          const isActive =
            loading && index === activeStep;

          return (
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300
              ${
                isActive
                  ? "border-cyan-glow bg-cyan-glow/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {isDone ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <Check
                    className="h-4 w-4 text-white"
                    strokeWidth={3}
                  />
                </span>
              ) : isActive ? (
                <Loader2 className="h-5 w-5 animate-spin text-cyan-glow" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-white/20" />
              )}

              <span
                className={`text-sm ${
                  isActive
                    ? "text-cyan-glow font-medium"
                    : isDone
                    ? "text-green-400"
                    : "text-mist-400"
                }`}
              >
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-xs text-mist-400">
          <span>AI Processing</span>

          <span>
            {loading
              ? `${Math.min(
                  Math.round(
                    ((activeStep + 1) / STEPS.length) *
                      100
                  ),
                  99
                )}%`
              : activeStep >= STEPS.length
              ? "100%"
              : "0%"}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{
              width: loading
                ? `${Math.min(
                    ((activeStep + 1) /
                      STEPS.length) *
                      100,
                    99
                  )}%`
                : activeStep >= STEPS.length
                ? "100%"
                : "0%",
            }}
            transition={{
              duration: 0.4,
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow"
          />
        </div>
      </div>

      {!loading && activeStep >= STEPS.length && (
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-xl bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400"
        >
          ✅ Reconstruction Completed Successfully
        </motion.div>
      )}
    </div>
  );
}