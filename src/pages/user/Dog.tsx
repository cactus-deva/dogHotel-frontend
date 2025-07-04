import { useEffect, useState } from "react";
import { getMyDogs, createDog, getDogBreeds } from "../../api/userApi/dogApi";
import DogCard from "../../components/DogCard";
import { DogData } from "../../api/userApi/dogApi";
import { useLoading } from "../../context/LoadingContext";
import GlobalLoader from "../../components/GlobalLoader";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function DogPage() {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>("");
  const [formData, setFormData] = useState<Omit<DogData, "id">>({
    name: "",
    breed: "",
    age: 0,
    weight: 0,
    health_conditions: "",
  });

  const { setIsLoading } = useLoading();
  const { token } = useAuth();

  const fetchBreeds = async () => {
    try {
      const res = await getDogBreeds();
      setBreedList(res);
    } catch (error: unknown) {
      console.error(error, "Failed to fetch dog breeds");
    }
  };

  const fetchDogs = async () => {
    try {
      setIsLoading(true);
      const res = await getMyDogs(token);
      setTimeout(() => {
        setDogs(res.data);
        setIsLoading(false);
      }, 2000);
    } catch (error: unknown) {
      console.error(error, "Failed to fetch dogs");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDogs();
      fetchBreeds();
    }
  }, [token]);

  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  const handleCreateDog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        health_conditions: formData.health_conditions?.trim() || "none",
      };
      await createDog(payload, token);
      setFormData({
        name: "",
        breed: "",
        age: 0,
        weight: 0,
        health_conditions: "",
      });
      setShowForm(false);
      fetchDogs();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to create dog");
      }
    }
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-[#FDF9F1]">
      <GlobalLoader />
      <div className="space-y-6 w-full max-w-5xl p-20 mt-50 md:mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#A88763]">
          My Dog
        </h2>
        <div className="flex justify-center text-sm md:text-md">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#A88763] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#8f734f]"
          >
            {showForm ? "Cancel" : "+ Add New Dog"}
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={handleCreateDog}
            className="grid grid-cols-1 gap-2 bg-white p-6 mx-auto rounded-xl shadow-lg space-y-4 text-sm md:text-lg"
          >
            <div className="flex">
              <span className="w-1/3">Name</span>
              <input
                type="text"
                className="w-full mx-2 px-2 border-1 border-amber-600 rounded-md"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex">
              <span className="w-1/3">Breed</span>
              <select
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                required
                className="w-full mx-2 px-2 border-1 border-amber-600 rounded-md"
              >
                <option value="" disabled>
                  -- Select Breed --
                </option>
                {breedList.map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <span className="w-1/3">Age </span>
              <input
                type="number"
                placeholder="Age"
                className="w-full mx-2 px-2 border-1 border-amber-600 rounded-md"
                value={formData.age || ""}
                min={0}
                max={15}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex">
              <span className="w-1/3">Weight</span>
              <input
                type="number"
                placeholder="Weight"
                className="w-full mx-2 px-2 border-1 border-amber-600 rounded-md"
                value={formData.weight || ""}
                min={0}
                max={100}
                onChange={(e) =>
                  setFormData({ ...formData, weight: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex">
              <span className="w-1/3">Health Conditions</span>
              <input
                type="text"
                className="flex-1/3 w-full mx-2 px-2 border-1 border-amber-600 rounded-md"
                value={formData.health_conditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    health_conditions: e.target.value,
                  })
                }
              />
            </div>
            <span className="text-sm text-red-400 text-center">
              {statusMessage}
            </span>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
            >
              Save Dog
            </button>
          </form>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              token={token}
              refresh={fetchDogs}
              breedList={breedList}
              statusMessage={statusMessage}
              setStatusMessage={setStatusMessage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
