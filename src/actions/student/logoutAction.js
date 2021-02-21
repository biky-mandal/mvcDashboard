import axios from '../../helpers/axios';
import {authConstants} from '../constants';

export const studentLogoutAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.STUDENT_LOGOUT_REQUEST,
        }); 

        // Performing connection to backend with axios.
        await axios.post('/student/logout', {

        }).then(res => {
            localStorage.clear();
            dispatch({
                type: authConstants.STUDENT_LOGOUT_SUCCESS
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: authConstants.STUDENT_LOGOUT_FAILURE,
                payload: {
                    errors
                }
            });
        });
    } 
}