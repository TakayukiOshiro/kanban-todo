import { useEffect, useState, useRef } from "react";
import {Firebase} from "../firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";

function TaskArea({title,status,tasks}){

    const [task,setTask] = useState([]);

    function onDropEvent(event){
        // console.log("dropped");

    }

    function onDragStartHandler(event){
        // console.log("onDragStartHandler");
        // console.log(event.target.innerText);

    }

    function onDragEndHandler(event){
        // console.log("onDragEndHandler");
        setTask([...task, event.target.innerText]);
    }

    function getTaskList(){
        let taskList = [];
        for(let i=0; i<tasks.length; i++){
            taskList[i] = <ol className="list-centering list" draggable="true" onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} key={tasks[i]}>{tasks[i]}</ol>;
        }
        return taskList;
    }


    function onDragOver(event){
        event.preventDefault(); // これがないとdropイベントが発火しない
    }

    return(
        <div id={status} className="left statusBox width30" onDragOver={onDragOver} onDrop={onDropEvent}>
            <h2>{title}</h2>
            <ul dropzone="move">
                {
                    getTaskList()
                }
            </ul>
        </div>
    )
}

export default TaskArea;