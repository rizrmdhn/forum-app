import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { asyncCreateThread } from "../states/thread/action";

function NewThreadPage() {
  const [judul, setJudul] = useInput("");
  const [kategori, setKategori] = useInput("");
  const [content, setContent] = useInput("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    dispatch(
      asyncCreateThread({ title: judul, body: content, category: kategori })
    );

    setJudul("");
    setKategori("");
    setContent("");

    navigate("/");
  };

  return (
    <div className="newThread-container-page">
      <div className="row">
        <div className="col">
          <div className="page-title">
            <h5>Buat diskusi baru</h5>
          </div>
          <div className="judul-input">
            <input
              type="text"
              placeholder="Judul"
              value={judul}
              onChange={setJudul}
            />
          </div>
          <div className="kategori-input">
            <input
              type="text"
              placeholder="Kategori"
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
              Buat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewThreadPage;
