import { useState } from "react";

import Button from "./components/Button";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import Avatar from "./components/Avatar";
import Badge from "./components/Badge";

function App() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-6">

        {/* Sidebar */}
        <aside className="bg-white/90 rounded-3xl p-6 shadow-xl border border-white">
          <h2 className="text-2xl font-extrabold text-purple-700 mb-10">
            ✨ TaskFlow
          </h2>

          <div className="space-y-4 font-semibold">
            <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
              🏠 Home
            </div>
            <div className="p-3 text-gray-600">📋 My Tasks</div>
            <div className="p-3 text-gray-600">📊 Dashboard</div>
            <div className="p-3 text-gray-600">⚙️ Settings</div>
          </div>

            <div className="mt-16 bg-gradient-to-br from-slate-100 to-indigo-100 text-slate-800 rounded-2xl p-5 border border-indigo-200">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-lg">Stay Productive!</h3>
            <p className="text-sm mt-2 text-slate-600">
              Small steps create big achievements.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main>

          {/* Header */}
          <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-purple-950">
                Welcome to TaskFlow ✨
              </h1>
              <p className="text-gray-600 mt-2">
                Organize your work and achieve your goals.
              </p>
            </div>

            <Avatar name="TaskFlow User" />
          </header>

          {/* Welcome Banner */}
<div className="bg-gradient-to-r from-slate-700 via-indigo-800 to-slate-800 text-white rounded-3xl p-7 mb-8 shadow-lg">            <h2 className="text-2xl font-bold mb-2">
              Make Today Count! 🌈
            </h2>
            <p className="text-purple-100">
              Welcome to your personal productivity space.
            </p>
          </div>

          {/* Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <TaskCard title="🔘 Button Component">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </TaskCard>

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

            <TaskCard title="👤 Avatar Component">
              <Avatar name="TaskFlow User" />
            </TaskCard>

            <TaskCard title="🏷️ Badge Component">
              <div className="flex flex-wrap gap-3">
                <Badge color="green">Completed</Badge>
                <Badge color="yellow">Pending</Badge>
                <Badge color="red">Delayed</Badge>
                <Badge color="blue">In Progress</Badge>
              </div>
            </TaskCard>

            <TaskCard title="🪟 Modal Component">
              <p className="mb-4">
                Click below to open your popup window.
              </p>
              <Button onClick={() => setIsOpen(true)}>
                Open Modal
              </Button>
            </TaskCard>

            <TaskCard title="📌 Project Overview">
              <p className="text-gray-600 mb-3">
                Your reusable components are ready to use!
              </p>
              <Badge color="purple">Day 2 Project</Badge>
            </TaskCard>

          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            Made with 💜 | TaskFlow Project
          </p>

        </main>
      </div>

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