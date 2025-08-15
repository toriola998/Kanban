export default function TextAreaInput({
   label,
   name,
   type,
   placeholder,
   errorMessage,
   fieldName,
   defaultValue,
}) {
   return (
      <div className="relative ">
         <label
            htmlFor={name}
            className={`label ${errorMessage ? "text-red" : "text-grey"}`}
         >
            {label}
         </label>

         <textarea
            rows="4"
            cols="50"
            type={type}
            placeholder={placeholder}
            id={name}
            name={name}
            defaultValue={defaultValue}
            {...fieldName}
            className={`text-[13px] w-full py-[10px] px-4 rounded-lg font-medium text-black-1 ${
               errorMessage ? "border-red" : "border-grey-2"
            }`}
         ></textarea>
         <p className="text-red text-xs font-medium flex justify-end">
            {errorMessage}
         </p>
      </div>
   );
}
