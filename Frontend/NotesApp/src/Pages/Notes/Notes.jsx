import React, { useEffect, useState } from "react";
import "./Notes.css";
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
    try {
      const response = await api.get("notes/");
      setNotes(response.data);
      console.log("Fetched notes:", response.data);
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
      document.getElementById("attachment").value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  // Build full Cloudinary URL
  const getFullUrl = (relativePath) => {
    if (!relativePath) return null;
    
    // If it's already a full URL, return it
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // Build the full Cloudinary URL
    const cloudName = "dz6budxrh"; // Replace with your actual cloud name
    return `https://res.cloudinary.com/${cloudName}/${relativePath}`;
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
        {notes.map((note) => {
          const fullUrl = getFullUrl(note.attachment);
          
          return (
            <div key={note.id} className="note-container">
              <div className="note-detail-container">
                <h1>{note.title}</h1>
                <p>{note.content}</p>
                <p className="note-created_at">{note.created_at.slice(0, 10)}</p>
              </div>
              <div className="note-attachment-container">
                {fullUrl && (
                    (
                      <a 
                        href={fullUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;