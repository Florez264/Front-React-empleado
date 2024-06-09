import React, { useState, useEffect } from 'react';
import { createEmployee, getAreas, getEmployees } from '../services/api';
import Swal from 'sweetalert2';

interface Props {
  onSuccess: () => void;
}

interface Area {
  id: number;
  name: string;
}

interface Manager {
  id: number;
  name: string;
}

const EmployeeForm: React.FC<Props> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    areaId: 0,
    managerId: null,
  });
  const [areas, setAreas] = useState<Area[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await getAreas();
        setAreas(areasData);
        const managersData = await getEmployees(); 
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
      await createEmployee(formData);
      Swal.fire({
        icon: 'success',
        title: 'Empleado creado!',
        text: 'Se ha creado el nuevo empleado exitosamente.',
      });
      setFormData({
        name: '',
        position: '',
        areaId: 0,
        managerId: null,
      });
      onSuccess();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al crear el empleado.',
      });
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Empleado</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="areaId" className="block text-gray-700 text-sm font-bold mb-2">Área</label>
          <select id="areaId" name="areaId" value={formData.areaId} onChange={(e) => setFormData({ ...formData, areaId: parseInt(e.target.value) })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="0">Seleccionar área</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="managerId" className="block text-gray-700 text-sm font-bold mb-2">Jefe Directo (opcional)</label>
          <select id="managerId" name="managerId" value={formData.managerId || ''} onChange={(e) => setFormData({ ...formData, managerId: e.target.value ? parseInt(e.target.value) : null })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Sin jefe directo</option>
            {managers.map(manager => (
              <option key={manager.id} value={manager.id}>{manager.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Empleado</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
