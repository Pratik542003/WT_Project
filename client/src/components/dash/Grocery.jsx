import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contextprovider/UserContext";
import CircularLoading from "../reusable/CircularLoading";
import axios from "axios"; // Assuming you're using axios for HTTP requests

const GroceryList = () => {
  const { LoginStatus } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = LoginStatus;

  // State to store grocery items
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch grocery items from MongoDB
    const fetchGroceryItems = async () => {
      try {
        // Make HTTP GET request to fetch grocery items
        const response = await axios.get("/api/grocery"); // Assuming API endpoint for fetching grocery items is '/api/grocery'
        setGroceryItems(response.data); // Set grocery items from response data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching grocery items:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    // Call fetchGroceryItems function
    fetchGroceryItems();
  }, []);

  return (
    <>
      {loggedIn ? (
        <div className="container">
          <h2 className="text-center my-4 text-primary">Grocery List</h2>
          {loading ? (
            <CircularLoading />
          ) : (
            <ul className="list-group">
              {groceryItems.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.name} - {item.store}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
};

export default GroceryList;
