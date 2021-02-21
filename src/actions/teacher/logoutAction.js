import axios from '../../helpers/axios';
import {authConstants} from '../constants';

export const teacherLogoutAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.TEACHER_LOGOUT_REQUEST,
        }); 

        // Performing connection to backend with axios.
        await axios.post('/teacher/logout', {

        }).then(res => {
            localStorage.clear();
            dispatch({
                type: authConstants.TEACHER_LOGOUT_SUCCESS
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: authConstants.TEACHER_LOGOUT_FAILURE,
                payload: {
                    errors
                }
            });
        });
    } 
}