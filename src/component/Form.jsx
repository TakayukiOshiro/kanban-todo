import { useForm } from 'react-hook-form';
import {Firebase} from "../firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";
import {BasicContext,DnDContext} from '../store/data-context.jsx';
import { useEffect, useState, useContext } from "react";
import TaskArea from './TaskArea.jsx';

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



function Form({onTaskAdd}){
    console.log("==========Form rendering==========");
    const { register, handleSubmit,reset } = useForm();
    const db = getFirestore(Firebase);
    const Ref = collection(db, "kanban-todo");
  



    function onSubmitEventHander(event){
        let newTask = {status: "notStart",name: event.task};
      
        const document = doc(Ref, event.task);
        setDoc(document, {
            status: "notStart",
            name: event.task
        });
        onTaskAdd(newTask);
        reset();
      }







    return(
    <div>
        <form name="newTask" onSubmit={handleSubmit(onSubmitEventHander)} >
            <input id="task" type="text" {...register('task')}/>
            <input type="submit" value="追加"/>
        </form>

    </div>

    )

}
export default Form;