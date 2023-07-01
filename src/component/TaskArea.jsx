function TaskArea({title,status}){

    const noStartTasks = [title,status,"taskB"];
    const list = noStartTasks.map((noStartTask) => <ol className="list-centering list" draggable="true" key={noStartTask}>{noStartTask}</ol>);

    function onDropEvent(event){
        console.log("dropped");
        console.log(event.target);

      }
    
      function onDragOver(event){
        event.preventDefault(); // これがないとdropイベントが発火しない
      }

    return(
        <div id={status} className="left statusBox width30" onDragOver={onDragOver} onDrop={onDropEvent}>
          <h2>{title}</h2>
          <ul dropzone="move">
            {list}
          </ul>
        </div>
    )
}

export default TaskArea;