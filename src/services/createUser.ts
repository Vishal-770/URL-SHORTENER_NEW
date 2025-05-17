import axios from "axios";
const BaseURL = process.env.BASE_URL;
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
