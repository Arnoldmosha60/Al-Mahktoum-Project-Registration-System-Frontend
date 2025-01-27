import React, { useState, useEffect } from 'react';
import { MenuIcon, PlusIcon } from '@heroicons/react/solid'; // Heroicons for icons
import API from '../services/api';

const Home: React.FC = () => {
  interface Project {
    id: number;
    title: string;
    location: string;
    supervisor: {
      supervisor_name: string;
      supervisor_contact: string;
    };
    project_type: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    supervisor: {
      supervisor_name: '',
      supervisor_contact: ''
    },
    project_type: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/projects/projects/');
        console.log('+++++++++++++++++++', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // const fetchLoggedInUser = async () => {
    //   try {
    //     // Fetch user data (adjust endpoint if needed)
    //     const response = await API.get('/auth/user/');
    //     setLoggedInUser(response.data);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };

    fetchProjects();
    // fetchLoggedInUser();
  }, []);

  const handleAddProject = async () => {
    try {
      const response = await API.post('/projects/projects/', newProject);
      setProjects((prevProjects) => [...prevProjects, response.data]);
      setModalOpen(false);
      setNewProject({
        title: '',
        location: '',
        supervisor: { supervisor_name: '', supervisor_contact: '' },
        project_type: '',
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
      <div className="h-screen bg-gray-100">
        {/* Top Navigation Bar */}
        <nav className="bg-gray-200 shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Project Management System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {localStorage.getItem('user')}</span>
            <button
                onClick={() => setSidenavOpen(!sidenavOpen)}
                className="p-2 rounded-md hover:bg-gray-300"
            >
              <MenuIcon className="h-6 w-6 text-gray-700"/>
            </button>
          </div>
        </nav>

        {/* Sidenav */}
        {sidenavOpen && (
            <aside className="absolute top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <ul className="space-y-2">
                <li className="hover:text-gray-300 cursor-pointer">Projects</li>
                <li className="hover:text-gray-300 cursor-pointer">Settings</li>
              </ul>
            </aside>
        )}

        {/* Main Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 elevation-5">
            {projects.map((project: any) => (
                <div key={project.id} className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-lg">
                  {/* Header */}
                  <div className="bg-gray-100 p-4">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Location:</strong> {project.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Supervisor:</strong> {project.supervisor_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Contact:</strong> {project.supervisor_contact}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Type:</strong> {project.project_type}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-100 p-4 text-sm text-gray-600">
                    <strong>Date:</strong> {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
            ))}
          </div>
        </main>

        {/* Floating Add Button */}
        <button
            onClick={() => setModalOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          <PlusIcon className="h-6 w-6"/>
        </button>

        {/* Add Project Modal */}
        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Add New Project</h3>
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddProject();
                    }}
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newProject.location}
                        onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                        required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Supervisor Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newProject.supervisor.supervisor_name}
                        onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              supervisor: {...newProject.supervisor, supervisor_name: e.target.value},
                            })
                        }
                        required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Supervisor Contact</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newProject.supervisor.supervisor_contact}
                        onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              supervisor: {...newProject.supervisor, supervisor_contact: e.target.value},
                            })
                        }
                        required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Type</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={newProject.project_type}
                        onChange={(e) => setNewProject({...newProject, project_type: e.target.value})}
                        required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default Home;
