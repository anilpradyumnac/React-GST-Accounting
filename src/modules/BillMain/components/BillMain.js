import React,{Component} from 'react';
import firebase from './../../../stub/FirebaseConfig';
import Button from 'material-ui/RaisedButton';
import Modal from 'react-responsive-modal';
import If from './../../utils/components/If.js';
import TextField from 'material-ui/TextField';
import RandomSelector from './Random';
import QtySelector from './QtySelector';
import CheckBox from 'material-ui/Checkbox';
import { print } from 'html-to-printer';
import converter from 'number-to-words';
const isOnline = require('is-online'); 

class BillMain extends Component{
	constructor(props) {
	  super(props);
	  this.state = {KeyBoardShowing:false,ExchangeChecked:false,modalDatax:[],ShowOtherModal:false ,invUnderOperation:'',PartyName:'Cash',PartyAddr:'',PartyGSTIN:'',billSettingModal:false,SpecialQTY:0,SpecialQTYPrice:0,SpecialQTYPricex:0,ChangingFunc:()=>{},QtySelModal:false,data:[],dataKey:[],modalVisible:false,modalData:[],cart:[],cartModalVisible:false};
	}
	componentWillMount(){
    	var self = this;
    	isOnline().then(online => {
    			if(!online){
    			
    				var arr1 = JSON.parse(localStorage.getItem('ShowPageKeys'));

    				var arr = JSON.parse(localStorage.getItem('ShowPageData'));
    				alert('It Seems Like You dont have a working Internet Connection!! Launching in Offline Mode');
    				this.setState({data:arr,dataKey:arr1,showText:`No Internet Connection: Loading Old ${arr1.length} Items(s)...... `});
    			}
    			else{
	   				firebase.database().ref('items').on('value', (snapshot) => {
				 		console.log(snapshot.val());
				 		var arr = [];
				 		var arr1 =[];
				 		for(var key in snapshot.val())
						{
							let i = key;
							arr1.push(i);
	    					arr.push(snapshot.val()[key].data);
						}
						self.setState({data:arr,dataKey:arr1});
	   			  	 });
	   			}
			});
		}
	CreateRow(Sn,Name,Qty,rate,discount,Igst,Sgst,Cgst){
      var RowStart ="<TR>";
      //SNo Start
      var SnoStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' HEIGHT='19' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>&nbsp;";
      var SnoValue = Sn;
      var SnoEnd = "<br/></FONT></TD>";
      var SnoFinal = SnoStart + SnoValue + SnoEnd;

      //Item Name
      var NameStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var NameValue = Name;
      var NameEnd = '<br/></FONT></TD>';
      var NameFinal = NameStart + NameValue + NameEnd; 

      // Item Qty
      var QtyStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>&nbsp;";
      var QtyValue = Qty;
      var QtyEnd = "<br/></FONT></TD>";
      var QtyFinal = QtyStart +QtyValue + QtyEnd;
      

      //Rate 
      var RateStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>&nbsp;";
      var RateValue = rate;
      var RateEnd = "<br/></FONT></TD>";
      var RateFinal = RateStart + RateValue + RateEnd;
      
      //Amt
      var AmtStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var AmtValue = RateValue * QtyValue;
      var AmtEnd = "<br/></FONT></TD>";
      var AmtFinal = AmtStart + AmtValue + AmtEnd;
      
      //Discount
      var DiscountStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var DiscountValue = discount;
      var DiscountEnd = "<br/></FONT></TD>";
      var DiscountFinal = DiscountStart + DiscountValue + DiscountEnd;

      //Taxable
      var TaxableStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var TaxableValue = ((AmtValue - ((AmtValue * DiscountValue )/100))).toFixed(2);
      var TaxableEnd = "<br/></FONT></TD>";
      var TaxableFinal = TaxableStart + TaxableValue + TaxableEnd;

      //IGSTRate
      var IgstRateStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var IgstRateValue = Igst;
      var IgstRateEnd = "<br/></FONT></TD>";
      var IgstRateFinal = IgstRateStart + IgstRateValue + IgstRateEnd;

      //IGSTAmt
      var IgstAmtStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var IgstAmtValue = (TaxableValue * IgstRateValue / 100).toFixed(2) ;
      var IgstAmtEnd = "<br/></FONT></TD>";
      var IgstAmtFinal = IgstAmtStart + IgstAmtValue + IgstAmtEnd;

      //SGSTRate
      var SgstRateStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var SgstRateValue = Sgst;
      var SgstRateEnd = "<br/></FONT></TD>";
      var SgstRateFinal = SgstRateStart + SgstRateValue + SgstRateEnd;
     
      //SGSTAmt
      var SgstAmtStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var SgstAmtValue = (TaxableValue * SgstRateValue / 100).toFixed(2) ;
      var SgstAmtEnd = "<br/></FONT></TD>";
      var SgstAmtFinal = SgstAmtStart + SgstAmtValue + SgstAmtEnd;
      

      //CGSTRate
      var CgstRateStart = " <TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var CgstRateValue = Cgst;
      var CgstRateEnd = "<br/></FONT></TD>";
      var CgstRateFinal = CgstRateStart + CgstRateValue + CgstRateEnd;

      //CGSTAmt
      var CgstAmtStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      var CgstAmtValue = (TaxableValue * CgstRateValue / 100).toFixed(2) ;
      var CgstAmtEnd = "<br/></FONT></TD>";
      var CgstAmtFinal = CgstAmtStart + CgstAmtValue + CgstAmtEnd;


      //ItemTotal
      var ItemTotalStart = "<TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'><FONT FACE='Calibri' COLOR='#000000'>";
      IgstAmtValue = parseFloat(IgstAmtValue);
      SgstAmtValue = parseFloat(SgstAmtValue);
      CgstAmtValue = parseFloat(CgstAmtValue);
      var TaxTotAll = IgstAmtValue + SgstAmtValue + CgstAmtValue;
      TaxTotAll = parseFloat(TaxTotAll);
      TaxableValue = parseFloat(TaxableValue);
      console.log("Row tax Total is:"+TaxTotAll);

      var ItemTotalValue = TaxableValue + TaxTotAll;
      console.log("Row Item Total is:"+ItemTotalValue);
      ItemTotalValue = parseFloat(ItemTotalValue).toFixed(2);
      var ItemTotalEnd = "<br/></FONT></TD>";
      var ItemTotalFinal = ItemTotalStart + ItemTotalValue + ItemTotalEnd;
      
      var RowEnd ="</TR>"; 
      var C1 = RowStart + SnoFinal + NameFinal + QtyFinal + RateFinal + AmtFinal + DiscountFinal;
      var C2 = C1 + TaxableFinal + IgstRateFinal + IgstAmtFinal + SgstRateFinal + SgstAmtFinal;
      var RowFinal = C2 + CgstRateFinal + CgstAmtFinal + ItemTotalFinal + RowEnd;

      return RowFinal;
   }
  async printHTML(cart) {
    // only available on android 
    console.log(cart);
    console.log(window.prompt);
      var self =this;
      var finalItems = cart;
      var numberOfItems = finalItems.length;
      var RowStart ="<TR>";
      var today = new Date();
      var dd = today.getDate()
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var hours = today.getHours();
      var mins = today.getMinutes();
      var sec = today.getSeconds();
      if(hours<10){
      	hours = '0'+hours;
      }
      if(mins<10){
      	mins = '0'+mins;
      }
      if(sec<10){
      	sec = '0'+sec;
      }

      var unique = hours+''+mins+''+sec;
      var val = await localStorage.getItem('Count');
      	if(val!=null){
      		let igVal = parseInt(val);
      		unique = igVal;
      		++igVal;
      		localStorage.setItem('Count',igVal);
      	}
      	else{
      		unique= 1;
      		localStorage.setItem('Count',1);
      	}

     
      if(dd<10){
    	dd='0'+dd;
		} 
	  if(mm<10){
    		mm='0'+mm;
		}	

      var BillTop = "<TABLE style='margin-bottom:40px;margin-top:20px ' CELLSPACING='0'COLS='15'BORDER='0'><COLGROUP><COL WIDTH='20'><COL WIDTH='84'><COL WIDTH='27'><COL WIDTH='27'><COL WIDTH='27'><COL WIDTH='30'><COL WIDTH='31'><COL WIDTH='28'><COL WIDTH='2'><COL WIDTH='33'><COL WIDTH='32'><COL WIDTH='26'><COL WIDTH='26'><COL WIDTH='26'><COL WIDTH='25'></COLGROUP><TBODY><TR><TD STYLE='border-top: 3px solid #000000;border-left: 3px solid #000000;'COLSPAN='6'WIDTH='165'HEIGHT='44'ALIGN='LEFT'VALIGN='TOP'SDNUM='1033;1033;General'><B><FONT FACE='Calibri'COLOR='#000000'>GSTIN:07ABMPS8815J1ZZ</FONT></B></TD><TD STYLE='border-top: 3px solid #000000;'COLSPAN='3'WIDTH='165'HEIGHT='44'ALIGN='LEFT'VALIGN='TOP'SDNUM='1033;1033;General'></TD><TD STYLE='border-top: 3px solid #000000; 'COLSPAN='5'WIDTH='165'HEIGHT='44'ALIGN='Left'VALIGN='TOP'SDNUM='1033;1033;General'><B><FONT FACE='Calibri'COLOR='#000000'>Tax Invoice</FONT></B></TD><TD STYLE='border-top: 3px solid #000000;border-right: 3px solid #000000;border-right: 3px solid #000000;'COLSPAN='3'WIDTH='162'ALIGN='RIGHT'VALIGN='TOP'SDNUM='1033;1033;General'><B><FONT FACE='Calibri'COLOR='#000000'>Mob:9810645190<br/>9718744976</FONT></B></TD></TR><TR style='line-height: 17px;'><TD STYLE='border-left: 3px solid #000000; border-right: 3px solid #000000;border-bottom: 3px solid #000000'COLSPAN='16'HEIGHT='60'ALIGN='CENTER'VALIGN='TOP'SDNUM='1033;1033;General'><B><FONT FACE='Calibri'SIZE='5'COLOR='#000000'>Hotex School Uniform<br/><FONT SIZE='3'>3/5,Veer Savarkar Block,Shakarpur,Delhi-110092<br/>Email:harvinder22011969@gmail.com</FONT></FONT></B></TD></TR>";

      //Now Individual Bill Specific Details
      
      	//R1
      var InvNum;
      
      if(this.state.ExchangeChecked){
      	 
      	
      }
      else{
      	InvNum = yyyy+'/'+dd+'/'+mm+'/'+unique;
      }	
      var PartyName = this.state.PartyName;
      if(PartyName.length<1){
      	PartyName = 'Cash';
      }
      var BillHeadR1 = "<TR style='line-height: 15px;'><TD ROWSPAN='1' height='24' COLSPAN='3' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 3px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <B>Invoice Number:</B><br/> </FONT></TD><TD ROWSPAN='1' height='24' COLSPAN='7' STYLE=' border-right: 1px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> "+InvNum+"<br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 1px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <B>Name:</B><br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 3px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> "+PartyName+"<br/> </FONT></TD></TR>";
      
      var InvDate;
     	//R2
      if(!this.state.ExchangeChecked){
      	InvDate = dd+'/'+mm+'/'+yyyy;
      } 
      else{
      	await localStorage.getItem('INVDATE').then((a)=>{InvDate = a;});
      	 
      }
      
      

      var PartyAddr = this.state.PartyAddr;
      var BillHeadR2 = "<TR style='line-height: 15px;'><TD ROWSPAN='1' height='24' COLSPAN='3' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 3px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <B>Invoice Date:</B><br/> </FONT></TD><TD ROWSPAN='1' height='24' COLSPAN='7' STYLE=' border-right: 1px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> "+InvDate+" <br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 1px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <b>Address:</b><br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 3px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> "+PartyAddr+"<br/> </FONT></TD></TR>";

      	//R3
      var PartyGSTIN = this.state.PartyGSTIN;
      var BillHeadR3 = "<TR style='line-height: 15px;'><TD ROWSPAN='1' height='24' COLSPAN='3' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 3px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <B>Reverse Charges:</B><br/> </FONT></TD><TD ROWSPAN='1' height='24' COLSPAN='7' STYLE=' border-right: 1px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> No <br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 0px solid #000000;border-bottom: 0px solid #000000; border-left: 1px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <b>GSTIN:</b><br/> </FONT></TD><TD COLSPAN='3' ROWSPAN='1' STYLE=' border-right: 3px solid #000000;border-bottom: 0px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> "+PartyGSTIN+"<br/> </FONT></TD></TR>";	
      
        //R4
      var BillHeadR4 = "<TR style='line-height: 15px;'><TD ROWSPAN='1' height='24' COLSPAN='3' STYLE=' border-right: 0px solid #000000;border-bottom: 3px solid #000000; border-left: 3px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <b>State Code:</b><br/> </FONT></TD><TD ROWSPAN='1' height='24' COLSPAN='7' STYLE=' border-right: 1px solid #000000;border-bottom: 3px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> 07 <br/> </FONT></TD><TD COLSPAN='4' ROWSPAN='1' STYLE=' border-right: 0px solid #000000;border-bottom: 3px solid #000000; border-left: 1px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> <b>State Code:</b><br/> </FONT></TD><TD COLSPAN='2' ROWSPAN='1' STYLE=' border-right: 3px solid #000000;border-bottom: 3px solid #000000; border-left: 0px solid #000000;'> <FONT FACE='Calibri' COLOR='#000000'> 07<br/> </FONT></TD></TR>";  
      	//MainItemBox Headings

      var BillHeadings = "<TR><TD STYLE=' border-right: 1px solid #000000;border-bottom: 3px solid #000000; border-left: 3px solid #000000;' COLSPAN='10' HEIGHT='19' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'> <B><FONT FACE='Times New Roman' SIZE='3'>Ship To Party: On The Counter Sale</FONT></B></TD><TD STYLE=' border-right: 3px solid #000000;border-bottom: 3px solid #000000; border-left: 1px solid #000000;' COLSPAN='6' HEIGHT='19' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'> <B><FONT FACE='Times New Roman' SIZE='3'>Transportation Mode Not Applicable</FONT></B></TD></TR><TR><TD STYLE='border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' HEIGHT='38' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>S no</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Product <br/>Description</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Qty</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Rate</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Amt</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Dis</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Taxable</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='3' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>IGST</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>SGST</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>CGST</FONT></TD><TD STYLE='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ROWSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Total</FONT></TD></TR><TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Rate</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Amt</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Rate</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Amt</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Rate</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='CENTER' VALIGN='MIDDLE' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'>Amt</FONT></TD></TR>";

      //Generating Bill Top Portion

      var BillStart = BillTop + BillHeadR1 + BillHeadR2 +BillHeadR3 +BillHeadR4 + BillHeadings;

      var BlankRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' HEIGHT='19' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD></TR>";
     

      var FilledRows = "";
      var i = 0;
      var count = 0;
      var Bill = {}; 
      var ItemsArray =[]; 
      for(i=0;i<numberOfItems;i++){
          if(!finalItems[i].checked){
             for(var qts in finalItems[i].SelectedSizesArray ){

               var key = 'size'+ finalItems[i].SelectedSizesArray[qts].Size;
               var RName = finalItems[i].ItemCategory +'-'+finalItems[i].SelectedSizesArray[qts].Size;
               var RQty = finalItems[i].SelectedSizesArray[qts].Qty;
               var RRate = 0;
               var RIgst = 0;
               var RSgst = 0;
               var RCgst = 0;
               if( finalItems[i].SizePrices[key]){
                RRate = finalItems[i].SizePrices[key];
               }
               if(finalItems[i].IGST){
                RIgst = finalItems[i].IGST;
               }
               if(finalItems[i].SGST){
                RSgst = finalItems[i].SGST;
               }
               if(finalItems[i].CGST){
                RCgst = finalItems[i].CGST;
               }
               var RDiscount;
               
               if(finalItems[i].Discount){
                  //alert('found Discount');
                  RDiscount= finalItems[i].Discount;
               }else{
                //alert('not found Discount');
                  RDiscount = 4.76;
               }
               var BillItems = {};
               BillItems['Name'] = RName;
               BillItems['Qty'] = RQty;
               BillItems['Rate'] = RRate;
               BillItems['IGST'] = RIgst;
               BillItems['CGST'] = RCgst;
               BillItems['SGST'] = RSgst;
               BillItems['Discount'] = RDiscount;
               ItemsArray.push(BillItems);
             }
          }
         else{
              console.log('In special items');
               var RName = finalItems[i].ItemCategory;
               var RQty = finalItems[i].SelectedSizesArray[0].Qty;
               var RRate = finalItems[i].SizePrices['SpecialQTYPrice'];
               console.log('Sp Rate:'+RRate);
              // var RRate = 0;
               var RIgst = 0;
               var RSgst = 0;
               var RCgst = 0;
               var RDiscount;
               if( finalItems[i].SizePrices[0]){
                RRate = finalItems[i].SizePrices['SpecialQTYPrice'];
               }
               if(finalItems[i].IGST){
                RIgst = finalItems[i].IGST;
               }
               if(finalItems[i].SGST){
                RSgst = finalItems[i].SGST;
               }
               if(finalItems[i].CGST){
                RCgst = finalItems[i].CGST;
               }
               if(finalItems[i].Discount){
                  RDiscount= finalItems[i].Discount;
               }else{
                  RDiscount = 4.76;
               }
               
               var BillItems = {};
               BillItems['Name'] = RName;
               BillItems['Qty'] = RQty;
               BillItems['Rate'] = parseFloat(RRate);
               BillItems['IGST'] = RIgst;
               BillItems['CGST'] = RCgst;
               BillItems['SGST'] = RSgst;
               BillItems['Discount'] = RDiscount;
               ItemsArray.push(BillItems);
          }
       }
       var key = 0;
       console.log(ItemsArray);
       
       for(key=0;key<ItemsArray.length;key++ ){
          console.log(ItemsArray[key]);
          FilledRows= FilledRows + self.CreateRow((key+1),ItemsArray[key].Name,ItemsArray[key].Qty,ItemsArray[key].Rate,ItemsArray[key].Discount,ItemsArray[key].IGST,ItemsArray[key].SGST,ItemsArray[key].CGST);  
          count++;
       }
      
        

      if(count<11){
        count = 10-count;
        for(i=0;i<count;i++){
          FilledRows = FilledRows + BlankRow;
        }
      }
      var QtyTotal = 0;
      var TaxableTotal = 0;
      var IgstTotal  = 0;
      var CgstTotal  = 0;
      var SgstTotal  = 0;
      var TotalAmt = 0;
      var keyx =0;
 
      for(keyx in ItemsArray){
        let key = keyx;
        console.log('Logging Key: '+key+' Item Is: '+ItemsArray[key].Name);
        var amt = parseFloat(parseFloat(ItemsArray[key].Rate) * parseInt(ItemsArray[key].Qty)).toFixed(2);
        console.log('Rate : '+parseFloat(ItemsArray[key].Rate));
        console.log('Qty :'+parseInt(ItemsArray[key].Qty));
        console.log('Amt is :'+amt);
        var discountCash = amt * parseFloat(ItemsArray[key].Discount)/100;
        console.log('Discount: '+ItemsArray[key].Discount+'% Cash:'+discountCash);
        var taxable = parseFloat(amt - discountCash).toFixed(2);
        console.log('Taxable Amount: '+ taxable);
        
        var SGST = (taxable * (ItemsArray[key].SGST)/100);
        var CGST = (taxable * (ItemsArray[key].CGST)/100);
        var IGST = (taxable * (ItemsArray[key].IGST)/100);
        SGST = parseFloat(SGST).toFixed(2);
        CGST = parseFloat(CGST).toFixed(2);
        IGST = parseFloat(IGST).toFixed(2);
        console.log('SGST: '+SGST+'CGST: '+CGST+'IGST: '+IGST);
        console.log('Tax Totals initially');
        console.log('IGST Total :'+IgstTotal);
        console.log('IGST Total :'+SgstTotal);
        console.log('IGST Total :'+CgstTotal);

        IgstTotal = parseFloat(IgstTotal) + parseFloat(IGST); 
        CgstTotal = parseFloat(CgstTotal) + parseFloat(CGST);
        SgstTotal = parseFloat(SgstTotal) + parseFloat(SGST);
        
        IgstTotal = parseFloat(IgstTotal).toFixed(2);
        CgstTotal = parseFloat(CgstTotal).toFixed(2);
        SgstTotal = parseFloat(SgstTotal).toFixed(2);
        console.log('Tax Totals finally');
        console.log('IGST Total :'+IgstTotal);
        console.log('IGST Total :'+SgstTotal);
        console.log('IGST Total :'+CgstTotal);
        QtyTotal = QtyTotal + parseInt(ItemsArray[key].Qty);
        console.log('Qty: '+QtyTotal);
        console.log('Taxable Total Initial: '+TaxableTotal + ' will be added with '+taxable);  
        TaxableTotal = parseFloat(TaxableTotal) + parseFloat(taxable);
        TaxableTotal = parseFloat(TaxableTotal).toFixed(2);
        console.log('Taxable Total Final: '+TaxableTotal);
        var tot = parseFloat(taxable) + parseFloat(SGST) + parseFloat(CGST) + parseFloat(IGST);
        TotalAmt = parseFloat(TotalAmt) + parseFloat(tot);   
        TotalAmt = parseFloat(TotalAmt).toFixed(2);     
      }
      var BillEnd = "<TR><TD STYLE='line-height:14px; border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' COLSPAN='9' HEIGHT='100' ALIGN='LEFT' VALIGN='CENTER' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman'><CENTER><B>Terms and Conditions</B></CENTER> 1 Goods once Sold will not be Taken Back. <br/>2 All Dispute are Subject to Delhi Jurisdiction. <br/>3 Interest @18% will be charged after due of Payment.</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000; border-bottom: 3px solid black' height='100' COLSPAN='7' ROWSPAN='2' ALIGN='CENTER' VALIGN='TOP' SDNUM='1033;1033;General'> <B><FONT FACE='Times New Roman'>certified that the particulars given are true and correct<br/></FONT></B><B><FONT FACE='Times New Roman' SIZE='3'>For : HOTEX SCHOOL UNIFORM <br/><br/><br/>(Authorised Signatory.)</FONT></B></TD></TR><TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 3px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000'colspan='9'><FONT FACE='Times New Roman' SIZE='3'><B>Bank</B> : Syndicate Bank, Raja Tower,Laxmi Nagar, Delhi - 110092 <br/><B>Acc No.</B> : 90501010006070 <br/><b>IFSC Code</b> : SYNB0009050</FONT></TD></TR></TBODY></TABLE>";
      var TotalRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' HEIGHT='19' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Total</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ QtyTotal+" <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ TaxableTotal+" <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='2' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ IgstTotal+" <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ SgstTotal+"<br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ CgstTotal+" <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+ TotalAmt+" <br/> </FONT></TD></TR>";
     
      var BeforeTaxRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' COLSPAN='9' HEIGHT='19' ALIGN='LEFT' VALIGN='TOP' BGCOLOR='#CDCDCD' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Total Amount in words</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Total Amount Before Tax</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+TaxableTotal+" <br/> </FONT></TD></TR>";
      var TotInWord = (converter.toWords(Math.round(TotalAmt)).toUpperCase()) + " ONLY";
      var CGSTRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 3px solid #000000; border-right: 1px solid #000000' COLSPAN='9' ROWSPAN='5' HEIGHT='47' ALIGN='center' VALIGN='center' SDNUM='1033;1033;General'> <FONT SIZE='5' FACE='Calibri' COLOR='#000000'> "+TotInWord+" <br/> </FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Add : CGST</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+CgstTotal+" <br/> </FONT></TD></TR>";
     
      var IGSTRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Add : IGST</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+IgstTotal+" <br/> </FONT></TD></TR>";
      
      var SGSTRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Add : SGST</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+SgstTotal+" <br/> </FONT></TD></TR>";
      
      var TotRow = "<TR><TD STYLE='border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>Total Amount After Tax</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> "+TotalAmt+" <br/> </FONT></TD></TR><TR><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' COLSPAN='6' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Times New Roman' SIZE='3'>GST on Reverse Charges</FONT></TD><TD STYLE='border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 3px solid #000000' ALIGN='LEFT' VALIGN='TOP' SDNUM='1033;1033;General'> <FONT FACE='Calibri' COLOR='#000000'> <br/> </FONT></TD></TR>";
     
      var BillToPrint = BillStart + FilledRows + TotalRow + BeforeTaxRow+CGSTRow+IGSTRow+ SGSTRow + TotRow+ BillEnd;
      
      var ObjectToPost = {};
      ObjectToPost['InvoiceNumber'] = InvNum;
      ObjectToPost['InvoiceDate'] = InvDate;
      ObjectToPost['PartyName'] = PartyName;
      ObjectToPost['PartyAddr'] = PartyAddr;
      ObjectToPost['PartyGSTIN'] = PartyGSTIN;
      ObjectToPost['CartInstance'] = cart;
      ObjectToPost['ItemsArray'] = ItemsArray;
      ObjectToPost['BillHTML'] = BillToPrint;
      ObjectToPost['TotalCGST'] = CgstTotal;
      ObjectToPost['TotalIGST'] = IgstTotal;
      ObjectToPost['TotalSGST'] = SgstTotal;
      ObjectToPost['TotalTax'] = TotalAmt- TaxableTotal;
      ObjectToPost['TotalAmt'] = TotalAmt;
      

      print((BillToPrint));

   
  }	
	_showOtherModal(){
  		this.setState({ShowOtherModal:true});
  	}
  	 _hideModal(){
  	this.setState({ modalVisible: false,modalData:[] });
 	 }
  	_closeOtherModal(){
  		this.setState({ShowOtherModal:false});
  	}
  	RandomSelectorHandler(item){
  		 
  		if(this.state.data.length>0 && item!=-1){
  			let ArrayOfData = this.state.data;
  			var arr = [];
  			ArrayOfData.map((datax)=>{
				if(datax.checked && datax.ItemCategory==item){
					arr.push(datax);
				}
  			});
  			console.log('Selected Random');
  			console.log(arr[0]);
  			this.setState({modalDatax:arr[0],modalData:arr[0],RandomSelectorShow:false });
		}
  	}
  	hideQtySelector(){
  		this.setState({QtySelModal:false});
  	}
  	specialQtyChangeHandler(supplied){
    	this.setState({SpecialQTY:supplied});
  	}
  	AddToCartClicked(special){
      if(special){
       
        var OpenedModalItem = this.state.modalData;
        let {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked,Discount} = this.state.modalData;
        var SizePrices = {};
        console.log(OpenedModalItem);
        SizePrices['SpecialQTYPrice'] = this.state.SpecialQTYPrice;
        var ObjectToPush = {};
        var SelectedSizesArray = [];
        ObjectToPush['ItemCategory'] = ItemCategory;
        ObjectToPush['CGST'] = CGST;
        ObjectToPush['IGST'] = IGST;
        ObjectToPush['SGST'] = SGST;
        ObjectToPush['checked'] = checked;
        ObjectToPush['SizePrices'] = SizePrices;
        ObjectToPush['Discount'] = Discount;
        var CartOld = this.state.cart;
        var toPush = {};
        var qty = this.state.SpecialQTY;
        var sizex = ItemCategory;
        var SelectedSizesArray = [];
        var flag = false;
        var cartIndex = -1;
        toPush['Size'] =  sizex;
        toPush['Qty'] = qty;
        if(qty>0){
          SelectedSizesArray.push(toPush);
        }
        ObjectToPush['SelectedSizesArray'] = SelectedSizesArray;
       
        for(item in CartOld ){
          if(CartOld[item].ItemCategory==OpenedModalItem.ItemCategory){
            flag = true;
            cartIndex = item; 
          }
        }

        if(flag && this.state.modalDatax.length==0){
         if(SelectedSizesArray.length==0){
          CartOld.splice(cartIndex,1);
        }else{
          CartOld[cartIndex] = ObjectToPush;
        }
      }   
      else{
      	
        CartOld.push(ObjectToPush)
      }
      console.log('Finally Cart is:');
      console.log(CartOld);
      
      this.setState({cart:CartOld, modalVisible: false,modalDatax:{},RandomSelectorShow:false,SpecialQTY:0,SpecialQTYPrice:0,ShowOtherModal:false });

      }
      else{
      var QuantitiesSelected = this.state.Quantities;
      var CartOld = this.state.cart;
      var flag = false;
      var cartIndex = 0;
      var OpenedModalItem = this.state.modalData;
      let {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked,SizePrices,Discount} = this.state.modalData;
      
      var ObjectToPush = {};
      var SelectedSizesArray = [];
      var i ;
      var self = this;
      console.log('Initial;y Cart is:');
      console.log(CartOld);
      ObjectToPush['ItemCategory'] = ItemCategory;
      ObjectToPush['CGST'] = CGST;
      ObjectToPush['IGST'] = IGST;
      ObjectToPush['MaxSize'] = MaxSize;
      ObjectToPush['MinSize'] = MinSize;
      ObjectToPush['SGST'] = SGST;
      ObjectToPush['SizeStep'] = SizeStep;
      ObjectToPush['checked'] = checked;
      ObjectToPush['SizePrices'] = SizePrices;
      ObjectToPush['Discount'] = Discount;
      for(i=parseInt(MinSize);i<=parseInt(MaxSize);i+=parseInt(SizeStep)){
        let k = i;
        let selectedToSeek = 'Qty'+k;
        if(parseInt(self.state.Quantities[selectedToSeek]) > 0){
          var toPush = {};
          var qty = self.state.Quantities[selectedToSeek];
          var Sizex = k;
          toPush['Size'] =  Sizex;
          toPush['Qty'] = qty;
          SelectedSizesArray.push(toPush);
        }
      }
      ObjectToPush['SelectedSizesArray'] = SelectedSizesArray;

      for(var item in CartOld ){
        console.log(item);
        if(CartOld[item].ItemCategory==OpenedModalItem.ItemCategory){
          flag = true;
          cartIndex = item; 
        }
      }
      if(flag){
        if(SelectedSizesArray.length==0){
          CartOld.splice(cartIndex,1);
        }else{
          CartOld[cartIndex] = ObjectToPush;
        }
      }   
      else{
        CartOld.push(ObjectToPush)
      } 
      console.log('Finally Cart is:');
      console.log(CartOld);
      
      this.setState({cart:CartOld, modalVisible: false});

      }
  	}
  	deleteInvoice(){
  	console.log('Path Is: '+this.state.path);
  	var self = this;
  	if(self.state.path){
  		try{
  			firebase.database().ref(self.state.path).remove().then(()=>{
  			alert('Invoice Removed SuccessFully');
  			self.setState({path:false,invUnderOperation:''});
  			});
  		}
  		catch(err){
  			alert('Unexpected Error Occurred'+err)
  		}
  		
  	}
  	else{
  		alert('Operation Not Authorizable, Use If Print Menu Fails');
  	}
  	
  }
  	renderTotalItems(){
  		var cartNow = this.state.cart;
  		var count = 0;
  		for(var products in cartNow){
  			for(var qts in cartNow[products].SelectedSizesArray ){
   				count = count + parseInt(cartNow[products].SelectedSizesArray[qts].Qty);
  			}
  		}
  		return(count)
  	}
  	 _showCartModal(){
  	var cart = this.state.cart;
  	if(cart.length>0){
  		this.setState({ cartModalVisible: true});
  	}
  	else{
  		alert('No Item(s) to Bill, Please Select at least one Item and Try Again');
  	}
  }
   _hideCartModal(){
  	this.setState({ cartModalVisible: false});
  }
  _showModal(ModalItem){
    console.log('SHowModal Called');
  	var i =0;
  	var Quantities = {};
  	var PresentCart = this.state.cart;
  	var flag = false;
  	var Index = 0;
  	for(var item in PresentCart ){
  		if(PresentCart[item].ItemCategory==ModalItem.ItemCategory){
  			flag = true;
  			Index = item;

  		}
  	}

  	if(flag===false){
      console.log('Item Not in cart');
      if(ModalItem.checked){
        this.setState({ modalVisible: true,modalData:ModalItem,SpecialQTY:0,SpecialQTYPrice:0 });
      }
      else{
        for(i=parseInt(ModalItem.MinSize);i<=parseInt(ModalItem.MaxSize);i+=parseInt(ModalItem.SizeStep)){
        let k = i;
        var key = 'Qty'+k;
        Quantities[key] = '0';  
        }
        Quantities['Odd']='0';
  		  this.setState({ modalVisible: true,modalData:ModalItem,Quantities:Quantities });
        
		  } 	
	
  	}
  	else{
      console.log('Item in Cart');
      if(ModalItem.checked){
        var spQT = PresentCart[item].SelectedSizesArray[0].Qty; 
        console.log(PresentCart[item]);
        var spPrice =  PresentCart[item].SizePrices['SpecialQTYPrice'];  
        console.log('Price: '+spQT);
        this.setState({ modalVisible: true,modalData:ModalItem,SpecialQTY:spQT,SpecialQTYPrice:spPrice }); 
      }
      else{
        for(i=parseInt(ModalItem.MinSize);i<=parseInt(ModalItem.MaxSize);i+=parseInt(ModalItem.SizeStep)){
      let k = i;
      let internalFlag = false;
      let InternalIndex = 0;
      for(var values in PresentCart[Index].SelectedSizesArray ){
        if(k==parseInt(PresentCart[Index].SelectedSizesArray[values].Size)){
          internalFlag = true;
          InternalIndex = values;
        }
      }
      var key = 'Qty'+k;
      if(internalFlag){
        Quantities[key] = PresentCart[Index].SelectedSizesArray[InternalIndex].Qty;
      }
      else{
        Quantities[key] = '0';
      }
      
      
    }
    this.setState({ modalVisible: true,modalData:ModalItem,Quantities:Quantities });
      }
  		 
  	}
  	
  	
  } 
  renderNotSpecial(){
  		var MainArr = [];
		var i,j;
		var self = this;


		for(i=parseInt(this.state.modalData.MinSize);i<=parseInt(this.state.modalData.MaxSize);i+=parseInt(this.state.modalData.SizeStep)){
	 		let k = i;
	 		let keyToSeek = 'size'+k;
	 		let selectedToSeek = 'Qty'+k;
	 		let selectedValue=self.state.Quantities[selectedToSeek]; 	
	 		let ChangeHandler = (q)=>{
	 			let Obj = self.state.Quantities;
	 			Obj[selectedToSeek]=q.toString();
	 			self.setState({Quantities:Obj});
	 		}
	

   			MainArr.push(
   				<div style={{width:'100%',display:'flex',flexDirection: 'row',justifyContent: 'space-around' ,alignItems: 'center'  }}>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center', flex:1, fontSize: 18,justifyContent: 'center',alignItems:  'center'  }}>{k}</h2>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center',flex:1, fontSize: 18,justifyContent: 'center',alignItems:  'center'  }}>{this.state.modalData.SizePrices[keyToSeek]}</h2>
	            			 		<Button label={selectedValue} labelColor='#FFC107' labelStyle={{fontSize:18}} backgroundColor='#3F51B5' style={{flex:1,alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:30,marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{self.setState({QtySelModal:true,ChangingFunc:ChangeHandler})}}>
									</Button>
				</div>					
	            			 		 
	  		);
 		}
    MainArr.push(<br/>);
    MainArr.push(<br/>);
    MainArr.push(<br/>);
    MainArr.push(<br/>);
    MainArr.push(<br/>);
    MainArr.push(<br/>);
     		return(MainArr);
  	}
  	renderMemo(){
  		var cartNow = this.state.cart;
  		var RenderingArr = [];
  		for(var products in cartNow){
        if(cartNow[products].checked){
           RenderingArr.push(
           	  <div key={'Memo+Special'+products} style={{width:'100%',display:'flex',flexDirection: 'row',justifyContent: 'space-around' ,alignItems: 'center'  }}>
	          	<h2 key={'MemoText1special+'+products} style={{color: '#3F51B5',textAlign:'center', flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].ItemCategory}</h2>
	            <h2 key={'MemoText2special+'+products} style={{color: '#3F51B5',textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].SelectedSizesArray[0].Qty}</h2>
	            <h2 key={'MemoText3special+'+products} style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].SizePrices['SpecialQTYPrice'] * cartNow[products].SelectedSizesArray[0].Qty}/-</h2>
	            <h2 key={'MemoText4special+'+products} style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}> {parseFloat((cartNow[products].SizePrices['SpecialQTYPrice'] * cartNow[products].SelectedSizesArray[0].Qty) +(cartNow[products].SizePrices['SpecialQTYPrice'] * cartNow[products].SelectedSizesArray[0].Qty * cartNow[products].SGST/100)+(cartNow[products].SizePrices['SpecialQTYPrice'] * cartNow[products].SelectedSizesArray[0].Qty * cartNow[products].CGST/100)).toFixed(2)}/-</h2>
	            		
	          </div>

            )
        }
        else{
          for(var qts in cartNow[products].SelectedSizesArray ){
          let key = 'size'+ cartNow[products].SelectedSizesArray[qts].Size;
          RenderingArr.push(
                  	<div key={'MemoTexxxxxt1+'+qts+products}  style={{width:'100%',display:'flex',flexDirection: 'row',justifyContent: 'space-around' ,alignItems: 'center'  }}>
	            		<h2 key={'MemoText1+'+qts+products} style={{color: '#3F51B5',textAlign:'center', flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].ItemCategory}-{cartNow[products].SelectedSizesArray[qts].Size}</h2>
	            		<h2 key={'MemoText2+'+qts+products} style={{color: '#3F51B5',textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].SelectedSizesArray[qts].Qty}</h2>
	            		<h2 key={'MemoText3+'+qts+products} style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}>{cartNow[products].SizePrices[key] * cartNow[products].SelectedSizesArray[qts].Qty}/-</h2>
	            		<h2 key={'MemoText4+'+qts+products} style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 17,justifyContent: 'center',alignItems:  'center'  }}> {parseFloat((cartNow[products].SizePrices[key] * cartNow[products].SelectedSizesArray[qts].Qty) +(cartNow[products].SizePrices[key] * cartNow[products].SelectedSizesArray[qts].Qty * cartNow[products].SGST/100)+(cartNow[products].SizePrices[key] * cartNow[products].SelectedSizesArray[qts].Qty * cartNow[products].CGST/100)).toFixed(2)}/-</h2>
	            			 	
	            	</div>		 	
                    
            )
          }  
        }
  			
  		}
  		return(RenderingArr)
  	}
  

	render(){
		var self = this;
		return(
			<div style={{position: 'relative',top:17,height: '77vh' }}>
				<Modal modalStyle={{padding:0,width:'60%',height:'90%',overflowY: 'visible' }} showCloseIcon={true} closeIconSize={24}  onClose={()=>{this._closeOtherModal.bind(this)()}} open={this.state.ShowOtherModal} >
					<div style={{ backgroundColor: '#ffffff', flex: 1,elevation: 5,justifyContent:  'space-between'  }}>
            			  <div style={{flexDirection: 'row',justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'relative',top:-30  }}>
            		  		  <h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',  paddingTop: 7,paddingBottom: 7}}>Another Special Item!</h4>
            			  </div>
            			 <div style={{flex:1}}>
            			  	<div style={{position: 'relative',top:-30 }}>
            			  		<h3 style={{fontSize: 14,fontStyle:'italic',color: '#3F51B5',  paddingTop: 0,paddingBottom: 0}}>This an option To Add Redundant Special Item(s) to cart, Item(s) Added Using this menu, can't be removed from Cart. In Order to remove them, go back to main menu and re-create the bill.</h3>
            			  	 	<Button label='Select..' labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{self.setState({RandomSelectorShow:true})}}>
								</Button>	
						  	</div>  
						  	<If test={this.state.modalDatax.length!=0}>
						  	   <div>
						  		 <div style={{justifyContent: 'space-around'  }}>
                       				 <h5 style={{marginBottom: 10, color: '#3F51B5',textAlign:'justify' , flex:1, fontSize: 18,justifyContent: 'center',alignItems:  'center'  }}>{this.state.modalDatax.ItemCategory} is a Special Item with CGST: {this.state.modalDatax.CGST}% and SGST: {this.state.modalDatax.SGST}%. Please Specify Tax exclusive Price Below in order to continue... </h5>
                              	 </div>
                                 <div>
                                 	<TextField value={self.state.SpecialQTYPrice+''} onChange={(spPrices)=>{self.setState({SpecialQTYPrice:spPrices.target.value});}} style={{flex:1,width:'48%'}} disabled={false}  floatingLabelText="Enter Price" />&nbsp;&nbsp;
                  					<Button label={'QTY :'+this.state.SpecialQTY} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{self.setState({QtySelModal:true,ChangingFunc:this.specialQtyChangeHandler.bind(this)})}}>
									</Button>
	                          	</div>
	                          </div>	
      						</If>
      						<Button label='Add To Bill' labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{position: 'absolute',bottom: 0,alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{this.AddToCartClicked.bind(this,this.state.modalDatax.checked)()}}>
							</Button>
      					</div>	
				    </div>
            	</Modal>
            	<Modal modalStyle={{padding:0,width:'60%',minHeight:'90%',maxHeight:'700%',overflowY: 'visible'  }} showCloseIcon={true} closeIconSize={24}   onClose={()=>{this._hideCartModal.bind(this)()}} open={this.state.cartModalVisible}>
        			  	<div style={{display:'flex',flexDirection: 'column', backgroundColor: '#ffffff', flex: 1,elevation: 5,justifyContent:  'space-between',height: '100%',overflowY:'scroll'   }}>
            			  <div  style={{zIndex:50000, height:44,justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'absolute',top:0,width:'100%' }} className={'shadow'}>
            		  		  <center>
            		  		  		<h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',position:'relative',top:7,  paddingTop: 0,paddingBottom: 0,margin:0}}>Bill Memo</h4>
            			  	  </center>	
            			  </div>
            			 </div>
            	</Modal>
            	<Modal modalStyle={{padding:0,width:'60%',height:'90%',overflowY: 'visible' }} showCloseIcon={true} closeIconSize={24}  onClose={()=>{this._hideCartModal.bind(this)()}} open={this.state.cartModalVisible}>
        				<div style={{ backgroundColor: '#ffffff', flex: 1,elevation: 5,justifyContent:  'space-between'  }}>
            			  <div style={{flexDirection: 'row',justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#3F51B5',position: 'relative',top:-30  }}>
            		  		  <h4 style={{fontSize: 22,fontStyle:'italic',color: '#FFC107',  paddingTop: 7,paddingBottom: 7}}>Bill Memo</h4>
            			  </div>
            			  <div style={{display:'flex',flexDirection:'column', width:'100%',borderWidth: 5, position:'relative', top:50}}>
	            			 	<div style={{width:'100%',display:'flex',flexDirection: 'row',justifyContent: 'space-around' ,alignItems: 'center'  }}>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center', flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Item</h2>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center',flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Qty</h2>
	            			 		<h2 style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Rate</h2>
	            			 		<h2 style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Amt</h2>
	            			 	</div>
	            			 	 
	            				 {
									self.renderMemo.bind(self)()
	            				 }
	            			 	 
	            		   </div>
	            		   <Button label='Print Bill' labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{position: 'absolute',bottom: 0,alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{self.setState({billSettingModal:true,cartModalVisible:false})}}>
						   </Button>
	            		   	
        			
            			            			 
        				{/*
            			  	<View style={{flex:1}}>
	            			 	 
	            			 	<ScrollView>
	            			 	{
	            			 		this.renderMemo.bind(this)()
	            			 	}
	            			 	</ScrollView>
	            			 </View>	
	            			 <Button onPress={()=>{this.setState({billSettingModal:true,cartModalVisible:false})}} containerViewStyle={{elevation:5,padding:0,margin: 0,width:'100%',position: 'absolute',bottom: 0,left:'-4.6%',flex:1}} large color='#FFC107' buttonStyle={{width: '100%'}} backgroundColor='#3F51B5'  title='Print Bill' />	
        				*/}
			 		</div>
        		 </Modal>
        		 <Modal   modalStyle={{padding:0,width:'60%',height:'90%',overflowY: 'visible' }} showCloseIcon={true} closeIconSize={24} onClose={()=>{this.setState({billSettingModal:false})}} open={this.state.billSettingModal}>
        				<div style={{display:'flex',flexDirection: 'column', backgroundColor: '#ffffff', flex: 1,elevation: 5,justifyContent:  'space-between',height: '100%',overflowY:'scroll'   }}>
            			  <div  style={{zIndex:50000, height:44,justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'absolute',top:0,width:'100%' }} className={'shadow'}>
            		  		  <center>
            		  		  		<h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',position:'relative',top:7,  paddingTop: 0,paddingBottom: 0,margin:0}}>Bill Print Setting!</h4>
            			  	  </center>	
            			  </div>
            			  	<div style={{flex:1,position: 'relative',top:50 }}>
            			  		<TextField value={this.state.PartyName} onChange={(PartyName)=>{self.setState({PartyName:PartyName.target.value});}} style={{flex:1,width:'88%'}} disabled={false}   hintText='Enter Party Name'  floatingLabelText="Party Name" />&nbsp;&nbsp;
                  				<TextField value={this.state.PartyAddr} onChange={(PartyAddr)=>{self.setState({PartyAddr:PartyAddr.target.value});}} style={{flex:1,width:'88%'}} disabled={false}   hintText='Enter Party Address'  floatingLabelText="Party Address" />&nbsp;&nbsp;
	            			 	<TextField value={this.state.PartyGSTIN} onChange={(PartyGSTIN)=>{self.setState({PartyGSTIN:PartyGSTIN.target.value});}} style={{flex:1,width:'88%'}} disabled={false}   hintText='Enter Party GSTIN'  floatingLabelText="Party GSTIN" />&nbsp;&nbsp;
                  				<Button label={'Delete Invoice'} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor={'#3F51B5'} style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:45,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}} onClick={()=>{self.deleteInvoice.bind(this)()}}></Button>
                                <center>
                               		 <br/><br/>
                               		 <CheckBox label='Click, If You are trying to exchange'   onCheck={(val)=>{this.setState({ExchangeChecked:!this.state.ExchangeChecked})}}  checked={this.state.ExchangeChecked}/>
	            			 	 </center> 	
	            			 	 
	            			 </div>	
	            			  <Button label='Print Bill' labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{position: 'absolute',bottom: 0,alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{self.printHTML.bind(self,self.state.cart)()}}>
						  	</Button>
			
            		 </div>  	
        		 </Modal>
        		 <Modal modalStyle={{padding:0,width:'60%',minHeight:'90%',maxHeight:'700%',overflowY: 'visible'  }} showCloseIcon={true} closeIconSize={24}   onClose={()=>{this._hideModal.bind(this)()}} open={this.state.modalVisible}>
        			  	<div style={{display:'flex',flexDirection: 'column', backgroundColor: '#ffffff', flex: 1,elevation: 5,justifyContent:  'space-between',height: '100%',overflowY:'scroll'   }}>
            			  <div  style={{zIndex:50000, height:44,justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'absolute',top:0,width:'100%' }} className={'shadow'}>
            		  		  <center>
            		  		  		<h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',position:'relative',top:7,  paddingTop: 0,paddingBottom: 0,margin:0}}>{this.state.modalData.ItemCategory}!</h4>
            			  	  </center>	
            			  </div>
            			  <If test={this.state.modalData.checked}>
	            			 {/*It's a Special Item*/}
                     		<div style={{height: '100%', justifyContent: 'space-around',position: 'relative',top:35   }}>
                       			 <h2 style={{marginBottom: 0, color: '#3F51B5',textAlign:'justify' , flex:1, fontSize: 18,justifyContent: 'center',alignItems:  'center'  }}>{this.state.modalData.ItemCategory} is a Special Item with CGST: {this.state.modalData.CGST}% and SGST: {this.state.modalData.SGST}%. Please Specify Tax exclusive Price Below in order to continue... </h2>
                                 <TextField value={self.state.SpecialQTYPrice+''} onChange={(spPrices)=>{self.setState({SpecialQTYPrice:spPrices.target.value});}} style={{flex:1,width:'88%'}} disabled={false}   hintText='Enter Price' type={'numeric'}  floatingLabelText="Enter Price" />&nbsp;&nbsp;
                  				 <Button label={'QTY :'+this.state.SpecialQTY} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor={'#3F51B5'} style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:100,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}} onClick={()=>{self.setState({QtySelModal:true,ChangingFunc:self.specialQtyChangeHandler.bind(self)})}}></Button>
                                  
                            </div>
                  		  </If>
	            		  <If test={!this.state.modalData.checked}>
	            			 {/*Not a Special Item*/}
	            			<div style={{display:'flex',flexDirection:'column', width:'100%',borderWidth: 5, position:'relative', top:50}}>
	            			 	<div style={{width:'100%',display:'flex',flexDirection: 'row',justifyContent: 'space-around' ,alignItems: 'center'  }}>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center', flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Sizes</h2>
	            			 		<h2 style={{color: '#3F51B5',textAlign:'center',flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Price</h2>
	            			 		<h2 style={{color: '#3F51B5', textAlign:'center',flex:1, fontSize: 23,justifyContent: 'center',alignItems:  'center'  }}>Qty</h2>
	            			 	</div>
	            			 	 
	            				 {
									self.renderNotSpecial.bind(self)()
	            				 }
	            			 	 
	            			 </div>
	            		  </If>
	            		  <Button label={'Add To Bill'} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor={'#3F51B5'} style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:35,width: '94%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%',position: 'absolute',bottom: 0}} onClick={()=>{self.AddToCartClicked.bind(self,self.state.modalData.checked)()}}></Button>
                                 
         			 </div>
         		 

        		  </Modal>

				<div style={{position:'relative', top:20}} >
					<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
					<Button label='Another' labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:100,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>this._showOtherModal.bind(this)()}>
						
					</Button>
					{
						
						this.state.data.map((item)=>{
							if(item.SizePrices || item.checked){
								return(
									<Button key={item.ItemCategory+'toucha'} label={item.ItemCategory} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:100,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>this._showModal.bind(this,item)()}>
									</Button> 
 								)
							}
							else{
							}
							
						})
					}
					

					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

					</div>
				</div>
				<RandomSelector allData={this.state.data} showRandom={this.state.RandomSelectorShow} RandomChangeHandleFunc={this.RandomSelectorHandler.bind(this)} />    
				<QtySelector ChangeHandlerFunc={this.state.ChangingFunc.bind(this)} hideQtySelector={this.hideQtySelector.bind(this)} visibility={this.state.QtySelModal} />
				<Button label={`You have ${this.state.cart.length} product(s) and ${this.renderTotalItems.bind(this)()} item(s) in Cart`} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{position: 'fixed',bottom: 55,alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:55,width: '96%',marginLeft: '2%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}   onClick={()=>{this._showCartModal.bind(this)()}}>
				</Button>
				

			</div>
		)
	}
} 
export default BillMain;