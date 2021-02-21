import React, { useState } from 'react';
import Layout from '../components/layout'
import './style.css'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/ui';
import Loading from '../components/loader';
import { teacherLoginAction } from '../actions/teacher/loginAction';
import { studentLoginAction } from '../actions/student/loginAction';
/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Creating dispatch hook
    const dispatch = useDispatch();
    // getting state
    const auth = useSelector(state => state.auth);


    const teacherLogin = (e) => {
        e.preventDefault();

        // Getting from the local state input
        const teacher = {
            email, password
        }

        dispatch(teacherLoginAction(teacher))
    }

    const studentLogin = (e) => {
        e.preventDefault();

        // Getting from the local state input
        const student = {
            email, password
        }

        dispatch(studentLoginAction(student))
    }


    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading />
    }
    return (
        <Layout>
            <div className="login-div">
                {auth.authenticating ? renderLoader() : null}
                <div className="form-div-login">
                    <Container>
                        <Row style={{ marginTop: '5rem' }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form>
                                    <Input
                                        className="inpt-lbl"
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Input
                                        className="inpt-lbl"
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        type="password"
                                        errorMessage={auth.errorMessage ? auth.errorMessage : null}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="light" onClick={studentLogin} className="signup-btn" type="submit">
                                                Login as a student
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="dark" onClick={teacherLogin} className="signup-btn" type="submit">
                                                Login as a teacher
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
    )

}

export default LoginPage