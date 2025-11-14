import { Summary } from "./summaryPresenter.jsx";    // for rendering the SummaryView
import { Sidebar } from "./sidebarPresenter.jsx";    // for rendering the SidebarView



// const ReactRoot = observer(   
function ReactRoot(props){
    return (
            <div>    
                <div>
                    {/* Sidebar above Summary*/}
                    <Sidebar model = {props.model} />.    
                </div>

                <div>
                    <Summary model={props.model} />
                </div>
            </div>
           );
}
// )

export { ReactRoot }
