import axios from '../../helpers/axios';
import { fetchConstants } from '../constants';


export const fetchAttendenceAction = () => {
    return async dispatch => {
        dispatch({
            type: fetchConstants.ATTENDENCE_FETCH_REQUEST
        });

        // Connecting to backend
        await axios.get("/attendence/fetch", {
            
        }).then(res => {
            const { attendence } = res.data;
            dispatch({
                type: fetchConstants.ATTENDENCE_FETCH_SUCCESS,
                payload: {
                    attendence
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: fetchConstants.ATTENDENCE_FETCH_FAILURE,
                payload: {
                    errors
                }
            });
        })
    }
}