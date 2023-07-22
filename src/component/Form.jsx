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

function updateTaskList(state_taskList,addTask){
    const returnTaskList = [];
    for(var i=0; i<state_taskList.length; i++){
        returnTaskList.push({name:state_taskList[i].name, status:state_taskList[i].status})
    }
    returnTaskList.push({name:addTask.name, status:addTask.status});

    return returnTaskList;
}

function Form(){
    console.log("==========Form rendering==========");
    const { register, handleSubmit,reset } = useForm();
    const db = getFirestore(Firebase);
    const Ref = collection(db, "kanban-todo");
    const [draggedId, setDraggedId] = useState({name:"defoname",status:"defostatus"});
    const [notStartList, setNotStartList] = useState([]);
    const [workingList, setWorkingList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    let DoneUseEffectFlag = false;


    function onSubmitEventHander(event){
        let newTaskList = notStartList;
        newTaskList.push({status: "notStart",name: event.task});

        const document = doc(Ref, event.task);
        setDoc(document, {
            status: "notStart",
            name: event.task
        });
        setNotStartList(newTaskList);
        reset();
    }

    let temp_notStartList =[];
    let temp_workingList =[];
    let temp_doneList =[];

    function updateTask(parameter){
        console.log("=======updateTask=======");
        console.log(parameter);
        let newState= [];
        
        if(parameter.status == "notStart"){
            console.log("=======notStartList=======");

            newState = updateTaskList(notStartList,parameter);
            setNotStartList(newState);



        }else if(parameter.status == "working"){
            console.log("=======workingList=======");

            newState = updateTaskList(workingList,parameter);
            setWorkingList(newState);

            console.log("=======set後=======");
            console.log(workingList);

        }else if(parameter.status == "done"){
            console.log("=======doneList=======");

            newState = updateTaskList(doneList,parameter);
            setDoneList(newState);

        }

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


    return(
    <div>
        <form name="newTask" onSubmit={handleSubmit(onSubmitEventHander)} >
            <input id="task" type="text" {...register('task')}/>
            <input type="submit" value="追加"/>
        </form>
        <DnDContext.Provider value={{draggedId, setDraggedId}}>
            <div id="statusArea" className="width100 centering">
                <TaskArea title={"未着手"} status={"notStart"} taskList={notStartList} func={updateTask}/>
                <TaskArea title={"作業中"} status={"working"} taskList={workingList} func={updateTask}/>
                <TaskArea title={"完了"} status={"done"} taskList={doneList} func={updateTask}/>
            </div>
        </DnDContext.Provider>
    </div>

    )

}
export default Form;