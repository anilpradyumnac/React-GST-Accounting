import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import homepage from './../homepage/';
import AddPage from './../Add/';
import ShowPage from './../ShowItem/';
import Edit from './../ShowItem/components/EditItemPage';
import BillMain from './../BillMain';
const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
        { homepage }
        { AddPage  }
        { ShowPage }
        { BillMain }
        <Route path = "/EditInventory/:id" component = {Edit}>
	  	  <IndexRoute component={Edit} />
		</Route>
         
    </Route>
        
);
export default routes;