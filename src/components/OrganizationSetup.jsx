import React, { useState } from "react";
import { Building2, Globe, FileText, ArrowRight } from "lucide-react";

export function OrganizationSetup({ onComplete }) {
  const [org, setOrg] = useState({
    name: "",
    website: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!org.name || !org.website || !org.description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      new URL(org.website);
      onComplete(org);
    } catch {
      setError("Please enter a valid website URL");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg border border-white/20">
      <h2 className="text-center text-3xl font-bold text-white">
        Organization Setup
      </h2>
      <p className="mt-2 text-center text-gray-300">
        Tell us about your company to personalize your chatbot
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="company-name" className="form-label text-gray-300">
            Company name
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="company-name"
              required
              className="form-input w-full pl-10 bg-gray-800 text-white border border-gray-600 rounded-lg p-2"
              placeholder="Acme Inc."
              value={org.name}
              onChange={(e) => setOrg({ ...org, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="website" className="form-label text-gray-300">
            Website URL
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              required
              className="form-input w-full pl-10 bg-gray-800 text-white border border-gray-600 rounded-lg p-2"
              placeholder="https://example.com"
              value={org.website}
              onChange={(e) => setOrg({ ...org, website: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="form-label text-gray-300">
            Company description
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute  flex items-center pl-3 pt-2">
              <FileText className=" text-gray-400" />
            </div>
            <textarea
              id="description"
              required
              rows={4}
              className="form-input w-full pl-10 bg-gray-800 text-white border border-gray-600 rounded-lg p-2 focus:ring focus:ring-blue-500"
              placeholder="Tell us about your company..."
              value={org.description}
              onChange={(e) => setOrg({ ...org, description: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 hover:scale-105 shadow-lg"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
