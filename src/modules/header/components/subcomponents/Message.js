import React, { Component } from 'react';
import profile from '../../../../../public/image/Navbar/profile.svg';
import triangle from '../../../../../public/image/triangle.png';
class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //alert(this.props.passwordReset)
        return (
            <div className="msg_not_dropdown">
              <div className="arrow_dropdown_not">
                <img src={triangle}/>
              </div>
              <div className='dropdown_container_not'>
                <div className="mn_header">
                  <span>Notifications</span>
                </div>
                <div className="msg_not_contContainer">
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="senderNot_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="senderNot_notDetails">
                      <span className="sender_Name">Zenith Kari
                      </span>
                      <span className="sender_messageHighLight">&nbsp;started following you</span>
                    </div>
                  </div>
                  <div className='not_divide'></div>

                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="senderNot_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="senderNot_notDetails">
                      <span className="sender_Name">Pratiksha Sinha
                      </span>
                      <span className="sender_messageHighLight">&nbsp;commented "I envy you!" on your</span>
                      <span className="brand_blue">
                        post</span>
                    </div>
                    <div className="senderNot_Img">
                      <img src={profile}></img>
                    </div>
                  </div>
                  <div className='not_divide'></div>
                </div>
                <div className="msg_not_footer pointer">
                  <span>
                    <p>See All Notification</p>
                  </span>
                </div>
              </div>
            </div>
        )
    }
}

export default Message;