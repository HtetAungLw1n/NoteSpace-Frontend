import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { publicAxios } from "../utils/axios";
import { User, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const { data } = await publicAxios.post("/auth/jwt/create/", form);
      const tokens = {
        access: data.access,
        refresh: data.refresh,
      };
      localStorage.setItem("tokens", JSON.stringify(tokens));
      navigate("/");
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.detail) {
        setError(errorData.detail);
      } else {
        setError("Login failed");
      }

      console.error(err.response?.data);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tertiary">
      <div className="bg-secondary rounded-3xl p-12 pt-10 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary">
          Note Space
        </h1>

        <form onSubmit={handleLogin} className="space-y-6 mt-6">
          {/* Error message */}
          {error && (
            <div className="text-red-500 text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="relative">
            {/* Username */}
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="username"
              className="w-full py-4 px-5 h-14 border border-[#03120E] text-lg rounded-lg focus:outline-none placeholder:text-neutral-400 text-tertiary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 px-2">
              <User size={22} />
            </div>
          </div>

          <div className="relative">
            {/* Password */}
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="password"
              className="w-full py-4 px-5 h-14 border border-[#03120E] text-lg rounded-lg focus:outline-none placeholder:text-neutral-400 text-tertiary"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer px-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
            </div>
          </div>

          <div className="text-center">
            <a className="text-lg text-gray-400 hover:text-gray-500 cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center h-14 mt-2 bg-primary text-lg text-white rounded-lg cursor-pointer hover:bg-primary-hover transition-colors focus:outline-none"
          >
            {isLoading ? <div className="loader"></div> : <div>Login</div>}
          </button>
        </form>
      </div>

      <div className="text-center text-secondary text-lg mt-6">
        Haven't registered yet?
        <Link
          to="/register"
          className="text-secondary font-bold pl-2 focus:outline-none"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}

export default Login;
