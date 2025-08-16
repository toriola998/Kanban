import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { editBoard } from "../../redux/boardSlice";
import TextInput from "../input-fields/TextInput";
import ModalLayout from "../shared/ModalLayout";
import schemas from "../../schema";

export default function EditBoard({ handleClick, onEditBoardSuccess }) {
   const dispatch = useDispatch();
   const { activeBoardName, boardsList } = useSelector((state) => state.boards);
   const boardNames = boardsList.map((item) => item.name);

   const activeBoardData = boardsList.find(
      (board) => board.name === activeBoardName,
   );

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.boardSchema),
      defaultValues: {
         columns: activeBoardData.columns?.map((item) => ({
            column: item.name || "",
         })),
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
      const newBoardName = formData.boardName || activeBoardName;

      // Filter out empty columns and get column names
      const filteredColumns = formData.columns
         .filter((item) => item.column && item.column.trim() !== "")
         .map((item) => item.column.trim());

      const lowerCaseNames = filteredColumns.map((name) => name.toLowerCase());
      const uniqueNames = new Set(lowerCaseNames);

      if (lowerCaseNames.length !== uniqueNames.size) {
         toast.error("Column names must be unique");
         return;
      }

      // Check if board name already exists (only if changing the name)
      if (newBoardName !== activeBoardName) {
         const isNameExist = boardNames.find(
            (item) => item.toLowerCase() === newBoardName.toLowerCase(),
         );
         if (isNameExist) {
            toast.error("Board name already exists");
            return;
         }
      }
      dispatch(
         editBoard({
            boardName: activeBoardName,
            newBoardName: newBoardName,
            updatedColumns: filteredColumns,
         }),
      );
      toast.success("Board updated successfully");
      onEditBoardSuccess();
   }

   return (
      <ModalLayout title="Edit Board" handleClick={handleClick}>
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
               defaultValue={activeBoardName}
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
               Save Changes
            </button>
         </form>
      </ModalLayout>
   );
}
