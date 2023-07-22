import './App.css';
import Form from './component/Form';
import TaskArea from './component/TaskArea';


import { useEffect, useState, createContext} from "react";
import {Firebase} from "./firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";
import {BasicContext,DnDContext} from '../src/store/data-context';


async function getTasks(){
  // async function getTasks(status){
  const db = getFirestore(Firebase);
  const ref = collection(db,"kanban-todo");
  const q = query(ref);
  const querySnapshot = await getDocs(q);
  let taskList = [];

  querySnapshot.forEach((doc) => {
    taskList.push(doc.data());
  });

  return taskList;
}

function App() {

  const [taskList, setTaskList] = useState([]);
  const [draggedId, setDraggedId] = useState({name:"defoname",status:"defostatus"});
  const [notStartList, setNotStartList] = useState([]);
  const [workingList, setWorkingList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  let DoneUseEffectFlag = false;
  const db = getFirestore(Firebase);
  const Ref = collection(db, "kanban-todo");


  let temp_notStartList =[];
  let temp_workingList =[];
  let temp_doneList =[];



  let tempList =[];

  // useEffect(() =>{
  //   getTasks().then((items) =>{
  //     tempList =[];
  //     for(let i=0; i<items.length; i++){
  //       tempList.push(items[i]);
  //     }
  //     setTaskList(tempList);
  //   });
  // },[]
  // )

  let newState= [];
  function moveTask(parameter){
    console.log("=======moveTask=======");
    console.log(parameter);

    if(parameter.status == "notStart"){
        console.log("=======notStartList=======");

        newState = updateTaskList(notStartList,parameter);
        setNotStartList(newState);

    }else if(parameter.status == "working"){
        console.log("=======workingList=======");

        newState = updateTaskList(workingList,parameter);
        setWorkingList(newState);

    }else if(parameter.status == "done"){
        console.log("=======doneList=======");

        newState = updateTaskList(doneList,parameter);
        setDoneList(newState);

    }
    const document = doc(Ref, parameter.name);
    setDoc(document, {
        status: parameter.status,
        name: parameter.name
    });

}

function updateTaskList(state_taskList,addTask){
  const returnTaskList = [];
  for(var i=0; i<state_taskList.length; i++){
      returnTaskList.push({name:state_taskList[i].name, status:state_taskList[i].status})
  }
  returnTaskList.push({name:addTask.name, status:addTask.status});

  return returnTaskList;
}

function addTask(newTask){
  console.log("=======addTask=======");
  console.log(newTask);

  newState = updateTaskList(notStartList,newTask);
  setNotStartList(newState);

}

  useEffect(() =>{
    console.log("=======useEffect=======");
    if(DoneUseEffectFlag) return;
    getTasks().then((items) =>{
        console.log("=======getTask=======");
        for(let i=0; i<items.length; i++){
            if(items[i].status == "notStart"){
                temp_notStartList.push(items[i]);
            }else if(items[i].status == "working"){
                temp_workingList.push(items[i]);
            }else if(items[i].status == "done"){
                temp_doneList.push(items[i]);
            }
        }
        setNotStartList(temp_notStartList);
        setWorkingList(temp_workingList);
        setDoneList(temp_doneList);
    });
    DoneUseEffectFlag = true;
  },[]
  )
  return (
    <div className="App">
      <h1>カンバン方式TODO</h1>
      <BasicContext.Provider value={{taskList, setTaskList}}>
        <Form onTaskAdd={addTask}/>
        <DnDContext.Provider value={{draggedId, setDraggedId}}>
            <div id="statusArea" className="width100 centering">
                <TaskArea title={"未着手"} status={"notStart"} taskList={notStartList} onTaskMove={moveTask}/>
                <TaskArea title={"作業中"} status={"working"} taskList={workingList} onTaskMove={moveTask}/>
                <TaskArea title={"完了"} status={"done"} taskList={doneList} onTaskMove={moveTask}/>
            </div>
        </DnDContext.Provider>
      </BasicContext.Provider>
    </div>
  );
}

export default App;
