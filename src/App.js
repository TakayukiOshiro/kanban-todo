import './App.css';
import { useForm } from 'react-hook-form';
import Form from './component/Form';
import TaskArea from './component/TaskArea';

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
  return (
    <div className="App">
      <h1>カンバン方式TODO</h1>
      <Form />

      <div id="statusArea" className="width100 centering">
        <TaskArea title={"未着手"} status={"noStart"}/>
        <TaskArea title={"作業中"} status={"working"}/>
        <TaskArea title={"完了"} status={"done"}/>
      </div>
    </div>
  );
}

export default App;
