import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Form, Grid, Header, Image, Loader, Message, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export function Login({ setToken }) {
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

    return (
        <div>
            <Segment inverted>
                <Dimmer active={loadingLogin || loadingRegister}>
                    <Loader>{signup ? "Creating Account..." : "Logging In..."}</Loader>
                </Dimmer>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image spaced='right' src={signup ? '/favicon_io/rocket-192x192.png' : '/favicon_io/diamond-192x192.png'}/>
                            {signup ? " Sign Up To Start Trading! " : " Login To Your Account "}
                            <Image spaced='left' src={signup ? '/favicon_io/rocket-192x192.png' : '/favicon_io/diamond-192x192.png'} />
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
                                    <div>
                                        <Form.Input
                                            fluid
                                            icon='mail'
                                            iconPosition='left'
                                            placeholder='E-mail address'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            error={invalidEmail ? "Invalid Email" : false}
                                        />
                                        <br />
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
                                        color='teal'
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
                                content={signup ? 'Login' : 'Sign Up'}
                                type='text'
                                onClick={() => setSignup(!signup)} />
                        </Message>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )

}
