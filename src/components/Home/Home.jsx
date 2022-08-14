import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import $ from "jquery";
export default function Home() {
  let token = localStorage.getItem("userToken");
  var userID = jwtDecode(token)._id;
  let [note, setNote] = useState({ title: "", desc: "", userID, token });
  let [allNotes, setAllNotes] = useState([]);
  async function getUserNotes() {
    let { data } = await axios.get(
      `https://route-egypt-api.herokuapp.com/getUserNotes`,
      {
        headers: {
          Token: token,
          userID,
        },
      }
    );
    if (data.message == "success") {
      setAllNotes(data.Notes);
    }
  }
  useEffect(() => {
    getUserNotes();
  }, []);

  function getNote({ target }) {
    setNote({ ...note, [target.name]: target.value });
  }
  async function addNote(e) {
    e.preventDefault();
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/addNote`,
      note
    );
    if (data.message == "success") {
      $(".modelAdd").fadeOut(1000);
      document.getElementById("formAdd").reset();
      getUserNotes();
    }
  }
  async function deleteNote(NoteID) {
    let { data } = await axios.delete(
      `https://route-egypt-api.herokuapp.com/deleteNote`,
      {
        data: {
          NoteID,
          token,
        },
      }
    );
    if (data.message == "deleted") {
      getUserNotes();
    }
  }
  function getNoteId(noteIndex) {
    console.log(allNotes[noteIndex]);
    document.querySelector("#exampleModal2 input").value =
      allNotes[noteIndex].title;
    document.querySelector("#exampleModal2 textarea").value =
      allNotes[noteIndex].desc;
    setNote({
      ...note,
      title: allNotes[noteIndex].title,
      desc: allNotes[noteIndex].desc,
      NoteID: allNotes[noteIndex]._id,
    });
  }
  async function updateNot(e) {
    e.preventDefault();
    let { data } = await axios.put(
      `https://route-egypt-api.herokuapp.com/updateNote`,
      note
    );
    if (data.message == "updated") {
      getUserNotes();
    }
  }
  return (
    <>
      <div className=" container my-5 py-5">
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn  btnAdd shadow-lg fw-bolder d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-plus iconAdd"></i>
          Add New
        </button>
        {/* <!-- ModalAdd --> */}
        <div id="modelAdd">
          <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* formAdd */}

                  <form id="formAdd" onSubmit={addNote}>
                    {/* title */}
                    <div>
                      <label>Title</label>
                      <input
                        onChange={getNote}
                        type="text"
                        name="title"
                        className=" form-control mt-1"
                      />
                    </div>
                    {/* end title */}
                    {/* desc */}
                    <div>
                      <label>Description</label>
                      <textarea
                        onChange={getNote}
                        type="text"
                        name="desc"
                        className=" form-control mt-1"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* endModalAdd */}
        {/* ModelUpdate */}
        <div
          className="modal fade"
          id="exampleModal2"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* formAdd */}

                <form id="formAdd" onSubmit={updateNot}>
                  {/* title */}
                  <div>
                    <label>Title</label>
                    <input
                      onChange={getNote}
                      type="text"
                      name="title"
                      className=" form-control mt-1"
                    />
                  </div>
                  {/* end title */}
                  {/* desc */}
                  <div>
                    <label>Description</label>
                    <textarea
                      onChange={getNote}
                      type="text"
                      name="desc"
                      className=" form-control mt-1"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" container  ">
        <div className=" row g-5">
          {allNotes.map((elm, index) => {
            return (
              <div key={index} className="col-md-4 note   ">
                <div className="itemNote  shadow-lg px-3 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{elm.title}</h3>
                    <div>
                      <i
                        onClick={() => {
                          deleteNote(elm._id);
                        }}
                        className="fa-solid fa-trash-can iconNoteDelete me-3 fs-4"
                      ></i>
                      <i
                        onClick={() => {
                          getNoteId(index);
                        }}
                        className="fa-solid fa-pen-to-square iconNote fs-4"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                      ></i>
                    </div>
                  </div>
                  <p>{elm.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
