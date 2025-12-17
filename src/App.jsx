import './App.css';
import { useState } from 'react';
import Mine from './pages/Mine.jsx'
import Observatory from './pages/Observatory.jsx'
import Inventory from './pages/Inventory.jsx'
import Trim from './pages/Trim.jsx'

function App(){
  
  const [tab, setTab] = useState('mine');
  const [log, setLog] = useState([]);
  const [inventory, setInventory] = useState([]);

  return(<>
    <h1>Pherlisite Simulator</h1>

    <div>
      <button onClick={()=>{setTab('mine')}}>Mine</button>
      <button onClick={()=>{setTab('observatory')}}>Observatory</button>
      <button onClick={()=>{setTab('inventory')}}>Inventory</button>
      <button onClick={()=>{setTab('trim')}}>Trim</button>
    </div>

    { tab === 'mine' && <Mine log={log} setLog={setLog} inventory={inventory} setInventory={setInventory} /> }
    { tab === 'observatory' && <Observatory /> }
    { tab === 'inventory' && <Inventory inventory={inventory} setInventory={setInventory} /> }
    { tab === 'trim' && <Trim /> }

    <h2>Generation Log</h2>

  </>)
}



export default App;