import { toggleSubtask, updateTaskStatus } from "../../redux/boardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DropdownMenu from "../shared/DropdownMenu";
import ModalLayout from "../shared/ModalLayout";
import SelectInput from "../input-fields/SelectInput";

export default function TaskInfo({
   handleClick,
   edit,
   deleteItem,
   onChangeStatus,
}) {
   const dispatch = useDispatch();

   const { activeBoardName, boardsList, activeTask } = useSelector(
      (state) => state.boards,
   );

   const activeBoardData = boardsList.find(
      (board) => board.name === activeBoardName,
   );
   const columnsList =
      activeBoardData?.columns.map((column) => column.name) || [];

   const task =
      activeTask && activeBoardData
         ? activeBoardData.columns[activeTask.columnIndex].tasks[
              activeTask.taskIndex
           ]
         : null;

   if (!task) return null;

   const completedCount = task.subtasks.filter((s) => s.isCompleted).length;

   const defaultOption = { label: task.status, value: task.status };

   const [selectedOption, setSelectedOption] = useState(defaultOption);

   const handleSelectChange = (option) => {
      setSelectedOption(option);
      dispatch(updateTaskStatus(option?.value));
      onChangeStatus();
   };

   return (
      <ModalLayout handleClick={handleClick}>
         <div className="grid grid-cols-[90%_auto] justify-between">
            <h1 className="text-black-1 dark:text-white font-bold text-lg leading-6">
               {task.title}
            </h1>
            <DropdownMenu
               edit={edit}
               deleteItem={deleteItem}
               actionType="Task"
            />
         </div>

         <p className="my-6 text-[13px] font-medium text-grey leading-6">
            {task.description}
         </p>
         <p className="font-bold text-xs text-grey dark:text-white mb-4">
            Subtasks ({completedCount} of {task.subtasks.length})
         </p>

         <div className="mb-6 flex flex-col gap-y-2">
            {task.subtasks.map((item, index) => (
               <div
                  className="bg-light-grey-1 dark:bg-dark-grey rounded p-3 hover:bg-grey-4 cursor-pointer"
                  key={index}
               >
                  <label
                     htmlFor={`subtask-${index}`}
                     className="grid grid-cols-[16px_auto] gap-x-6 items-center cursor-pointer"
                  >
                     <input
                        id={`subtask-${index}`}
                        name={index}
                        className="peer accent-main-purple h-4 w-4 "
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
                     <span className="text-xs font-bold text-black-1 dark:text-white peer-checked:line-through peer-checked:opacity-50">
                        {item.title}
                     </span>
                  </label>
               </div>
            ))}
         </div>
         {/* errorMessage={error} */}
         <SelectInput
            label="Current Status"
            options={columnsList}
            field={{ value: selectedOption }}
            onChange={handleSelectChange}
         />
      </ModalLayout>
   );
}
