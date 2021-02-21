import {fetchConstants} from '../actions/constants';

const initState = {
    student: [],
    loading: false,
    errorMessage : ''
}

export default (state = initState, action) => {
    switch(action.type){
        case fetchConstants.STUDENT_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case fetchConstants.STUDENT_FETCH_SUCCESS:
            state = {
                ...state,
                loading: false,
                student: action.payload.student,
            }
        break;

        case fetchConstants.STUDENT_FETCH_FAILURE:
            state = {
                ...state,
                loading: false,
                errorMessage: action.payload.errors
            }
        break;
    }
    return state
}