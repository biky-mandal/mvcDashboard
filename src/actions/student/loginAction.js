import axios from '../../helpers/axios';
import { authConstants } from '../constants';


export const studentLoginAction = (student) => {
    return async dispatch => {
        dispatch({
            type: authConstants.STUDENT_LOGIN_REQUEST
        });

        // Connecting to backend
        await axios.post("/student/login", {
            ...student
        }).then(res => {
            const { token, student } = res.data;
            // Save it to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('student', JSON.stringify(student));

            dispatch({
                type: authConstants.STUDENT_LOGIN_SUCCESS,
                payload: {
                    token, student
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: authConstants.STUDENT_LOGIN_FAILURE,
                payload: {
                    errors
                }
            });
        })
    }
}