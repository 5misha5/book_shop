

async function findBooks(params = {}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      };
    return fetch("/api/find", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

async function deleteBookByISBN(isbn) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch("/api/delete?" + new URLSearchParams({
        isbn: isbn
    }), requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

async function editBook(params = {}) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch("/api/editBook?" + new URLSearchParams(params), requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
};

async function addBook(params = {}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch("/api/addBook?" + new URLSearchParams(params), requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
};






module.exports = {
    findBooks, deleteBookByISBN, editBook, addBook
};