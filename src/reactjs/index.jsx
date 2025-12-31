/**
 * Application Entry Point
 */
import { createElement, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
import { reactiveModel } from "../model/mobxReactiveModel.js";

// Required for lab compatibility
window.React = { createElement, Fragment };

// Mount the app
const root = document.getElementById("root");
createRoot(root).render(<ReactRoot model={reactiveModel} />);









