import { useState } from "react";

import Hero from "../components/hero/Hero.jsx";
import Workspace from "../components/workspace/Workspace.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import BeforeAfter from "../components/showcase/BeforeAfter.jsx";
import Pipeline from "../components/showcase/Pipeline.jsx";
import TechStack from "../components/technology/TechStack.jsx";
import Architecture from "../components/technology/Architecture.jsx";
import Features from "../components/technology/Features.jsx";

export default function Home() {
  // Shared state between Workspace and BeforeAfter
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  // Prediction History
  const [history, setHistory] = useState([]);

  return (
    <>
      <Hero />

      <Workspace
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        uploadData={uploadData}
        setUploadData={setUploadData}
        history={history}
        setHistory={setHistory}
      />

      <section id="showcase" className="relative px-6 py-28 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          <BeforeAfter
            selectedFile={selectedFile}
            uploadData={uploadData}
          />

          <div className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="How it works"
              title="A four-stage reconstruction pipeline"
              description="Each tile passes through detection, generative reconstruction, and validation before it ever reaches the workspace."
            />

            <Pipeline />
          </div>
        </div>
      </section>

      <section id="technology" className="relative px-6 py-28 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          <div className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Technology"
              title="Built on a purpose-trained generative model"
              description="OrbitVision pairs a multispectral encoder with a diffusion-based infill network, tuned specifically for orbital imagery."
            />

            <TechStack />
          </div>

          <Architecture />

          <div className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Why it holds up"
              title="Engineered for mission-grade reliability"
              align="left"
            />

            <Features />
          </div>
        </div>
      </section>
    </>
  );
}