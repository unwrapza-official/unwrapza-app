import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import unwrapza from "../assets/unwrapza.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const saveUserToFirestore = async (user, extraData = {}) => {
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || username || "",
        createdAt: new Date(),
        ...extraData,
      });
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (mode === "login") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user);
        navigate("/account")
      } else if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user, { username });
        toast.success("Your account has been created 🎉");
        navigate("/account");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent!");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
      toast.success("Welcome to your account dashboard!")
      navigate("/account");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-[#fefefe]">
      {/* Titel */}
      <Link to="/">
        <img className="hover:cursor-pointer h-[40px]" src={unwrapza} alt="unwrapza" />
      </Link>

      {/* Container */}
      <div className="bg-[#F8F8F8] shadow-md rounded-2xl p-5 w-full max-w-md border border-gray-100">
        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          {/* Dynamisch formulier */}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                placeholder="Your username"
                className="w-full p-2.5 border font-semibold border-[#50B68B] bg-white rounded-md outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-1">E-Mail</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-2.5 border font-semibold border-[#50B68B] bg-white rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="w-full p-2.5 border font-semibold border-[#50B68B] bg-white rounded-md outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#50B68B] hover:bg-green-700 text-white font-semibold py-2 px-10 rounded-md transition"
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Login"
                : mode === "register"
                ? "Create account"
                : "Send reset link"}
            </button>

            {mode === "login" && (
              <p
                className="text-sm text-gray-500 cursor-pointer hover:underline"
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </p>
            )}
          </div>

          {mode === "login" && (
            <>
              <div className="flex items-center gap-2 my-3">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="text-xs text-gray-400">Or sign up with</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGoogle}
                  type="button"
                  className="bg-white hover:bg-gray-200 px-11 border-[#D9D9D9] border-1 py-3 rounded-md"
                >
                  <FcGoogle className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </form>

        {/* Fout- of succesmelding */}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}

        {/* Footer */}
        <div className="bg-gray-100 p-3 mt-6 rounded-b-2xl text-center">
          {mode === "login" && (
            <p className="text-sm text-gray-700">
              No account yet?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-black font-semibold hover:underline"
              >
                Register
              </button>
            </p>
          )}

          {mode === "register" && (
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-black font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          )}

          {mode === "forgot" && (
            <p className="text-sm text-gray-700">
              Back to{" "}
              <button
                onClick={() => setMode("login")}
                className="text-black font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
