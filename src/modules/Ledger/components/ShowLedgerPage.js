import React,{Component} from 'react';
import If from './../../utils/components/If.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import firebase from './../../../stub/FirebaseConfig';
import { print } from 'html-to-printer';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Add from 'material-ui/svg-icons/action/note-add';
import {List, ListItem} from 'material-ui/List';
import {Link, browserHistory} from 'react-router';
import Divider from 'material-ui/Divider';
const IcontItem = (<Avatar size={50} color='#3F51B5' style={{backgroundColor: '#ffffff'}}  icon={<Add />} />);
const isOnline = require('is-online'); 
//var db = require('diskdb');
//db = db.connect('./../../../../Data', ['bills']);

export default class ShowLedgerPage extends Component {
	componentDidMount(){
		 //console.log(db);
		 this.exec.bind(this,this.state.SelectedDateVal)();
		
	}
	constructor(props) {
	  super(props); 
	  var today = new Date();
      var dd = today.getDate()
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10){
    		dd='0'+dd;
		} 
	 if(mm<10){
    		mm='0'+mm;
		}

	  this.state = {Daytots:{CGST:0,SGST: 0, IGST:0, Total :0} ,GSTAmt:0,threadStart:true,SelectedDate:dd+'/'+mm+'/'+yyyy, SelectedDateVal:today,dd:dd, mm:mm, yyyy:yyyy,BillData:[],BillKey:[]};
	
	}
	onDateChange(event,date){
		this.exec.bind(this,date)();
		
	}
	async exec(SelectedDateVal){
		console.log('Date Passed',SelectedDateVal);
		var arr = [];
	    var arr1 =[];
	    var dd = SelectedDateVal.getDate();
      	var mm = SelectedDateVal.getMonth()+1;
        var yyyy = SelectedDateVal.getFullYear();
      	if(dd<10){
    		dd='0'+dd;
		} 
	 	if(mm<10){
    		mm='0'+mm;
		}
        
       
	    var DateToSearch = dd+''+mm+''+yyyy;
	    // alert('Searching for D:'+DateToSearch);
	    var db = JSON.parse(localStorage.getItem(DateToSearch.toString()));
	    if(!db){
	    	console.log("DB is empty");
	    	var a = [];
	    	localStorage.setItem(DateToSearch.toString(),JSON.stringify(a));
	    }
	    else{
	    	for(var key in db)
			{   
				let i = key;
				arr1.push(i);
    			arr.push(db[i]);
			}
			var Daytots = this.CalculateTotals.bind(this,arr)();
			console.log("DB isnt Empty, writing data");
	    	console.log(db);
			this.setState({BillData:arr,BillKey:arr1, Daytots:Daytots,SelectedDateVal:SelectedDateVal});

	    }

	}
	CalculateTotals(BillData){
		console.log('Calculating...');
		var totalCGST = 0;
		var totalSGST = 0;
		var totalIGST = 0;
		var totalAmt = 0;
		if(BillData.length>0){
			console.log('In If');
			for(var key in BillData ){
				let cgstSingle = parseFloat(BillData[key].TotalCGST);
				let igstSingle = parseFloat(BillData[key].TotaICGST);
				let sgstSingle = parseFloat(BillData[key].TotalSGST);
				let amtSingle = parseFloat(BillData[key].TotalAmt);
				totalAmt = parseFloat(totalAmt);
				totalCGST = parseFloat(totalCGST);
				totalSGST = parseFloat(totalSGST);
				totalIGST = parseFloat(totalIGST);
				totalAmt = totalAmt + amtSingle;
				totalCGST = totalCGST + cgstSingle;
				totalSGST = totalSGST + sgstSingle;
				totalIGST = totalIGST + igstSingle;
				totalAmt = parseFloat(totalAmt).toFixed(2);
				totalCGST = parseFloat(totalCGST).toFixed(2);
				totalSGST = parseFloat(totalSGST).toFixed(2);
				totalIGST = parseFloat(totalIGST).toFixed(2);

			}
			var objToReturn = {
				CGST : totalCGST,
				SGST : totalSGST,
				IGST : totalIGST,
				Total : totalAmt
			}
			
			return objToReturn;


		}else{
			var objToReturn = {
				CGST : 0,
				SGST : 0,
				IGST : 0,
				Total : 0
			}
			return objToReturn;
		}

	}
	printAll(){
		var allBills = this.state.BillData;
  		if(this.state.BillData && this.state.BillData.length !=0){
  			
 	 		var html = '';
  			for(var bill in allBills){
  				html = html +allBills[bill].BillHTML + '<br/><br/><br/><br/><br/><br/><br/><br/><br/><div style="height=5px">&nbsp;</div>';
			}
  			print(html);
	
  		}
  		else{
  			alert('Error: Nothing to print!!');
  		}
  	}
  	ShowBillHTML(billData,keyx){
  		console.log(billData);
  		localStorage.setItem("BillToShow",billData.BillHTML);
  		localStorage.setItem("InvoiceDateToDel",billData.InvoiceDate);
  		browserHistory.push(`/ShowBill/${keyx}`)
  	}

