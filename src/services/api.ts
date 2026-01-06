// src/services/api.ts - VERSIÓN MEJORADA
import axios from 'axios';
import { Person, CreatePersonDto, UpdatePersonDto } from '../types/person';

// Configurar axios globalmente
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 10000, // 10 segundos máximo
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use(request => {
    console.log(`📤 ${request.method?.toUpperCase()} ${request.url}`);
    return request;
  });
  
  apiClient.interceptors.response.use(response => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  }, error => {
    console.error('❌ Error:', error.response?.data || error.message);
    return Promise.reject(error);
  });
}

const API_PERSONS = '/persons';

export const personApi = {
    getAll: async (): Promise<Person[]> => {
        const response = await apiClient.get(API_PERSONS);
        return response.data;
    },

    getById: async (id: number): Promise<Person> => {
        const response = await apiClient.get(`${API_PERSONS}/${id}`);
        return response.data;
    },

    create: async (person: CreatePersonDto): Promise<Person> => {
        const response = await apiClient.post(API_PERSONS, person);
        return response.data;
    },

    update: async (id: number, person: UpdatePersonDto): Promise<Person> => {
        const response = await apiClient.put(`${API_PERSONS}/${id}`, person);
        return response.data;
    },

    updatePartial: async (id: number, person: Partial<UpdatePersonDto>): Promise<Person> => {
        const response = await apiClient.patch(`${API_PERSONS}/${id}`, person);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_PERSONS}/${id}`);
    }
};