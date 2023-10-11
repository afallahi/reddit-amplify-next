import React, { useState } from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Alert, Snackbar } from "@mui/material";


type Props = {}


interface IFormInputs {
    username: string;
    email: string;
    password: string;
};


export default function signup() {
    const [alertOpen, setAlertOpen] = useState(false);
    const [signupError, setSignupError] = useState<string>("");

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            signUpWithCredentials(data);
        } catch (e) {
            console.log("Error: ", e);
            setSignupError(e.message);
            setAlertOpen(true);
        };

    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
    }

    async function signUpWithCredentials(data: IFormInputs) {

        const { username, email, password } = data;

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            })
        } catch (e) {
            console.log("sign up error: ", e);
        }
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
                        {...register("username", {
                            required: { value: true, message: "Username is empty" },
                        })}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        id="email"
                        label="Email"
                        type="email"
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : null}
                        {...register("email", {
                            required: { value: true, message: "Email is empty" },
                        })}
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
                        {...register("password", {
                            required: { value: true, message: "Password is empty" },
                        })}
                    />
                </Grid>


                <Grid>
                    <Button variant="contained" type="submit">Sign Up</Button>
                </Grid>

            </Grid>
            <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>{signupError}</Alert>
            </Snackbar>


        </form>
    )
}