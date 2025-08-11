import Header from "../components/Header";
import AddNewTask from "../components/tasks/AddNewTask";
import TaskCard from "../components/tasks/TaskCard";
import AddNewBoard from "../components/board/AddNewBoard";
//import TaskInfo from "../components/tasks/TaskInfo";

function App() {
   return (
      <>
         <Header title="Platform" />
         <main className="bg-light-grey-1 min-h-screen px-4 py-6">
            <TaskCard />
            {/* <TaskInfo /> */}
            <AddNewBoard />
         </main>
      </>
   );
}

export default App;
