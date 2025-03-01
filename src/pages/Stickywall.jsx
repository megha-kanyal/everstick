import { useState } from "react";
import Sidebar from '../component/Sidebar';

export default function StickyWall() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Social Media", content: "- Plan social content\n- Build content calendar\n- Plan promotion and distribution", color: "bg-yellow-200", isList: true },
    { id: 2, title: "Content Strategy", content: "Would need time to get insights...", color: "bg-blue-200", isList: false },
    { id: 3, title: "Email A/B Tests", content: "- Subject lines\n- Sender\n- CTA\n- Sending times", color: "bg-red-200", isList: true },
    { id: 4, title: "Banner Ads", content: "Notes from the workshop:...", color: "bg-orange-200", isList: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "bg-gray-200", isList: false });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [error, setError] = useState("");

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      setError("Title and content are required.");
      return;
    }
    setNotes([...notes, { ...newNote, id: notes.length + 1 }]);
    resetModal();
  };

  const updateNote = () => {
    if (!newNote.title || !newNote.content) {
      setError("Title and content are required.");
      return;
    }
    setNotes(notes.map(note => (note.id === currentNote.id ? newNote : note)));
    resetModal();
  };

  const openEditModal = (note) => {
    setEditMode(true);
    setCurrentNote(note);
    setNewNote({ title: note.title, content: note.content, color: note.color, isList: note.isList });
    setModalOpen(true);
    setFormOpen(true);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const resetModal = () => {
    setModalOpen(false);
    setFormOpen(false);
    setEditMode(false);
    setNewNote({ title: "", content: "", color: "bg-gray-200", isList: false });
    setCurrentNote(null);
    setError("");
  };

  return (
    <div className="flex min-h-screen">
          {/* Sidebar - Left Section */}
          <div className="w-1/4 bg-gray-100 p-6">
            <Sidebar />
          </div>
      <div className='flex-1 p-6 m-10 mt-6 h-screen'>
        <h1 className="text-3xl font-bold mb-6">Sticky Wall</h1>
        <div className="grid grid-cols-2 gap-6"> {/* Increased the gap to 6 */}
          {notes.map(note => (
            <div key={note.id} className={`${note.color} p-6 relative rounded-lg shadow`}> {/* Removed the border class */}
              <div className="absolute m-20">
                <button className="text-gray-500" onClick={() => setDropdownOpen(dropdownOpen === note.id ? null : note.id)}>⋮</button>
                {dropdownOpen === note.id && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-lg" onMouseLeave={() => setDropdownOpen(null)}>
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => openEditModal(note)}>Edit</button>
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => deleteNote(note.id)}>Delete</button>
                  </div>
                )}
              </div>
              <h2 className="font-bold text-lg">{note.title}</h2>
              {note.isList ? (
                <ul className="mt-2 list-disc pl-5">
                  {note.content.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 whitespace-pre-wrap">{note.content}</p>
              )}
            </div>
          ))}
          <div className="flex items-center justify-center p-12 border-dashed border-2 cursor-pointer" onClick={() => setModalOpen(true)}>
            <h2 className="text-4xl">+</h2>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
          <div className="bg-white p-12 rounded-lg shadow-lg border w-[500px] max-w-lg">
            <h2 className="text-xl font-bold">{editMode ? "Edit Sticky Note" : "Add New Sticky Note"}</h2>
            {!formOpen ? (
              <div className="flex flex-col items-center">
                <p>{editMode ? "Edit your note details" : "Do you want to add a new note?"}</p>
                <div className="mt-4 flex gap-2">
                  <button className="bg-gray-300 px-4 py-2 rounded" onClick={resetModal}>Cancel</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setFormOpen(true)}>{editMode ? "Edit Note" : "Add Note"}</button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  placeholder="Title"
                  value={newNote.title}
                  className="border p-4 w-full rounded mt-2"
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  required
                />
                <div className="flex items-center my-2">
                  <input type="checkbox" checked={newNote.isList} onChange={() => setNewNote({ ...newNote, isList: !newNote.isList })} />
                  <span className="ml-2">List Format</span>
                </div>
                <textarea
                  placeholder={newNote.isList ? "Enter list items, one per line" : "Enter your note content"}
                  className="border p-4 w-full rounded mt-2 h-40"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  required
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="mt-4 flex gap-2">
                  <button className="bg-gray-300 px-4 py-2 rounded" onClick={resetModal}>Cancel</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={editMode ? updateNote : addNote}>{editMode ? "Save Changes" : "Add New Note"}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
