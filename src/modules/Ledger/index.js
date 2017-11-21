import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ShowLedger from './components/ShowLedgerPage';


const ShowLedgerManagement = (	
	 
	<Route path = "/Ledger" component = {ShowLedger}>
	   <IndexRoute component={ShowLedger} />
	</Route> 
	
	);
export default ShowLedgerManagement;
