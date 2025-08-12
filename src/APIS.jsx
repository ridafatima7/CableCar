import axios from "axios";
const BASE_URL = "https://tdcp-eticketing-apis.laaftogether.com/api";
export const IMG_URL = "";
//---------- get Content-----------
export const getContent = async () => {
  const url =`${BASE_URL}/content`
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
};