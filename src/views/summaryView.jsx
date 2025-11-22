import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){    
  // props used: people, ingredients
  
    return (
            <div className="summary-view">

              {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
              {/* DOM tree JSX code, Rendering the number of people */}
              Summary for <span title="nr guests">{props.people}</span>  
              {/* Conditional Expression .? logic */}
              {props.people === 1 ? " person" : " persons"}:      

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>

                <tbody>
                  { //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
                    // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array) 
                    // Metod Chaining : We sort the ingredients array first,and then we .map() over the sorted array.
                    sortIngredients(props.ingredients)?.map(ingredientTableRowCB)
                  }
                </tbody>
              </table>
            </div>
    );
    


    /* callback for Array Rendering in TW 1.3 */
    // This is a template for each single row that adds the array rendering keys by setting it to the ingredients id property 
    function ingredientTableRowCB(ingr){ 
        return <tr key={ingr.id} >    
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td className="align-right">
                  {(ingr.amount * props.people).toFixed(2)}    {/* gets the total amoung of that ingredients needed for all the guests */}
                 </td>
                 <td>{ingr.unit}</td>
               </tr>;
    }
}

