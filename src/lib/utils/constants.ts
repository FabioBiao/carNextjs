import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

// export const fetchApi = async (url) => {
//   const { data } = await axios.get((url), {
//     headers: {
//       'x-rapidapi-host': 'bayut.p.rapidapi.com',
//       'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY ,
//     },
//   });

//   return data;
// }

export const fuelType = [
  { name: "Todos", value: "All" },
  { name: "DIESEL", value: "DIESEL" },
  { name: "Electrico", value: "ELECTRICO" },
  { name: "Gasolina", value: "GASOLINA" },
  { name: "GPL", value: "GPL" },
  { name: "Híbrido Diesel", value: "HIBRIDO_DIESEL" },
  { name: "Híbrido Gasolina", value: "HIBRIDO_GASOLINA" },
];

export enum fuelEnum {
  DIESEL,
  ELECTRICO,
  GASOLINA,
  GPL,
  HIBRIDO_DIESEL,
  HIBRIDO_GASOLINA,
}

export const miles = {
  DIESEL: "Diesel",
  ELECTRICO: "Electrico",
  GASOLINA: "Gasolina",
  GPL: "GPL",
  HIBRIDO_DIESEL: "Híbrido Diesel",
  HIBRIDO_GASOLINA: "Híbrido Gasolina",
};

export const potency = [
  { name: "50", value: "50" },
  { name: "80", value: "80" },
  { name: "120", value: "120" },
  { name: "150", value: "150" },
  { name: "200", value: "200" },
  { name: "300", value: "300" },
  { name: "500", value: "500" },
];
