import { FaEdit, FaTrash } from "react-icons/fa";
import { DogData, updateDog, deleteDog } from "../api/userApi/dogApi";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";

interface DogCardProps {
  dog: DogData;
  token: string | null;
  refresh: () => void;
  breedList: string[];
  statusMessage: string | null;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

function DogCard({
  dog,
  token,
  refresh,
  breedList,
  statusMessage,
  setStatusMessage,
}: DogCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [formData, setFormData] = useState<DogData>({
    name: dog.name,
    breed: dog.breed,
    age: dog.age,
    weight: dog.weight,
    health_conditions: dog.health_conditions,
  });

  const handleUpdate = async () => {
    try {
      if (formData.age > 20 || formData.weight > 100) {
        setStatusMessage("Limit age at 20 years, weight not over 100 kgs.");
        return;
      }

      const updateData = {
        ...formData,
        health_conditions: formData.health_conditions?.trim() || "none",
      };
      await updateDog(dog.id, updateData, token);
      setIsEditing(false);
      refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error?.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to update dog");
      }
    }
  };
  

  const handleDelete = async () => {
    try {
      await deleteDog(dog.id, token);
      refresh();
      setConfirmDelete(false);
    } catch (error) {
      console.error("Failed to delete dog", error);
    }
  };

  return (
    <div className="flex flex-col text-[#A88763] bg-white shadow-md rounded-xl p-6 space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <div className="flex">
            <span>Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              className="w-full mx-1 px-1"
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
              className="w-full mx-3"
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
            <span>Age</span>
            <input
              type="number"
              min={0}
              max={20}
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: parseInt(e.target.value) })
              }
              placeholder="Age"
              className="w-full mx-1 px-1"
              required
            />
          </div>
          <div className="flex">
            <span>Weight</span>
            <input
              type="number"
              value={formData.weight}
              min={0}
              max={100}
              onChange={(e) =>
                setFormData({ ...formData, weight: parseInt(e.target.value) })
              }
              placeholder="Weight"
              className="w-full mx-1 px-1"
              required
            />
          </div>
          <div className="flex">
            <span>Health Conditions</span>
            <input
              type="text"
              maxLength={50}
              value={formData.health_conditions}
              onChange={(e) =>
                setFormData({ ...formData, health_conditions: e.target.value })
              }
              placeholder="Health Conditions"
              className="w-full mx-1 px-1"
            />
          </div>
          <span className="text-sm text-red-400 text-center">
            {statusMessage}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-[#6A4E2F]">{dog.name}</h3>
          <p className="text-gray-700">Breed: {dog.breed}</p>
          <p className="text-gray-700">Age: {dog.age} years</p>
          <p className="text-gray-700">Weight: {dog.weight} kgs.</p>
          <p className="text-gray-700">
            Health Conditions:{" "}
            {dog.health_conditions ? dog.health_conditions : "None"}
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
      {confirmDelete && (
        <ConfirmModal
          message={`Confirm Delete ${dog.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

export default DogCard;
