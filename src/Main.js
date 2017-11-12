import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
require('../public/style/main.scss');

import routes from './modules/app/';

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('root'));
