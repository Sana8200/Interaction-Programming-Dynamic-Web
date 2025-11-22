import { Summary } from "./summaryPresenter.jsx";    // for rendering the SummaryView
import { Sidebar } from "./sidebarPresenter.jsx";    // for rendering the SidebarView
import { Search } from "./searchPresenter.jsx";    // for rendering the SearchView
import { Details } from "./detailsPresenter.jsx";    // for rendering the DetailsView
import { SuspenseView } from "../views/suspenseView.jsx";
import { observer } from "mobx-react-lite";


const ReactRoot = observer(
    function ReactRoot(props) {
        if(!props.model.ready){
            return(
                <div>
                    <SuspenseView promise = {true}/>
                </div>
            )
        }
        return (
            <div>
                <div>
                    {/* Sidebar above Summary*/}
                    <Sidebar model={props.model} />
                </div>

                <div>
                    <Search model={props.model} />
                    <Details model={props.model} />
                    <Summary model={props.model} />
                </div>
            </div>
        );
    }
);

export { ReactRoot }
