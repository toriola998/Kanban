import { useState } from "react";
export default function TextInput({
   label,
   name,
   type = "text",
   placeholder,
   errorMessage,
   fieldName,
   defaultValue,
   isDisabled = false,
   isNumber,
   maxLength,
}) {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
   };
   const handleKeyDown = (event) => {
      if (
         isNumber &&
         !/^[0-9]$/.test(event.key) &&
         !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
            event.key,
         )
      ) {
         event.preventDefault();
      }
   };
   return (
      <div className="relative">
         {label && (
            <label
               htmlFor={name}
               className={`text-xs mb-1 inline-flex font-bold ${
                  errorMessage ? "text-red" : "text-grey"
               }`}
            >
               {label}
            </label>
         )}

         <div
            className={`input-wrapper
               ${errorMessage ? "border-red" : "border-grey-2"}
               ${isDisabled ? "bg-grey-2" : "border-grey-2"}
            `}
         >
            <input
               type={isPasswordVisible && type === "password" ? "text" : type}
               min="0"
               step="any"
               placeholder={placeholder}
               id={name}
               name={name}
               disabled={isDisabled}
               defaultValue={defaultValue}
               {...fieldName}
               onKeyDown={handleKeyDown}
               maxLength={maxLength}
               className={`w-full py-3 pl-4 text-[13px] rounded-lg font-medium text-black-1`}
            />
            {type === "password" && (
               <div className="absolute right-4 top-[2.45rem]">
                  <button
                     type="button"
                     className="material-symbols-outlined text-[20px]"
                     onClick={handleTogglePasswordVisibility}
                  >
                     {isPasswordVisible ? (
                        <img
                           src="/assets/icons/password.svg"
                           alt="show password"
                        />
                     ) : (
                        <img
                           src="/assets/icons/password.svg"
                           alt="Hide password"
                        />
                     )}
                  </button>
               </div>
            )}
         </div>
         <p className="text-red text-xs font-medium flex justify-end">
            {errorMessage}
         </p>
      </div>
   );
}
