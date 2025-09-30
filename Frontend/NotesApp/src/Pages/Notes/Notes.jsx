import React, { useEffect, useState } from "react";
import "./Notes.css";
import axios from "axios";
import api from "../../services/api";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    await api.get("notes/");
    try {
      const response = await api.get("notes/");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      await api.post("notes/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchNotes();
      setTitle("");
      setContent("");
      setAttachment(null);
      document.getElementById("attachment").value = ""; // reset file input
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div className="notes-container">
      <header className="header">
        <h1>Notes App</h1>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <hr />
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          id="title"
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="content"
          rows={6}
          placeholder="Content"
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          id="attachment"
          placeholder="Attachment"
          type="file"
          name="attachment"
          onChange={(e) => setAttachment(e.target.files[0])}
        />
        {attachment && <p>{attachment.name}</p>}
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
      <hr />
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-container">
            <div className="note-detail-container">
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <p className="note-created_at">{note.created_at.slice(0, 10)}</p>
            </div>
            <div className="note-attachment-container">
              {note.attachment && (
                <a href={note.attachment} target="_blank">
                  View
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
