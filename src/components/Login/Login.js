import React, {useEffect, useState} from 'react';
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {api} from '../../api/api';


export function Login({setToken}) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signup, setSignup] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);

    useEffect(() => {
        function validateEmail() {
            // yummy
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email.match(re) || email === '') {
                setInvalidEmail(false);
            } else {
                setInvalidEmail(true);
            }
        }

        validateEmail()
    }, [email])

    useEffect(() => {
        clearInputs();
    }, [signup]);

    function clearInputs() {
        setPassword('');
        setUserName('');
        setEmail('');
        setInvalidEmail(false);
    }

    async function handleLogin() {
        try {
            setLoadingLogin(true);
            const request = {
                'username': username,
                'password': password
            };
            const token = await api.userLogin(request);
            setLoadingLogin(false);
            setToken(token);
            setLoadingLogin(false);
        } catch (e) {
            toast.error("Invalid log-in credentials");
            clearInputs();
            console.log("Invalid Login credentials");
            setLoadingLogin(false);
        }
    }

    async function userSignup() {
        try {
            setLoadingRegister(true);
            const request = {
                'username': username,
                'password': password,
                'email': email
            };
            await api.userSignup(request);
            setLoadingRegister(false);
            await handleLogin();
        } catch (e) {
            toast.error("Username already in use.");
            clearInputs();
            console.log(e);
            setLoadingRegister(false);
        }
    }

    function enableSubmit() {
        if (signup) {
            return username === '' || password === ''
                || email === ''
                || invalidEmail
        } else {
            return username === '' || password === ''
        }
    }


    return (
            <Segment inverted>
                <Dimmer active={loadingLogin || loadingRegister}>
                    <Loader>{signup ? "Creating Account..." : "Logging In..."}</Loader>
                </Dimmer>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='blue' textAlign='center'>
                            {signup ? " Sign Up " : " Login To Your Account "}
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    value={username}
                                    onChange={e => setUserName(e.target.value)}
                                />
                                {signup ?
                                    <div className={'field'}>
                                        <Form.Input
                                            fluid
                                            icon='mail'
                                            iconPosition='left'
                                            placeholder='E-mail address'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            error={invalidEmail ? "Invalid Email" : false}
                                        />
                                    </div>
                                    : ""}
                                <Form.Input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
                                {signup ?
                                    <Button
                                        fluid
                                        content="Sign Up"
                                        color='teal'
                                        size='large'
                                        disabled={enableSubmit()}
                                        onClick={() => userSignup()}
                                    /> :
                                    <Button
                                        fluid
                                        content="Login"
                                        color='blue'
                                        size='large'
                                        disabled={enableSubmit()}
                                        onClick={() => handleLogin()}
                                    />
                                }
                            </Segment>
                        </Form>
                        <Message>
                            {signup ?
                                "Already have an account? " :
                                "Don't have an account? "}
                            <Button
                                color={'blue'}
                                content={signup ? 'Login' : 'Sign Up'}
                                type='text'
                                onClick={() => setSignup(!signup)}/>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Segment>
    )

}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

