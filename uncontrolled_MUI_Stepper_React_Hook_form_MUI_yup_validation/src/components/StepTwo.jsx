import { forwardRef, useImperativeHandle } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    suggestion: yup.string().optional(),
});

const StepTwo = forwardRef(({ defaultValues = {} }, ref) => {
    const {
        register,
        getValues,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            city: defaultValues.city || "",
            country: defaultValues.country || "",
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
                label="City"
                fullWidth
                margin="normal"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
            />
            <TextField
                label="Country"
                fullWidth
                margin="normal"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
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

export default StepTwo;