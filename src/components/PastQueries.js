import React, { useEffect, useState } from "react";
import './PastQueries.css'; // Import the CSS file

export default function PastQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQueryId, setEditingQueryId] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Location: ''
  });

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

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (query) => {
    setEditingQueryId(query.id);
    setFormData({
      Title: query.Title,
      Description: query.Description,
      Location: query.Location
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/queryapiview/${editingQueryId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingQueryId,
          Title: formData.Title,
          Description: formData.Description,
          Location: formData.Location,
        }),
      });

      if (response.ok) {
        const updatedQuery = await response.json();
        // Update the state with the new query data
        setQueries(queries.map(query =>
          query.id === updatedQuery.id ? updatedQuery : query
        ));
        // Reset form and editing state
        setEditingQueryId(null);
        setFormData({ Title: '', Description: '', Location: '' });
      } else {
        setError('Failed to update query');
      }
    } catch (error) {
      setError('Error updating query');
    }
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
  };

  const handleDelete = async (queryId) => {
    const confirmed = window.confirm("Are you sure you want to delete this query?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/queryapiview/${queryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Remove the deleted query from the state
          setQueries(queries.filter(query => query.id !== queryId));
          alert('Query deleted successfully!');
        } else {
          setError('Failed to delete query');
        }
      } catch (error) {
        setError('Error deleting query');
      }
    }
  };

  return (
    <div className="PastQueriesContainer">
    <h2 className="title">COMPLAINT HISTORY</h2>
      <div className="accordion" id="accordionExample">
        {loading && <p>Loading queries...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && queries.length === 0 && <p>No queries found</p>}
        {!loading && !error && queries.length > 0 && queries.map((element, index) => {
          const itemId = `collapse${index}`;
          const buttonId = `heading${index}`;

          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={buttonId}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${itemId}`}
                  aria-expanded="true"
                  aria-controls={itemId}
                >
                  {element.Title}
                </button>
              </h2>
              <div
                id={itemId}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>Query ID:</strong> {element.id} <br />
                  <strong>Location:</strong> {element.Location} <br />
                  <strong>Description:</strong> {element.Description} <br />
                  <strong>Status:</strong> {getStatusText(element.Status)} <br />
                  <strong>Date Created:</strong> {formatDate(element.Created)} <br />
                </div>
                <div className="buttons">
                  {editingQueryId === element.id ? (
                    <form onSubmit={handleUpdate} className="update-form">
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          id="title"
                          name="Title"
                          value={formData.Title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="desc">Description:</label>
                        <textarea
                          id="desc"
                          name="Description"
                          value={formData.Description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                          type="text"
                          id="location"
                          name="Location"
                          value={formData.Location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditingQueryId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleEdit(element)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(element.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
