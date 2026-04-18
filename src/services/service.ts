import axios from "axios";

export const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BaseURL || "",
  withCredentials: true,
});

export async function AddNewUrl(originalUrl: string) {
  try {
    const response = await api.post("/api/add-url", { originalUrl });
    return response.data;
  } catch (err) {
    console.log("Error occured", err);
    return {};
  }
}
export async function GetAllUrl() {
  try {
    const response = await api.get("/api/get-url");
    return response.data.data;
  } catch (err) {
    console.log("Error Occured:", err);
    return [];
  }
}
export async function DeleteUrl(slug: string) {
  try {
    const response = await api.delete("/api/delete-url", {
      data: { slug: slug },
    });
    return response.data;
  } catch (err) {
    console.log("Error Occured:", err);
    return [];
  }
}
