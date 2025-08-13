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

   const {
      activeBoard,
      value: boardList,
      activeTask,
   } = useSelector((state) => state.boards);

   const activeBoardData = boardList.find(
      (board) => board.name === activeBoard,
   );

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
            <h1 className="text-black-1 font-bold text-lg leading-6">
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
         <p className="font-bold text-xs text-grey mb-4">
            Subtasks ({completedCount} of {task.subtasks.length})
         </p>

         <div className="mb-6 flex flex-col gap-y-2">
            {task.subtasks.map((item, index) => (
               <div className="bg-light-grey-1 rounded p-3" key={index}>
                  <label
                     htmlFor={`subtask-${index}`}
                     className="grid grid-cols-[16px_auto] gap-x-6 items-center"
                  >
                     <input
                        id={`subtask-${index}`}
                        name={index}
                        className="peer accent-main-purple h-4 w-4"
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
                     <span className="text-xs font-bold text-black-1 peer-checked:line-through peer-checked:opacity-50">
                        {item.title}
                     </span>
                  </label>
               </div>
            ))}
         </div>
         {/* errorMessage={error} */}
         <SelectInput
            label="Current Status"
            options={["Todo", "Doing", "Done"]}
            field={{ value: selectedOption }}
            onChange={handleSelectChange}
         />
      </ModalLayout>
   );
}
