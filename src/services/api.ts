import axios from 'axios';
import { Person, CreatePersonDto, UpdatePersonDto } from '../types/person';

// BASE URL
// Usa variable de entorno
const BASE_URL = 'http://localhost:3001';  
const API_PERSONS = `${BASE_URL}/persons`;

export const api = {
    getAll: async (): Promise<Person[]> => {
        const response = await axios.get(API_PERSONS);
        return response.data;
    },

    getById: async (id: number): Promise<Person> => {
        const response = await axios.get(`${API_PERSONS}/${id}`);
        return response.data;
    },

    create: async (person: CreatePersonDto): Promise<Person> => {
        const response = await axios.post(API_PERSONS, person);
        return response.data;
    },

    update: async (id: number, person: UpdatePersonDto): Promise<Person> => {
        const response = await axios.put(`${API_PERSONS}/${id}`, person);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_PERSONS}/${id}`);
    }
};