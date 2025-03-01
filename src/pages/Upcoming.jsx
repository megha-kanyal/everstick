import { useState } from "react";
import Sidebar from "../component/Sidebar";

export default function Upcoming() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Meeting with Team", content: "Discuss project roadmap", date: "2024-03-05", color: "bg-green-200" },
    { id: 2, title: "Code Review", content: "Review latest PRs", date: "2024-03-06", color: "bg-yellow-200" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", content: "", date: "", color: "bg-gray-200" });
  const [error, setError] = useState("");

  const addTask = () => {
    if (!newTask.title || !newTask.content || !newTask.date) {
      setError("Title, content, and date are required.");
      return;
    }
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    resetModal();
  };

  const updateTask = () => {
    if (!newTask.title || !newTask.content || !newTask.date) {
      setError("Title, content, and date are required.");
      return;
    }
    setTasks(tasks.map(task => (task.id === currentTask.id ? newTask : task)));
    resetModal();
  };

  const openEditModal = (task) => {
    setEditMode(true);
    setCurrentTask(task);
    setNewTask({ title: task.title, content: task.content, date: task.date, color: task.color });
    setModalOpen(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const resetModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewTask({ title: "", content: "", date: "", color: "bg-gray-200" });
    setCurrentTask(null);
    setError("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Left Section */}
      <div className="w-1/4 bg-gray-100 p-6">
        <Sidebar />
      </div>

      {/* Upcoming Tasks - Right Section */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Tasks</h1>
        <div className="grid grid-cols-2 gap-4">
          {tasks.map(task => (
            <div key={task.id} className={`${task.color} p-6 border rounded-lg shadow relative`}>
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => openEditModal(task)}>✏️</button>
              <h2 className="font-bold text-lg">{task.title}</h2>
              <p className="mt-2 whitespace-pre-wrap">{task.content}</p>
              <p className="text-sm text-gray-700 mt-2">📅 {task.date}</p>
            </div>
          ))}
          <div className="flex items-center justify-center p-12 border-dashed border-2 cursor-pointer" onClick={() => setModalOpen(true)}>
            <h2 className="text-4xl">+</h2>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
            <div className="bg-white p-12 rounded-lg shadow-lg border w-[500px] max-w-lg">
              <h2 className="text-xl font-bold">{editMode ? "Edit Task" : "Add New Task"}</h2>
              <input
                placeholder="Title"
                value={newTask.title}
                className="border p-4 w-full rounded mt-2"
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Enter task details"
                className="border p-4 w-full rounded mt-2 h-20"
                value={newTask.content}
                onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                required
              />
              <input
                type="date"
                className="border p-4 w-full rounded mt-2"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                required
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-4 flex gap-2">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={resetModal}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={editMode ? updateTask : addTask}>{editMode ? "Save Changes" : "Add Task"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
