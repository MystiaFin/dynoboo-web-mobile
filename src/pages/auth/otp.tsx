import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const OTP_LENGTH = 4;

const OTPpage = () => {
  const [otpDigits, setOtpDigits] = useState<string[]>(
    Array(OTP_LENGTH).fill(""),
  );
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (!storedEmail) {
      navigate("/signup");
      return;
    }

    setEmail(storedEmail);
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
    inputRefs.current[0]?.focus();
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedDigits = [...otpDigits];
    updatedDigits[index] = value.slice(0, 1);
    setOtpDigits(updatedDigits);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        const updatedDigits = [...otpDigits];
        updatedDigits[index - 1] = "";
        setOtpDigits(updatedDigits);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").trim();

    if (!/^\d+$/.test(pasted)) return;

    const updatedDigits = [...otpDigits];
    for (let i = 0; i < Math.min(pasted.length, OTP_LENGTH); i++) {
      updatedDigits[i] = pasted[i];
    }
    setOtpDigits(updatedDigits);

    const nextIndex = updatedDigits.findIndex((digit) => !digit);
    const focusIndex = nextIndex === -1 ? OTP_LENGTH - 1 : nextIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpNumber = otpDigits.join("");

    if (otpNumber.length !== OTP_LENGTH) {
      setError("Please enter all digits");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/users/verify-otp`;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpNumber }),
      });

      if (res.ok) {
        navigate("/landing");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to verify OTP");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Verification Code
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please enter the 4-digit code sent to your email
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el: HTMLInputElement | null) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-14 border-2 rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 transition-all
                ${error ? "border-red-400 focus:ring-red-300" : digit ? "border-green-500 focus:ring-green-400" : "border-gray-300 focus:ring-yellow-400"}`}
              aria-label={`Digit ${index + 1} of verification code`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-bold text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          disabled={otpDigits.some((digit) => !digit)}
        >
          Verify Code
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-yellow-600 hover:text-yellow-700 font-medium"
            onClick={() => {
              alert("Resend OTP functionality would go here");
            }}
          >
            Didn't receive a code? Resend
          </button>
        </div>
      </div>
    </main>
  );
};

export default OTPpage;
