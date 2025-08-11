import Header from "../components/Header";
import TaskCard from "../components/tasks/TaskCard";

function App() {
   return (
      <>
         <Header title="Platform" />
         <main className="bg-light-grey-1 min-h-screen px-4 py-6">
            <TaskCard />
         </main>
      </>
   );
}

export default App;
