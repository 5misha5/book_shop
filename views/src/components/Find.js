import React, { useState, useEffect } from "react";
import { findBooks } from "./API";
import BookTable from "./bookTable";

function Find() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books when the component mounts
    findBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return <BookTable books={books} />;
}

export default Find;
