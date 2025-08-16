import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewBoard } from "../../redux/boardSlice";
import TextInput from "../input-fields/TextInput";
import ModalLayout from "../shared/ModalLayout";
import schemas from "../../schema";

export default function AddNewBoard({ handleClick, onCreateBoardSuccess }) {
   const dispatch = useDispatch();
   const { boardsList } = useSelector((state) => state.boards);
   const boardNames = boardsList.map((item) => item.name);

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.boardSchema),
      defaultValues: {
         columns: [{ column: "" }],
      },
   });

   const { fields, append, remove } = useFieldArray({
      name: "columns",
      control,
   });

   function addColumn() {
      append({
         column: "",
      });
   }

   function onSubmit(formData) {
      let payload = {
         name: formData.boardName,
      };
      const isBoardNameExist = boardNames.some(
         (item) => item.toLowerCase() === formData.boardName.toLowerCase(),
      );
      if (isBoardNameExist) {
         toast.error("Board Name already exists");
         return;
      }

      // Remove empty column names and trim
      let filteredColumns = formData.columns
         .map((col) => col.column.trim())
         .filter((name) => name !== "")
         .map((name) => ({
            name,
            tasks: [],
         }));

      // Prevent duplicate column names
      const uniqueNames = new Set(
         filteredColumns.map((col) => col.name.toLowerCase()),
      );
      if (uniqueNames.size !== filteredColumns.length) {
         toast.error("Column names must be unique");
         return;
      }

      if (filteredColumns.length > 0) {
         payload.columns = filteredColumns;
      }

      dispatch(createNewBoard(payload));
      toast.success("Board created successfully");
      onCreateBoardSuccess();
   }

   return (
      <ModalLayout title="Add New Board" handleClick={handleClick}>
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
                              fieldName={register(`columns.${index}.column`)}
                              errorMessage={
                                 errors?.columns?.[index]?.column?.message
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
