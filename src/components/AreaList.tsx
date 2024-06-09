import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MdDelete, MdEditDocument, MdAddBox } from "react-icons/md";
import { getAreas, deleteArea, updateArea } from '../services/api';
import Swal from 'sweetalert2';
import AreaForm from './AreaForm';

interface Area {
  id: number;
  name: string;
}

const AreaList: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAreas();
        setAreas(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching areas:", error);
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteArea(id);
          setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
        } catch (error) {
          console.error(`Error deleting area with ID ${id}:`, error);
        }
      }
    });
  };

  const handleEdit = (area: Area) => {
    Swal.fire({
      title: 'Actualizar Área',
      html: `
        <input type="text" id="area-name" class="swal2-input" placeholder="Nombre del Área" value="${area.name}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('area-name') as HTMLInputElement).value;
        if (!name) {
          Swal.showValidationMessage('El nombre del área no puede estar vacío');
        }
        return { ...area, name };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedArea = result.value;
          await updateArea(updatedArea.id, { name: updatedArea.name });
          setAreas(prevAreas => prevAreas.map(a => (a.id === updatedArea.id ? updatedArea : a)));
          Swal.fire('¡Actualizado!', 'El área ha sido actualizada.', 'success');
        } catch (error) {
          console.error(`Error updating area with ID ${area.id}:`, error);
          Swal.fire('Error', 'Hubo un problema al actualizar el área.', 'error');
        }
      }
    });
  };

  const handleAdd = () => {
    Swal.fire({
      html: '<div id="area-form-container"></div>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const container = document.getElementById('area-form-container');
        if (container) {
          const root = ReactDOM.createRoot(container);
          root.render(<AreaForm onSuccess={() => {
            setLoading(true);
            getAreas().then(data => {
              setAreas(data);
              setLoading(false);
            });
            Swal.close();
          }} />);
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Listado de Áreas</h1>
      <div className="flex justify-end mb-4">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleAdd}
        >
          <MdAddBox size={24} className="inline-block mr-2" />
          Agregar Área
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 px-4 py-2 text-left">ID</th>
              <th className="w-2/3 px-4 py-2 text-left">Nombre</th>
              <th className="w-1/6 px-4 py-2 text-center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && areas.map(area => (
              <tr key={area.id} className="bg-gray-100 border-b hover:bg-gray-200">
                <td className="px-4 py-2">{area.id}</td>
                <td className="px-4 py-2">{area.name}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(area)}>
                    <MdEditDocument size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(area.id)}>
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaList;
