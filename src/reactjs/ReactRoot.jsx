import { Summary } from "./summaryPresenter.jsx";    // for rendering the SummaryView
import { Sidebar } from "./sidebarPresenter.jsx";    // for rendering the SidebarView
import { Search } from "./searchPresenter.jsx";    // for rendering the SearchView
import { Details } from "./detailsPresenter.jsx";    // for rendering the DetailsView
// import { observer } from "mobx-react-lite";   // will be added in week 3


// const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (
            <div>    
                <div>
                    {/* Sidebar above Summary*/}
                    <Sidebar model = {props.model} />    
                </div>

                <div>
                    <Search model={props.model} />
                    <Details model={props.model} />
                    <Summary model={props.model} />
                </div>
            </div>
           );
}
// )

export { ReactRoot }
