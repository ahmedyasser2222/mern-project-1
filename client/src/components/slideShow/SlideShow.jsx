import './slideshow.scss';

function SlideShow(props) {
    return (
        <div className='con-slide'>
            <div className="slide">
                <div className="detals">
                    <h2>Online <br/> Shopping</h2>
                    <h5>Up to 50% Off</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Veritatis, eius minima, voluptate esse illo 
                        voluptatibus quis repellat assumenda consequatur animi commodi
                        .</p>
                        <button>Shoe Now</button>
                </div>
                <div className="image">
                <img src="https://img.freepik.com/free-vector/isometric-laptop-with-shopping-cart-keypad_1262-16544.jpg?w=740&t=st=1663113339~exp=1663113939~hmac=e9e4cc2005e1f2833eb5916554559f895eca1c22d0dc9b8883187681f00ea036"/>

                </div>
            </div>
            
        </div>
    );
}

export default SlideShow;