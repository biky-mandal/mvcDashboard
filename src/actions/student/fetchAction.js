import axios from '../../helpers/axios';
import { fetchConstants } from '../constants';


export const fetchStudentAction = () => {
    return async dispatch => {
        dispatch({
            type: fetchConstants.STUDENT_FETCH_REQUEST
        });

        // Connecting to backend
        await axios.get("/student/fetch", {
            
        }).then(res => {
            const { student } = res.data;
            dispatch({
                type: fetchConstants.STUDENT_FETCH_SUCCESS,
                payload: {
                    student
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: fetchConstants.STUDENT_FETCH_FAILURE,
                payload: {
                    errors
                }
            });
        })
    }
}