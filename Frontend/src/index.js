import React from 'react'
import  ReactDOM  from 'react-dom/client'
import App from './App'
import reportWebVitals from "./reportWebVitals"

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();




// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router = {AppRouter} />);




