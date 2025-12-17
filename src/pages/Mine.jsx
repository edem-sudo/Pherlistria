import { useState } from 'react';
import { Common_Pherlisite } from '../rules/generator/CommonPherlisite.js';

function Mine({setLog, setInventory}){

  const [selected, setSelected] = useState('Random');
  const [output, setOutput] = useState(null);
  const [message, setMessage] = useState(null);

  function generateStone(option){
    const newStone = new Common_Pherlisite(option);
    setOutput(newStone);
    setLog(prev=>[newStone, ...prev]);
    setMessage(null);
  }

  function handleTake(stone){
    setInventory(prev=>[stone, ...prev]);
    setMessage('인벤토리에 보관했습니다.');
    setOutput(null);
  }


  function handleDiscard(){
    setMessage('땅바닥에 던져 부셔버렸습니다.');
    setOutput(null);
  }
  
  return(<>
    <div>
      <label>Select Pherlisite Type: </label>
      <select style={{marginLeft: '0.5rem'}} onChange={e=>{
        setSelected(e.target.value);
      }}>
        <option value="Random">Random</option>
        <option value="Ignisite">Ignisite</option>
        <option value="Glacite">Glacite</option>
        <option value="Ventusite">Ventusite</option>
        <option value="Fulgurite">Fulgurite</option>
        <option value="Territe">Territe</option>
      </select>
    </div>
    
    <button onClick={()=>generateStone(selected)}>Generate</button>

    <h2>Output</h2>
    { 

      output && <Output output={output} handleTake={handleTake} handleDiscard={handleDiscard} /> 
    }

    { message && <Message message={message} />}

  </>);
}

function Output({output, handleTake, handleDiscard}){
  const compositionText = Object.entries(output.composition).map(
    ([key, val]) => (
      <div key={key}>
        <span className={`${key}`}>{key}</span>:{"  "}{val}
      </div>
    )
  );
  return(
    <div className="output">
      <div className="paragraph">
        <div className="type">Pherlisite Type: <span className={`${output.type}`}>{output.type}</span></div>
        <div>density: {output.density}</div>
      </div>

      <div className="paragraph">{compositionText}</div>
      
      <div className="paragraph" style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.5rem'}}>
        <div>
          <div>BT: {output.BT}</div>
          <div>TA: {output.TA}%</div>
        </div>
        <button style={{margin:'0px'}} onClick={()=>{
          handleTake(output);
        }}>Take</button>
        <button style={{margin:'0px'}} onClick={()=>{
          handleDiscard();
        }}>Discard</button>
      </div>
    </div>
  );
}

function Message({message}){
  return(
    <div>
      <h3>{message}</h3>
    </div>
  );
}

export default Mine;