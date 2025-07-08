import { forwardRef, useImperativeHandle } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  cnic: yup
    .string()
    .required("CNIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be 13 digits"),
});

const StepThree = forwardRef(({ defaultValues = {} }, ref) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cnic: defaultValues.cnic || "",
    },
  });

  useImperativeHandle(ref, () => ({
    getValues,
    trigger,
    reset,
  }));

  return (
    <>
      <TextField
        label="CNIC"
        fullWidth
        margin="normal"
        {...register("cnic")}
        error={!!errors.cnic}
        helperText={errors.cnic?.message}
      />
    </>
  );
});

export default StepThree;
