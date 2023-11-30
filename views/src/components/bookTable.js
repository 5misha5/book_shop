import React, { useState, useEffect } from "react";
import { deleteBookByISBN } from "./API";

function BookTable(props) {
  const [bookList, setBookList] = useState(props.books);

  useEffect(() => {
    setBookList(props.books);
  }, [props.books]);

  const handleDelete = (isbn) => {
    deleteBookByISBN(isbn)
      .then(() => {
        setBookList((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  const rows = bookList.map((book) => (
    <tr key={book.isbn}>
      <th scope="row">{book.isbn}</th>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.price}</td>
      <td>{book.amt}</td>
      <td>
        <a href={`/editBook/${book.isbn}`} className="btn-edit">
          <i className="bi bi-pencil"></i>
        </a>
      </td>
      <td>
        <button
          className="btn-delete book-delete"
          onClick={() => handleDelete(book.isbn)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ISBN</th>
          <th scope="col">Name</th>
          <th scope="col">Author</th>
          <th scope="col">Price</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default BookTable;
