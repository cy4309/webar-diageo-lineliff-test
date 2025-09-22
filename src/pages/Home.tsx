import { useEffect, useState } from "react";
import liff from "@line/liff";
import BaseButton from "@/components/BaseButton";

const Home: React.FC = () => {
  // @ts-ignore
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2008152726-yKxPlx2b" });

        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        }
      } catch (err) {
        console.error("LIFF init error:", err);
      }
    };
    initLiff();
  }, []);

  const sendMessage = async () => {
    try {
      await liff.sendMessages([
        {
          type: "text",
          text: "Hello! 這是一個測試訊息 🚀",
        },
      ]);
      alert("訊息已送出！");
    } catch (err) {
      console.error("sendMessages error:", err);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <h1>My React LIFF App</h1>
      {profile ? (
        <>
          <p>Hi, {profile.displayName}</p>
          <img src={profile.pictureUrl} alt="avatar" width="100" />
          <BaseButton onClick={sendMessage}>傳送訊息給 OA</BaseButton>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
