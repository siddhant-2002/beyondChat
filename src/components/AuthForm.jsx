import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function AuthForm({ onComplete }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    onComplete();
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      onComplete(user);
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg border border-white/20">
      <h2 className="text-center text-3xl font-bold text-white">
        Welcome to BeyondChats
      </h2>
      <p className="mt-2 text-center text-gray-300">
        Let's get started by setting up your account
      </p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg bg-red-500/20 p-3 text-sm text-red-400 shadow-md">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-300 font-medium">
            Email address
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="w-full rounded-lg bg-white/10 p-3 pl-10 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              className="w-full rounded-lg bg-white/10 p-3 pl-10 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 hover:scale-105 shadow-lg"
        >
          <span>Continue</span>
          <ArrowRight className="ml-2" />
        </button>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-black px-3 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center rounded-lg bg-white/10 p-3 text-white transition hover:bg-white/20 hover:scale-105 shadow-lg"
        >
          <img
            className="h-5 w-5 mr-2"
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
          />
          <span>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}
