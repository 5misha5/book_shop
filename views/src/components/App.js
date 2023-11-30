import ReactDOM from 'react-dom/client';
import React from 'react';

function App(){
    return (
        <>
            Hello world!
        </>
    )
}










ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )