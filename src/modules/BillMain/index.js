import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BillMain from './components/BillMain';
const billManagement = (	
	<Route path = "/Bill" component = {BillMain}>
	   <IndexRoute component={BillMain} />
	</Route>
	);
export default billManagement;
