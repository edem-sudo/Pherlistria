import { useState } from 'react';
import { Rhesite_Pherlisite } from '../rules/generator/RhesitePherlisite.js';

function Observatory({setLog, setInventory}){

  const [output, setOutput] = useState(null);
  const [message, setMessage] = useState(null);
  const [input, setInput] = useState(['','','']);

  function normalizeTo100(arr){
    if(!Array.isArray(arr) || arr.length !== 3){
      setMessage('길이 3이어야함');
      setOutput(null);
      return;
    }
    if(arr.some(v => v === null || v === '')){
      setMessage('빈칸 있으면 안됨');
      setOutput(null);
      return;
    }
    if(arr.some(v => typeof v !== 'number' || Number.isNaN(v))){
      setMessage('숫자여야함');
      setOutput(null);
      return;
    }
    if(arr.some(v => v === 0)){
      setMessage('0 있으면 안됨');
      setOutput(null);
      return;
    }

    const min = Math.min(...arr);
    if(arr.filter(v=>v===min).length !== 1){
      setMessage('최솟값은 하나여야 함');
      setOutput(null);
      return;
    }

    const sum = arr.reduce((a,b) => a+b, 0);
    const result = arr.map(v => (v/sum)*100);
    return result;
  }

  function generateStone(arr){
    const result = normalizeTo100(arr);
    if(!result) return;
    const newStone = new Rhesite_Pherlisite(result);
    setOutput(newStone);
    setLog(prev=>[newStone, ...prev]);
  }

  function handleTake(stone){
    setInventory(prev=>[stone, ...prev]);
    setMessage('인벤토리에 보관했습니다.');
    setOutput(null);
  }
  function handleDiscard(){
    setMessage('땅바닥 던져 어쩌구.');
    setOutput(null);
  }
  
  
  return(<>
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <span>Enter Composition Ratio</span>

      {['lum', 'ten', 'cos'].map((key, i)=>(
        <label key={key}>
          {key}
          <input
            type='number'
            name={key}
            value={input[i]}
            style={{width: '3rem', marginLeft: '0.25rem'}}
            onChange={e=>{
              const copy = [...input];
              const value = e.target.value;
              copy[i] = value === '' ? null : Number(value);
              setInput(copy);
            }}
          />
        </label>
      ))}
    </div>

    <button onClick={()=>{
      setMessage(null);
      generateStone(input);
      setInput(['', '', '']);
    }}>Generate</button>
    
    <h2>Output</h2>

    { output && <Output output={output} handleTake={handleTake} handleDiscard={handleDiscard} /> }

    { message && <Message message={message} />}

    
  </>)
}

function Output({output, handleTake, handleDiscard}){
  const compositionText = Object.entries(output.composition).map(
    ([key, val]) => (
      <div key={key}>
        <span className={`${key}`}>{key}</span>:{" "}{val}
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

      <div className="paragraph" style={{display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem'}}>
        <div>
          <div>BT: {output.BT}</div>
          <div>TA: {output.TA}</div>
        </div>
        <button style={{margin:'0px'}}onClick={()=>{
          handleTake(output);
        }}>Take</button>
        <button style={{margin:'0px'}}onClick={()=>{
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
  )
}

export default Observatory;