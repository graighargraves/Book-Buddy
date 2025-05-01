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
            const res = await fetch (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
            const data= await res.json();
            setBook(data);

            } catch (err) {
                console.error(err);
            }
    }
    fetchBook()
}, [id]);
        if (!book) return <p>Loading book details...</p>;

        return (
            <div>
                <button onClick={() => navigate ("/")}>Back Home</button>
                <h2>{book.title}</h2>
                <img src={book.coverimage} alt={`${book.title} cover`} width="150" />
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description: </strong> {book.description}</p>
                <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
            </div>
        
        )
}














export default SingleBook;