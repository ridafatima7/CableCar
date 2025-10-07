import axios from "axios";
const BASE_URL = "https://tdcp-eticketing-apis.laaftogether.com/api";

//---------- getSectionData-----------
export const getSectionsWithImages = (sections = [], images = []) => {
  return sections.map(section => {
    const matchImage = images.find(img =>
      img.name.toLowerCase().startsWith(section.id.replace(/\s+/g, "_").toLowerCase())
    );

    return {
      ...section,
      image: matchImage ? matchImage.path : null
    };
  });
};

//---------- get Content-----------
export const getContent = async () => {
  const url =`${BASE_URL}/content/1`
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
};

// --------Create Booking----------
export const createBooking=async(data)=>{
  const url=`${BASE_URL}/booking`;
  try{
    const response=await axios.post(url,data);
    return response.data;
  }catch(error){
    console.error("Error creating booking",error)
  }
}

//---------- get Tickets-----------
export const getTickets = async () => {
  const url =`${BASE_URL}/ticket?route_id=1`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
};