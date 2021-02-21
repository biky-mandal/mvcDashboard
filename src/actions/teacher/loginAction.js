import axios from '../../helpers/axios';
import { authConstants } from '../constants';


export const teacherLoginAction = (teacher) => {
    return async dispatch => {
        dispatch({
            type: authConstants.TEACHER_LOGIN_REQUEST
        });

        // Connecting to backend
        await axios.post("/teacher/login", {
            ...teacher
        }).then(res => {
            const { token, teacher } = res.data;
            // Save it to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('teacher', JSON.stringify(teacher));
            console.log(teacher)
            dispatch({
                type: authConstants.TEACHER_LOGIN_SUCCESS,
                payload: {
                    token, teacher
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: authConstants.TEACHER_LOGIN_FAILURE,
                payload: {
                    errors
                }
            });
        })
    }
}