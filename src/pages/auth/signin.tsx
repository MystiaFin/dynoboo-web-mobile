import { useState } from "react";
import EmailIcon from "../../assets/auth/email.svg";
import PasswordIcon from "../../assets/auth/password.svg";

const InputStyle: string =
  "flex bg-white py-3 px-5 font-bold border border-[#FAAC01] rounded-lg mb-8";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      if (res.ok) {
        window.location.href = "/landing";
      } else {
        const data = await res.json();
        alert(data.error || "Failed to sign in");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex justify-center text-gray-600">
        <form>
          <div className={InputStyle}>
            <img src={EmailIcon} className="mr-4" />
            <input
              className="focus:outline-none"
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
            <img src={PasswordIcon} className="mr-4" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Input Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <footer className="flex justify-between items-center mt-6">
        <button className="py-3 px-20 bg-[#FAAC01] rounded-lg font-bold text-xl text-white">
          Sign In
        </button>
      </footer>
    </main>
  );
};

export default SignIn;
