import axios from "axios";
import { updateUserProfile } from "../api/userApi/userApi";
import { useEffect } from "react";
import { isEmptyName, isName, isPassword } from "../utils/validators";
interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
}

interface ProfileEditCardProps {
  token: string | null;
  userId: string | null;
  formData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  setFormData: React.Dispatch<React.SetStateAction<UserData | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusMessage: React.Dispatch<React.SetStateAction<string>>;
  statusMessage: string;
}

function ProfileEditCard({
  token,
  userId,
  formData,
  setUserData,
  setIsEditing,
  setStatusMessage,
  statusMessage,
  setFormData,
}: ProfileEditCardProps) {
  useEffect(() => setStatusMessage(""), []);

  const handleSave = async () => {
    if (
      formData &&
      (!isEmptyName(formData.first_name) || !isEmptyName(formData.last_name))
    ) {
      setStatusMessage("Firstname and Lastname cannot be empty.");
      return;
    }
    if (
      formData &&
      (!isName(formData?.first_name) ||
        !isName(formData?.last_name))
    ) {
      setStatusMessage(
        "Firstname or Lastname must contain only English letters"
      );
      return;
    }
    if (formData?.password && !isPassword(formData.password)) {
      setStatusMessage(
        "Password must be at least 8 characters, include upper and lower case letters, and a number."
      );
      return;
    }
    if (!token || !userId || !formData) {
      setStatusMessage("something went wrong, please try to log in again");
      return
    }
    
    try {
      await updateUserProfile(userId, formData, token);
      setUserData(formData);
      setIsEditing(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to Update Profile");
      }
    }
  };

  return (
    <div>
      {/* Edit Form */}
      <div className="flex items-baseline">
        <strong className="w-1/3">Firstname</strong>
        <input
          type="text"
          value={formData?.first_name || ""}
          onChange={(e) =>
            setFormData(
              (prev) => prev && { ...prev, first_name: e.target.value }
            )
          }
          className="w-full mb-2 border-1 border-amber-600 p-2 rounded-md"
          required
        />
      </div>

      <div className="flex items-baseline">
        <strong className="w-1/3">Lastname</strong>
        <input
          type="text"
          value={formData?.last_name || ""}
          onChange={(e) =>
            setFormData(
              (prev) => prev && { ...prev, last_name: e.target.value }
            )
          }
          className="w-full mb-2 border-1 border-amber-600 p-2 rounded-md"
          required
        />
      </div>
      <div className="flex items-baseline">
        <strong className="w-1/3">Phone</strong>
        <input
          type="tel"
          value={formData?.phone || ""}
          maxLength={10}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, "");
            setFormData((prev) => prev && { ...prev, phone: onlyNums });
          }}
          className="w-full mb-2 border-1 border-amber-600 p-2 rounded-md"
          required
        />
      </div>
      <div className="flex items-baseline">
        <strong className="w-1/3">New Password</strong>
        <input
          type="password"
          minLength={8}
          onChange={(e) =>
            setFormData((prev) => prev && { ...prev, password: e.target.value })
          }
          className="w-full flex-1/3 mb-2 border-1 border-amber-600 p-2 rounded-md"
        />
      </div>
      <div className="text-red-500 text-sm text-center">{statusMessage}</div>
      <div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProfileEditCard;
