import { UserInterface } from '../context/AppContext';
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    InputGroup,
    InputLeftElement,
    ButtonProps,
} from '@chakra-ui/react';

import { Redirect } from 'react-router-dom';
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons';
import React, { useRef, useContext, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import axios, { AxiosResponse } from 'axios';
import AppContext from '../context/AppContext';
import { LoadingModal } from '../components/LoadingModal';
const MotionButton = motion<ButtonProps>(Button);

interface LoginResponseInterface extends AxiosResponse {
    data: {
        token: string;
        user: UserInterface;
    };
}
interface isValidTokenResponseInterface {
    isValid: boolean;
    user: UserInterface;
}
interface isValidTokenInterface extends isValidTokenResponseInterface {
    token: string;
}

export const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwdRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const ctx = useContext(AppContext);

    const isTokenValid = useMemo(async (): Promise<
        isValidTokenInterface | false
    > => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const isValidResp: AxiosResponse<isValidTokenResponseInterface> =
                await axios.get('http://localhost:4000/api/auth', {
                    headers: {
                        'x-auth-token': `${accessToken}`,
                    },
                });
            return { ...isValidResp.data, token: accessToken };
        }
        return false;
    }, []);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const isValidToken = await isTokenValid;
            if (isValidToken) {
                const payload = {
                    ...isValidToken.user,
                    token: isValidToken.token,
                    isLoggedIn: true,
                };
                console.log(payload);
                ctx.dispatch({
                    type: 'SET_USER',
                    payload: payload,
                });
                setIsLoading(false);
            } else {
                ctx.dispatch({
                    type: 'SET_LOGGEDIN',
                    payload: false,
                });
                setIsLoading(false);
            }
        })();
    }, [isTokenValid]);

    const onLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: emailRef.current?.value,
            password: passwdRef.current?.value,
        };
        try {
            const response: LoginResponseInterface = await axios.post(
                'http://localhost:4000/api/auth',
                {
                    ...data,
                }
            );
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.token);
                ctx.dispatch({
                    type: 'SET_USER',
                    payload: {
                        ...response.data.user,
                        token: response.data.token,
                        isLoggedIn: true,
                    },
                });
            } else {
                console.log('Authentication failed');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <LoadingModal />;
    }

    if (ctx.state.user.isLoggedIn && ctx.state.user.role === 'student') {
        return <Redirect to='/studentHome' />;
    } else if (ctx.state.user.isLoggedIn && ctx.state.user.role === 'faculty') {
        return <Redirect to='/facultyHome' />;
    } else if (ctx.state.user.isLoggedIn && ctx.state.user.role === 'admin') {
        return <Redirect to='/adminHome' />;
    } else {
        return (
            <Flex minH={'100vh'} align={'flex-start'} justify={'center'}>
                <form onSubmit={onLoginHandler}>
                    <Stack spacing={5} marginTop={24} w='sm'>
                        <FormControl id='email'>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<EmailIcon />} />
                                <Input
                                    // variant='flushed'
                                    ref={emailRef}
                                    type='email'
                                    isRequired
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id='password'>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<UnlockIcon />} />
                                <Input
                                    // variant='flushed'
                                    ref={passwdRef}
                                    type='password'
                                    isRequired
                                />
                            </InputGroup>
                        </FormControl>
                        <MotionButton
                            type='submit'
                            variant='primary'
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}>
                            Login
                        </MotionButton>
                    </Stack>
                </form>
            </Flex>
        );
    }
};
