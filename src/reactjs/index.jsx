import {createElement, Fragment} from "react";
window.React= {createElement:createElement, Fragment:Fragment}; // needed in the lab because it works with both React and Vue

import { createRoot } from "react-dom/client";

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('TODO')).render("Hello React world!");