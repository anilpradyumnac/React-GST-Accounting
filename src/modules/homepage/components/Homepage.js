
import React, { Component } from 'react';
import CoverImage from'../../../../public/image/HomePage/banner.png';
import {Link, browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import Add from 'material-ui/svg-icons/action/note-add';
import Cart from 'material-ui/svg-icons/action/shopping-cart'
import Info from 'material-ui/svg-icons/action/info-outline';
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Books from 'material-ui/svg-icons/av/library-books';

const ListItemsData =[
	  			{
	  				Icon :<Avatar size={50} color='#3F51B5' style={{backgroundColor: '#ffffff'}}  icon={<Add />} />,
	    			name: 'Add Item',
	    			rightIcon:<Arrow />,
	    			subtitle: 'To Add New Item to inventory',
	   				clickFunc: ()=>{browserHistory.push('/Add')}
	  			},
				  {
				 	Icon :<Avatar size={50} color='brown' style={{backgroundColor: '#ffffff'}}  icon={<Cart />} />,
	    			name: 'Inventory',
				  	rightIcon:<Arrow />,
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
				    subtitle: 'To Edit Item Inventor',
				    clickFunc: ()=>{browserHistory.push('/Show')}
				  },

				  {
				  	Icon :<Avatar size={50} color='red' style={{backgroundColor: '#ffffff'}}  icon={<Editor />} />,
	    			name: 'Create Bill',
				    rightIcon:<Arrow />,
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
				    subtitle: 'To Open Bill Generation Menu',
				    clickFunc: ()=>{browserHistory.push('/Bill')}
				  },
				  {
				  	Icon :<Avatar size={50} color='green' style={{backgroundColor: '#ffffff'}}  icon={<Books />} />,
	    			name: 'Show Ledger',
				   	rightIcon:<Arrow />,
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
				    subtitle: 'To Know Date Wise Ledger Details',
				    clickFunc: ()=>{browserHistory.push('/Ledger')}
				  },
				  {
				  	Icon :<Avatar size={50} color='black' style={{backgroundColor: '#ffffff'}}  icon={<Info />} />,
	    			name: 'About Developer',
				    rightIcon:<Arrow />,
				    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
				    subtitle: 'To Contact for Assistance',
				    clickFunc: ()=>{alert('Hello')}
				  }
			];

class Homepage extends Component{
	constructor(props){
		super(props);

	}
	componentDidMount(){
		var todayDate = new Date();
		var dd = todayDate.getDate().toString();
        var mm = (todayDate.getMonth()+1).toString();
        var yyyy = todayDate.getFullYear().toString();
        if(dd<10){
          dd='0'+dd;
        } 
        if(mm<10){
          mm='0'+mm;
        }
		var StoredDate = localStorage.getItem('currentCounterDate');
		if(StoredDate == (dd+mm+yyyy)){
			console.log('Not Changing Date')
		}
		else{
			localStorage.setItem('currentCounterDate',dd+mm+yyyy);
			localStorage.setItem('counterValue','0');
		}

	}


	render(){
		return(
			<div>
			
				<div className="HotexLogo" style={{position: 'fixed' }} >
				 	<img  style={{width: '100%', height: '50vh',objectFit:'stretch',marginBottom: 0}} src={CoverImage}></img>
 		         
				</div> 
				<div style={{position:'relative',top: '50vh' }}>
					<List style={{height: '100px' }} >
					{
						ListItemsData.map((Item)=>{
							return(
								<div>
								<ListItem onClick={Item.clickFunc} hoverColor='#ffe69b' rightIcon={Item.rightIcon} leftAvatar={Item.Icon} primaryText={Item.name} secondaryText={Item.subtitle} />
								<Divider />
								</div>
							)
						})
					}
				      
				    </List>
				</div>
			</div>	
			);
	}

}
export default Homepage;
