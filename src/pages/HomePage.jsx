import { useAuth } from "../auth/Auth";
export const HomePage = () => {
  const { userData } = useAuth();
  console.log(userData);
  return (
    <div>
      {userData ? (
        <h2>Hello {userData.username} welcome back!</h2>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
};
