import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "/src/style.css"


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
        // rendering suspenseView if the model is not ready 
        if (!props.model.ready) {
            return (
                <div className="flexParent">
                    <div className="mainContent">
                        <SuspenseView promise={true} />
                    </div>
                </div>
            );
        }
        // rendering the main part. sidebar goes to a different div, rest goes in mainContent
        return (
            <div className="flexParent">
                <div className="sidebar">
                    <Sidebar model={props.model} />
                </div>
                <div className="mainContent">
                    <RouterProvider router={makeRouter(props.model)} />
                </div>
            </div>
        );
    }
);

export { ReactRoot }
