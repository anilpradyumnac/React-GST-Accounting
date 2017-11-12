import React,{Component} from 'react';
import Spinner from 'react-spinner-material';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import If from './../../utils/components/If.js';

import firebase from './../../../stub/FirebaseConfig';
export default class AddPage extends Component{
	constructor(props) {
	  super(props);
	this.state = {
        ItemCategory : '',
        MinSize:'',
        MaxSize:'',
        SizeStep:'',
        CGST : '0',
        SGST:'0',
        IGST:'0',
        checked:false,
        animating:false
      };
      var database = firebase.database();
      database.ref('items').on('value',(snapshot)=>{

      console.log(snapshot.val());
      });

	}
     AddItembutton(){
        this.setState({animating:true})
        if(this.state.checked){
            //Special Item
             if(this.state.ItemCategory.length>0 && this.state.SGST.length>0 && this.state.CGST.length>0 ){
                firebase.database().ref('items').push({data:this.state }).then(()=>{
                    alert("Data Posted SuccessFully");
                     this.setState({animating:false});
                });
             }
             else{
               alert('Special Item Registeration: Please Make Sure All Fields are filled Correctly');
                this.setState({animating:false});
             }
            
            
        }
        else{
            // Not a Special Item
            if(this.state.ItemCategory.length>0 && this.state.MinSize.length>0 && this.state.MaxSize.length>0 && this.state.SizeStep.length>0 && this.state.SGST.length>0 && this.state.CGST.length>0 ){
               firebase.database().ref('items').push({data:this.state }).then(()=>{
                    alert("Data Posted SuccessFully");
                     this.setState({animating:false});
                });
            }
            else{
                alert('Not a Special Item Registeration: Please Make Sure All Fields are filled Correctly');
                this.setState({animating:false});
            }
        }
    }
	componentDidMount(){
		setTimeout(()=>{this.setState({animating:false})},3000)
	}
	render(){
		var self = this;
		var val = this.state.animating ? 'visible' : 'hidden';
        var NotSpecial = this.state.checked ? false : true ;
		return(
			 <div style={{flex:1, backgroundColor: '#ffffff',height: '100vh'}}>
  				<div style={{ visibility:val, flex: 1,alignItems:'center',justifyContent:'center',height: '100vh',width:'100vw',top:-2,zIndex:5000,backgroundColor: 'rgba(255, 249, 229, 0.75)', position: 'absolute'  }}>
        			<div style={{flex:1}}>
     		 			&nbsp;
     		 		</div>
     		 		<div style={{flex:1 }}>
     		 			<center>
        					<Spinner size={120} visible={this.state.animating} spinnerWidth={4}  spinnerColor='#3F51B5'/>
     		 			</center>
     		 		</div>
     		 		<div style={{flex:1}}>
     		 			<center>
     		 				<h2 style={{color:'#3F51B5'}}>Please Wait While We are busy Completing Your Request.....</h2>
     		 			</center>
     		 		</div>
     		 	</div> 
                
               
                <div style={{width:'100%', justifyContent: 'space-between' , alignItems:  'space-between',position:'relative',top:30,flexWrap: 'wrap'}}>
                   <SelectField  style={{width: '100%'}}  floatingLabelText="Is it a Special Item?" value={this.state.checked}  onChange={(event,index,checkedVal)=>{self.setState({checked:checkedVal})}}      >
                        <MenuItem value={false} primaryText="No" />
                        <MenuItem value={true} primaryText="Yes" />
                    </SelectField>
                    <TextField value={this.state.ItemCategory} onChange={(ItemCategory)=>{self.setState({ItemCategory:ItemCategory.target.value})}} style={{flex:1,width:'48%',marginRight: 4}} disabled={false}   hintText="Enter Item Category"    floatingLabelText="Item Category" />  
                       
                    <If test={NotSpecial}>
                        <TextField value={this.state.MinSize} onChange={(MinSize)=>{this.setState({MinSize:MinSize.target.value})}} style={{flex:1,width:'48%',visibility:NotSpecial,marginRight: 4}} disabled={false}   hintText="Enter Min Size" type={'numeric'}    floatingLabelText="Min Size" />  
                         
                    </If>
                    <If test={NotSpecial}>
                        <TextField  value={this.state.MaxSize} onChange={(MaxSize)=>{self.setState({MaxSize:MaxSize.target.value})}} style={{flex:1,width:'48%',visibility:NotSpecial,marginRight: 4}} disabled={false}   hintText="Enter Max Size"    floatingLabelText="Max Size" />  
                       
                    </If>
                    <If test={NotSpecial}>
                        <TextField  value={this.state.SizeStep} onChange={(SizeStep)=>{this.setState({SizeStep:SizeStep.target.value})}} style={{flex:1,width:'48%',visibility:NotSpecial,marginRight: 4}} disabled={false}   hintText="Enter SizeStep" type={'numeric'}    floatingLabelText="Size Step" />  
                     
                    </If>
                    <TextField value={this.state.CGST} onChange={(CGST)=>{this.setState({CGST:CGST.target.value})}} style={{flex:1,width:'48%'}} disabled={false}   hintText="Enter CGST without % sign" type={'numeric'}    floatingLabelText="CGST" />  
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField value={this.state.SGST} onChange={(SGST)=>{this.setState({SGST:SGST.target.value})}} style={{flex:1,width:'48%'}} disabled={false}   hintText="Enter SGST without % sign" type={'numeric'}    floatingLabelText="SGST" />  
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField value={this.state.IGST} onChange={(IGST)=>{this.setState({IGST:IGST.target.value})}} style={{flex:1,width:'48%'}} disabled={false}   hintText="Enter IGST without % sign" type={'numeric'}    floatingLabelText="IGST" />  
                    <center>
                     <RaisedButton onClick={this.AddItembutton.bind(this)} labelColor='#FFC107' backgroundColor='#3F51B5' label="Add Item To Database" style={{width:'60%'}} />
                    </center> 
                </div>
     		 </div>
		)
	}

}