import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAccessToken } from "../Utils/Common";
import ErrorMessage from "./ErrorMessage";

export default function EditBook() {
  const [title, setTitle] = useState();
  const [authorId, setAuthorId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [publishYear, setPublishYear] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [cover, setCover] = useState();

  const [errorMess, setError] = useState(null);

  const setAll = (respone) => {
    setTitle(respone.data.title);
    setAuthorId(respone.data.author.id);
    setCategoryId(respone.data.category.id);
    setPublishYear(respone.data.publish_year);
    setPrice(respone.data.price);
    setDescription(respone.data.description);
    setCover(respone.data.cover);
  };
  let history = useHistory();
  const loadInfo = () => {
    axios
      .get(`http://localhost:5000/api/books/${id}`, config)
      .then((respone) => {
        setAll(respone);
      })
      .catch((error) => setError(error.response.data.message));
  };
  let config = {
    headers: {
      Authorization: "Bearer " + getAccessToken(),
    },
  };
  const { id } = useParams();
  const handleSave = () => {
    setError(null);
    const data = {
      title,
      authorId,
      categoryId,
      publishYear,
      price,
      description,
      cover,
    };
    axios
      .patch(`http://localhost:5000/api/books/${id}/edit`, data, config)
      .then((respone) => {
        history.push('/');
      })
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <div>
      <div className="container">
        <button onClick={loadInfo}> LoadInfor</button>
        <p className="h4"> Add New Book: </p>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
            />
          </div>
          <div className="form-group">
            <label>Author ID</label>
            <input
              type="text"
              className="form-control"
              defaultValue={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category ID</label>
            <input
              type="text"
              className="form-control"
              defaultValue={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Publish Year</label>
            <input
              type="text"
              className="form-control"
              defaultValue={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cover</label>
            <input
              type="text"
              className="form-control"
              defaultValue={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>

          <button type="reset" className="badge badge-danger mr-2">
            Reset
          </button>
        </form>
        <button
          type="submit"
          className="badge badge-success"
          onClick={handleSave}
        >
          Save
        </button>
        {ErrorMessage && <ErrorMessage message={errorMess} />}
      </div>
    </div>
  );
}
