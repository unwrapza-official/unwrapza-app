import { useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      await saveUserToFirestore(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#fefefe] relative">
      {/* kleurstreep boven */}
      <div className="w-full h-2.5 flex">
        {[
          "#FFFB84",
          "#84FF96",
          "#84F3FF",
          "#84B9FF",
          "#9084FF",
          "#DC84FF",
          "#FF84F7",
          "#FF787A",
        ].map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }}></div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-6 py-12">
        <h1 className="text-5xl font-bold italic text-gray-900 mb-10 text-center">
          {isRegister ? "Join Unwrapza" : "Welcome back"}
        </h1>

        <form
          onSubmit={handleAuth}
          className="w-full max-w-[500px] flex flex-col gap-5 text-center"
        >
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              className="p-3 px-6 border-2 border-black bg-white text-black font-bold italic rounded-[6px]
                         hover:translate-x-[6px] hover:translate-y-[6px]
                         transition-all duration-300 ease-out active:scale-95 hover:cursor-text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="p-3 px-6 border-2 border-black bg-white text-black font-bold italic rounded-[6px]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95 hover:cursor-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 px-6 border-2 border-black bg-white text-black font-bold italic rounded-[6px]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95 hover:cursor-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 mt-4 p-3 px-6 bg-green border-3 text-black font-bold italic rounded-[6px]
                       shadow-[3px_3px_0_#000000] hover:shadow-[0_0_0_#FFFFFF]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95
                       hover:cursor-pointer ${
                         loading ? "opacity-60 cursor-not-allowed" : ""
                       }`}
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create account"
              : "Continue login"}
          </button>

          <button
            onClick={handleGoogle}
            type="button"
            disabled={loading}
            className={`col-span-2 mt-4 p-3 px-6 bg-white text-black border-3 border-gray-300 font-bold italic rounded-[6px]
                       shadow-[3px_3px_0_#D1D5DB] hover:shadow-[0_0_0_#D1D5DB]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95
                       hover:cursor-pointer flex items-center justify-center gap-2 ${
                         loading ? "opacity-60 cursor-not-allowed" : ""
                       }`}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-6 font-semibold italic">
            {error}
          </p>
        )}

        <p className="mt-8 text-gray-800 text-sm italic">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green font-bold italic hover:underline"
          >
            {isRegister ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
