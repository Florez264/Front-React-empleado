import React, { useState } from 'react';
import { createArea } from '../services/api';
import Swal from 'sweetalert2';

const AreaForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const area = { name };
    try {
      await createArea(area);
      Swal.fire({
        icon: 'success',
        title: 'Área creada!',
        text: 'Se ha creado la nueva área exitosamente.',
      });
      setName('');
      onSuccess();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al crear la área.',
      });
      console.error('Error creating area:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Área</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Área
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default AreaForm;
