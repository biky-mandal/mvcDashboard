import {fetchConstants} from '../../actions/constants';

const initState = {
    attendence: [],
    loading: false,
    errorMessage : ''
}

export default (state = initState, action) => {
    switch(action.type){
        case fetchConstants.ATTENDENCE_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case fetchConstants.ATTENDENCE_FETCH_SUCCESS:
            state = {
                ...state,
                loading: false,
                attendence: action.payload.attendence,
            }
        break;

        case fetchConstants.ATTENDENCE_FETCH_FAILURE:
            state = {
                ...state,
                loading: false,
                errorMessage: action.payload.errors
            }
        break;
    }
    return state
}