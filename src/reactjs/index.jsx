import {createElement, Fragment} from "react";
import { ReactRoot } from "./ReactRoot";

window.React= {createElement:createElement, Fragment:Fragment}; // needed in the lab because it works with both React and Vue


import { createRoot } from "react-dom/client";
import { reactiveModel } from "/src/mobxReactiveModel";

// mount the app in the browser page. Test at http://localhost:8080/react.html
// Implemented root string which is the ID of the div, getElementById will find div by this id root and then render 
createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel} />);









