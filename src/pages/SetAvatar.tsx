import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../config/toastOptions";

export const SetAvatar = () => {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAvatars(): Promise<void> {
      const data: string[] = [];
      for (let i = 0; i < 4; i++) {
        const rand = Math.round(Math.random() * 1000);
        await axios
          .get(`${import.meta.env.VITE_MULTIAVATAR_API}/${rand}`)
          .then((res) => {
            const buffer = Buffer.from(res.data); // Buffer.from() untuk membuat buffer
            data.push(buffer.toString("base64")); // Ubah buffer menjadi base64 string
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setAvatars(data);
      setIsloading(false);
    }

    fetchAvatars();
  }, []);

  async function handleSelectAvatar(): Promise<void> {
    if (selectedAvatar !== undefined) {
      const user = localStorage.getItem("chatapp-user");
      if (user) {
        const userId = JSON.parse(user)._id.toString();
        const { data } = await axios.post(`${setAvatarRoute}/${userId}`, {
          avatarImage: `data:image/svg+xml;base64,${avatars[selectedAvatar]}`,
        });

        if (data.status) {
          toast.success(data.msg, toastOptions);
        } else {
          toast.error(data.msg, toastOptions);
        }
      }
    }
  }

  return (
    <div>
      <div>
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div>
        {isLoading ? (
          <p>loading bos sabar!</p>
        ) : (
          <ul>
            {avatars.map((item, index) => (
              <li
                key={index}
                className={`${
                  selectedAvatar === index ? "bg-blue-500" : "bg-red-700"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${item}`}
                  width={200}
                  height={200}
                />
              </li>
            ))}
          </ul>
        )}
        <button className="bg-blue-400" onClick={handleSelectAvatar}>
          Select Avatar
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};
