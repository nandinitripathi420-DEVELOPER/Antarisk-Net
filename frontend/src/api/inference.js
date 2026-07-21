import { apiFetch } from "./client";

// Upload image
export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiFetch("/upload", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

// Run prediction
export async function runPrediction() {
  const response = await apiFetch("/predict", {
    method: "POST",
  });

  return await response.json();
}