import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-6">
        <h1 className="text-2xl">Hello World</h1>
        <button onClick={handleLogout} className="w-full">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
