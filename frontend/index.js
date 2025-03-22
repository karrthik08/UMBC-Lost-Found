import React from "react";
import ReactDOM from "react-dom";
import App from "App"; // Ensure "App.js" exists in the same folder

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root") // This must match the <div id="root"></div> in index.html
);