import './footer.css';


function Footer(props) {
    return (
        <div className='footer'>
            <div className="container">
                  <div className="logo">
                     <h1>ShOp</h1>
                     <div className='socila'>
                        <i className='fa fa-facebook'></i>
                        <i className='fa fa-twitter'></i>
                        <i className='fa fa-instagram'></i>
                        <i className='fa fa-envelope-o'></i>
                     </div>
                  </div>
                  <div className="categories">
                       <label>Categories</label>
                       <ul>
                         <li>men</li>
                         <li>women</li>
                         <li>kids</li>
                       </ul>
                  </div>
                  <div className="contact">
                      <form>
                          <input type="text" name='name'placeholder='Your Name'/>
                          <input type={"email"} name="email" placeholder='Email'/>
                          <textarea  name="message" placeholder='Message'/>
                          <input type={"submit"} value="Send" />
                      </form>
                  </div>
            </div>
        </div>
    );
}

export default Footer;