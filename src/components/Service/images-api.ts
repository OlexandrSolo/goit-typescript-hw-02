import axios from "axios";

const apiKEY = "ax-t1-4qUkBOCpfn6nDNuUFg0Z-Gs4ldp5Ecqalckzc";
axios.defaults.baseURL = "https://api.unsplash.com/";

export default async function fetchImagesWithTopic<DataType>(
  topic: string,
  page: number
): Promise<DataType> {
  const params = { query: topic, client_id: apiKEY, page, per_page: 12 };
  const { data } = await axios.get("search/photos", { params });
  return data;
}
