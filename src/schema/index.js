import * as yup from "yup";

const taskSchema = yup.object().shape({
   title: yup.string().required("Can't be empty"),
   description: yup.string().required("Can't be empty"),
   //lastName: yup.string().required("Can't be empty"),
});

const schemas = {
   taskSchema,
};

export default schemas;
