import { Summary } from "./summaryPresenter.jsx";    // for rendering the SummaryView

// const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (<div>
                <div><Summary model={props.model} /></div>
            </div>
           );
}
// )

export { ReactRoot }
