import { authConstants } from "./constants";

export const isTeacherLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token){
            // if we get the token
            // We parse the user in js object with the help of parse function.
            const teacher = JSON.parse(localStorage.getItem('teacher'));
            dispatch({
                type: authConstants.TEACHER_LOGIN_SUCCESS,
                payload: {
                    token, teacher
                }
            });
        }
    }
}

export const isStudentLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token){
            // if we get the token
            // We parse the user in js object with the help of parse function.
            const student = JSON.parse(localStorage.getItem('student'));
            dispatch({
                type: authConstants.STUDENT_LOGIN_SUCCESS,
                payload: {
                    token, student
                }
            });
        }
    }
}