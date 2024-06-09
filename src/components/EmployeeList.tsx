import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditDocument, MdAddBox } from "react-icons/md";
import { getEmployees, deleteEmployee} from '../services/api';
import Swal from 'sweetalert2';
import EmployeeForm from './EmployeeForm';
import EmployeeUpdateForm from './EmployeeUpdateForm';

interface Employee {
  id: number;
  name: string;
  areaId: number;
  managerId: number | null;
  position: string;
  area: {
    id: number;
    name: string;
  };
}

const EmployeeList: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [showModaledi, setShowModaledit] = useState(false);
  

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModaledit(true);
  };

  const handleeditEmployee = () => {
    setShowModaledit(true);
  };

  const handleCloseModaledit = () => {
    setShowModaledit(false);
  };

  const handleSuccessEdit = async () =>  {
    handleCloseModaledit();
    await fetchEmployees();
  };


  const handleAddEmployee = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccess = async () =>  {
    handleCloseModal();
    await fetchEmployees();
  };

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(
        data.map((employee: Employee) => ({
          id: employee.id,
          name: employee.name,
          position: employee.position,
          area: employee.area,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(); 
  }, []);

  const handleDelete = async (id: number) => {
    const confirmResult = await Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    });

    if (confirmResult.isConfirmed) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter(employee => employee.id !== id));
        Swal.fire(
          'Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'Hubo un problema al eliminar el empleado.',
          'error'
        );
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Listado de Empleados</h1>
      <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleAddEmployee}
        >
          <MdAddBox size={24} className="inline-block mr-2" />
          Agregar Empleado
        </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 px-4 py-2 text-left">ID</th>
              <th className="w-2/6 px-4 py-2 text-left">Nombre</th>
              <th className="w-2/6 px-4 py-2 text-left">Cargo</th>
              <th className="w-1/6 px-4 py-2 text-left">Área</th>
              <th className="w-1/6 px-4 py-2 text-center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && employees.map(employee => (
              <tr key={employee.id} className="bg-gray-100 border-b hover:bg-gray-200">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.position}</td>
                <td className="px-4 py-2">{employee.area.name}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(employee)} >
                    <MdEditDocument size={20 } />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(employee.id)} >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModaledi && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg">
            <button className="absolute top-0 right-0 p-2" onClick={handleCloseModaledit}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            {/* Mostrar EmployeeUpdateForm si selectedEmployee no es null */}
            {selectedEmployee && <EmployeeUpdateForm selectedEmployee={selectedEmployee} onSuccess={handleSuccessEdit} />}
          </div>
        </div>
      )}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg">
            <button className="absolute top-0 right-0 p-2" onClick={handleCloseModal}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <EmployeeForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>

    
  );
};

export default EmployeeList;

