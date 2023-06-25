import { useForm } from 'react-hook-form';
import {Firebase} from "../firebase.js";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

function Form(){
    const { register, handleSubmit } = useForm();
    const db = getFirestore(Firebase);
    const Ref = collection(db, "kanban-todo");

    function onSubmitEventHander(event){
        console.log(event.task);
        const document = doc(Ref, event.task);
        setDoc(document, {
            name: event.task,
            status: "notStart"
        });
    }


    return(
        <form name="newTask" onSubmit={handleSubmit(onSubmitEventHander)} >
            <input id="task" type="text" {...register('task')}/>
            <input type="submit" value="追加"/>
        </form>

    )

}
export default Form;