import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { LoginPresenter } from "./loginPresenter.jsx";
import { SignupPresenter } from "./signupPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { UserBar } from "./userPresenter.jsx";

import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import "/src/style/style.css";


function makeRouter(model) {
    return createHashRouter([
        {
            path: "/",
            element: <Search model={model} />,
        },
        {
            path: "/search",
            element: <Search model={model} />,
        },
        {
            path: "/summary",
            element: <Summary model={model} />,
        },
        {
            path: "/details",
            element: <Details model={model} />,
        },
    ])
}

const ReactRoot = observer(
    function ReactRoot(props) {

       // just using state for switching between login/signpu, no router 
        const [authPage, setAuthPage] = useState("login");

        //  Checking auth state (initial loading)
        if (!props.model.ready && !props.model.user) {
            return (
                <div className="flexParent">
                    <div className="mainContent">
                        <SuspenseView promise={true} />
                    </div>
                </div>
            );
        }

        // rendering Not logged in routes, show login/signup
        if (!props.model.user) {
            return (
                <div className="flexParent">
                    <div className="mainContent auth-main">
                        {authPage === "login" ? (
                            <LoginPresenter 
                                model={props.model} 
                                onSwitchToSignup={() => setAuthPage("signup")}
                            />
                        ) : (
                            <SignupPresenter 
                                model={props.model} 
                                onSwitchToLogin={() => setAuthPage("login")}
                            />
                        )}
                    </div>
                </div>
            );
        }

        // Logged in but loading data
        if (!props.model.ready) {
            return (
                <div className="flexParent">
                    <div className="mainContent">
                        <SuspenseView promise={true} />
                    </div>
                </div>
            );
        }

        return (
            <div className="flexParent">
                <div className="sidebar">
                    <UserBar model={props.model} />
                    <Sidebar model={props.model} />
                </div>
                <div className="mainContent">
                    <RouterProvider router={makeRouter(props.model)} />
                </div>
            </div>
        );
    }
);

export { ReactRoot };