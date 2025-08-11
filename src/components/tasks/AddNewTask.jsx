import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../input-fields/TextInput";
import TextAreaInput from "../input-fields/TextAreaInput";
import SelectInput from "../input-fields/SelectInput";
import ModalLayout from "../ModalLayout";
import schemas from "../../schema";

export default function AddNewTask() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.taskSchema),
      defaultValues: {
         items: [{ task: "" }],
         status: { label: "Todo", value: "Todo" },
      },
   });

   const { fields, append, remove } = useFieldArray({
      name: "items",
      control,
   });

   function addSubTask() {
      append({
         task: "",
      });
   }

   async function onSubmit(formData) {
      console.log(formData);
      setStep("account-validation");
   }

   return (
      <ModalLayout title="Add New Task">
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
            />
            <TextAreaInput
               label="Description"
               name="description"
               placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
               fieldName={register("description")}
               errorMessage={errors.description?.message}
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
                              fieldName={register(`items.${index}.task`)}
                              errorMessage={
                                 errors?.items?.[index]?.task?.message
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
                     options={["Todo", "Doing", "Done"]}
                     field={field}
                     onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                     }}
                  />
               )}
            />
            <button className="btn purple w-full !text-[13px]">
               Create Task
            </button>
         </form>
      </ModalLayout>
   );
}
