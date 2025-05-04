/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Account = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log("User response:", data);
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || "Failed to fetch user info");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      }
    };

    fetchUser();
  }, [token, navigate]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading account info...</p>;

  const handleReturn = async (reservationId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to return books.");
      return;
    }
  
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        alert("Book returned successfully.");
        setUser((prevUser) => ({
          ...prevUser,
          reservations: prevUser.reservations.filter(
            (book) => book.id !== reservationId
          ),
        }));
      } else {
        const data = await response.json();
        alert(data.message || "Return failed.");
      }
    } catch (err) {
      console.error("Return error:", err);
      alert("Something went wrong.");
    }
  };


  return (
    <div>
      <h2>My Account</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
      <h3 style={{ marginTop: "2rem" }}>Checked-Out Books</h3>
      {user.reservations?.length > 0 ? (
  <ul>
    {user.reservations.map((book) => (
      <li key={book.id}>
        <strong>{book.title}</strong> by {book.author}
        <button onClick={() => handleReturn(book.id)} style={{ marginLeft: "10px" }}>
          Return
        </button>
      </li>
    ))}
  </ul>
) : (
  <p>You haven't checked out any books yet.</p>
)}
    </div>
  );
};

export default Account;