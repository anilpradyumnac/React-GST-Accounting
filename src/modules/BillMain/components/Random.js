import React,{Component} from 'react'; 
import Modal from 'react-responsive-modal';
import Button from 'material-ui/RaisedButton';
//showRandom : true/false
export default class AnotherSelector extends Component{
	constructor(props) {
	  super(props);
	  this.state = {QtyModalVisibility:this.props.showRandom};
	}
	componentWillReceiveProps(nextProp){
		if(this.state.QtyModalVisibility!=nextProp.showRandom){
			this.setState({QtyModalVisibility:nextProp.showRandom});
		}
	}

	hideQtyModal(index){
		 
		if(index==-1){
				this.props.RandomChangeHandleFunc(-1);
		}
		else{
			this.props.RandomChangeHandleFunc(index);
		}
	}
	render(){
		var self = this;
		return(
			<div style={{flex:1}}>
				<Modal  modalStyle={{padding:0,width:'60%',height:'90%',overflowY: 'visible' }} showCloseIcon={true} closeIconSize={24} onClose={()=>{this.hideQtyModal.bind(this,-1)()}} open={this.state.QtyModalVisibility}>
				<div style={{ backgroundColor: '#ffffff', flex: 1,elevation: 5 }}>
					<div style={{flexDirection: 'row',justifyContent: 'space-around',alignItems:  'center',elevation: 4,backgroundColor:'#FFC107',position: 'relative',top:-30  }}>
            		  		  <h4 style={{fontSize: 22,fontStyle:'italic',color: '#3F51B5',  paddingTop: 7,paddingBottom: 7}}>Select Item!</h4>
            	 	</div>
				 	<div style={{flex:1,position: 'relative',top: 15 }}>
					<div style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
						{

						this.props.allData.map((item)=>{
							if(item.checked){
								return(
									<Button key={item.ItemCategory+'rand'} label={item.ItemCategory} labelColor='#FFC107' labelStyle={{fontSize:20}} backgroundColor='#3F51B5' style={{alignSelf: 'center', justifyContent:  'space-around', alignItems: 'center', elevation: 4, height:33,width: '24%',marginLeft: '0.5%',marginBottom: 5,paddingBottom: 5,marginRight: '0.5%'}}  onClick={()=>{this.hideQtyModal.bind(this,item.ItemCategory)()}}>
									</Button>
									
								)
							}
							else{
								
							}
							
							})
						}
						</div>
					</div>
				</div>	
				</Modal>
			</div>
		)
	}
}