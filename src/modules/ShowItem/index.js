import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShowItemPage from './components/ShowItemPage';

import Edit from './components/EditItemPage';

const ShowItemManagement = (	
	 
	<Route path = "/Show" component = {ShowItemPage}>
	   <IndexRoute component={ShowItemPage} />
	</Route> 
	
	);
export default ShowItemManagement;
