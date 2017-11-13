import React,{Component} from 'react';
import If from './../../utils/components/If.js';

import firebase from './../../../stub/FirebaseConfig';

import TextField from 'material-ui/TextField';

import Button from 'material-ui/RaisedButton';
var arr,arr1;

export default class EditItemPage extends Component{
	 addelement(Objectx,param,value,init){
  	//console.log('In Add Element');
    var SizePricesx = Object.assign({}, Objectx);
    //console.log('Previous Object is:');
    //console.log(SizePricesx);

    var objectSize = Object.keys(SizePricesx).length;
    var newInput = param;

    SizePricesx[newInput] = value;
    //console.log('New Object is:');
    //console.log(SizePricesx);
   // this.setState({SizePrices:SizePricesx,checker:true,initializer:init});
   return(SizePricesx);
 } 
	setterDefault(MinSize,MaxSize,SizeStep,obtained){
 	if(obtained){
 		return(obtained);
 	}
 	else{
 		var i;
  		var FinalObject = {}
  		for(i=parseInt(MinSize);i<=parseInt(MaxSize);i+=parseInt(SizeStep)){
  			var param = 'size'+i;
  			FinalObject = this.addelement.bind(this,FinalObject,param,0,i)(); 
  	 	}
  	return(FinalObject);

 	}
  	
 }
 getValueFunc(param){
  	var Objectx =this.state.SizePrices;
  	var key = 'size'+param;
  	console.log('In Get Func for :'+key);
  	var SizePricesx = Object.assign({}, Objectx);
  	if(SizePricesx[key]){
  		return((SizePricesx[key].toString()))
  	}
  	else{
  		return('0')
  	}
  }
  async UpdateData(){
  	 var {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked,SizePrices,Discount} = this.state;
  	 var DataUpdated = {};
  	 DataUpdated['ItemCategory'] = ItemCategory;
  	 DataUpdated['CGST'] = CGST;
  	 DataUpdated['IGST'] = IGST;
  	 DataUpdated['MaxSize'] = MaxSize;
  	 DataUpdated['MinSize'] = MinSize;
  	 DataUpdated['SGST'] = SGST;
  	 DataUpdated['SizeStep'] = SizeStep;
  	 DataUpdated['checked'] = checked;
  	 DataUpdated['SizePrices'] = SizePrices;
     DataUpdated['Discount'] = Discount;

  	 this.setState({animating:true});
     var data = '';
    alert(this.props.params.id);
     data = await firebase.database().ref(('items/'+this.props.params.id)).set({data:DataUpdated });

     console.log(data);
     this.setState({animating:false});
     
     if(data!=''){
     	alert('Data Updated successfully');

     }
     else{
     	alert('Please Check Internet Connection');
     }
     
  }
   renderButton(){
    var self = this;
    if(!this.state.KeyBoardShowing){
      return(
        <Button onClick={this.UpdateData.bind(this)} style={{width:'100%',flex:1}} backgroundColor='#3F51B5' labelColor='#fff' label='Save Changes' /> 
      
      )
    }
    else{
      return(
        <View></View>
      )

    }
    
  }
  renderButtonSpecial(){
    var self = this;
    if(!this.state.KeyBoardShowing){
      return(
        <Button onClick={this.UpdateData.bind(this)}  style={{width:'100%',flex:1}} backgroundColor='#3F51B5'  labelColor='#fff'  label='Save Changes' /> 
      
      )
    }
    else{
      return(
        <View></View>
      )

    }
    
  }
  handleChangeText(index,Text){
  		console.log('Handling Change for '+index);
  		var i;
  		var self = this;
  		var FinalObject = {}

  		for(i=parseInt(this.state.initializer);i<=parseInt(this.state.MaxSize);i+=parseInt(this.state.SizeStep)){
  			var param = 'size'+i;
  			if(this.state.SizePrices[param]){
  				FinalObject = self.addelement.bind(self,FinalObject,param,self.state.SizePrices[param],i)(); 
  			}
  			else{
  				FinalObject = self.addelement.bind(self,FinalObject,param,0,i)(); 
  			}
	 	}
	 	console.log('We Built Object');
	 	console.log(FinalObject);
	 	
	 	var key = 'size'+index;
	 	console.log('Key to modify is : '+index+' with data: '+Text);
	 	FinalObject[key] = parseInt(Text);
	 	console.log('New Prices are after change:');
	 	console.log(FinalObject);
	 	this.setState({SizePrices:FinalObject});
	

  	}
  
	async componentDidMount(){
		var self = this;
		if(arr && arr1){
			console.log('Will not Load data');
		}else{
			arr1 =  JSON.parse( await localStorage.getItem('ShowPageKeys'));
	        arr =  JSON.parse(await localStorage.getItem('ShowPageData'));
	     	var dataKeyx = await arr1.indexOf(this.props.params.id);
	     	var toseekfrom = arr[dataKeyx];
 			var {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked,SizePrices,Discount} = toseekfrom;
	  
	        self.setState({Discount:Discount,animating:false,initializer:MinSize,ItemCategory,CGST,IGST,MaxSize,MinSize,SGST,dataKeyx, SizeStep,checked,KeyBoardShowing:false,checker:false,SizePrices:self.setterDefault.bind(self,MinSize,MaxSize,SizeStep,SizePrices)()});
	        //console.log(this.state);
	        console.log('DOne');
	         
		}
	}
	 
	 
	constructor(props) {
	  super(props);
	  //var dataKeyx =  arr1[this.props.params.id];
	  //var {ItemCategory,CGST,IGST,MaxSize,MinSize,SGST, SizeStep,checked,SizePrices,Discount} = arr[this.props.params.id];
	  //this.state = {Discount,animating:false,initializer:MinSize,ItemCategory,CGST,IGST,MaxSize,MinSize,SGST,dataKeyx, SizeStep,checked,KeyBoardShowing:false,checker:false,SizePrices:this.setterDefault.bind(this,MinSize,MaxSize,SizeStep,SizePrices)()};
	  this.state={};
	  console.log(this.state);
	}
	
