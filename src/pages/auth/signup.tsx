import EmailIcon from "../../assets/auth/email.svg";
import PasswordIcon from "../../assets/auth/password.svg";
import ConfirmIcon from "../../assets/auth/confirm.svg";

const InputStyle: string =
  "flex bg-white py-3 px-5 font-bold border border-[#FAAC01] rounded-lg mb-6";

const SignUp = () => {
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
              required
            />
          </div>
          <div className={InputStyle}>
            <img src={ConfirmIcon} className="mr-4" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Confirm Your Password"
              required
            />
          </div>
        </form>
      </div>
      <footer className="flex justify-between items-center mt-2">
        <button className="py-3 px-20 bg-[#FAAC01] rounded-lg font-bold text-xl text-white">
          Sign In
        </button>
      </footer>
    </main>
  );
};

export default SignUp;
