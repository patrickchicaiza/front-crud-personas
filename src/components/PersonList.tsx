import React, { useState, useEffect } from 'react';
import { Person } from '../types/person';
import { personApi } from '../services/api';  // ← Cambiado a personApi
import PersonItem from './PersonItem';
import PersonForm from './PersonForm';

const PersonList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    try {
      setLoading(true);
      const data = await personApi.getAll();  // ← Cambiado
      setPersons(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las personas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (personData: any) => {
    try {
      const newPerson = await personApi.create(personData);  // ← Cambiado
      setPersons([...persons, newPerson]);
      setShowForm(false);
    } catch (err) {
      alert('Error al crear la persona');
      console.error(err);
    }
  };

  const handleUpdate = async (personData: any) => {
    if (!editingPerson) return;
    
    try {
      const updatedPerson = await personApi.update(editingPerson.id, personData);  // ← Cambiado
      setPersons(persons.map(p => p.id === editingPerson.id ? updatedPerson : p));
      setEditingPerson(null);
    } catch (err) {
      alert('Error al actualizar la persona');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta persona?')) return;
    
    try {
      await personApi.delete(id);  // ← Cambiado
      setPersons(persons.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar la persona');
      console.error(err);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
  };

  const handleCancel = () => {
    setEditingPerson(null);
    setShowForm(false);
  };

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Personas</h1>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <button 
        onClick={() => setShowForm(true)}
        style={styles.addButton}
      >
        + Nueva Persona
      </button>
      
      {(showForm || editingPerson) && (
        <PersonForm
          person={editingPerson}
          onSubmit={editingPerson ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}
      
      <div style={styles.list}>
        {persons.length === 0 ? (
          <p style={styles.empty}>No hay personas registradas</p>
        ) : (
          persons.map(person => (
            <PersonItem
              key={person.id}
              person={person}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '18px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0',
  },
  addButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
  },
  list: {
    marginTop: '20px',
  },
  empty: {
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '18px',
  },
};

export default PersonList;