	render(){
			var self = this;
		{
			//alert(this.state.dataKeyx);
			var MainArr = [];
			var i;
			var j=0;
			//var iterator = parseInt(this.state.MinSize);
			//var ObjectToLookInto = this.state.SizePrices; 
			for(i=parseInt(this.state.MinSize);i<=parseInt(this.state.MaxSize);i+=parseInt(this.state.SizeStep)){
	 		 	//   		iterator = iterator + parseInt(this.state.SizeStep);
   				//	    console.log(iterator);
   				let k = i;
   				       								MainArr.push(
	  									<TextField  onChange={(NewText)=>self.handleChangeText.bind(self,k,NewText.target.value)()} value={self.getValueFunc.bind(this,k)()}    key={k+'SizePrice'} style={{width:'48%',alignSelf: 'flex-start',flex:1}}  floatingLabelText={'Size : '+i+' Price'} />
	  				
	  							);
 					
           				}
	  				
   				


			console.log(this.state.SizePrices);		
 		}

		return(
			<div style={{flex:1, backgroundColor: '#ffffff',position: 'relative',top:23 }}>
        		<If test={this.state.checked}>
       			 <div style={{flex:1, backgroundColor: '#ffffff'}}>
         			 <div style={{backgroundColor: '#ffffff', justifyContent:'flex-start', alignItems: 'flex-start'  }}>
           				 <TextField style={{flex:1,width:'48%'}} value={this.state.ItemCategory} onChange={(ItemCategory)=>{self.setState({ItemCategory:ItemCategory.target.value}); console.log(this.state)}}  floatingLabelText={'Item Category'} />&nbsp;&nbsp;
			            <TextField style={{flex:1,width:'48%'}} value={this.state.CGST}  onChange={(CGST)=>{this.setState({CGST:CGST.target.value})}}  floatingLabelText={'CGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.SGST}  onChange={(SGST)=>{this.setState({SGST:SGST.target.value})}}  floatingLabelText={'SGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.IGST}  onChange={(IGST)=>{this.setState({IGST:IGST.target.value})}}  floatingLabelText={'IGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
                    	<TextField value={this.state.Discount} onChange={(Discount)=>{this.setState({Discount:Discount.target.value})}} style={{flex:1,width:'48%'}} disabled={false}   hintText='Discount Percentage[Without % Sign]' type={'numeric'}    floatingLabelText="Discount" />&nbsp;&nbsp;
                    </div> 
                     {
            			this.renderButtonSpecial.bind(this)()
          			}
           		 </div>
       		    </If>
        		<If test={!this.state.checked}>
        			<div style={{flex:1, backgroundColor: '#ffffff'}}>
        				<div style={{backgroundColor: '#ffffff', justifyContent:'flex-start', alignItems: 'flex-start'  }}>
         				  <div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
          					{
            					MainArr
          					}
				          </div>
				          <TextField value={this.state.Discount} onChange={(Discount)=>{this.setState({Discount:Discount.target.value})}} style={{flex:1,width:'48%'}} disabled={false}   hintText='Discount Percentage[Without % Sign]' type={'numeric'}    floatingLabelText="Discount" />&nbsp;&nbsp;
                    
			             <TextField style={{flex:1,width:'48%'}} value={this.state.ItemCategory} onChange={(ItemCategory)=>{self.setState({ItemCategory:ItemCategory.target.value}); console.log(this.state)}}  floatingLabelText={'Item Category'} />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.MinSize} onChange={(MinSize)=>{this.setState({MinSize:MinSize.target.value})}} floatingLabelText={'Minimum Size'}  />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.MaxSize}  onChange={(MaxSize)=>{this.setState({MaxSize:MaxSize.target.value})}}  floatingLabelText={'Maximum Size'}  />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.SizeStep} onChange={(SizeStep)=>{this.setState({SizeStep:SizeStep.target.value})}} floatingLabelText={'Size Step'}  />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.CGST}  onChange={(CGST)=>{this.setState({CGST:CGST.target.value})}}  floatingLabelText={'CGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.SGST}  onChange={(SGST)=>{this.setState({SGST:SGST.target.value})}}  floatingLabelText={'SGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
			             <TextField style={{flex:1,width:'48%'}} value={this.state.IGST}  onChange={(IGST)=>{this.setState({IGST:IGST.target.value})}}  floatingLabelText={'IGST Percentage[Without % Sign]'} />&nbsp;&nbsp;
                    	</div> 
                    	 {
            this.renderButton.bind(this)()
          }
              	 	</div>
         		 </If> 
        </div>
		)
	}
}