/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const AllBooks = ({ }) => {
    const [books, setBooks] = useState();
   
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBooks();
    }, []);
if (!books) return <p>Loading books....</p>;
return (
    <div>
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                </li>
            ))}
        </ul>
    </div>
)
}
export default AllBooks;