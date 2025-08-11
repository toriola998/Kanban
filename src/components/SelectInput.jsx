import Select, { components } from "react-select";
const toOptions = (list) => list.map((item) => ({ label: item, option: item }));

const DropdownIndicator = (props) => {
   return (
      <components.DropdownIndicator {...props}>
         <img src="/assets/icon-chevron-down.svg" alt="" />
      </components.DropdownIndicator>
   );
};

const customStyles = {
   control: (provided, state) => ({
      ...provided,
      padding: "2px 0",
      borderRadius: "6px",
      border: state.isFocused
         ? "1px solid #635fc7"
         : state.selectProps.error
           ? "1px solid red"
           : "1px solid #828FA340", // Adjust border styles based on focus
      boxShadow: state.isFocused ? "0 0 0 .1px #495057" : "none", // Add shadow when focused
      "&:hover": {
         outlineColor: "#828FA340", // Change border color on hover
      },
   }),

   option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#101828" : "white",
      color: state.isSelected ? "#635fc7" : "#828fa3",
      fontSize: "13px",
      "&:hover": {
         backgroundColor: "#f4f7fd",
         color: "#635fc7",
         cursor: "pointer",
      },
   }),

   singleValue: (provided) => ({
      ...provided,
      fontSize: "13px",
   }),

   placeholder: (provided) => ({
      ...provided,
      fontSize: "13px",
   }),
};

export default function SelectInput({
   errorMessage,
   options,
   label,
   field,
   onChange,
}) {
   const handleChange = (selectedOption) => {
      onChange(selectedOption);
   };
   return (
      <div className="relative">
         <label
            className={`text-xs mb-1 inline-flex font-bold  ${
               errorMessage ? "text-red" : "text-grey"
            }`}
         >
            {label}
         </label>

         <Select
            {...field}
            components={{ DropdownIndicator }}
            options={toOptions(options)}
            styles={customStyles}
            onChange={handleChange}
            error={errorMessage}
         />
         <p className="text-red text-xs font-medium flex justify-end">
            {errorMessage}
         </p>
      </div>
   );
}
