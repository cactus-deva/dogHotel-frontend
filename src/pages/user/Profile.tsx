import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/userApi/userApi";
import { Link } from "react-router-dom";
import ProfileEditCard from "../../components/ProfileEditCard";
import { useLoading } from "../../context/LoadingContext";
import GlobalLoader from "../../components/GlobalLoader";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
}

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const { setIsLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const { token, userId } = useAuth();

  useEffect(() => {
    if (!token || !userId) {
      setStatusMessage("Not Logged In");
      setIsLoading(false);
      return;
    }
    getProfile(userId, token);
  }, []);

  const getProfile = async (userId: string, token: string) => {
    try {
      setIsLoading(true);
      const res = await getUserProfile(userId, token);
      setTimeout(() => {
        setUserData(res.data.data);
        setFormData(res.data.data);
        setIsLoading(false);
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to get profile");
      }
    }
  };

  return (
    <section className="min-h-screen bg-[#FDF9F1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-xs md:w-md lg:w-lg space-y-4">
        <div className="flex justify-center text-2xl font-bold text-[#A88763] text-center">
          My Profile
        </div>
        <GlobalLoader />
        {userData && formData ? (
          <div className="flex flex-col justify-center text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg">
            {isEditing ? (
              <ProfileEditCard
                token={token}
                userId={userId}
                formData={formData}
                setUserData={setUserData}
                setFormData={setFormData}
                setIsEditing={setIsEditing}
                setStatusMessage={setStatusMessage}
                statusMessage={statusMessage}
              />
            ) : (
              <>
                <ul className="text-[#A88763] space-y-2">
                  <li>
                    <div className="flex">
                      <strong className="w-1/3">Firstname:</strong>
                      <p>{userData.first_name}</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex">
                      <strong className="w-1/3">Lastname:</strong>
                      <p>{userData.last_name}</p>
                    </div>         
                  </li>
                  <li>
                    <div className="flex">
                      <strong className="w-1/3">Username:</strong> 
                      <p>{userData.username}</p> 
                    </div> 
                  </li>
                  <li>
                    <div className="flex">
                      <strong className="w-1/3">Email:</strong>
                      <p> {userData.email}</p> 
                    </div>
                  </li>
                  <li>
                    <div className="flex">
                     <strong className="w-1/3">Phone:</strong> 
                     <p>{userData.phone}</p> 
                    </div>
                  </li>
                </ul>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#A88763] text-white px-4 py-2 rounded hover:bg-[#926f4e] transition"
                  >
                    Edit Profile
                  </button>
                  <Link
                    to="/dog"
                    className="bg-[#A88763] text-white px-4 py-2 rounded hover:bg-[#926f4e] transition"
                  >
                    Add Dog Info
                  </Link>
                </div>
                <strong className="text-red-500 text-center mt-5">
                  Remarks: username & email is uneditable
                </strong>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Profile;
