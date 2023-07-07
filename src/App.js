import './App.css';
import Form from './component/Form';
import TaskArea from './component/TaskArea';


import { useEffect, useState, useRef } from "react";
import {Firebase} from "./firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";


async function getTasks(status){

  const db = getFirestore(Firebase);
  const ref = collection(db,"kanban-todo");
  const q = query(ref);
  const querySnapshot = await getDocs(q);
  const taskList = [];

  querySnapshot.forEach((doc) => {
      if(doc.data().status === status){
          taskList.push(doc.data().name);
      }
  });

  return taskList;
}

function App() {
  const [notStartTasks,setNotStartTasks] = useState([]);
  const [workingTasks,setWorkingTasks] = useState([]);
  const [doneTasks,setDoneTasks] = useState([]);
  let tempList =[];

  useEffect(() =>{
    getTasks("notStart").then((items) =>{
      tempList =[];
      for(let i=0; i<items.length; i++){
        tempList.push(items[i]);
      }
      setNotStartTasks(tempList);
    });
    getTasks("working").then((items) =>{
      tempList =[];
      for(let i=0; i<items.length; i++){
        tempList.push(items[i])
      }
      setWorkingTasks(tempList);
    });
    getTasks("done").then((items) =>{
      tempList =[];
      for(let i=0; i<items.length; i++){
        tempList.push(items[i])
      }
      setDoneTasks(tempList);
    });
  },[]
  )

  return (
    <div className="App">
      <h1>カンバン方式TODO</h1>
      <Form />

      <div id="statusArea" className="width100 centering">
        <TaskArea title={"未着手"} status={"notStart"} tasks={notStartTasks}/>
        <TaskArea title={"作業中"} status={"working"} tasks={workingTasks}/>
        <TaskArea title={"完了"} status={"done"} tasks={doneTasks}/>
      </div>
    </div>
  );
}

export default App;
