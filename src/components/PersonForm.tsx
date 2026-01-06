// src/components/PersonForm.tsx
import React, { useState, useEffect } from 'react';
import { Person, CreatePersonDto } from '../types/person';

interface PersonFormProps {
  person?: Person | null;
  onSubmit: (person: CreatePersonDto) => void;
  onCancel: () => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ person, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreatePersonDto>({
    nombre: '',
    cedula: '',
    correo: '',
  });

  useEffect(() => {
    if (person) {
      setFormData({
        nombre: person.nombre,
        cedula: person.cedula,
        correo: person.correo,
      });
    }
  }, [person]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.formContainer}>
      <h2>{person ? 'Editar Persona' : 'Nueva Persona'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttons}>
          <button type="submit" style={styles.submitButton}>
            {person ? 'Actualizar' : 'Crear'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#9E9E9E',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PersonForm;