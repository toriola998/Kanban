import ModalLayout from "./ModalLayout";

export default function DeleteItem({ action, title, deleteItem, cancel }) {
   const getNote = () => {
      if (action === "task") {
         return `Are you sure you want to delete the '${title}' task? This action cannot be reversed.`;
      }
      return `Are you sure you want to delete the '${title}' board? This action will remove all columns and tasks and cannot be reversed.`;
   };

   return (
      <ModalLayout
         titleColor="red"
         title={`Delete this ${action}?`}
         handleClick={cancel}
      >
         <p className="text-[13px] text-grey font-medium leading-7">
            {getNote()}
         </p>

         <div className="flex gap-4 mt-6">
            <button className="btn red w-full" onClick={deleteItem}>
               Delete
            </button>
            <button className="btn sec-btn w-full" onClick={cancel}>
               Cancel
            </button>
         </div>
      </ModalLayout>
   );
}
