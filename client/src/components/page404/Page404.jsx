import { Link } from 'react-router-dom';
import './page404.scss';

function Page404(props) {
    return (
        <div className='page404'>
              <div className="notFound">
                   <p> Page Not Found</p>
                   <Link to={"/"} >
                      <h3 className="home">
                         Home
                      </h3>
                   </Link>
              </div>
        </div>
    );
}

export default Page404;