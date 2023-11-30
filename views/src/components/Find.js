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

    const handleChange = (event) => {
        

        findBooks({
            isbn: {$regex : "^" + document.getElementById("isbn-search").value},
            name: {$regex : "^" + document.getElementById("name-search").value},
            author: {$regex : "^" + document.getElementById("author-search").value}
        })
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error fetching books:', error));
    }

    return (
        <>
            <form className="search d-flex">
                <input id="isbn-search" onChange={handleChange} className="form-control me-2" type="search" placeholder="ISBN" aria-label="Search" />
                <input id="name-search" onChange={handleChange} className="form-control me-2" type="search" placeholder="Name" aria-label="Search" />
                <input id="author-search" onChange={handleChange} className="form-control me-2" type="search" placeholder="Author" aria-label="Search" />
            </form>
            <BookTable books={books} />
        </>
    );

}

export default Find;
