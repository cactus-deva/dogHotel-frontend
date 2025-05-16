import { useEffect, useState } from "react";
import { getMyDogs, createDog, getDogBreeds } from "../../api/userApi/dogApi";
import DogCard from "../../components/DogCard";
import { DogData } from "../../api/userApi/dogApi";
import { useLoading } from "../../context/LoadingContext";
import GlobalLoader from "../../components/GlobalLoader";

export default function DogPage() {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<DogData, "id">>({
    name: "",
    breed: "",
    age: 0,
    weight: 0,
    health_conditions: "",
  });

  const { setIsLoading } = useLoading();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDogs();
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    const res = await getDogBreeds();
    setBreedList(res);
  };
  const fetchDogs = async () => {
    try {
      setIsLoading(true);
      const res = await getMyDogs(token);
      setTimeout(() => {
        setDogs(res.data);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to fetch dogs", err);
      setIsLoading(false);
    }
  };

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
    } catch (err) {
      console.error("Failed to create dog", err);
    }
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen bg-[#FDF9F1] py-10 px-4">
      <GlobalLoader />
      <div className="max-w-xl mt-40 space-y-6 w-full">
        <h2 className="text-3xl font-semibold text-center text-[#A88763]">
          My Dogs
        </h2>
        <div className="flex justify-center">
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
            className="grid grid-cols-1 gap-2 bg-white p-6 rounded-xl shadow-lg space-y-4"
          >
            <div className="flex">
              <span>Name</span>
              <input
                type="text"
                className="w-full mx-1 px-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex">
              <span>Breed</span>
              <select
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                required
                className="mx-4 w-full"
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
              <span>Age </span>
              <input
                type="number"
                placeholder="Age"
                className="w-full mx-3 px-2"
                value={formData.age}
                min={0}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex">
              <span>Weight</span>
              <input
                type="number"
                placeholder="Weight"
                className="w-full mx-3 px-2"
                value={formData.weight}
                min={0}
                onChange={(e) =>
                  setFormData({ ...formData, weight: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex">
              <span>Health Conditions</span>
              <input
                type="text"
                className="w-full mx-3 px-2"
                value={formData.health_conditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    health_conditions: e.target.value,
                  })
                }
              />
            </div>

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
            <DogCard key={dog.id} dog={dog} token={token} refresh={fetchDogs} breedList={breedList} />
          ))}
        </div>
      </div>
    </section>
  );
}
