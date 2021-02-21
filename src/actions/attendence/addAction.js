import axios from '../../helpers/axios';
import { addConstants } from '../constants';


export const addAttendenceAction = (_day, studentId) => {
    return async dispatch => {
        dispatch({
            type: addConstants.ATTENDENCE_ADDING_REQUEST
        });

        // Connecting to backend
        await axios.post("/attendence/add", {
            _day, studentId
        }).then(res => {
            const { attend } = res.data;
            dispatch({
                type: addConstants.ATTENDENCE_ADDING_SUCCESS,
                payload: {
                    attend
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: addConstants.ATTENDENCE_ADDING_FAILURE,
                payload: {
                    errors
                }
            });
        })
    }
}