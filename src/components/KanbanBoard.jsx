import { useState } from "react";

export default function KanbanBoard({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const columns = [
    "To Do",
    "In Progress",
    "Review",
    "Completed"
  ];

  const addTask = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title,
      description: "New task",
      status: "To Do",
      priority: priority
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("Medium");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDrop = (e, status) => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData("taskId"));

    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold text-purple-900">
          My Kanban Board 📋
        </h2>
        <p className="text-gray-500 mt-2">
          Organize and manage your tasks.
        </p>
      </div>

      <form onSubmit={addTask}
        className="bg-white p-5 rounded-2xl shadow flex flex-wrap gap-3">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="border p-3 rounded-lg flex-1 min-w-40"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
        >
          + Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {columns.map(status => (
          <div
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
            className="bg-purple-50 p-4 rounded-2xl min-h-64"
          >
            <h3 className="font-bold text-purple-900 mb-4">
              {status}
              <span className="ml-2 text-gray-500">
                ({tasks.filter(t => t.status === status).length})
              </span>
            </h3>

            {tasks.filter(task => task.status === status).map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("taskId", task.id)
                }
                className="bg-white p-4 rounded-xl shadow mb-3 cursor-grab"
              >
                <h4 className="font-semibold text-gray-800">
                  {task.title}
                </h4>

                <p className="text-sm text-gray-500 mt-2">
                  {task.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {task.priority}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}