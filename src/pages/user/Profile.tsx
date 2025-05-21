import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/userApi/userApi";
import { Link } from "react-router-dom";
import ProfileEditCard from "../../components/ProfileEditCard";
import { useLoading } from "../../context/LoadingContext";
import GlobalLoader from "../../components/GlobalLoader";

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
  const [message, setMessage] = useState("");
  const { setIsLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      setMessage("Not Logged In");
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
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setMessage("Failed to get profile")
    }
  }

  return (
    <section className="min-h-screen bg-[#FDF9F1] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <div className="flex justify-center text-2xl font-bold text-[#A88763] text-center">
          My Profile
        </div>
        <GlobalLoader />
        {userData && formData ? (
          <div className="flex flex-col justify-center text-gray-500 text-sm">
            {isEditing ? (
              <ProfileEditCard
                token={token}
                userId={userId}
                formData={formData}
                setUserData={setUserData}
                setFormData={setFormData}
                setIsEditing={setIsEditing}
                setMessage={setMessage}
              />
            ) : (
              <>
                <ul className="text-md text-[#A88763] space-y-2">
                  <li>
                    <strong>Firstname:</strong> {userData.first_name}
                  </li>
                  <li>
                    <strong>Lastname:</strong> {userData.last_name}
                  </li>
                  <li>
                    <strong>Username:</strong> {userData.username}
                  </li>
                  <li>
                    <strong>Email:</strong> {userData.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {userData.phone}
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
                <strong className="text-red-500 text-center mt-5">Remarks: username & email is uneditable</strong>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Profile;
