import React, { useState, useEffect } from 'react';
import { updateEmployee, getAreas, getEmployees } from '../services/api';
import Swal from 'sweetalert2';

interface Props {
  selectedEmployee: Employee | null;
  onSuccess: () => void;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  areaId: number;
  managerId: number | null;
}

const EmployeeUpdateForm: React.FC<Props> = ({ selectedEmployee, onSuccess }) => {
  const [formData, setFormData] = useState<Employee>({
    id: selectedEmployee?.id || 0,
    name: selectedEmployee?.name || '',
    position: selectedEmployee?.position || '',
    areaId: selectedEmployee?.areaId || 0,
    managerId: selectedEmployee?.managerId || null,
  });
  const [areas, setAreas] = useState<{ id: number; name: string }[]>([]);
  const [managers, setManagers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const areasData = await getAreas();
            setAreas(areasData);
            const managersData = await getEmployees(); // Cambiar a la función correcta que obtiene los managers
            setManagers(managersData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmployee(formData.id, formData);
      Swal.fire({
        icon: 'success',
        title: 'Empleado actualizado!',
        text: 'Se ha actualizado el empleado exitosamente.',
      });
      onSuccess();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al actualizar el empleado.',
      });
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Actualizar Empleado</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="areaId" className="block text-gray-700 text-sm font-bold mb-2">Área</label>
          <select
            id="areaId"
            name="areaId"
            value={formData.areaId}
            onChange={(e) => setFormData({ ...formData, areaId: parseInt(e.target.value) })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="managerId" className="block text-gray-700 text-sm font-bold mb-2">Manager (opcional)</label>
          <select
            id="managerId"
            name="managerId"
            value={formData.managerId || ''}
            onChange={(e) => setFormData({ ...formData, managerId: e.target.value ? parseInt(e.target.value) : null })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Sin manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>{manager.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
