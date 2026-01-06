// src/types/person.ts
export interface Person {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
}

export interface CreatePersonDto {
  nombre: string;
  cedula: string;
  correo: string;
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {}