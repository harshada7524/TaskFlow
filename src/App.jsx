import { useState } from "react";

import Button from "./components/Button";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import Avatar from "./components/Avatar";
import Badge from "./components/Badge";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    category: "UI/UX Design",
    progress: 85,
    status: "In Progress",
    dueDate: "25 Nov 2026",
  },
  {
    id: 2,
    name: "Mobile App Development",
    category: "Development",
    progress: 60,
    status: "In Progress",
    dueDate: "30 Nov 2026",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    category: "Marketing",
    progress: 100,
    status: "Completed",
    dueDate: "18 Nov 2026",
  },
  {
    id: 4,
    name: "Portfolio Website",
    category: "Development",
    progress: 30,
    status: "Pending",
    dueDate: "05 Dec 2026",
  },
];

const activities = [
  {
    id: 1,
    icon: "✅",
    title: "Completed a task",
    detail: "Finished the homepage design",
    time: "10 minutes ago",
  },
  {
    id: 2,
    icon: "📁",
    title: "Created a new project",
    detail: "Portfolio Website",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: "✏️",
    title: "Updated project progress",
    detail: "Mobile App Development",
    time: "3 hours ago",
  },
  {
    id: 4,
    icon: "🎯",
    title: "Reached a milestone",
    detail: "Marketing Campaign completed",
    time: "Yesterday",
  },
];

function App() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [search, setSearch] = useState("");

  const navItems = [
    { name: "Home", icon: "🏠" },
    { name: "My Tasks", icon: "📋" },
    { name: "Dashboard", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
  ];

  const componentMatches = (title) =>
    title.toLowerCase().includes(search.toLowerCase());

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.category} ${project.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: "📁",
      color: "from-purple-500 to-violet-500",
      description: "All your projects",
    },
    {
      title: "Total Tasks",
      value: 24,
      icon: "📋",
      color: "from-blue-500 to-indigo-500",
      description: "Tasks created",
    },
    {
      title: "Completed Tasks",
      value: 16,
      icon: "✅",
      color: "from-green-500 to-emerald-500",
      description: "Great progress!",
    },
    {
      title: "Pending Tasks",
      value: 8,
      icon: "⏳",
      color: "from-orange-400 to-pink-500",
      description: "Keep going!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-6">

        {/* SIDEBAR */}
        <aside className="bg-white/90 rounded-3xl p-6 shadow-xl border border-white">

          <h2 className="text-2xl font-extrabold text-purple-700 mb-10">
            ✨ TaskFlow
          </h2>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setSearch("");
                }}
                className={`w-full text-left p-3 rounded-xl font-semibold transition-all ${
                  activePage === item.name
                    ? "bg-purple-100 text-purple-700 shadow-sm"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-16 bg-gradient-to-br from-purple-500 to-pink-400 text-white rounded-2xl p-5">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-lg">Stay Productive!</h3>
            <p className="text-sm mt-2">
              Small steps create big achievements.
            </p>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-purple-950">
                Welcome to TaskFlow ✨
              </h1>

              <p className="text-gray-600 mt-2">
                Organize your work and achieve your goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="🔍 Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-sm">
                <Avatar name="TaskFlow User" />
                <span className="font-semibold text-gray-700 whitespace-nowrap">
                  TaskFlow User
                </span>
              </div>

            </div>
          </header>

          {/* HOME PAGE */}
          {activePage === "Home" && (
            <>
              <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white rounded-3xl p-7 mb-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-2">
                  Make Today Count! 🌈
                </h2>
                <p className="text-purple-100">
                  Welcome to your personal productivity space.
                </p>
              </div>

              {search && (
                <p className="mb-5 text-purple-800 font-semibold">
                  Search results for: "{search}"
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {componentMatches("Button Component") && (
                  <TaskCard title="🔘 Button Component">
                    <div className="flex flex-wrap gap-3">
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="danger">Delete</Button>
                    </div>
                  </TaskCard>
                )}

                {componentMatches("Input Component") && (
                  <TaskCard title="✏️ Input Component">
                    <Input
                      label="Your Name"
                      placeholder="Enter your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p className="mt-3 text-purple-700 font-semibold">
                      Hello, {name || "Friend"}!
                    </p>
                  </TaskCard>
                )}

                {componentMatches("Avatar Component") && (
                  <TaskCard title="👤 Avatar Component">
                    <Avatar name="TaskFlow User" />
                  </TaskCard>
                )}

                {componentMatches("Badge Component") && (
                  <TaskCard title="🏷️ Badge Component">
                    <div className="flex flex-wrap gap-3">
                      <Badge color="green">Completed</Badge>
                      <Badge color="yellow">Pending</Badge>
                      <Badge color="red">Delayed</Badge>
                      <Badge color="blue">In Progress</Badge>
                    </div>
                  </TaskCard>
                )}

                {componentMatches("Modal Component") && (
                  <TaskCard title="🪟 Modal Component">
                    <p className="mb-4">
                      Click below to open your popup window.
                    </p>
                    <Button onClick={() => setIsOpen(true)}>
                      Open Modal
                    </Button>
                  </TaskCard>
                )}

                {componentMatches("Project Overview") && (
                  <TaskCard title="📌 Project Overview">
                    <p className="text-gray-600 mb-3">
                      Your reusable components are ready to use!
                    </p>
                    <Badge color="purple">Day 2 Project</Badge>
                  </TaskCard>
                )}

                {![
                  "Button Component",
                  "Input Component",
                  "Avatar Component",
                  "Badge Component",
                  "Modal Component",
                  "Project Overview",
                ].some(componentMatches) && (
                  <p className="text-gray-500 col-span-full text-center p-8">
                    No matching components found.
                  </p>
                )}

              </div>
            </>
          )}

          {/* DAY 4 DASHBOARD */}
          {activePage === "Dashboard" && (
            <div className="space-y-8">

              <div>
                <h2 className="text-3xl font-extrabold text-purple-950">
                  Dashboard Overview 📊
                </h2>
                <p className="text-gray-600 mt-2">
                  Track your projects and monitor your productivity.
                </p>
              </div>

              {/* STATISTICS CARDS */}
              <section>
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  Your Statistics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {stats.map((stat) => (
                    <div
                      key={stat.title}
                      className="bg-white rounded-3xl p-5 shadow-lg border border-purple-100"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-gray-500 font-medium text-sm">
                          {stat.title}
                        </p>

                        <div className={`bg-gradient-to-br ${stat.color} text-white w-11 h-11 rounded-2xl flex items-center justify-center text-xl`}>
                          {stat.icon}
                        </div>
                      </div>

                      <h3 className="text-3xl font-extrabold text-purple-950 mt-4">
                        {stat.value}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECT LIST */}
              <section className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">

                <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-purple-900">
                      Project Overview 📁
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Monitor your ongoing projects.
                    </p>
                  </div>

                  <Badge color="purple">
                    {filteredProjects.length} Projects
                  </Badge>
                </div>

                <div className="space-y-6">
                  {filteredProjects.map((project) => (
                    <div key={project.id}>

                      <div className="flex flex-wrap justify-between gap-3 mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {project.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {project.category}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className={`text-sm font-semibold ${
                            project.status === "Completed"
                              ? "text-green-600"
                              : project.status === "Pending"
                              ? "text-orange-500"
                              : "text-blue-600"
                          }`}>
                            {project.status}
                          </span>

                          <p className="text-xs text-gray-500 mt-1">
                            Due: {project.dueDate}
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>

                      <p className="text-right text-sm font-semibold text-purple-700 mt-2">
                        {project.progress}% completed
                      </p>

                    </div>
                  ))}

                  {filteredProjects.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                      No matching projects found.
                    </p>
                  )}
                </div>

              </section>

              {/* ACTIVITY FEED */}
              <section className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">

                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Recent Activity 🔔
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                  Stay updated with your latest activities.
                </p>

                <div className="space-y-5">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 border-b border-purple-50 pb-5 last:border-0 last:pb-0"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-purple-100 flex items-center justify-center text-xl shrink-0">
                        {activity.icon}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">
                          {activity.title}
                        </h4>

                        <p className="text-sm text-gray-600 mt-1">
                          {activity.detail}
                        </p>

                        <p className="text-xs text-purple-500 mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </section>

            </div>
          )}

          {/* MY TASKS */}
          {activePage === "My Tasks" && (
            <div className="bg-white/90 rounded-3xl p-8 shadow-xl min-h-72">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                📋 My Tasks
              </h2>
              <p className="text-gray-600">
                Your tasks workspace will be available here.
              </p>
              <div className="mt-6">
                <Badge color="purple">TaskFlow Workspace</Badge>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activePage === "Settings" && (
            <div className="bg-white/90 rounded-3xl p-8 shadow-xl min-h-72">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                ⚙️ Settings
              </h2>
              <p className="text-gray-600">
                Manage your TaskFlow preferences here.
              </p>
            </div>
          )}

          {/* FOOTER */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            Made with 💜 | TaskFlow Project
          </p>

        </main>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome to TaskFlow! 🎉"
      >
        Your productivity journey starts here.
      </Modal>

    </div>
  );
}

export default App;