import axios from '../../helpers/axios';
import {authConstants} from '../constants';

export const studentRegisterAction = (student) => {
    return async dispatch => {
        dispatch({
            type: authConstants.STUDENT_REGISTER_REQUEST
        });

        await axios.post('/student/register', {
            ...student
        }).then(res => {
            const {message} = res.data;

            dispatch({
                type: authConstants.STUDENT_REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)
            dispatch({
                type: authConstants.STUDENT_REGISTER_FAILURE,
                payload: {
                    errors
                }
            });
        });
    }
}