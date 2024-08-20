import React, { useState } from "react";

export default function Complain() {
  // State to store form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the JSON data
    const data = {
      Title: title,
      Description: description,
      Location: location,
      Posted_by: username, // username from localStorage
    };

    try {
      const response = await fetch("http://localhost:8000/queryapiview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`, // Include the token in the header if needed
        },
        body: JSON.stringify(data), // Convert data to JSON string
      });

      if (response.ok) {
        console.log("Complaint submitted successfully");
        // Reset form after successful submission
        setTitle("");
        setDescription("");
        setLocation("");
      } else {
        console.error("Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="Complain">
      <div className="contain">
      <h2>SUBMIT A COMPLAINT</h2>
        <div className="formessentials">
          <div className="form-instructions">
            <h3>How to Fill Out the Complaint Form</h3>
            <ul>
              <li>
                <strong>Title:</strong> Enter a brief, descriptive title for
                your complaint. This should summarize the main issue.
              </li>
              <li>
                <strong>Description:</strong> Provide a detailed description of
                the problem you experienced. Include any relevant information
                that will help us understand the issue better.
              </li>
              <li>
                <strong>Location:</strong> Specify where the incident occurred.
                This helps in identifying the exact location and addressing the
                problem more effectively.
              </li>
              <li>
                <strong>Placed By:</strong> Your username will be automatically
                filled in based on your account.
              </li>
            </ul>
          </div>
          <div className="forminfo">
            <form className="complain-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Title of the Query"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description:</label>
                <textarea
                  id="desc"
                  name="desc"
                  placeholder="Enter the details about the problem"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  list="options"
                  id="location"
                  name="location"
                  placeholder="Where did it happen?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <datalist id="options">
                  <option value="None"></option>
                </datalist>
              </div>
              <div className="buttonform">
              <button type="submit" className="btn btn-primary">
                Submit Complaint
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
