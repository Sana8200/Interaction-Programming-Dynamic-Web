import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { UserBar } from "./userPresenter.jsx";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

import "../style/style.css";

function createRouter(model) {
    return createHashRouter([
        { path: "/", element: <Search model={model} /> },
        { path: "/search", element: <Search model={model} /> },
        { path: "/summary", element: <Summary model={model} /> },
        { path: "/details", element: <Details model={model} /> },
    ]);
}

export const ReactRoot = observer(function ReactRoot(props) {
    const { model } = props;
    const [authPage, setAuthPage] = useState("login");

    // Loading state (checking auth)
    if (!model.ready && !model.user) {
        return (
            <div className="flexParent">
                <div className="mainContent">
                    <SuspenseView promise={true} />
                </div>
            </div>
        );
    }

    // Not logged in - show auth screens
    if (!model.user) {
        return (
            <div className="flexParent">
                <div className="mainContent auth-main">
                    {authPage === "login" ? (
                        <LoginPresenter
                            model={model}
                            onSwitchToSignup={() => setAuthPage("signup")}
                        />
                    ) : (
                        <SignupPresenter
                            model={model}
                            onSwitchToLogin={() => setAuthPage("login")}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Logged in but loading data
    if (!model.ready) {
        return (
            <div className="flexParent">
                <div className="mainContent">
                    <SuspenseView promise={true} />
                </div>
            </div>
        );
    }

    // Main app
    return (
        <div className="flexParent">
            <div className="sidebar">
                <UserBar model={model} />
                <Sidebar model={model} />
            </div>
            <div className="mainContent">
                <RouterProvider router={createRouter(model)} />
            </div>
        </div>
    );
});
