import React, { Component } from 'react';

import {Link, browserHistory} from 'react-router';

import { If } from './../../utils/components';
import brandLogo from '../../../../public/image/Navbar/print-brand-logo.png';




class Navigation extends Component {
  

  constructor(props) {
    super(props);

  }
  componentWillMount() {
    
  }
  render() {
    return (
      <div className="">
        <div className="nav" style={{display: 'inline-flex'}}>
          <div className="brandLogo-img div-height" style={{flex:1,alignSelf:'center',justifyContent:   'center'   }}>
            <a href="/">
              <img  src={brandLogo} />
            </a>
          </div>
          <div style={{flex:3,alignSelf:'center',justifyContent: 'center',}} >
           
            <h2 style={{color: '#3F51B5'}} >
              Hotex Uniforms
            </h2>
            
          </div>
          <div  style={{flex:1}}>
            &nbsp;
          </div>
          
          
          </div>

          
      </div>
    );
  }
}
export default Navigation;
