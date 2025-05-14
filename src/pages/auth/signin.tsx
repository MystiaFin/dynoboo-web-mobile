import { useState } from "react";
import EmailIcon from "../../assets/auth/email.svg";
import PasswordIcon from "../../assets/auth/password.svg";

const InputStyle: string =
  "flex bg-white py-3 px-5 font-bold border border-[#FAAC01] rounded-lg mb-8";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/landing";
      } else {
        setError(data.error || "Failed to sign in");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex justify-center text-gray-600">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className={InputStyle}>
            <img src={EmailIcon} className="mr-4" alt="Email" />
            <input
              className="focus:outline-none w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Input Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={InputStyle}>
            <img src={PasswordIcon} className="mr-4" alt="Password" />
            <input
              className="focus:outline-none w-full"
              type="password"
              id="password"
              name="password"
              placeholder="Input Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <footer className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="py-3 px-20 bg-[#FAAC01] rounded-lg font-bold text-xl text-white"
            >
              Sign In
            </button>
          </footer>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
