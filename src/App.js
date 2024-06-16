import {useState, useEffect } from 'react';
import './App.css';

function App() {

  let st1 = {border:'1px solid #333'};
  let st2 = {border:'transparent'};
  let oldlist = JSON.parse(localStorage.getItem("oll"));
  if(oldlist === null)oldlist = [
    {task:"Learn JavaScript",check:false},
    {task:"Learn React",check:false},
    {task:"Build a React App",check:false}];
  const [list, setList] = useState(oldlist);
  const [dislpayL,setdislpayL] = useState(list);
  const [apply,setApply] = useState(0);

  //Handle Adding
  useEffect(() => {
    localStorage.setItem('oll', JSON.stringify(list));
    setdislpayL(list);
    setApply(0);
  },[list]);
  const [newTodo,setNewTodo] = useState({task:"",check:false});
  const changetask = (e)=>{
    setNewTodo({...newTodo,task:e.target.value});
  }
  const addItem = ()=>{
    if(newTodo.task !== ""){
      setList([...list,newTodo]);
      setNewTodo({task:"",check:false});
    }
    else alert("you should type task to perform");
  }

  //Handle changing state
  const changeState = (indx)=>{
    let temp = [...list];
    temp[indx].check = !temp[indx].check;
    setList(temp);
  }
  const [counter,setCounter] =  useState(0);
  useEffect(()=>{
    let count = 0;
    list.forEach((item)=>{if(item.check===false)count++;});
    setCounter(count);
  },[list]);

  //Handle Search
  const Lsearch = ()=>{
    let temp = list.filter((item)=>item.task.includes(newTodo.task));
    setdislpayL(temp);
  }

  //Handle All
  const dispALL = ()=>{
    let temp = [...list];
    setdislpayL(temp);
    setApply(0);
  }
  //Handle Active
  const dispActive = ()=>{
    let temp = list.filter((item)=>item.check===false);
    setdislpayL(temp);
    setApply(1);
  }
  //Handle Completed
  const dispComp = ()=>{
    let temp = list.filter((item)=>item.check===true);
    setdislpayL(temp);
    setApply(2);
  }
  return (
    <div className="App">

      <header>
        <h1>THINGS TO DO</h1>
      </header>

      <main>
        <input 
        type="text" 
        placeholder="Add New / Search for elem"
        value={newTodo.task}
        onChange={(e)=>changetask(e)}/>
        <ul>
          {
           dislpayL.map((elem,key)=>{
            return(
            <li>
              <input 
              type="checkbox"
              checked={elem.check}
              onChange={()=>changeState(key)}
              name="li"
              id={key}/>
              <label htmlFor={key}>{elem.task}</label>
            </li>)
           })
          }
        </ul>
      </main>

      <footer>
        <button 
        className='gg-math-plus'
        onClick={addItem}></button>
        <button className='gg-search'
        onClick={Lsearch}></button>
         <span>|</span>
         <span> {counter} items left</span> 
         <button
         onClick={dispALL} style={(apply===0)? st1:st2}>All</button>
         <button
         onClick={dispActive} style={(apply===1)? st1:st2}>Active</button>
         <button
         onClick={dispComp} style={(apply===2)? st1:st2}>Completed</button>
      </footer>
    </div>
  );
}

export default App;
