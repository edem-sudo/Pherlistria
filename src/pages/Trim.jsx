import { useState } from "react";

function Trim({inventory, setInventory}){
  
  
  return(<>
  
  <ul id="trimInventory">
    {
      inventory.map((stone,i)=>{

        return(
          <li className="item" key={stone.id}>
            <strong><span className={`${stone.type}`}>{stone.type}</span> #{inventory.length - i}</strong>
          </li>
        );
      })
    }
  </ul>

  </>)
}

export default Trim;