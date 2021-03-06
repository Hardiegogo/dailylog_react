import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";
import { useNotes } from "../../context/useNotes";

const openNewNote=(createNote,setCreateNote,dispatchNotes)=>{
  dispatchNotes({type:"SET_EDIT_ID",payload:''})
  setCreateNote(!createNote)
  
}

const Sidebar = ({createNoteState:{createNote,setCreateNote}}) => {
  const {dispatchNotes}=useNotes();
  return (
    <aside className="sidebar p-32">
      <div className="list-container">
        <ul className="stacked-list">
          <Link to='/notes'><li className={`list-item stacked-list-item ${createNote && 'overlay'}`}><i class='bx bx-home-alt list-icon'></i> Home</li></Link>
          <Link to='/labels'><li className={`list-item stacked-list-item ${createNote && 'overlay'}`}><i class='bx bx-label list-icon' ></i> Labels</li></Link>
          <Link to='/archive'><li className={`list-item stacked-list-item ${createNote && 'overlay'}`}><i class='bx bx-archive list-icon' ></i>Archive</li></Link>         
          <Link to='/trash'><li className={`list-item stacked-list-item ${createNote && 'overlay'}`}><i class='bx bx-trash-alt list-icon' ></i> Trash</li></Link>
          <li className={`list-item stacked-list-item ${createNote && 'overlay'}`}><i class='bx bx-user list-icon'></i>Profile</li>
        </ul>
      </div>
      <button className='btn-large btn-primary' onClick={()=>openNewNote(createNote,setCreateNote,dispatchNotes)}>Create a new Note</button>
    </aside>
  );
};

export default Sidebar;
