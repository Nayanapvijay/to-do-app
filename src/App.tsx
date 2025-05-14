import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import AgeCalculator from './components/AgeCalculator';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
const [editedTitle, setEditedTitle] = useState('');


  const addTask = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };
  
  const saveEdit = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: editedTitle } : task
    ));
    setEditingId(null);
    setEditedTitle('');
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <AgeCalculator/>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a task"
            className="flex-grow border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => completeTask(task.id)} 
    />
              {editingId === task.id ? (
  <>
    <input
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    />
    <button
      onClick={() => saveEdit(task.id)}
      className="text-blue-500 hover:text-blue-700 text-sm ml-2"
    >
      Save
    </button>
  </>
) : (
  <span
    className={task.completed ? "line-through text-gray-400" : ""}
  >
    {task.title}
  </span>
)}
</div>
              <div className="flex gap-3 items-center">
              <button
  className="text-green-500 hover:text-green-700"
  onClick={() => startEdit(task)}
>
  <FaEdit />
</button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
