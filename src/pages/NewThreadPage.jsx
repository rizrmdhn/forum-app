import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import useLocale from "../hooks/useLocale";
import { asyncCreateThread } from "../states/thread/action";

function NewThreadPage() {
  const { textCreate, textCreateNewThread } = useLocale();

  const [judul, setJudul] = useInput("");
  const [kategori, setKategori] = useInput("");
  const [content, setContent] = useInput("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    dispatch(
      asyncCreateThread({ title: judul, body: content, category: kategori })
    );

    navigate("/");
  };

  return (
    <div className="newThread-container-page">
      <div className="row">
        <div className="col">
          <div className="page-title">
            <h5>{textCreateNewThread}</h5>
          </div>
          <div className="judul-input">
            <input
              type="text"
              placeholder="Title"
              value={judul}
              onChange={setJudul}
            />
          </div>
          <div className="kategori-input">
            <input
              type="text"
              placeholder="Category"
              value={kategori}
              onChange={setKategori}
            />
          </div>
          <div className="body-input">
            <textarea type="text" value={content} onChange={setContent} />
          </div>
          <div className="addNewThread-container-action-button">
            <button
              className="addNewThread-button"
              type="submit"
              onClick={(event) => onSubmitHandler(event)}
            >
              {textCreate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewThreadPage;
