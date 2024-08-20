import React, { useEffect, useState } from "react";

export default function ComplaintTracker() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const uid = localStorage.getItem('userid');
        const response = await fetch(`http://localhost:8000/getquery/${uid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setQueries(data);
        } else {
          setError('Failed to fetch queries');
        }
      } catch (error) {
        setError('Error fetching queries');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Function to convert status codes to full names
  const getStatusName = (statusCode) => {
    switch (statusCode.toLowerCase()) {
      case 'peq':
        return 'Pending Query';
      case 'adq':
        return 'Solved Query';
      case 'apq':
        return 'Approved Query';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="complaintracker">
    <h2>TRACK YOUR COMPLAINT</h2>
      <div className="query-cards">
        {loading && <p>Loading queries...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && queries.length === 0 && <p>No queries found</p>}
        {!loading && !error && queries.length > 0 && queries.map((query) => (
          <div className="status-card" key={query.id}>
            <div className="carduser">
              <h5 className="card-title">{query.Title}</h5>
              <p className="card-text">Date: {query.Created.split('T')[0]}</p>
            </div>
            <span className={`query-status ${query.Status.toLowerCase()}`}>
              {getStatusName(query.Status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
