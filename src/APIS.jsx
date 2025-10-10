import axios from "axios";
const BASE_URL = "https://tdcp-eticketing-apis.laaftogether.com/api";

//---------- getSectionData-----------
export const getSectionsWithImages = (sections = []) => {
  return sections.map(section => {

    return {
      ...section,
    };
  });
};
export const domainConfig = {
  "cable-car.vercel.app": {
    title: "Cable Car",
    favicon: "/tdcp.png",
    logoIndex: 0, 
  },
  "boating-service.vercel.app": {
    title: "Boating Service",
    favicon: "/tdcp.png",
    logoIndex: 0,
  },
  "sightseeing-green.vercel.app": {
    title: "Sightseeing",
    favicon: "/tdcp.png",
    logoIndex: 0,
  },
  "soft-wheel-train-tdcp.vercel.app": {
    title: "Soft Wheel Train",
    favicon: "/tdcp.png",
    logoIndex: 0,
  },
  "localhost": {
    title: "Sightseeing",
    favicon: "/tdcp.png",
    logoIndex: 0,
  },
};
// Map each domain to its corresponding content ID
const contentMap = {
  "boating-service.vercel.app": 16,
  "soft-wheel-train-tdcp.vercel.app": 18,
  "sightseeing-green.vercel.app": 17,
  "cable-car.vercel.app": 19,
  "localhost": 17, 
};

// Function to detect the domain and get correct ID
const getContentIdByDomain = () => {
  const hostname = window.location.hostname;
  return contentMap[hostname] || 1; 
};

// Fetch content dynamically based on domain
export const getContent = async () => {
  const contentId = getContentIdByDomain();
  const url = `${BASE_URL}/content/${contentId}`;

  try {
    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

//---------- get Content-----------
// export const getContent = async () => {
//   const url =`${BASE_URL}/content/17`
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching content:", error);
//   }
// };

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