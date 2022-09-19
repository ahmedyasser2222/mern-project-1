import './categories.css';
import {Link} from "react-router-dom"
function Categories(props) {




    return (
        <div className='container'>
            <div className="cates">
                
                    <div className="card">
                                <div className="inner-card">
                                        <div className="front-card">
                                            <img src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=400"/>
                                        </div>
                                        <div className="back-card">
                                              <p>
                                                <Link to={"/ca"} className="link">
                                                    Show More
                                                </Link>
                                              </p>
                                        </div>
                                </div>
                                <div className="detals" style={{textAlign:"center"}}>
                                    <h2>Men</h2>
                                </div>
                   </div>
                   <div className="card">
                                <div className="inner-card">
                                        <div className="front-card">
                                            <img src="https://images.pexels.com/photos/7506913/pexels-photo-7506913.jpeg?auto=compress&cs=tinysrgb&w=400"/>
                                        </div>
                                        <div className="back-card">
                                              <p>
                                                <Link to={"/ca"} className="link">
                                                    Show More
                                                </Link>
                                              </p>
                                        </div>
                                </div>
                                <div className="detals" style={{textAlign:"center"}}>
                                    <h2>Women</h2>
                                </div>
                   </div>
                   <div className="card">
                                <div className="inner-card">
                                        <div className="front-card">
                                            <img src="https://images.pexels.com/photos/10412484/pexels-photo-10412484.jpeg?auto=compress&cs=tinysrgb&w=400"/>
                                        </div>
                                        <div className="back-card">
                                              <p>
                                                <Link to={"/ca"} className="link">
                                                    Show More
                                                </Link>
                                              </p>
                                        </div>
                                </div>
                                <div className="detals" style={{textAlign:"center"}}>
                                    <h2>Kids</h2>
                                </div>
                   </div>
                   
                     
            </div>
        </div>
    );
}

export default Categories;