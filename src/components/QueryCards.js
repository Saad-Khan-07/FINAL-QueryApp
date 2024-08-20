import React, { useEffect, useState } from "react";

export default function QueryCards() {
  const [queries, setQueries] = useState([]); // State to store the fetched queries

  useEffect(() => {
    // Function to fetch queries from the API
    const fetchQueries = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        console.error('No token found, please log in first.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/queryapiview', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`, // Use the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQueries(data); // Update the state with the fetched queries
        } else {
          console.error('Failed to fetch queries');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQueries(); // Call the fetch function when the component mounts
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="cardlayout">
      <h2>QUERIES IN FOCUS</h2>
      <div className="container mt-4">
        <div className="row">
          {queries.map((element, index) => (
            <div className="col-lg-3 mb-4" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{element.Title}</h5>
                  <p className="card-text">
                    <strong>Query ID:</strong> {element.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>User ID:</strong> {element.Posted_by} <br />
                    <strong>Location:</strong> {element.Location} <br />
                    <strong>Description:</strong> {element.Description} <br />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
