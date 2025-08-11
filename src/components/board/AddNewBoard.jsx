import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../input-fields/TextInput";
import ModalLayout from "../ModalLayout";
import schemas from "../../schema";

export default function AddNewBoard() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.boardSchema),
      defaultValues: {
         items: [{ column: "" }],
      },
   });

   const { fields, append, remove } = useFieldArray({
      name: "items",
      control,
   });

   function addColumn() {
      append({
         column: "",
      });
   }

   async function onSubmit(formData) {
      console.log(formData);
   }

   return (
      <ModalLayout title="Add New Board">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6 h-[300px] overflow-y-auto -mr-4 pr-4 modal-scroll"
         >
            <TextInput
               label="Board Name"
               name="boardName"
               placeholder="e.g. Todo"
               fieldName={register("boardName")}
               errorMessage={errors.boardName?.message}
            />

            <div>
               <p className="label text-grey">Board Columns</p>
               <div className="flex flex-col gap-y-3">
                  {fields.map((field, index) => {
                     return (
                        <div
                           key={field.id}
                           className="grid grid-cols-[auto_20px] gap-x-4"
                        >
                           <TextInput
                              name="column"
                              placeholder="e.g. Make coffee"
                              fieldName={register(`items.${index}.column`)}
                              errorMessage={
                                 errors?.items?.[index]?.column?.message
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
                  onClick={addColumn}
               >
                  + Add new column
               </button>
            </div>

            <button className="btn purple w-full !text-[13px]">
               Create New Board
            </button>
         </form>
      </ModalLayout>
   );
}
