import React, { useState } from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Alert, Snackbar } from "@mui/material";
import { Auth } from "aws-amplify";
import { useUser } from "../context/AuthContext";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";


type Props = {}


interface IFormInputs {
    username: string;
    password: string;
};


export default function signin() {
    const [alertOpen, setAlertOpen] = useState(false);
    const [signInError, setSignInError] = useState<string>("");
    const router = useRouter();

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        const { username, password } = data;

        try {
            await Auth.signIn(username, password);
            router.push('/');
        } catch (e) {
            setSignInError(e.message);
            setAlertOpen(true);
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyItems={"center"}
                spacing={2}
            >
                <Grid item>
                    <TextField
                        variant="outlined"
                        id="username"
                        label="Username"
                        type="text"
                        error={errors.username ? true : false}
                        helperText={errors.username ? errors.username.message : null}
                        {...register("username")}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        id="password"
                        label="Password"
                        type="password"
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password.message : null}
                        {...register("password")}
                    />
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Button variant="contained" type="submit">
                        Sign In
                    </Button>
                </Grid>

            </Grid>
            <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>{signInError}</Alert>
            </Snackbar>


        </form>
    )
}