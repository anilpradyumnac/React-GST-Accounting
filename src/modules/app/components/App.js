import React from 'react';
import { Link, withRouter } from 'react-router';
import { default as Header } from '../../header/components';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default withRouter(React.createClass({

  componentWillMount(){
   if(!this.props.children){
      this.props.router.replace('/Home');
   } 
  },

  render(){
   
    var oneDay = 24 * 60 * 60 * 1000; 
    var firstDate = new Date(2017,11,15);
    var secondDate = new Date();
    var diffDays = Math.round((firstDate.getTime() - secondDate.getTime())/(oneDay));
   // console.log(diffDays);
    var self=this;
    if(this.props.children){
      

      var children = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child)
      })
      if(diffDays>0){
        if(diffDays<10)
            alert('Your License will expire in '+diffDays+' day(s). Please contact developer in order to prevent software termination. ');
         return (
        <MuiThemeProvider>
        <div className="App">
          <Header />
          <br/> 
          <section>
            {children}
          </section>
        </div> 
        </MuiThemeProvider>
       ) 
      }
      else{
        return(<div>
          <h2>Error:53xc001: Your License Is Expired, Please Contact The Developer to renew the license</h2>
        </div>)
      }
     
    }else{
      return <div>Hotex Uniforms</div>
    }
    
  }
 
}));
