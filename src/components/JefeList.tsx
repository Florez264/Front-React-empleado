import React, { useState, useEffect } from 'react';
import { FaPaw } from 'react-icons/fa';
import { getEmployees } from '../services/api';

interface Area {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  area: Area;
  manager: Employee | null;
  subordinates: Employee[];
}

const JefeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const managersWithSubordinates = employees.filter(employee => employee.subordinates.length > 0);

  if (loading) {
    return <div>Cargando empleados...</div>;
  }

  return (
<div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-green-800 text-center">🌿 Lista de Jefes 🐾</h1>
      {managersWithSubordinates.map(manager => (
        <div key={manager.id} className="mb-6 p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-green-700 flex items-center">
                <FaPaw className="mr-2 text-green-500" /> {manager.name}
              </h2>
              <p className="text-green-600">{manager.position}</p>
            </div>
            <button
              onClick={() => toggleExpand(manager.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
            >
              {expanded[manager.id] ? 'Ocultar Subordinados' : 'Mostrar Subordinados'}
            </button>
          </div>
          {expanded[manager.id] && (
            <div className="mt-4 pl-4 border-l-4 border-green-300">
              {manager.subordinates.map(subordinate => (
                <div key={subordinate.id} className="mb-2">
                  <h3 className="text-lg font-semibold text-green-700">{subordinate.name}</h3>
                  <p className="text-green-600">{subordinate.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JefeList;
