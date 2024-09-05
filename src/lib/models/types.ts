export interface CarModel {
  id: number;
  user: number;
  brand: string;
  model: string;
  published:  boolean;

  year: number;
  fuelType: string;
  miles: number;
  cilindrada: number;
  pontecy: number;
  color: string;
  doors: number;

  details: string;
  price: number;
  photoUrl: string;
}

export interface MakeSelect {
  name: string;
  count: number;
}

export interface ModelSelect {
  name: string;
  count: number;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
}
