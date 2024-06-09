import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getAreas = async () => {
  try {
    const response = await axios.get(`${API_URL}/areas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
};

export const getAreaById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/areas/info/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching area by ID ${id}:`, error);
    throw error;
  }
};

export const createArea = async (area: { name: string }) => {
  try {
    const response = await axios.post(`${API_URL}/areas/crear`, area, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating area:', error);
    throw error;
  }
};

export const updateArea = async (id: number, area: { name: string }) => {
  try {
    const response = await axios.put(`${API_URL}/areas/update/${id}`, area, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating area with ID ${id}:`, error);
    throw error;
  }
};

export const deleteArea = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/areas/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting area with ID ${id}:`, error);
    throw error;
  }
};


// Empleados
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/employees/info/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee by ID ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employee: { name: string, position: string, areaId: number, managerId: number | null }) => {
  try {
    const response = await axios.post(`${API_URL}/employees/create`, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: number, employee: { name: string, position: string, areaId: number, managerId: number | null }) => {
  try {
    const response = await axios.put(`${API_URL}/employees/update/${id}`, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/employees/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};