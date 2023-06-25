import './App.css';
import { useForm } from 'react-hook-form';
import Form from './component/Form';
import { useEffect } from 'react';

function App() {
  const { register, handleSubmit } = useForm();

  function onDropEvent(event){
    console.log("dropped");
    console.log(event);
  }

  function onDragOver(event){
    event.preventDefault(); // これがないとdropイベントが発火しない
  }

  function onSubmitEventHander(event){
    console.log(event.task);
  }

  const noStartTasks = ["nostart","taskA","taskB"];
  const list = noStartTasks.map((noStartTask) => <ol className="list-centering list" draggable="true" key={noStartTask}>{noStartTask}</ol>);

  const workingTasks = ["working","taskA","taskB"];
  const workingList = workingTasks.map((workingTask) => <ol className="list-centering list" draggable="true" key={workingTask}>{workingTask}</ol>);

  const doneTasks = ["done","taskA","taskB"];
  const doneList = doneTasks.map((doneTask) => <ol className="list-centering list" draggable="true" key={doneTask}>{doneTask}</ol>);


  return (
    <div className="App">
      <h1>カンバン方式TODO</h1>
      <Form />

      <div id="statusArea" className="width100 centering">
        <div id="notStart" className="left statusBox width30" onDragOver={onDragOver} onDrop={onDropEvent}>
          <h2>未着手</h2>
          <ul dropzone="move">
            {list}
          </ul>
        </div>
        <div id="working" className="left statusBox width30" onDragOver={onDragOver} onDrop={onDropEvent}>
          <h2>作業中</h2>
          <ul dropzone="move">
            {workingList}
          </ul>
        </div>
        <div id="done" className="left statusBox width30" onDragOver={onDragOver} onDrop={onDropEvent}>
          <h2>完了</h2>
          <ul dropzone="move">
            {doneList}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
