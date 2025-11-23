import {createElement, Fragment} from "react";
import { ReactRoot } from "./ReactRoot";

window.React= {createElement:createElement, Fragment:Fragment}; 


import { createRoot } from "react-dom/client";
import { reactiveModel } from "/src/mobxReactiveModel";

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel} />);









