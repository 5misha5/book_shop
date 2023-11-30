import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";
import Find from "./Find";
import AddBook from "./AddBook"
import EditBook from './EditBook';

function App(){
    return (<Router>

        <Routes>
            <Route path='' element={<Find/>}/>
            <Route path='/addBook' element={<AddBook/>}/>
            <Route path='/editBook/:isbn' element={<EditBook/>}/>
        </Routes>

    </Router>)
}



ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )