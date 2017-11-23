import React, {Component} from 'react';
import { print } from 'html-to-printer';

import {Link, browserHistory} from 'react-router';

import firebase from './../../../stub/FirebaseConfig';
const isOnline = require('is-online');
export default class ShowBillPage extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	 // console.log(localStorage.getItem("BillToShow"));
	}
    DeleteBillBackup(){
    	var self = this;
    			if(confirm("Are You Sure You Wan't to Delete This Bill")==true){
    				let inv = localStorage.getItem("InvoiceDateToDel");
    				inv = inv.replace('/','');
    				inv = inv.replace('/','');
    				console.log(inv);
    				var db = JSON.parse(localStorage.getItem(inv.toString()));
    				db.splice(self.props.params.id,1);
    				localStorage.setItem(inv.toString(),JSON.stringify(db));
          
    				browserHistory.push('/Ledger')
    				//firebase.database().ref('bills/'+inv+'/'+self.props.params.id).remove().then(()=>{alert('Removed Successfully'); browserHistory.push('/Ledger')});			
    			}
    	
    }
	render(){
		return(
			<div>
			
			<div style={{ backgroundColor: '#ffffff', alignItems : 'center',position: 'fixed',top:35,zIndex: 3,width:'100%',height:80 }} className={'popText'}>
				<div style={{display:'flex',flex:1, position:'relative',top:10}}>
					<div style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:50,  backgroundColor: '#ffffff',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} >
							
					</div>
					<div onClick={()=>{print(localStorage.getItem("BillToShow"))}} style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:50,  backgroundColor: '#3F51B5',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
							<h1 style={{position:'relative',top:-10, color: '#FFC107',fontSize: 18}}>Print </h1>
					</div>
					<div onClick={()=>this.DeleteBillBackup.bind(this)()} style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:50,  backgroundColor: '#3F51B5',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
							<h1 style={{position:'relative',top:-10,    color: '#FFC107',fontSize: 18}}>Delete (for Exchange) </h1>
					</div>
					<div style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:50,  backgroundColor: '#ffffff',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} >
							
					</div>
					
				</div>
			</div>
			<div style={{display:'flex',flexWrap:'wrap',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}}>
				<br/><br/><br/><br/><br/><br/>
				<div dangerouslySetInnerHTML={{ __html: localStorage.getItem("BillToShow") }} style={{flex: 1,alignSelf:'center',width:'40vw'}}></div>
			</div>
			 
			</div>
		)
	}

}