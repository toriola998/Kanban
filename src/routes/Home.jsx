import Header from "../components/shared/Header";
import SideNav from "../components/shared/SideNav";
import TaskCard from "../components/tasks/TaskCard";

function App() {
   return (
      <div className="flex w-full">
         <SideNav />
         <div className="w-full">
            <Header />

            <main className="bg-light-grey-1 min-h-screen px-4 py-6">
               <TaskCard />
            </main>
         </div>
      </div>
   );
}

export default App;
