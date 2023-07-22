import './App.css';
import Form from './component/Form';
import TaskArea from './component/TaskArea';


import { useEffect, useState, createContext} from "react";
import {Firebase} from "./firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";
import {BasicContext} from '../src/store/data-context';

// async function getTasks(){
//   // async function getTasks(status){

//   const db = getFirestore(Firebase);
//   const ref = collection(db,"kanban-todo");
//   const q = query(ref);
//   const querySnapshot = await getDocs(q);
//   const taskList = [];

//   querySnapshot.forEach((doc) => {
//     taskList.push(doc.data());
//   });

//   return taskList;
// }

function App() {

  const [taskList, setTaskList] = useState([]);
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

  return (
    <div className="App">
      <h1>カンバン方式TODO</h1>
      <BasicContext.Provider value={{taskList, setTaskList}}>
        <Form />
      </BasicContext.Provider>
    </div>
  );
}

export default App;
