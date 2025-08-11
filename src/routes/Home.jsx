import Header from "../components/Header";
import TaskCard from "../components/tasks/TaskCard";
import TaskInfo from "../components/tasks/TaskInfo";

function App() {
   return (
      <>
         <Header title="Platform" />
         <main className="bg-light-grey-1 min-h-screen px-4 py-6">
            <TaskCard />
            <TaskInfo />
         </main>
      </>
   );
}

export default App;
