import { toggleSubtask } from "../../redux/boardSlice";
import { useSelector, useDispatch } from "react-redux";
import DropdownMenu from "../shared/DropdownMenu";
import ModalLayout from "../shared/ModalLayout";
import SelectInput from "../input-fields/SelectInput";

export default function TaskInfo({ task, handleClick }) {
   const dispatch = useDispatch();
   const completedTask = (arg) => {
      return arg.filter((sub) => sub.isCompleted).length;
   };

   const { activeBoard, value, activeTask } = useSelector(
      (state) => state.boards,
   );

   const handleCheckboxChange = (subtaskIndex) => {
      dispatch(
         toggleSubtask({
            columnIndex: activeTask.columnIndex,
            taskIndex: activeTask.taskIndex,
            subtaskIndex,
         }),
      );
   };

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
            Subtasks ({completedTask(task.subtasks)} of {task.subtasks.length})
         </p>

         <div className="mb-6 flex flex-col gap-y-2">
            {task.subtasks.map((item, index) => (
               <div
                  className="bg-light-grey-1 rounded p-3 grid grid-cols-[16px_auto] gap-x-6 items-center"
                  key={index}
               >
                  <input
                     id={index}
                     name={index}
                     type="checkbox"
                     className="h-4 w-4 accent-main-purple"
                     checked={item.isCompleted}
                     onChange={() => handleCheckboxChange(index)}
                  />
                  <label htmlFor={index} className="text-xs font-bold text-black-1 peer-checked:line-through peer-checked:text-grey">
                     {item.title}
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
