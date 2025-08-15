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
   const { activeBoard, boardsList } = useSelector((state) => state.boards);

   const activeBoardData = boardsList.find(
      (board) => board.name === activeBoard,
   );

   const columnsList =
      activeBoardData?.columns.map((column) => column.name) || [];

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.boardSchema),
      defaultValues: {
         columns: activeBoardData.columns.map((item) => ({
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
      const newBoardName = formData.boardName || activeBoard;
      const columnNames = formData.columns.map((item) => item.column);

      dispatch(
         editBoard({
            boardName: activeBoard,
            newBoardName: newBoardName,
            updatedColumns: columnNames,
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
               defaultValue={activeBoard}
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
