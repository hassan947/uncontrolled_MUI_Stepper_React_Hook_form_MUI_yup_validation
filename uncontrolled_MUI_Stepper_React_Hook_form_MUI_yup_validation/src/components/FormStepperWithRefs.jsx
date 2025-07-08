import React, { useMemo, useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const steps = ["Personal Info", "Address Info", "CNIC"];

const FormStepperWithRefs = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const stepRefs = useMemo(() => {
        return Array(steps.length)
            .fill()
            .map(() => React.createRef());
    }, []);

    const handleNext = async () => {
        const currentRef = stepRefs[step];
        const isValid = await currentRef.current?.trigger?.();

        if (!isValid) return;

        const values = currentRef.current.getValues();

        const stepKey = `step-${step + 1}`;

        let updatedFormData;

        setFormData((prev) => {
            const existingIndex = prev.findIndex((entry) => Object.keys(entry)[0] === stepKey);
            console.log("existingIndex:", existingIndex)

            if (existingIndex !== -1) {
                // Update existing step
                const updated = [...prev];
                updated[existingIndex] = { [stepKey]: values };
                updatedFormData = updated;
                return updated;
            } else {
                // Add new step
                const updated = [...prev, { [stepKey]: values }];
                updatedFormData = updated;
                return updated;
            }
        });

        console.log("formdataxxxx : ", updatedFormData);

        if (step === steps.length - 1) {
            setSubmitted(true);
        } else {
            setStep((prev) => prev + 1);
        }
    };


    const handleBack = () => {
        setStep((prev) => prev - 1);
    };


    let formdatastep1, formdatastep2, formdatastep3;

    formData.forEach((stepObj) => {

        const [label, val] = Object.entries(stepObj)[0];

        switch (label) {
            case "step-1":
                formdatastep1 = val;
                break;
            case "step-2":
                formdatastep2 = val;
                break;
            case "step-3":
                formdatastep3 = val;
                break;
            default:
                break;
        }

        console.log("label:", label, "value:", val);
    });

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", mt: 15 }}>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>

            {submitted ? (
                <Box mt={4} textAlign="center">
                    <Typography variant="h5" color="green">
                        ✅ Form Submitted Successfully
                    </Typography>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </Box>
            ) : (
                <>
                    {step === 0 && <StepOne ref={stepRefs[0]} defaultValues={formdatastep1} />}
                    {step === 1 && <StepTwo ref={stepRefs[1]} defaultValues={formdatastep2} />}
                    {step === 2 && <StepThree ref={stepRefs[2]} defaultValues={formdatastep3} />}

                    <Box mt={3} display="flex" justifyContent="space-between">
                        {step > 0 && <Button onClick={handleBack}>Back</Button>}
                        <Button variant="contained" onClick={handleNext}>
                            {step === steps.length - 1 ? "Submit" : "Next"}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default FormStepperWithRefs;
