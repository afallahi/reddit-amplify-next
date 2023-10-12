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
    email: string;
    password: string;
    code: string;
};


export default function signup() {
    const [alertOpen, setAlertOpen] = useState(false);
    const [signupError, setSignupError] = useState<string>("");
    const { user, setUser } = useUser();
    const [showCode, setShowCode] = useState(false);
    const router = useRouter();

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            if (showCode) {
                confirmSignUp(data);
            } else {
                await signUpWithCredentials(data);
                setShowCode(true);
            }
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

    async function signUpWithCredentials(data: IFormInputs): Promise<CognitoUser> {

        const { username, email, password } = data;

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            console.log(`User: ${user} signed up.`)
            return user;
        } catch (e) {
            throw e;
        }
    }

    async function confirmSignUp(data: IFormInputs) {
        const { username, password, code } = data;
        try {
            await Auth.confirmSignUp(username, code);
            const ampUser = await Auth.signIn(username, password);
            console.log(`User ${ampUser} signed in successfully.`);
            if (ampUser) {
                router.push('/');
            } else {
                throw new Error('Authentication error. Please try again.');
            }

        } catch (e) {
            console.log(e);
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
                <Grid item style={{ marginTop: 10 }}>
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
                            minLength: {
                                value: 6,
                                message: "Password with minimum length of 6 required."
                            }
                        })}
                    />
                </Grid>

                {showCode && (
                    <Grid item>
                        <TextField
                            variant="outlined"
                            id="code"
                            label="Verification Code"
                            type="text"
                            error={errors.code ? true : false}
                            helperText={errors.code ? errors.code.message : null}
                            {...register("code", {
                                required: { value: true, message: "enter a code" },
                                minLength: {
                                    value: 6,
                                    message: "code length is 6"
                                },
                                maxLength: {
                                    value: 6,
                                    message: "code length is 6"
                                }
                            })}
                        />
                    </Grid>


                )}
                <Grid style={{ marginTop: 10 }}>
                    <Button variant="contained" type="submit">
                        {showCode ? "Confirm Code" : "Sign Up"}
                    </Button>
                </Grid>

            </Grid>
            <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>{signupError}</Alert>
            </Snackbar>


        </form>
    )
}