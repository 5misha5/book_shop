import { func } from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { addBook } from "./API";


function AddBook() {

    const navigate = useNavigate();



    function handleSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(Array.from(formData));
        
        addBook(formDataObject)
        .then(() => navigate("/"));
      }
    

    return (
        <>
            <h1>Add Book</h1>

            <form className="container-fluid justify-content-start" onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input type="text" className="form-control" id="name" name="name" required />

                <label htmlFor="author" className="form-label">
                    Author
                </label>
                <input type="text" className="form-control" id="author" name="author" required />

                <label htmlFor="isbn" className="form-label">
                    ISBN
                </label>
                <input type="number" className="form-control" id="isbn" name="isbn" required />

                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input type="number" className="form-control" id="price" name="price" required />

                <label htmlFor="amt" className="form-label">
                    Amount
                </label>
                <input type="number" className="form-control" id="amt" name="amt" required />

                <button type="submit" className="btn btn-primary">
                    Add book
                </button>
            </form>
        </>
    );
}



export default AddBook;
