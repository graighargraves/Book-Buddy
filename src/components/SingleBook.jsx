/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
              const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
              const data = await res.json();
              console.log("Book from API:", data);
              setBook(data);
            } catch (err) {
              console.error("Fetch error:", err);
            }
          };
    fetchBook()
}, [id]);

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
         
        if(!token) {
            alert("Log in to check out books.");
            return;
        }
        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookId: Number(id) }),
              });
            const data = await response.json();
            console.log("Checkout response:", data)

            if (response.ok) {
                alert(`Successfully checked out "${book.title}"`);
                setBook((prevBook) => ({
                  ...prevBook,
                  available: false,
                }));
              } else {
                alert(data.message || "Checkout failed.");
              }
            } catch (err) {
              console.error(err);
              alert("Something went wrong.");
            }
          };
        
          if (!book) return <p>Loading book details...</p>;

   
          return (
            <main style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginBottom: "1.5rem",
                  background: "#eee",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                ← Back Home
              </button>
          
              <div className="single-book-card">
                <img
                  src={book.coverimage}
                  alt={`${book.title} cover`}
                  style={{ width: "150px", borderRadius: "6px", marginBottom: "1rem" }}
                />
                <h2 style={{ marginBottom: "0.5rem" }}>{book.title}</h2>
                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                  <strong>Author:</strong> {book.author}
                </p>
                <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {book.description}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {book.available ? "Yes" : "No"}
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={!book.available}
                  style={{
                    marginTop: "1rem",
                    background: book.available ? "#4CAF50" : "#ccc",
                    color: "#fff",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: book.available ? "pointer" : "not-allowed",
                    boxShadow: book.available
                      ? "0 0 12px rgba(72, 239, 136, 0.5)"
                      : "none",
                    transition: "box-shadow 0.3s ease"
                  }}
                >
                  {book.available ? "Check Out" : "Not Available"}
                </button>
              </div>
            </main>
          );

        }
export default SingleBook