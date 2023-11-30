import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findBooks, editBook } from "./API";

function EditBook() {
  const navigate = useNavigate();
  const { isbn } = useParams();

  const [book, setBook] = useState({
    name: "",
    author: "",
    isbn: isbn,
    price: "",
    amt: "",
  });

  useEffect(() => {
    // Fetch book details when the component mounts
    findBooks({ isbn: isbn })
      .then((data) => setBook(data[0]))
      .catch((error) => console.error('Error fetching book:', error));
  }, [isbn]);
  console.log(book)

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData);
    formDataObject.isbn = isbn;

    // Update book details
    editBook(formDataObject)
      .then(() => {
        // Navigate to '/'
        navigate("/");
      })
      .catch((error) => console.error('Error editing book:', error));
  };

  return (
    <>
      <h1>Edit Book</h1>
      

      <form className="container-fluid justify-content-start" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name" name="name" defaultValue={book.name || ""} required />

        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input type="text" className="form-control" id="author" name="author" defaultValue={book.author || ""} required />

        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input type="number" className="form-control" id="price" name="price" defaultValue={book.price || ""} required />

        <label htmlFor="amt" className="form-label">
          Amount
        </label>
        <input type="number" className="form-control" id="amt" name="amt" defaultValue={book.amt || ""} required />

        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </>
  );
}

export default EditBook;
