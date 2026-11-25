import { useState } from "react";

export default function KanbanBoard({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterAssignee, setFilterAssignee] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const columns = [
    { name: "To Do", color: "border-blue-400", icon: "📝" },
    { name: "In Progress", color: "border-yellow-400", icon: "⚡" },
    { name: "Review", color: "border-purple-400", icon: "👀" },
    { name: "Completed", color: "border-green-400", icon: "✅" }
  ];

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700"
  };
  // FILTER AND SORT TASKS

const filteredTasks = tasks.filter(task => {
  const matchesSearch =
    task.title?.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase());

  const matchesPriority =
    filterPriority === "All" ||
    task.priority === filterPriority;

  const matchesAssignee =
    filterAssignee === "All" ||
    (task.assignee || "Unassigned") === filterAssignee;

  const matchesTag =
    filterTag === "All" ||
    (Array.isArray(task.tags) && task.tags.includes(filterTag));

  const matchesDate =
    !filterDate || task.dueDate === filterDate;

  return (
    matchesSearch &&
    matchesPriority &&
    matchesAssignee &&
    matchesTag &&
    matchesDate
  );
});

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "priority") {
    const order = { High: 3, Medium: 2, Low: 1 };
    return (order[b.priority] || 0) - (order[a.priority] || 0);
  }

  if (sortBy === "dueDate") {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  }

  if (sortBy === "title") {
    return (a.title || "").localeCompare(b.title || "");
  }

  return 0;
});

  // ADD TASK
  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: "New task",
      status: "To Do",
      priority,
      assignee: assignee.trim() || "Unassigned",
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      dueDate,
      comments: [],
      subtasks: []
    };

    setTasks(prev => [...prev, newTask]);

    setTitle("");
    setPriority("Medium");
    setAssignee("");
    setTags("");
    setDueDate("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));

    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  // UPDATE TASK
  const updateTask = (updatedTask) => {
    setSelectedTask(updatedTask);

    setTasks(prev =>
      prev.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
  };

  // MOVE TASK BETWEEN COLUMNS
  const handleDrop = (e, status) => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  // REORDER TASKS
  const handleTaskDrop = (e, targetTask) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = Number(
      e.dataTransfer.getData("text/plain")
    );

    if (!draggedId || draggedId === targetTask.id) return;

    setTasks(prev => {
      const dragged = prev.find(t => t.id === draggedId);
      if (!dragged) return prev;

      const updated = prev.filter(t => t.id !== draggedId);

      const movedTask = {
        ...dragged,
        status: targetTask.status
      };

      const targetIndex = updated.findIndex(
        t => t.id === targetTask.id
      );

      updated.splice(targetIndex, 0, movedTask);

      return updated;
    });
  };

  // ADD COMMENT
  const addComment = () => {
    if (!commentInput.trim() || !selectedTask) return;

    updateTask({
      ...selectedTask,
      comments: [
        ...(selectedTask.comments || []),
        {
          id: Date.now(),
          text: commentInput.trim(),
          date: new Date().toLocaleString()
        }
      ]
    });

    setCommentInput("");
  };

  // ADD SUBTASK
  const addSubtask = () => {
    if (!subtaskInput.trim() || !selectedTask) return;

    updateTask({
      ...selectedTask,
      subtasks: [
        ...(selectedTask.subtasks || []),
        {
          id: Date.now(),
          title: subtaskInput.trim(),
          completed: false
        }
      ]
    });

    setSubtaskInput("");
  };

  // TOGGLE SUBTASK
  const toggleSubtask = (id) => {
    updateTask({
      ...selectedTask,
      subtasks: selectedTask.subtasks.map(subtask =>
        subtask.id === id
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-purple-900">
          My Kanban Board 📋
        </h2>
        <p className="text-gray-500 mt-2">
          Organize, prioritize and manage your tasks.
        </p>
      </div>

      {/* ADD TASK FORM */}
      <form
        onSubmit={addTask}
        className="bg-white p-5 rounded-2xl shadow-lg border border-purple-100 space-y-4"
      >
        <h3 className="font-bold text-purple-900 text-lg">
          + Create New Task
        </h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="border border-purple-200 p-3 rounded-lg w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="border border-purple-200 p-3 rounded-lg"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            placeholder="Assignee name"
            className="border border-purple-200 p-3 rounded-lg"
          />

          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="border border-purple-200 p-3 rounded-lg"
          />

          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border border-purple-200 p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
        >
          + Add Task
        </button>
      </form>

      {/* FILTER AND SEARCH PANEL */}

<div className="bg-white p-5 rounded-2xl shadow-lg border border-purple-100 space-y-4">

  <h3 className="font-bold text-purple-900 text-lg">
    🔍 Search & Filter Tasks
  </h3>

  <input
    value={search}
    onChange={e => setSearch(e.target.value)}
    placeholder="Search tasks by title or description..."
    className="w-full border border-purple-200 rounded-lg p-3"
  />

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

    <select
      value={filterPriority}
      onChange={e => setFilterPriority(e.target.value)}
      className="border rounded-lg p-3"
    >
      <option value="All">All Priorities</option>
      <option value="High">High Priority</option>
      <option value="Medium">Medium Priority</option>
      <option value="Low">Low Priority</option>
    </select>

    <select
      value={filterAssignee}
      onChange={e => setFilterAssignee(e.target.value)}
      className="border rounded-lg p-3"
    >
      <option value="All">All Assignees</option>
      {[...new Set(tasks.map(t => t.assignee || "Unassigned"))].map(name => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>

    <select
      value={filterTag}
      onChange={e => setFilterTag(e.target.value)}
      className="border rounded-lg p-3"
    >
      <option value="All">All Tags</option>
      {[...new Set(tasks.flatMap(t => Array.isArray(t.tags) ? t.tags : []))].map(tag => (
        <option key={tag} value={tag}>{tag}</option>
      ))}
    </select>

    <input
      type="date"
      value={filterDate}
      onChange={e => setFilterDate(e.target.value)}
      className="border rounded-lg p-3"
      title="Filter by due date"
    />

    <select
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}
      className="border rounded-lg p-3"
    >
      <option value="default">Default Order</option>
      <option value="priority">Sort by Priority</option>
      <option value="dueDate">Sort by Due Date</option>
      <option value="title">Sort by Task Name</option>
    </select>

    <button
      type="button"
      onClick={() => {
        setSearch("");
        setFilterPriority("All");
        setFilterAssignee("All");
        setFilterTag("All");
        setFilterDate("");
        setSortBy("default");
      }}
      className="bg-purple-100 text-purple-800 rounded-lg p-3 font-semibold hover:bg-purple-200"
    >
      Reset Filters ↻
    </button>

  </div>

  <p className="text-sm text-gray-500">
    Showing {filteredTasks.length} of {tasks.length} tasks
  </p>

</div>

{/* KANBAN COLUMNS */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {columns.map(column => {
          const columnTasks = sortedTasks.filter(
            task => task.status === column.name
          );

          return (
            <div
              key={column.name}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, column.name)}
              className={`bg-purple-50 p-4 rounded-2xl min-h-80 border-t-4 ${column.color}`}
            >

              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-purple-900">
                  {column.icon} {column.name}
                </h3>

                <span className="bg-white text-purple-700 text-sm font-bold px-3 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              {columnTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData(
                      "text/plain",
                      String(task.id)
                    );
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleTaskDrop(e, task)}
                  onClick={() => {
                    setSelectedTask({
                      ...task,
                      comments: task.comments || [],
                      subtasks: task.subtasks || []
                    });
                  }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 mb-4 cursor-pointer hover:shadow-md transition"
                >

                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-gray-800 break-words">
                      {task.title}
                    </h4>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {task.description || "No description"}
                  </p>

                  <div className="mt-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityStyles[task.priority] || priorityStyles.Medium}`}>
                      {task.priority || "Medium"} Priority
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(Array.isArray(task.tags) ? task.tags : []).map((tag, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold">
                      {(task.assignee || "U").charAt(0).toUpperCase()}
                    </div>

                    <span className="text-xs text-gray-600">
                      {task.assignee || "Unassigned"}
                    </span>
                  </div>

                  {task.dueDate && (
                    <div className="text-xs text-gray-500 mt-3">
                      📅 Due: {task.dueDate}
                    </div>
                  )}

                  <p className="text-xs text-purple-600 mt-3">
                    Click to view details →
                  </p>

                </div>
              ))}

              {columnTasks.length === 0 && (
                <div className="text-center text-sm text-gray-400 py-8 border-2 border-dashed border-purple-200 rounded-xl">
                  No tasks yet
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* TASK DETAIL MODAL */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-900">
                Task Details
              </h2>

              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-500 text-2xl hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* EDIT TASK */}
            <div className="space-y-3">
              <label className="font-semibold text-gray-700">
                Task Title
              </label>

              <input
                value={selectedTask.title}
                onChange={e =>
                  updateTask({
                    ...selectedTask,
                    title: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <label className="font-semibold text-gray-700">
                Description
              </label>

              <textarea
                value={selectedTask.description || ""}
                onChange={e =>
                  updateTask({
                    ...selectedTask,
                    description: e.target.value
                  })
                }
                rows="3"
                className="w-full border rounded-lg p-3"
                placeholder="Describe your task..."
              />

              <label className="font-semibold text-gray-700">
                Priority
              </label>

              <select
                value={selectedTask.priority || "Medium"}
                onChange={e =>
                  updateTask({
                    ...selectedTask,
                    priority: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label className="font-semibold text-gray-700">
                Assignee
              </label>

              <input
                value={selectedTask.assignee || ""}
                onChange={e =>
                  updateTask({
                    ...selectedTask,
                    assignee: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold text-purple-900 mb-3">
                💬 Comments
              </h3>

              <div className="space-y-2 mb-3">
                {selectedTask.comments.map(comment => (
                  <div key={comment.id} className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {comment.date}
                    </p>
                  </div>
                ))}

                {selectedTask.comments.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No comments yet.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-lg p-3 min-w-0"
                />

                <button
                  type="button"
                  onClick={addComment}
                  className="bg-purple-700 text-white px-4 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>

            {/* SUBTASKS */}
            <div className="border-t pt-4">
              <h3 className="font-bold text-purple-900 mb-3">
                ☑️ Subtask Checklist
              </h3>

              <div className="space-y-3 mb-4">
                {selectedTask.subtasks.map(subtask => (
                  <label
                    key={subtask.id}
                    className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(subtask.id)}
                      className="w-4 h-4 accent-purple-700"
                    />

                    <span className={subtask.completed ? "line-through text-gray-400" : "text-gray-700"}>
                      {subtask.title}
                    </span>
                  </label>
                ))}

                {selectedTask.subtasks.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No subtasks added.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  value={subtaskInput}
                  onChange={e => setSubtaskInput(e.target.value)}
                  placeholder="Enter a subtask..."
                  className="flex-1 border rounded-lg p-3 min-w-0"
                />

                <button
                  type="button"
                  onClick={addSubtask}
                  className="bg-purple-700 text-white px-4 rounded-lg"
                >
                  Add
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Completed: {selectedTask.subtasks.filter(s => s.completed).length} / {selectedTask.subtasks.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTask(null)}
              className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800"
            >
              Save & Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}