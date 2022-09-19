import Sidebar from '../sidebar/Sidebar';
import './message.css';

function Message(props) {
    return (
        <div className='admin order_admin'>
            <div className="side">
             <Sidebar />
             </div>
             <div className="conadmin">
             <div className="head">
          <div className="divimg">
            <img src="https://cdn.icon-icons.com/icons2/2770/PNG/512/chat_message_icon_176706.png" />
          </div>
          <div className="txt">
            <h2>All Message</h2>
          </div>
        </div>
             </div>

        </div>
    );
}

export default Message;
