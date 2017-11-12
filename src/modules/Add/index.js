import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition';
import AddPage from './components/AddPage';

const AddManagement = (	
	<AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  	>
	<Route path = "/Add" component = {AddPage}>
	   <IndexRoute component={AddPage} />
	</Route>
	</AnimatedSwitch>
	);
export default AddManagement;
