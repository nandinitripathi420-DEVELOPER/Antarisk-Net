import { useState } from "react";

import SectionTitle from "../ui/SectionTitle.jsx";
import GlassPanel from "../ui/GlassPanel.jsx";
import UploadCard from "./UploadCard.jsx";
import AIProcessing from "./AIProcessing.jsx";
import OutputCard from "./OutputCard.jsx";
import Metrics from "./Metrics.jsx";
import PredictionHistory from "./PredictionHistory.jsx";
import ReportButton from "./ReportButton.jsx";

import { uploadImage, runPrediction } from "../../api/inference";
import { API_URL } from "../../config/api";

export default function Workspace({
  selectedFile,
  setSelectedFile,
  uploadData,
  setUploadData,
  history,
  setHistory,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);

      // Clear previous result
      setUploadData(null);

      // Save uploaded file
      setSelectedFile(file);

      // Upload image
      const uploadResult = await uploadImage(file);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error?.message || "Upload failed");
      }

      // Run prediction
      const predictionResult = await runPrediction();

      if (!predictionResult.success) {
        throw new Error(
          predictionResult.error?.message || "Prediction failed"
        );
      }

      // Merge upload + prediction
      const mergedData = {
        ...uploadResult.data,
        prediction: predictionResult.data,
      };

      setUploadData(mergedData);

      // Save to prediction history
      setHistory((prev) => [
        {
          id: Date.now(),

          uploadedImage: URL.createObjectURL(file),

          outputImage: `${API_URL}/${predictionResult.data.output}`,

          cloudCoverage:
            predictionResult.data.cloud_coverage ?? "--",

          processingTime:
            predictionResult.data.processing_time_seconds ?? "--",

          resolution:
            predictionResult.data.resolution ?? null,

          device:
            predictionResult.data.device ?? "CPU",

          model:
            predictionResult.data.model ?? "ANTARISK-Net",

          timestamp:
            predictionResult.data.prediction_time ??
            new Date().toLocaleString(),
        },

        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="workspace"
      className="relative px-6 py-28 md:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionTitle
          eyebrow="Live Workspace"
          title="From cloud cover to clarity, in one pass"
          description="Drop in a cloud-obscured tile and watch the reconstruction pipeline rebuild the surface underneath — no manual masking required."
        />

        {/* Workspace */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_0.8fr_1fr]">
          <UploadCard
            onUpload={handleUpload}
            selectedFile={selectedFile}
            uploadData={uploadData}
          />

          <GlassPanel className="p-6 md:p-8">
            <AIProcessing loading={loading} />
          </GlassPanel>

          <OutputCard
            uploadData={uploadData}
            selectedFile={selectedFile}
          />
        </div>

        {/* Metrics */}
        <GlassPanel className="p-6 md:p-8">
          <h3 className="mb-6 font-display text-sm font-semibold text-mist-100">
            Reconstruction Quality
          </h3>

          <Metrics uploadData={uploadData} />

          {/* PDF Report Button */}
          {uploadData && (
            <div className="mt-8">
              <ReportButton
                uploadedImage={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : null
                }
                outputImage={`${API_URL}/${uploadData.prediction.output}`}
                cloudCoverage={
                  uploadData.prediction.cloud_coverage
                }
                processingTime={
                  uploadData.prediction.processing_time_seconds
                }
                resolution={
                  uploadData.prediction.resolution
                }
                model={uploadData.prediction.model}
                device={uploadData.prediction.device}
                timestamp={
                  uploadData.prediction.prediction_time
                }
              />
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}
        </GlassPanel>

        {/* Prediction History */}
        <PredictionHistory history={history} />
      </div>
    </section>
  );
}