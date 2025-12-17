import { useState } from 'react';

function Inventory({inventory, setInventory}){

  console.log({inventory}); //[{Pherlisite}, {Pherlisite}, ...]

  return(<>
    <h2>Inventory</h2>


    <ul>
    {
      inventory.map((stone,i)=>{

        const compositionText = Object.entries(stone.composition).map(
          ([key, val]) => (
            <div key={key}>
              <span className={`${key}`}>{key}</span>:{"  "}{val}%
            </div>
          )
        );

        return(
          <li className="item" key={stone.id}>
            <details>
              <summary><strong><span className={`${stone.type}`}>{stone.type}</span> #{inventory.length - i}</strong></summary>
              <div>
                {compositionText}
              </div>
            </details>
          </li>
        );
      })
    }
    </ul>

  </>)
}

export default Inventory;