import "./newuser.css";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { API } from "../../API";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

function NewProduct() {
  const [file, setFile] = useState(null);
  const [filePersentage, setFilePersentage] = useState("");
  const [products, setProducts] = useState({});
  const notify = (e) => toast.success(e);
  const notifyError = (e) => toast.error(e);
  const [upload,setUpload]=useState(false)
  const handleChange = (e) => {
    setProducts((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const handleCategories = (e) => {
    setProducts((prev) => {
      return { ...prev, [e.target.id]: e.target.value.trim().split(",") };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpload(true)
    try {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePersentage(parseInt(progress));
        },
        (error) => {
          notifyError("Error in upload file");
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addProduct(downloadURL);
            console.log(downloadURL)
          });
        }
      );
    } catch (error) {
      notifyError("Error in upload image");
    }
  };
  const addProduct = async (image) => {
    try {
      const res = await axios.post(`${API}/api/product`, {...products , image:image} ,{headers:{token:localStorage.getItem("token")}});
      notify(res.data.msg);
      setProducts({})
      setUpload(false)
    } catch (error) {
      console.log(error)
      notifyError(error.response.data.message);
      setUpload(false)
    }
  };

  return (
    <div className="admin">
      <div className="side">
        <Sidebar />
      </div>
      <div className="conadmin bottomnew">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="forminput">
              <label htmlFor="file">
                Image : <i className="fa fa-upload icon"></i>
                <br /> {filePersentage ? (filePersentage + "%") : "0 %"}
              </label>
              <input
                type={"file"}
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="forminput">
              <label htmlFor="title">Title</label>
              <input
                type={"text"}
                placeholder="Apple , Macbook pro"
                id="title"
                onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="desc">Description</label>
              <textarea
                type={""}
                placeholder="Description"
                id="desc"
                onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="categories">Categories</label>
              <input
                type={"text"}
                placeholder="TV"
                id="categories"
                onChange={handleCategories}
              />
            </div>
            <div className="forminput">
              <label htmlFor="price">Price</label>
              <input
                type={"text"}
                placeholder="100"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="size">Size</label>
              <input
                type={"text"}
                placeholder="25 in"
                id="size"
                onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="color">Color</label>
              <input
                type={"text"}
                placeholder="black ,blue"
                id="color"
                onChange={handleChange}
              />
            </div>
            <div className="forminput">
              <label htmlFor="amount">Amount</label>
              <input
                type={"text"}
                placeholder="25"
                id="amount"
                onChange={handleChange}
              />
            </div>
            <input type={"submit"} value={upload ? "Uploading..." : "Upload"} className="submit" disabled={upload}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
