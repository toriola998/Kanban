import ModalLayout from "../ModalLayout";

export default function DeleteItem({ action, note, deleteItem, cancel }) {
   return (
      <ModalLayout titleColor="red" title={`Delete this ${action}?`}>
         <p className="text-[13px] text-grey font-medium leading-7">
            Are you sure you want to delete the {note}
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
