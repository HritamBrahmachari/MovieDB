import { useEffect } from "react";

const Fetches = ({ setShows }) => {
  
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        setShows(data); 
       
        // Pass the fetched data to the parent component
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShows();
  }, [setShows]); // Dependency array includes setShows to avoid warnings

  return null; // This component does not render anything
};

export default Fetches;