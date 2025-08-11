export default function ModalLayout({
   children,
   handleClick,
   maxWidth = "max-w-[480px]",
}) {
   return (
      <div className="modal-layout flex-center px-4" onClick={handleClick}>
         <div
            className={`bg-white w-full relative rounded-lg modal-inner p-6 ${maxWidth}`}
         >
            {children}
         </div>
      </div>
   );
}
