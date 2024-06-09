import React from 'react';
import AreaList from './components/AreaList';
import EmployeeList from './components/EmployeeList'; 
import JefeList from './components/JefeList';

const App: React.FC = () => {
  const [activeView, setActiveView] = React.useState<'areas' | 'employees' | 'jefes'>('areas');

  const renderActiveView = () => {
    if (activeView === 'areas') {
      return <AreaList />;
    } else if (activeView === 'employees') {
      return <EmployeeList />;
    } else if (activeView === 'jefes') {
      return <JefeList />;
    }
  };

  return (
    <div className="App">
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl">Gestión de Áreas y Empleados</h1>
          <div className="flex items-center">
            <button
              className={`text-white hover:text-gray-300 mr-4 ${activeView === 'areas' ? 'font-bold' : ''}`}
              onClick={() => setActiveView('areas')}
            >
              Áreas
            </button>
            <button
              className={`text-white hover:text-gray-300 mr-4 ${activeView === 'employees' ? 'font-bold' : ''}`}
              onClick={() => setActiveView('employees')}
            >
              Empleados
            </button>
            <button
              className={`text-white hover:text-gray-300 ${activeView === 'jefes' ? 'font-bold' : ''}`}
              onClick={() => setActiveView('jefes')}
            >
              Jefes
            </button>
          </div>
        </div>
      </nav>
      <main>
        {renderActiveView()}
      </main>
    </div>
  );
};

export default App;
