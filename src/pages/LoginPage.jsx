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

const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/account");
      } else if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, { uid: userCredential.user.uid, email, displayName: username, createdAt: new Date() });
        navigate("/account");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Check your inbox for a reset link.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your details.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/">
            <img className="h-8" src={unwrapza} alt="unwrapza" />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            {mode === "login" ? "Sign in to Unwrapza" : mode === "register" ? "Create an account" : "Reset password"}
          </h1>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === "register" && (
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full h-11 px-4 border border-gray-200 focus:border-[#44A77D] focus:ring-1 focus:ring-[#44A77D] rounded-xl outline-none transition-all font-medium text-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full h-11 px-4 border border-gray-200 focus:border-[#44A77D] focus:ring-1 focus:ring-[#44A77D] rounded-xl outline-none transition-all font-medium text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode !== "forgot" && (
            <input
              type="password"
              placeholder="Password"
              className="w-full h-11 px-4 border border-gray-200 focus:border-[#44A77D] focus:ring-1 focus:ring-[#44A77D] rounded-xl outline-none transition-all font-medium text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs font-bold text-[#44A77D] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#44A77D] hover:bg-[#3b936d] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : mode === "register" ? "Sign up" : "Reset"}
          </button>

          {mode === "login" && (
            <button
              onClick={() => signInWithPopup(auth, googleProvider).then(() => navigate("/account"))}
              type="button"
              className="w-full h-11 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all font-bold text-gray-700 mt-4"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          )}
        </form>

        {/* Error/Success Messages */}
        {(error || message) && (
          <p className={`mt-6 text-sm text-center font-medium ${error ? "text-red-500" : "text-green-600"}`}>
            {error || message}
          </p>
        )}

        {/* Footer Toggle */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            {mode === "login" ? "New here?" : "Already a member?"}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="ml-2 text-gray-900 font-bold hover:text-[#44A77D] transition-colors"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;