import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import homepage from './../homepage/';
import AddPage from './../Add/';
import ShowPage from './../ShowItem/';
import Ledger from './../Ledger';
import Edit from './../ShowItem/components/EditItemPage';
import BillMain from './../BillMain';
import ShowBill from './../Ledger/components/ShowBillPage';
const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
        { homepage }
        { AddPage  }
        { ShowPage }
        { BillMain }
        { Ledger }
        <Route path = "/EditInventory/:id" component = {Edit}>
          <IndexRoute component={Edit} />
        </Route>
        <Route path = "/ShowBill/:id" component = {ShowBill}>
          <IndexRoute component={ShowBill} />
        </Route>
         
    </Route>
        
);
export default routes;