import React,{useState} from 'react';
import Layout from '../components/layout';
import Input from '../components/ui';
import './style.css';
import Loading from '../components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { teacherRegisterAction } from '../actions/teacher/registerAction';
import { studentRegisterAction } from '../actions/student/registerAction';


/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // this function will run when signup form is submitted.
    const teacherRegister = (e) => {
        e.preventDefault();

        const teacher = {
            name, email, password
        }
        dispatch(teacherRegisterAction(teacher))
    }

    const studentRegister = (e) => {
        e.preventDefault();

        const student = {
            name, email, password
        }
        dispatch(studentRegisterAction(student))
    }
    // performing spme user experience.
    if(auth.toLoginPage){
        return <Redirect to ={'/login'} />
    }

    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading/>
    }
    return (
        <Layout>
            <div className="signup-div">
                {auth.loading ? renderLoader() : null}
                <div className="form-div-signup">
                    <Container>
                        <Row style={{ marginTop: '5rem' }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form>
                                    <Input
                                        label="Full Name"
                                        placeholder="FullName"
                                        value={name}
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        type="password"
                                        errorMessage={auth.errorMessage ? auth.errorMessage : null}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="light" onClick={studentRegister} className="signup-btn" type="submit">
                                                Register as a Student
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="dark" onClick={teacherRegister} className="signup-btn" type="submit">
                                                Register as a teacher
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

export default RegisterPage