import { useContext } from "react"
import AuthContext from "../shared/context/AuthContex"
import ToDoList from "../toDoList/components/to-do-list/ToDoList";


function HomePage(){
    const { user } = useContext(AuthContext);
    console.log(user);
    return (user ? (
        <div>
            <p>You are logged in to the homepage!</p>
            <ToDoList></ToDoList>
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default HomePage