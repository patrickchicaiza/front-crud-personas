import React from "react";
import { Person } from "../types/person";

interface PersonItemProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

const PersonItem: React.FC<PersonItemProps> = ({
  person,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{person.nombre}</h3>
      <p>
        <strong>Cédula:</strong> {person.cedula}
      </p>
      <p>
        <strong>Correo:</strong> {person.correo}
      </p>
      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.editButton }}
          onClick={() => onEdit(person)}
        >
          Editar
        </button>
        <button
          style={{ ...styles.button, ...styles.deleteButton }}
          onClick={() => onDelete(person.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px 0",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  name: {
    marginTop: 0,
    color: "#333",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold" as const,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
};

export default PersonItem;
