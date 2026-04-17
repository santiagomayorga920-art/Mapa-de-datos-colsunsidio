export type AffiliateCategory = 'A' | 'B' | 'C' | 'None';

export type AttractionStatus = 'abierta' | 'mantenimiento';

export type TransactionType = 'FastPass' | 'Comida';

export interface Companion {
  nombre: string;
  edad: number;
}

export interface User {
  id: string;
  nombre: string;
  categoria: AffiliateCategory;
  puntos: number;
  acompañantes: Companion[];
}

export interface Attraction {
  id: string;
  nombre: string;
  reservable: boolean;
  capacidadTurno: number;
  usuariosEnFila: number;
  cooldownMinutos: number;
  estado: AttractionStatus;
}

export interface Transaction {
  id: string;
  userId: string;
  attractionId: string;
  turno: string;
  timestamp: number;
  tipo: TransactionType;
}

export interface CapacityData {
  ingresosFisicos: number;
  ingresosApp: number;
  aforoTotal: number;
}
