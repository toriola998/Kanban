import { useForm, Controller } from "react-hook-form";
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
   });

   async function onSubmit(formData) {
      console.log(formData);
      setStep("account-validation");
   }

   return (
      <ModalLayout title="Add New Task">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3"
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
            <Controller
               name="status"
               control={control}
               render={({ field }) => (
                  <SelectInput
                     label="Status"
                     options={["To do", "Doing", "Done"]}
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
