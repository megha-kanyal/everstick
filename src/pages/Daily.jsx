import React, { useState } from 'react';

export default function Daily() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='w-72 border-r bg-white shadow-sm'>
        <div className="p-4">
          <h1 className="text-xl font-semibold text-blue-800">Everstick</h1>
        </div>
      </div>
   
      <div className='flex-1 px-6 py-8'>
        <h1 className='text-center text-3xl font-bold mb-8 text-gray-800'>Daily Tasks</h1>
       
        <div className='max-w-2xl mx-auto mb-8'>
          <div className='border rounded-lg flex shadow-sm bg-white overflow-hidden'>
            <input 
              className='p-3 flex-1 focus:outline-none' 
              type="text" 
              placeholder='Add your task' 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="bg-blue-800 text-white px-4 flex justify-center items-center hover:bg-blue-900 transition-colors"
              onClick={addTask}
            >
              Add
            </button>
          </div>
        </div>
        
        <div className='max-w-2xl mx-auto'>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow p-6">
              <p className="text-lg">No tasks yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border-b last:border-b-0 p-4 flex items-center ${task.completed ? 'bg-green-50' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-5 w-5 text-blue-800 rounded focus:ring-blue-800"
                  />
                  <span 
                    className={`ml-3 flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                  >
                    {task.text}
                  </span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>

                  </button>
                </div>
              ))}
            </div>
          )}
          
          {tasks.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
              <span>{tasks.filter(task => task.completed).length} of {tasks.length} tasks completed</span>
              {tasks.filter(task => task.completed).length > 0 && (
                <button 
                  className="text-gray-600 hover:text-red-500 text-sm"
                  onClick={() => setTasks(tasks.filter(task => !task.completed))}
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}