import React, { Component } from 'react';
import profile from '../../../../../public/image/Navbar/profile.svg';
import triangle from '../../../../../public/image/triangle.png';
class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //alert(this.props.passwordReset)
        return (
            <div className="msg_not_dropdown">
              <div className="arrow_dropdown_msg">
                <img src={triangle}/>
              </div>
              <div className='dropdown_container_msg'>
                <div className="mn_header">
                  <span>Messages</span>
                </div>
                <div className="msg_not_contContainer">
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                  <div className="msg_not_content disp_inliFl pointer">
                    <div className="sender_Img">
                      <img src={profile}></img>
                    </div>
                    <div className="sender_msgDetails">
                      <div className="sender_Name">Zenith Kari</div>
                      <div className="sender_messageHighLight">You: Hey dude , how you doing?</div>
                    </div>
                  </div>

                  <div className='mn_divider'></div>
                </div>
                <div className="msg_not_footer pointer">
                  <span>
                    <p>View All messages</p>
                  </span>
                </div>
              </div>
            </div>
        )
    }
}

export default Notification;