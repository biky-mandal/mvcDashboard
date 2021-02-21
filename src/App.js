import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import DashboardPage from './containers/dashboard';
import LoginPage from './containers/login';
import RegisterPage from './containers/register';
import { useDispatch, useSelector } from 'react-redux';
import { isStudentLoggedIn, isTeacherLoggedIn } from './actions/isLoggedIn';
import { fetchAttendenceAction } from './actions/attendence/fetchAction';
import {fetchStudentAction} from './actions/student/fetchAction';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  useEffect(() => {
    // whenever a user reload we check for the authentication that
    // he or she signin or not.
    if(!auth.authenticate){
      dispatch(isTeacherLoggedIn())
      dispatch(isStudentLoggedIn())
    }

    dispatch(fetchAttendenceAction());
    dispatch(fetchStudentAction())
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <PrivateRoute path="/" component={DashboardPage}/>
      </Switch>
    </div>
  );
}

export default App;
