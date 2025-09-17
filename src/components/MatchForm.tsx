import {useForm, Controller} from "react-hook-form";
import {TextField, Button} from "@mui/material";

interface MatchFormData {
    paymentId: number;
    invoiceId: number;
}

export const MatchForm = () => {
    const {handleSubmit, control} = useForm<MatchFormData>();

    const onSubmit = (data: MatchFormData) => {
        console.log("Сопоставление:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              style={{padding: "16px", border: "1px solid #ccc", borderRadius: "8px"}}>
            <Controller
                name="paymentId"
                control={control}
                render={({field}) => (
                    <TextField {...field} label="ID платежа" type="number" fullWidth margin="normal"/>
                )}
            />

            <Controller
                name="invoiceId"
                control={control}
                render={({field}) => (
                    <TextField {...field} label="ID счета" type="number" fullWidth margin="normal"/>
                )}
            />

            <Button variant="contained" type="submit" fullWidth>
                Сопоставить
            </Button>
        </form>
    );
};
