import { useState } from "react";
import { useSelector } from "react-redux";
import "./order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../API";
import { useNavigate } from "react-router-dom";
function Order(props) {
  const history = useNavigate();
  const [valid, setValid] = useState(false);
  const { products, count, price } = useSelector((state) => state.order);
  const [order, setOrder] = useState({
    name: "",
    mobileNumber: "",
    mobileNumber2: "",
    governorate: "",
    address: "",
    notes: "",
    products: products,
    countProducts:count,
    price:price,
  });

  const notifyError = (e) => toast.error(e);
  const notify = (e) => toast.success(e);
  const handleChange = (e) => {
    setOrder((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const makOrder = async () => {
    if (order.name === "") return notifyError("Please Inter your name");
    if (order.mobileNumber === "")
      return notifyError("Please Inter your Mobile");
    if (order.address === "") return notifyError("Please Inter your address");
    try {
      const res = await axios.post(`${API}/api/order`, order, {
        headers: { token: localStorage.getItem("token") },
      });
      notify(res.data.message);
      history("/cart", { replace: true });
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
    }
  };
  return (
    <div className="order">
      <div className="con-order container">
        <div className="details">
          <h3>Personal data</h3>
          <div className="form">
            <div className="div-form">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" onChange={(e) => handleChange(e)} />
            </div>
            <div className="div-form">
              <label htmlFor="mobileNumber">Mobile number</label>
              <input
                type={"tel"}
                id="mobileNumber"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="div-form">
              <label htmlFor="mobileNumber2">
                Alternate number <span>*</span>
              </label>
              <input
                type={"tel"}
                id="mobileNumber2"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="div-form">
              <label htmlFor="Governorate">Governorate</label>
              <select id="governorate" onChange={(e) => handleChange(e)}>
                <option value="cairo">Cairo</option>
                <option value="alexandria">Alexandria</option>
                <option value="geza">Geza</option>
                <option value="alsharkia">Al Sharkia</option>
                <option value="alesmail">Al Esmail</option>
                <option value="fayoum">Fayoum</option>
              </select>
            </div>
            <div className="div-form">
              <label htmlFor="address">Address</label>
              <input
                type={"text"}
                id="address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="div-form">
              <label htmlFor="notes">
                Notes <span>*</span>
              </label>
              <textarea
                type={"text"}
                id="notes"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="make-order">
          <div className="head">Order</div>
          <div className="cards">
            {products ? (
              products.map((e) => {
                return (
                  <div className="card">
                    <div className="divimg">
                      <img src={e.image} />
                    </div>
                    <div className="txt">
                      <div className="t-txt">
                        <h3>
                          {e.title.length >= 20
                            ? e.title.substring(0, 20) + "..."
                            : e.title}
                        </h3>
                        <p>count : {e.quantity ? e.quantity : count} </p>
                      </div>
                      <div className="price">
                        <p>{e.price} $</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}

            <hr />
            <div className="set">
              <p>Price</p>
              <p>{price}</p>
            </div>
            <div className="set">
              <p>Shipping expenses</p>
              <p>35</p>
            </div>
            <hr />
            <div className="set">
              <p className="total-price">
                Total Price : <span>{!price ? 0 : price + 35}</span>
              </p>
            </div>
            <div className="btn">
              <button onClick={(e) => makOrder()}>Send Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
