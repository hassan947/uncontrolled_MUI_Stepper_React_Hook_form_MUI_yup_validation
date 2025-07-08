import { forwardRef, useImperativeHandle } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  suggestion: yup.string().optional(),
});

const StepOne = forwardRef(({ defaultValues = {} }, ref) => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: defaultValues.fullName || "",
      email: defaultValues.email || "",
      suggestion: defaultValues.suggestion || "",
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
        label="Full Name"
        fullWidth
        margin="normal"
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Suggestion"
        fullWidth
        margin="normal"
        {...register("suggestion")}
        error={!!errors.suggestion}
        helperText={errors.suggestion?.message} />
    </>
  );
});

export default StepOne;