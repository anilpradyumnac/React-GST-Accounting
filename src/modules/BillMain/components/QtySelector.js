import React,{Component} from 'react'; 
import Modal from 'react-responsive-modal';
import Button from 'material-ui/RaisedButton';
export default class QtySelector extends Component{
	constructor(props) {
	  super(props);
	  this.state = {QtyModalVisibility: this.props.visibility};
	}
	componentWillReceiveProps(nextState){
		if(this.state.QtyModalVisibility==nextState.visibility){
			//alert('recieddd');
		}
		else{
		
		this.setState({QtyModalVisibility:nextState.visibility});
		}
	}
	hideQtyModal(quantity){
		var self = this;
		self.props.ChangeHandlerFunc(quantity);
		self.props.hideQtySelector();
		//this.setState({QtyModalVisibility:false});
		//setTimeout(()=>self.props.hideQtySelector(),360);
	}
	render(){
		var self = this;
		return(
			<div style={{flex:1}}>
				<Modal modalStyle={{padding:0,width:'60%',height:'90%',overflowY: 'visible' }} showCloseIcon={true} closeIconSize={24} onClose={()=>{this.hideQtyModal.bind(this,0)()}} open={this.state.QtyModalVisibility}>
					<div style={{ backgroundColor: '#ffffff', flex: 1,elevation: 5 }}>
						<div style={{flexDirection: 'row',justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'relative',top:-30  }}>
	            		  		  <h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',  paddingTop: 7,paddingBottom: 7}}>Select Quantity</h4>
	            	 	</div>
	            		<div style={{position:'relative', top:10}} >
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
								<Button label={'0'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,0)()}} />
								<Button label={'1'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,1)()}} />
								<Button label={'2'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,2)()}} />
								<Button label={'3'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,3)()}} />
							</div>
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1,marginTop: 0}}>
								<Button label={'4'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,4)()}} />
								<Button label={'5'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,5)()}} />
								<Button label={'6'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,6)()}} />
								<Button label={'7'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,7)()}} />
							</div>
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1,marginTop: 0}}>
								<Button label={'8'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,7)()}} />
								<Button label={'9'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,8)()}} />
								<Button label={'10'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,9)()}} />
								<Button label={'11'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,10)()}} />
							</div>
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1,marginTop: 0}}>
								<Button label={'12'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,11)()}} />
								<Button label={'13'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,12)()}} />
								<Button label={'14'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,13)()}} />
								<Button label={'15'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,14)()}} />
							</div>
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1,marginTop: 0}}>
								<Button label={'16'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,15)()}} />
								<Button label={'17'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,16)()}} />
								<Button label={'18'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,17)()}} />
								<Button label={'19'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,18)()}} />
							</div>
							<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1,marginTop: 0}}>
								<Button label={'20'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,19)()}} />
								<Button label={'21'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,20)()}} />
								<Button label={'22'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,21)()}} />
								<Button label={'23'} labelColor='#3F51B5' labelStyle={{fontSize:20}} backgroundColor='#FFC107' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{self.hideQtyModal.bind(this,22)()}} />
							</div>

						</div>
					</div>		
				</Modal>	
			</div>
		)
	}
}