import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-bold mb-6">
          Stop Overspending on AI Tools
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Audit your AI stack instantly and discover cheaper plans,
          better alternatives, and hidden savings.
        </p>

        <Link
          to="/audit"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Start Free Audit
        </Link>
      </div>
    </div>
  );
}