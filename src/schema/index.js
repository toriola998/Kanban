import * as yup from "yup";

const taskSchema = yup.object().shape({
   title: yup.string().required("Can't be empty"),
   //description: yup.string().required("Can't be empty"),
});

const boardSchema = yup.object().shape({
   boardName: yup.string().required("Can't be empty"),
});

const schemas = {
   taskSchema,
   boardSchema,
};

export default schemas;