RenderItemList(){
  		var self = this;
  		var ReturnArr = [];
  		for (var key in this.state.BillData){
  			let  alldata = self.state.BillData[key];
  			let keyx = self.state.BillKey[key];
  			console.log(keyx);
  			//alert(keyx);
  			
  			ReturnArr.push(
				<div  key={keyx+'DivMain'}>
					<ListItem key={keyx+'ListItem'} onClick={self.ShowBillHTML.bind(self,alldata,keyx)} hoverColor='#ffe69b' rightIcon={<Arrow/>} leftAvatar={IcontItem} primaryText={alldata.InvoiceNumber} secondaryText={'Click To Open Bill'} />
					<Divider  key={keyx+'Divider'} />
				</div>
			)
  			

  		}
  		return ReturnArr;
  		
  	}

	render(){
		return(
			<div style={{width:'100%'}}>
			<If test={this.state.SelectedDateVal}>
				<div style={{ backgroundColor: '#ffffff', alignItems : 'center',position: 'fixed',top:35,zIndex: 3,width:'100%',height:45 }} className={'popText'}>
					<h3 style={{fontSize: 15}}>Selected Date:&nbsp;&nbsp;{this.state.SelectedDateVal.getDate()}/{this.state.SelectedDateVal.getMonth() +1}/{this.state.SelectedDateVal.getFullYear()}</h3>
				</div>
			</If>
			<div style={{ display: 'flex',flexWrap: 'wrap',position:'relative', alignItems : 'center',top:50,zIndex: 2,justifyContent: 'center' }} className={'popText'}>
				
				<span style={{flex:1}}></span>
				<h3 style={{flex:2}}>Please Select a Date:</h3>
				<DatePicker textFieldStyle={{cursor:'pointer'}} value={this.state.SelectedDateVal} onChange={this.onDateChange.bind(this)} hintText="Click To Select Date" />
				<span style={{flex:1}}></span>
				<br/>
			</div>
			<If test = {this.state.Daytots}>
				<div style={{display:'flex',flex:1, position:'relative',top:60}}>
					<div style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:80,  backgroundColor: '#FFC107',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
							<h1 style={{    color: '#3F51B5',fontSize: 18}}>CGST: {this.state.Daytots.CGST}</h1>
					</div>
					<div style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:80,  backgroundColor: '#FFC107',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
							<h1 style={{    color: '#3F51B5',fontSize: 18}}>SGST: {this.state.Daytots.SGST}</h1>
					</div>
					<div style={{cursor:'pointer',alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', height:80,  backgroundColor: '#FFC107',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
							<h1 style={{    color: '#3F51B5',fontSize: 18}}>Total: {this.state.Daytots.Total}</h1>
					</div>
					
					<div  style={{alignSelf: 'flex-start', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:80,  backgroundColor: '#3F51B5',width: '45%',marginLeft: '2.5%',marginBottom: 5,paddingBottom: 5,marginRight: '2.5%'}} className={'popText'}>
						<a onClick={this.printAll.bind(this)}><h1  style={{cursor:'pointer',color: '#FFC107',fontSize: 18}}>Print All</h1></a>
					</div>
					

				</div>
			</If>
			<If test={this.state.BillData && this.state.BillData.length!=0}>
				<div style={{position:'relative',top:100}}>
					<List containerStyle={{marginBottom: 20,elevation: 3}}>
					{
						this.RenderItemList.bind(this)()
					}
					</List>
				</div>
			</If>
			<If test={this.state.BillData && this.state.BillData.length==0}>
				<div style={{position:'relative',top:100}}>
					<center>
					 <h3>Either There's no data available or We are busy in connecting to server...</h3>
					 </center>
				</div>
			</If>


			</div>
		)
	}
}