import axios from "axios";

const BASE_URL = import.meta.env.VITE_PROD_URL;

export interface DogData {
  id?: any;
  name: string;
  breed: string;
  age: number;
  weight: number;
  health_conditions?: string;
}

export const getMyDogs = async (token: string | null) => {
  try {
    const response = await axios.get(`${BASE_URL}/dogs/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Get Dogs Data", error);
    throw error;
  }
};

export const createDog = async (dogData: DogData, token: string | null) => {
  try {
    const response = await axios.post(`${BASE_URL}/dogs/create`, dogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Add Dog Failed:", error);
    throw error;
  }
};

export const updateDog = async (
  id: number,
  dogData: DogData,
  token: string | null
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/dogs/${id}`, dogData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Update Dog Failed:", error);
    throw error;
  }
};

export const deleteDog = async (id: number, token: string | null) => {
  try {
    const res = await axios.delete(`${BASE_URL}/dogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Delete Dog Failed:", error);
    throw error;
  }
};

export const getDogBreeds = async (): Promise<string[]> => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data: {
        message: Record<string, string[]>;
        status: string;
      } = await response.json();
  
      const breeds: string[] = [];
    
      for (const breed in data.message) {
        const subBreeds = data.message[breed];
        if (subBreeds.length === 0) {
          breeds.push(capitalize(breed));
        } else {
          subBreeds.forEach((sub) =>
            breeds.push(`${capitalize(sub)} ${capitalize(breed)}`)
          );
        }
      }
      return breeds.sort();
    } catch (error) {
      console.error("Failed to fetch dog breeds", error);
      return [];
    }
  };
  
  const capitalize = (word: string): string =>
    word.charAt(0).toUpperCase() + word.slice(1);
  