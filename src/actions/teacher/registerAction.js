import axios from '../../helpers/axios';
import {authConstants} from '../constants';

export const teacherRegisterAction = (teacher) => {
    return async dispatch => {
        dispatch({
            type: authConstants.TEACHER_REGISTER_REQUEST
        });

        await axios.post('/teacher/register', {
            ...teacher
        }).then(res => {
            const {message} = res.data;

            dispatch({
                type: authConstants.TEACHER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)
            dispatch({
                type: authConstants.TEACHER_REGISTER_FAILURE,
                payload: {
                    errors
                }
            });
        });
    }
}