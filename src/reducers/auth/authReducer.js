import {authConstants} from '../../actions/constants';

const initState = {
    token: null,
    teacher: {
        
    },
    student: {

    },
    authenticate: false,
    authenticating: false,
    errorMessage: null,
    message: '',
    loading: false,
    toLoginPage: false
}

export default (state = initState, action) => {
    switch(action.type){
        case authConstants.TEACHER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case authConstants.TEACHER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                toLoginPage: true
            }
        break;

        case authConstants.TEACHER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                errorMessage: action.payload.errors
            }
        break;

        case authConstants.STUDENT_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;

        case authConstants.STUDENT_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                toLoginPage: true
            }
        break;

        case authConstants.STUDENT_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                errorMessage: action.payload.errors
            }
        break;


        case authConstants.TEACHER_LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }   
            break;
        
        case authConstants.TEACHER_LOGIN_SUCCESS:
            state = {
                ...state,
                teacher: action.payload.teacher,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
            break;
        
        case authConstants.TEACHER_LOGIN_FAILURE:
            state = {
                ...initState,
                errorMessage: action.payload.errors.error
            }
            break;

        case authConstants.STUDENT_LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }   
            break;
        
        case authConstants.STUDENT_LOGIN_SUCCESS:
            state = {
                ...state,
                student: action.payload.student,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
            break;
        
        case authConstants.STUDENT_LOGIN_FAILURE:
            state = {
                ...initState,
                errorMessage: action.payload.errors.error
            }
            break;


        case authConstants.TEACHER_LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case authConstants.TEACHER_LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        
        case authConstants.TEACHER_LOGOUT_FAILURE:
            state = {
                ...state,
                errorMessage: action.payload.error,
                loading: false
            }
            break;

        case authConstants.STUDENT_LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case authConstants.STUDENT_LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        
        case authConstants.STUDENT_LOGOUT_FAILURE:
            state = {
                ...state,
                errorMessage: action.payload.error,
                loading: false
            }
            break;
    
    }

    return state;
}