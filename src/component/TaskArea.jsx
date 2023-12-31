import { useEffect, useState, useContext, useMemo} from "react";
import {Firebase} from "../firebase.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs} from "firebase/firestore";
import {BasicContext,DnDContext} from '../store/data-context.jsx';

function TaskArea({title,status,taskList,onTaskMove}){
console.log(title + " TaskArea rendering");
console.log(taskList);
    const dndContext = useContext(DnDContext);


    let tempList = [];

    function onDropEvent(event){
        console.log("=======" + title + " onDropEvent=======");
        let newTaskStatus = dndContext.draggedId;
        newTaskStatus.status = status;
        onTaskMove(newTaskStatus);

    }

    let dragInfo = dndContext.draggedId;
    function onDragStartHandler(event){
        console.log("==========" + title + " onDragStartHandler==========");
        dragInfo.name = event.target.innerText;
        dragInfo.status = status;

        dndContext.setDraggedId(dragInfo);
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].name == dragInfo.name){
                taskList.splice(i,1);
                break;
            }
        }

    }

    function onDragEndHandler(event){
        console.log("==========" + title + " onDragEndHandler==========");
        // for(let i=0; i<taskList.length; i++){
        //     if(taskList[i].name == dragInfo.name){
        //         taskList.splice(i,1);
        //         break;
        //     }
        // }
        // console.log(taskList);
    }

    function getTaskList(){
        tempList = [];
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].status == status){
                tempList[i] = <ol className="list-centering list" draggable="true" onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} key={"id" + i}>{taskList[i].name}</ol>;
            }
        }
        return tempList;
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