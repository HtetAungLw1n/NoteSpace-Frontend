import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { publicAxios } from "../utils/axios";
import { User, Mail, EyeOff, Eye } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.re_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await publicAxios.post("/auth/users/", form);
      navigate("/login");
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.username) {
        setError(`Username: ${errorData.username[0]}`);
      } else if (errorData?.email) {
        setError(`Email: ${errorData.email[0]}`);
      } else if (errorData?.password) {
        setError(`Password: ${errorData.password[0]}`);
      } else if (errorData?.non_field_errors) {
        setError(errorData.non_field_errors[0]);
      } else {
        setError("Registration failed");
      }

      console.error(err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tertiary">
      <div className="bg-secondary rounded-3xl p-12 pt-10 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary">
          Note Space
        </h1>

        <form onSubmit={handleRegister} className="space-y-6 mt-6">
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
            {/* Email */}
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email"
              className="w-full py-4 px-5 h-14 border border-[#03120E] text-lg rounded-lg focus:outline-none placeholder:text-neutral-400 text-tertiary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 px-2">
              <Mail size={22} />
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 cursor-pointer px-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
            </div>
          </div>

          <div className="relative">
            {/* Confirm Password */}
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={form.re_password}
              onChange={(e) =>
                setForm({ ...form, re_password: e.target.value })
              }
              placeholder="confirm password"
              className="w-full py-4 px-5 h-14 border border-[#03120E] text-lg rounded-lg focus:outline-none placeholder:text-neutral-400 text-tertiary"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 cursor-pointer px-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={22} /> : <EyeOff size={22} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14  flex justify-center items-center mt-3 bg-primary text-lg text-white rounded-lg cursor-pointer hover:bg-primary-hover transition-colors focus:outline-none"
          >
            {isLoading ? <div className="loader"></div> : <div>Register</div>}
          </button>
        </form>
      </div>

      <div className="text-center text-secondary text-lg mt-6">
        Already have an account?
        <Link to="/login" className="text-secondary font-bold pl-2">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Register;
