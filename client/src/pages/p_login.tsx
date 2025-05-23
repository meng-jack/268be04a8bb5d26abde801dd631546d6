import { Button, Container, Divider, Stack, TextInput } from '@mantine/core';
import React from 'react';
import Icon from '@mdi/react';
import { mdiAt, mdiLock, mdiLogin } from '@mdi/js';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Logging } from '../shared/logger';

export function SecureLoginPasswordRequest() {
    document.title = "Reset Password | United Aline";
    return (
        <>
            <img
                itemProp="image"
                src="/logo_horizontal.png"
                alt="United Aline" className="inline-block w-[18rem] m:w-[20rem] h-auto pb-2.5" />
            <Container className="bg-on-primary-color shadow-[0px_8px_15px_2px_rgba(0,_0,_0,_0.6)] rounded-[4px] py-6 w-[88vw] md:w-[30rem]" >
                <Stack justify="center" gap="1.2em" className="px-6">
                    <span className="mb-2 text-2xl font-bold text-center text-primary-darker-color">
                        Password Reset
                    </span>
                    <span className="text-sm text-center">
                        Please provide the email address associated with it where a password reset link will be sent. Follow the instructions in the email to set a new password.
                    </span>
                    <TextInput leftSection={<Icon path={mdiAt} size={0.8} />} label="Email" required={true} withAsterisk={false} />
                    <Button color='var(--primary)' onClick={() => {
                        // this is a todo!!
                        Logging.info("User requests new password reset link!");
                    }}>Send Reset Link</Button>
                    <Link className="flex justify-center" to=".."><span className="text-center pl-1 text-primary-color text-[0.8em]">Back To Login</span></Link>
                    <Divider color="rgba(0,0,0,0.3)" mx="1.2em" />
                    <span className="flex justify-center text-[0.8em]">
                        Not registered?<Link to="/"><span className="pl-1 text-primary-color">Create an account</span></Link>
                    </span>
                </Stack>
            </Container>
        </>
    );
}

export function SecureTunnelLayout() {
    return (<main>
        <Stack justify="center" align="center" className="w-[100vw] h-[100vh] bg-primary-color">
            <Outlet />
        </Stack >
    </main >);
}

export function SecureLoginPage() {
    document.title = "Login | United Aline";
    const navigate = useNavigate();
    return (<>
        <img
            itemProp="image"
            src="/logo_horizontal.png"
            alt="United Aline" className="inline-block w-[18rem] m:w-[20rem] h-auto pb-2.5" />
        <Container className="bg-on-primary-color shadow-[0px_8px_15px_2px_rgba(0,_0,_0,_0.6)] rounded-[4px] py-6 w-[88vw] md:w-[30rem]" >
            <Stack justify="center" gap="1.2em" className="px-6">
                <span className="mb-2 text-2xl font-bold text-center text-primary-darker-color">
                    Login
                </span>
                <TextInput leftSection={<Icon path={mdiLogin} size={0.8} />} label="Username" required={true} withAsterisk={false} />
                <TextInput leftSection={<Icon path={mdiLock} size={0.8} />} label="Password" type='password' required={true} withAsterisk={false} />
                <Button color='var(--primary)' onClick={() => {
                    // this is a todo!!
                    navigate("/demo/admin/dashboard");
                }}>Login</Button>
                <Link className="flex justify-center" to="requestpwd"><span className="text-center pl-1 text-primary-color text-[0.8em]">Forgot password?</span></Link>
                <Divider color="rgba(0,0,0,0.3)" mx="1.2em" />
                <span className="flex justify-center text-[0.8em]">
                    Not registered?<Link to="/"><span className="pl-1 text-primary-color">Create an account</span></Link>
                </span>
            </Stack>
        </Container>
    </>
    );
};;
