import axios from "axios";
export const BaseURL = process.env.BASE_URL;
const api = axios.create({
  baseURL: BaseURL,
});

export async function CreateUserInDB(
  clerkId: string,
  firstName: string,
  lastName: string
) {
  const data = { clerkId, firstName, lastName };
  try {
    const response = await api.post("/api/create-user", data);
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: err };
  }
}
export async function AddNewUrl(originalUrl: string, clerkId: string) {
  try {
    const response = await api.post("/api/add-url", { originalUrl, clerkId });
    return response.data;
  } catch (err) {
    console.log("Error occured", err);
    return {};
  }
}
export async function GetAllUrl(clerkId: string) {
  try {
    const response = await api.get(`/api/get-url?clerkId=${clerkId}`);
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
