import React, { useState } from 'react';
//mock data
export default function App(){
  let data=[{task:"Dancing",complet:false},{task:"Singing",complet:false},{task:"Painting",complet:false},{task:"Piano",complet:false},{task:"Typing",complet:false},{task:"Cooking",complet:false},{task:"Studying",complet:false},{task:"Coding",complet:false},{task:"Television",complet:false}]
  const[task,setTask]=useState(data);
  console.table(task);
  function handlFilter(e){
    e.preventDefault();
    let filteredData=[],j=0;
    for(let i=0;i<task.length;i++){
      if(!task[i].complet){
        filteredData[j]=task[i];
        j++;
      }
    }
    setTask(filteredData);
  }

  return(
    <div className='ToDoList' style={{textAlign:"center"}}>
      <Header/>
      <ToDoList task={task} setTask={setTask}/>
      <Clear handlFilter={handlFilter}/>
      <SubmitForm task={task} setTask={setTask}/>
    </div>
  );
}
function Header(){
  return <h1>To Do List</h1>;
}
function ToDoList(props){ 
  return(
    <div className='ToDos' style={{fontSize:25}}>{
      props.task.map((item)=>{
        return <ToDo key={item.task} task={props.task} item={item} setTask={props.setTask}/>
      })
    }
    </div>
  );
}
function ToDo(props){
  function handleToggle(e){
    e.preventDefault();
    if(props.item.complet){ 
      e.target.style.textDecoration="";
      props.item.complet=false;
      
    }
    else if(!props.item.complet){
      e.target.style.textDecoration="line-through";
      props.item.complet=true;
      
    }

    let copy=[...props.task]
    copy[props.item.index].complet=props.item.complet;
    props.setTask(copy);
  }
  return <div key={props.item.task} style={{cursor:"pointer"}} onClick={(e)=>{handleToggle(e)}}>{props.item.task}</div>
}
function Clear(props){
 return <button style={{fontSize:23,marginTop:15,cursor:"pointer"}}onClick={(e)=>props.handlFilter(e)}>Clear</button>
}
function SubmitForm(props){
  function submit(e){
    e.preventDefault();
    let input=document.getElementById("input");
    let newTask=[...props.task];
    newTask[props.task.length]={task:input.value,complet:false};
    props.setTask(newTask);
    input.value="";
  }
  return(
    <form>
       <input id='input' style={{widith:18,height:25,marginTop:10}} type={"text"} placeholder="Type a task to submit...."/>
       <button onClick={(e)=>submit(e)} style={{widith:18,height:28,marginLeft:1,cursor:"pointer"}}>Submit</button>
    </form>
  );
}
