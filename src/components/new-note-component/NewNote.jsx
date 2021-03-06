import React, { useState } from "react";
import { addNote } from "../../utils/notes-util/addNote";
import { useNotes } from "../../context/useNotes";
import "./NewNote.css";
import axios from "axios";
import { editNote } from "../../utils/notes-util/editNote";
import { calcTempNote } from "../../utils/notes-util/calcTempNote";

const NewNote = ({ createNoteState: { createNote, setCreateNote } }) => {
  const { notesState, dispatchNotes } = useNotes();
  const [tempNote, setTempNote] = useState(calcTempNote(notesState));
  const changeHandler = (e) => {
    setTempNote((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const clickHandler = () => {
    if (!notesState.editId) {
      addNote(tempNote, dispatchNotes);
    } else {
      editNote(tempNote, dispatchNotes);
    }

    setCreateNote(!createNote);
  };
  return (
    <div className="new-note-container p-40 card-shadow br-m">
      <div className="input-field">
        <label className="x-small-text">
          Note title:
          <input
            type="text"
            value={tempNote.title}
            name="title"
            onChange={changeHandler}
            className="input input-primary mt-1"
          />
        </label>
      </div>
      <div className="input-field">
        <label className="x-small-text">
          Note description:
          <textarea
            className="text-area"
            value={tempNote.description}
            name="description"
            onChange={changeHandler}
          ></textarea>
        </label>
      </div>
      <button className="x-icon" onClick={() => setCreateNote(false)}>
        <i class="bx bx-x"></i>
      </button>
      <button onClick={clickHandler} className="btn-large btn-primary mt-1">
        Submit
      </button>
    </div>
  );
};

export default NewNote;
