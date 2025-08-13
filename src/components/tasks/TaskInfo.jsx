import { toggleSubtask } from "../../redux/boardSlice";
import { useSelector, useDispatch } from "react-redux";
import DropdownMenu from "../shared/DropdownMenu";
import ModalLayout from "../shared/ModalLayout";
import SelectInput from "../input-fields/SelectInput";

export default function TaskInfo({ handleClick }) {
   const dispatch = useDispatch();
   //    const completedTask = (arg) => {
   //       return arg.filter((sub) => sub.isCompleted).length;
   //    };

   //    const { activeBoard, value, activeTask } = useSelector((state) => state.boards);

   // const activeBoardData = value.find(board => board.name === activeBoard);
   // const currentTask = activeBoardData.columns[activeTask.columnIndex]
   //    .tasks[activeTask.taskIndex];

   //    const handleCheckboxChange = (subtaskIndex) => {
   //       dispatch(
   //          toggleSubtask({
   //             columnIndex: activeTask.columnIndex,
   //             taskIndex: activeTask.taskIndex,
   //             subtaskIndex,
   //          }),
   //       );
   //    };

   const { activeBoard, value, activeTask } = useSelector(
      (state) => state.boards,
   );
   const activeBoardData = value.find((board) => board.name === activeBoard);

   const task =
      activeTask && activeBoardData
         ? activeBoardData.columns[activeTask.columnIndex].tasks[
              activeTask.taskIndex
           ]
         : null;

   if (!task) return null;

   const completedCount = task.subtasks.filter((s) => s.isCompleted).length;

   return (
      <ModalLayout handleClick={handleClick}>
         <div className="grid grid-cols-[90%_auto] justify-between">
            <h1 className="text-black-1 font-bold text-lg leading-6">
               {task.title}
            </h1>
            <DropdownMenu actionType="Task" />
         </div>

         <p className="my-6 text-[13px] font-medium text-grey leading-6">
            {task.description}
         </p>
         <p className="font-bold text-xs text-grey mb-4">
            Subtasks ({completedCount} of {task.subtasks.length})
         </p>

         <div className="mb-6 flex flex-col gap-y-2">
            {task.subtasks.map((item, index) => (
               <div className="bg-light-grey-1 rounded p-3" key={index}>
                  <label
                     htmlFor={`subtask-${index}`}
                     className="text-xs font-bold text-black-1 peer-checked:line-through peer-checked:text-grey  grid grid-cols-[16px_auto] gap-x-6 items-center"
                  >
                     <input
                        id={`subtask-${index}`}
                        name={index}
                        className="accent-main-purple h-5 w-5"
                        checked={item.isCompleted}
                        type="checkbox"
                        onChange={() =>
                           dispatch(
                              toggleSubtask({
                                 subtaskIndex: index,
                              }),
                           )
                        }
                     />
                     <span>{item.title}</span>
                  </label>
               </div>
            ))}
         </div>

         <SelectInput
            label="Current Status"
            options={["To do", "Doing", "Done"]}
            defaultValue={{ label: "Todo", value: "Todo" }}
         />
         {/* field={field}
            onChange={(selectedOption) => {
               field.onChange(selectedOption);
            }} */}
      </ModalLayout>
   );
}
