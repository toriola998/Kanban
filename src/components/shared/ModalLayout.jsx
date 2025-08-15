export default function ModalLayout({
   children,
   handleClick,
   title,
   titleColor = "black",
}) {
   return (
      <div className="modal-layout flex-center px-4" onClick={handleClick}>
         <div
            className="bg-white dark:bg-dark-grey-1 w-full relative rounded-lg modal-inner p-6 md:p-8 max-w-[480px]"
            onClick={(e) => e.stopPropagation()}
         >
            {title && (
               <p
                  className={`text-lg text-black font-bold mb-4 ${titleColor === "black" ? "text-black dark:text-white" : "text-red"}`}
               >
                  {title}
               </p>
            )}
            {children}
         </div>
      </div>
   );
}
