import DropdownMenu from "../DropdownMenu";
import ModalLayout from "../ModalLayout";
import SelectInput from "../input-fields/SelectInput";

export default function TaskInfo() {
   return (
      <ModalLayout>
         <div className="grid grid-cols-[90%_auto] justify-between">
            <h1 className="text-black-1 font-bold text-lg leading-6">
               Research pricing points of various competitors and trial
               different business models
            </h1>
            <DropdownMenu actionType="Task" />
         </div>

         <p className="my-6 text-[13px] font-medium text-grey leading-6">
            We know what we're planning to build for version one. Now we need to
            finalise the first pricing model we'll use. Keep iterating the
            subtasks until we have a coherent proposition.
         </p>
         <p className="font-bold text-xs text-grey mb-4">Subtasks (2 of 3)</p>

         <div className="mb-6">
            <div className="bg-light-grey-1 rounded p-3 grid grid-cols-[16px_auto] gap-x-6 items-center">
               <input type="checkbox" className="h-4 w-4 accent-main-purple" />
               <p className="text-xs font-bold text-black-1">
                  Talk to potential customers about our proposed solution and
                  ask for fair price expectancy
               </p>
            </div>
         </div>

         <SelectInput
            label="Current Status"
            options={["To do", "Doing", "Done"]}
         />
         {/* field={field}
            onChange={(selectedOption) => {
               field.onChange(selectedOption);
            }} */}
      </ModalLayout>
   );
}
