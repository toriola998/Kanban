export default function ModalLayout({
   children,
   handleClick,
   title,
   titleColor = "black",
}) {
   return (
      <div className="modal-layout flex-center px-4" onClick={handleClick}>
         <div className="bg-white w-full relative rounded-lg modal-inner p-6 md:p-8 max-w-[480px]">
            {title && (
               <p
                  className={`text-lg text-black font-bold mb-6 ${titleColor === "black" ? "text-black" : text - red}`}
               >
                  {title}
               </p>
            )}
            {children}
         </div>
      </div>
   );
}
