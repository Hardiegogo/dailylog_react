import axios from "axios";
import React, { useState } from "react";
import { useNotes } from "../../context/useNotes";
import "./NoteCard.css";
import { addOrRemoveFromArchive } from "../../utils/notes-util/addOrRemoveFromArchive";
import { addToTrash } from "../../utils/trash-util/addToTrash";
import { HexColorPicker } from "react-colorful";
import { changeColor } from "../../utils/notes-util/changeColor";
import { changePriority } from "../../utils/notes-util/changePriority";

const deletePermanently = (trashNote, dispatchNotes) => {
  dispatchNotes({ type: "DELETE_NOTE", trashNote: trashNote });
};

const editHandler = (_id, dispatchNotes, createNote, setCreateNote) => {
  dispatchNotes({ type: "SET_EDIT_ID", payload: _id });
  setCreateNote(!createNote);
};



function NoteCard({
  noteItem: { _id, title, description, color, tags, createdAt },
  isArchived,
  isTrash,
  createNoteState: { createNote, setCreateNote },
}) {
  const { dispatchNotes } = useNotes();
  const [tempColor, setTempColor] = useState("#6EE7B7");
  const [isColorPicker, setIsColorPicker] = useState(false);
  
  return (
    <div
      className={`note-container br-m ${isColorPicker && "max-height-fixed"}`}
      style={{ backgroundColor: color }}
    >
      <div className="note-header">
        <div className="note-title small-text">{title}</div>
        <div className="note-header-icons">
          {!isArchived && !isTrash && (
            <button
              onClick={() =>
                editHandler(_id, dispatchNotes, createNote, setCreateNote)
              }
            >
              <i className="bx bx-edit card-icons"></i>
            </button>
          )}
        </div>
      </div>
      <div className="note-body x-small-text mt-16">{description}</div>
      <div className="note-footer mt-1">
        <div className="note-date x-small-text grey-text">{createdAt} <br />
        Priority:{tags[0]}
        </div>
        <div className="note-footer-icons">
          {!isArchived && !isTrash && (
            <button onClick={() => setIsColorPicker(!isColorPicker)}>
              <i className="bx bx-palette card-icons"></i>
            </button>
          )}

          {!isArchived && !isTrash && (
            <button onClick={()=>changePriority(
              { _id, title, description, color, tags, createdAt },
              dispatchNotes)}>
              <i className="bx bx-label card-icons"></i>
            </button>
          )}
          {!isTrash && (
            <button
              onClick={() =>
                addOrRemoveFromArchive(
                  { _id, title, description, color, tags, createdAt },
                  dispatchNotes,
                  isArchived
                )
              }
            >
              <i
                className={`bx bx-archive card-icons ${
                  isArchived && "active-icon"
                }`}
              ></i>
            </button>
          )}
          {!isTrash && (
            <button
              onClick={() =>
                addToTrash(
                  { _id, title, description, color, tags, createdAt },
                  dispatchNotes,
                  isArchived,
                  isTrash
                )
              }
            >
              <i
                className={`bx bx-trash-alt card-icons ${
                  isTrash && "active-icon"
                }`}
              ></i>
            </button>
          )}
          {isTrash && (
            <button
              className="btn btn-success"
              onClick={() =>
                addToTrash(
                  { _id, title, description, color, tags, createdAt },
                  dispatchNotes,
                  isArchived,
                  isTrash
                )
              }
            >
              Restore
            </button>
          )}

          {isTrash && (
            <button
              className="btn btn-danger"
              onClick={() =>
                deletePermanently(
                  { _id, title, description, color, tags, createdAt },
                  dispatchNotes
                )
              }
            >
              Delete permanently
            </button>
          )}
        </div>
      </div>
      {isColorPicker && (
        <HexColorPicker
          color={tempColor}
          className="color-picker"
          onChange={(changedCol) =>
            changeColor(
              changedCol,
              { _id, title, description, color, tags, createdAt },
              dispatchNotes
            )
          }
        />
      )}
    </div>
  );
}

export default NoteCard;
