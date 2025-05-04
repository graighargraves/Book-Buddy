import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  if (!books) return <p>Loading books...</p>;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>All Books</h2>

      <input
        type="text"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          margin: "1rem auto 2rem",
          display: "block",
          width: "80%",
          maxWidth: "400px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No books found.</p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
            <div className="book-card">
              <img src={book.coverimage} alt={book.title} className="book-thumb" />
              <h4>{book.title}</h4>
              <p className="book-author">{book.author}</p>
            </div>
          </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default AllBooks;