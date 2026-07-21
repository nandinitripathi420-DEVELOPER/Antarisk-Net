import SectionTitle from "../ui/SectionTitle.jsx";
import ComparisonSlider from "./ComparisonSlider.jsx";

export default function BeforeAfter({
  selectedFile,
  uploadData,
}) {
  return (
    <div className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="Results"
        title="Drag to compare"
        description="Every reconstruction is validated against the original cloud-free capture. Slide to see how closely the model rebuilds real terrain."
      />

      <ComparisonSlider
        selectedFile={selectedFile}
        uploadData={uploadData}
      />
    </div>
  );
}