import { useSelector, useDispatch } from "react-redux";
import { updateTaskInfo } from "../../redux/boardSlice";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import TextInput from "../input-fields/TextInput";
import TextAreaInput from "../input-fields/TextAreaInput";
import SelectInput from "../input-fields/SelectInput";
import ModalLayout from "../shared/ModalLayout";
import schemas from "../../schema";

export default function EditTask({ handleClick, onEditSuccess }) {
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

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.taskSchema),
      defaultValues: {
         subtasks: task.subtasks.map((item) => ({
            task: item.title || "",
         })),
         status: { label: task.status, value: task.status },
      },
   });

   const { fields, append, remove } = useFieldArray({
      name: "subtasks",
      control,
   });

   function addSubTask() {
      append({
         task: "",
      });
   }

   async function onSubmit(formData) {
      console.log(formData);
      let payload = {
         title: formData.title,
         description: formData.description,
         status: formData.status.value,
         subtasks: formData.subtasks.map((item) => ({
            title: item.task, // or item if it's just a string
            isCompleted: item.isCompleted,
         })),
      };
      dispatch(updateTaskInfo(payload));
      toast.success("Task updated successfully");
      onEditSuccess();
   }

   return (
      <ModalLayout title="Edit Task" handleClick={handleClick}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6 h-[470px] overflow-y-auto -mr-4 pr-4 modal-scroll"
         >
            <TextInput
               label="Title"
               name="title"
               placeholder="e.g. Take coffee break"
               fieldName={register("title")}
               errorMessage={errors.title?.message}
               defaultValue={task.title}
            />
            <TextAreaInput
               label="Description"
               name="description"
               placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
               fieldName={register("description")}
               errorMessage={errors.description?.message}
               defaultValue={task.description}
            />
            <div>
               <p className="label text-grey">Subtasks</p>
               <div className="flex flex-col gap-y-3">
                  {fields.map((field, index) => {
                     return (
                        <div
                           key={field.id}
                           className="grid grid-cols-[auto_20px] gap-x-4"
                        >
                           <TextInput
                              name="task"
                              placeholder="e.g. Make coffee"
                              fieldName={register(`subtasks.${index}.task`)}
                              errorMessage={
                                 errors?.subtasks?.[index]?.task?.message
                              }
                           />
                           <button type="button" onClick={() => remove(index)}>
                              <img src="/assets/icon-cross.svg" alt="" />
                           </button>
                        </div>
                     );
                  })}
               </div>
               <button
                  className="btn sec-btn w-full mt-3"
                  type="button"
                  onClick={addSubTask}
               >
                  + Add new subtask
               </button>
            </div>

            <Controller
               name="status"
               control={control}
               render={({ field }) => (
                  <SelectInput
                     label="Status"
                     options={columnsList}
                     field={field}
                     onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                     }}
                  />
               )}
            />
            <button className="btn purple w-full !text-[13px]">
               Save Changes
            </button>
         </form>
      </ModalLayout>
   );
}
