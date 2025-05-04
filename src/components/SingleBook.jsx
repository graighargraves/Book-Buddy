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
              setBook(data); // ✅ This works, since data IS the book
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
            <div>
                <button onClick={() => navigate ("/")}>Back Home</button>
                <h2>{book.title}</h2>
                <img src={book.coverimage} alt={`${book.title} cover`} width="150" />
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description: </strong> {book.description}</p>
                <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
                <button onClick={handleCheckout} disabled={!book.available}>
                     {book.available ? "Check Out" : "Not Available"}
                </button>
            </div>
        
        )
}





export default SingleBook;