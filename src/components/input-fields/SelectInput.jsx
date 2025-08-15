import Select, { components } from "react-select";
import { useTheme } from "../../hooks/useTheme";

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
      fontWeight: "500",
      backgroundColor: "transparent",
      color: "#000112",
      padding: "2px 0",
      borderRadius: "6px",
      border: state.isFocused
         ? "1px solid #635fc7"
         : state.selectProps.error
           ? "1px solid red"
           : "1px solid #828FA340",
      boxShadow: state.isFocused ? "0 0 0 .1px #495057" : "none",
      "&:hover": {
         outlineColor: "#828FA340",
      },
   }),

   option: (provided, state) => {
      const { isSelected, selectProps } = state;
      const isDark = selectProps.isDark;

      let backgroundColor = "transparent";
      let color = "#828fa3";

      if (isSelected) {
         backgroundColor = isDark ? "#2b2c37" : "#635fc740";
         color = isDark ? "#fff" : "#635fc7";
      }

      return {
         ...provided,
         backgroundColor,
         color,
         fontSize: "13px",
         fontWeight: "500",
         "&:hover": {
            backgroundColor: isDark ? "#20212C" : "#f4f7fd",
            color: isDark ? "" : "#635fc7",
            cursor: "pointer",
         },
      };
   },

   menu: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.isDark ? "#20212C" : "#ffffff", // Background for entire dropdown
   }),

   menuList: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.isDark ? "#20212C" : "#ffffff", // Background for the scrollable list
   }),

   singleValue: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      color: state.selectProps.isDark ? "#ffffff" : "#000",
   }),

   placeholder: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      color: state.selectProps.isDark ? "#ffffff" : "#000",
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
   const toOptions = (list) =>
      list.map((item) => ({ label: item, value: item }));

   const { isDarkMode } = useTheme();
   return (
      <div className="relative">
         <label className={`label  ${errorMessage ? "text-red" : "text-grey"}`}>
            {label}
         </label>

         <Select
            {...field}
            components={{ DropdownIndicator }}
            options={toOptions(options)}
            styles={customStyles}
            onChange={handleChange}
            error={errorMessage}
            isDark={isDarkMode}
         />
         <p className="text-red text-xs font-medium flex justify-end">
            {errorMessage}
         </p>
      </div>
   );
}
