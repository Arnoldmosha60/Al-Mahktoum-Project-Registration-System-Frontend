import React, { useState, useEffect } from 'react';
import { MenuIcon } from '@heroicons/react/solid'; // Heroicons for the sidenav toggle icon
import API from '../services/api'; // Assuming API service is set up for fetching data

const Home: React.FC = () => {
  interface Project {
    id: number;
    title: string;
    location: string;
    supervisor: {
      name: string;
      contact: string;
    };
    type: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/projects/projects/'); // Adjust endpoint as needed
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-200 shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Project Management System</h1>
        <button
          onClick={() => setSidenavOpen(!sidenavOpen)}
          className="p-2 rounded-md hover:bg-gray-300"
        >
          <MenuIcon className="h-6 w-6 text-gray-700" />
        </button>
      </nav>

      {/* Sidenav */}
      {sidenavOpen && (
        <aside className="absolute top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul className="space-y-2">
          {projects.map(() => (
            <>
              <li className="hover:text-gray-300 cursor-pointer">Projects</li>
              <li className="hover:text-gray-300 cursor-pointer">Settings</li>
            </>
          ))}
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {project.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Supervisor:</strong> {project.supervisor.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Contact:</strong> {project.supervisor.contact}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {project.type}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
