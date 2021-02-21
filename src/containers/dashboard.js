import React, { useEffect, useState } from 'react';
import Layout from '../components/layout'
import './style.css';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { authConstants } from '../actions/constants';
import { addAttendenceAction } from '../actions/attendence/addAction';

/**
* @author
* @function DashboardPage
**/

const DashboardPage = (props) => {

    const [students, setStudents] = useState([])

    const dispatch = useDispatch();
    const student = useSelector(state => state.student);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if(student.student){
            let students = student.student

            setStudents(
                students.map(std => {
                    return{
                        select: false,
                        id: std._id,
                        name: std.name,
                        email: std.email
                    }
                })
            )
        }

    },[])

    const presentClicked = () => {
        students.map(std => {
            if(std.select === true){
                const studentId = std.id
                const _day = Date()
                dispatch(addAttendenceAction(
                    _day,
                    studentId
                ))
            }
        })
    }

    const renderButtons = () => {
        if (students) {
            let truth = 0;

            // Here i Use it know how many of products are selected.
            students.map((p) => {
                if (p.select === true) {
                    truth++;
                }
            });
            // If only one Product is selected then I render the buttons otherwise not.
            if (truth === 1) {
                return (
                    <div className="btn-u-d-div1">
                        <Button className="Import-btn" onClick={presentClicked}>Present</Button>
                    </div>
                );
            }
        }
    }

    if(auth.student){
        return(
            <Layout>
                <Table responsive="md">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student ? student.student.map(std => {
                                        return(
                                            <tr key={std.email}>
                                                <td>{std.name}</td>
                                                <td>{std.email}</td>
                                            </tr>
                                        );
                                    })
                                    :
                                    null
                                }
                            </tbody>
                </Table>
            </Layout>
        )
    }else{
        return(
            <Layout>
                {renderButtons()}
                <Table responsive="md">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students ? students.map(std => {
                                    return(
                                        <tr>
                                            <td>
                                                <input
                                                    className="option-input radio"
                                                    type="checkbox"
                                                    checked={std.select}
                                                    value={std.name}
                                                    onChange={
                                                        (e) => {
                                                            let checked = e.target.checked;
                                                            setStudents(students.map((data) => {
                                                                if (std.id === data.id) {
                                                                    data.select = checked;
                                                                }
                                                                return data
                                                            })
                                                            );
                                                        }
                                                    }
                                                />
                                            </td>
                                            <td>{std.name}</td>
                                            <td>{std.email}</td>
                                        </tr>
                                    );
                                })
                                :
                                null
                            }
                        </tbody>
                </Table>
        </Layout>
        );
    }

}

export default DashboardPage