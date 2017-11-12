import React, {Component} from 'react';

import If from './../../utils/components/If.js';
import firebase from './../../../stub/FirebaseConfig';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import {Link, browserHistory} from 'react-router';
import Cart from 'material-ui/svg-icons/action/shopping-cart';

const isOnline = require('is-online'); 

export default class ShowItemPage extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {data:[], showText:'Please Wait Contacting To Server'};
	}
	componentWillUnmount(){

		//console.log('Unmount');
		this.setState({data:[]});
	}
	getRandomColor() {
 		 var letters = '0123456789ABCDEF';
 		 var color = '#';
  		 for (var i = 0; i < 6; i++) {
    		color += letters[Math.floor(Math.random() * 16)];
  		}
  		return color;
	}
	RenderItemList(){
  		var self = this;
  		var ReturnArr = [];
  		for (var key in this.state.data){
  			const alldata = this.state.data[key];
  			let keyx = this.state.dataKey[key];
  			//alert(keyx);
  			let Ic = (<Avatar size={50} color={self.getRandomColor()} style={{backgroundColor: '#00ffffff'}}  icon={<Cart />} />);
  			const {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked} = this.state.data[key];
  			//console.log(ItemCategory+' '+CGST);
  			ReturnArr.push(
  				<ListItem key={ItemCategory+keyx+'ShowPageList'} onClick={()=>{browserHistory.push(`/EditInventory/${keyx}`)}} hoverColor='#ffe69b' rightIcon={<Arrow />} leftAvatar={Ic} primaryText={ItemCategory} secondaryText={'Click For More Editing Options'} />
				
								
 				 				 
  			)
  			

  		}
  		return ReturnArr;
  		
  	}
	
	componentWillMount(){

		var self = this;
		isOnline().then(online => {
    			if(!online){
    			
    				var arr1 = JSON.parse(localStorage.getItem('ShowPageKeys'));

    				var arr = JSON.parse(localStorage.getItem('ShowPageData'));
    				console.log(arr);
    				console.log(arr1);
    				this.setState({data:arr,dataKey:arr1,showText:`No Internet Connection: Loading Old ${arr1.length} Items(s)...... `});
    			}
    			else{
    				firebase.database().ref('items').on('value', (snapshot) => {
						 
						 var arr = [];
			 			 var arr1 =[];
						 for(var key in snapshot.val())
							{
								let i = key;
								 
								arr1.push(i);
    							arr.push(snapshot.val()[key].data);
							}	
						 
			 			 localStorage.setItem('ShowPageKeys',JSON.stringify(arr1));
			 			 localStorage.setItem('ShowPageData',JSON.stringify(arr));
   			 			 self.setState({data:arr,dataKey:arr1, showText: 'You have '+arr.length+' Item(s)'});
   			  		 });
    			}
		});
		
	}

	render(){
		return(
		<div style={{flex:1,position:'relative',top:10 }} >
			<div style={{ backgroundColor: '#ffffff', alignItems : 'center',position: 'fixed',top:35,zIndex: 3,width:'100%',height:45 }} className={'popText'}>
				<h3 style={{fontSize: 15}}>{this.state.showText}</h3>
			</div>
			<div style={{position: 'relative',top:60 }}>
			<If test={this.state.data && this.state.data.length!=0}>
				<div style={{ position: 'relative', top:0 }}>
				<List>
				{
					this.RenderItemList.bind(this)()
				}
				</List>
				</div>
			</If>
			</div> 
			
		</div>	
		)
	}
}