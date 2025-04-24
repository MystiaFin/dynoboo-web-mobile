import { useState } from "react";
import { useNavigate } from "react-router";
import EmailIcon from "../../assets/auth/email.svg";
import PasswordIcon from "../../assets/auth/password.svg";
import ConfirmIcon from "../../assets/auth/confirm.svg";

const InputStyle: string =
  "flex bg-white py-3 px-5 font-bold border border-[#FAAC01] rounded-lg mb-6";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.ok) {
        sessionStorage.setItem("email", email);
        navigate("/userauth");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to register");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex justify-center text-gray-600">
        <form onSubmit={handleSubmit}>
          <div className={InputStyle}>
            <img src={EmailIcon} className="mr-4" />
            <input
              className="focus:outline-none"
              type="email"
              placeholder="Input Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={InputStyle}>
            <img src={PasswordIcon} className="mr-4" />
            <input
              type="password"
              placeholder="Input Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={InputStyle}>
            <img src={ConfirmIcon} className="mr-4" />
            <input
              type="password"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 px-20 bg-[#FAAC01] rounded-lg font-bold text-xl text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
