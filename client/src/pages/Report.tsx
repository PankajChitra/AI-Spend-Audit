import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Recommendation = {
  tool: string;
  action: string;
  savings: number;
  reason: string;
};

type ReportData = {
  _id?: string;
  monthlySavings: number;
  annualSavings: number;
  summary: string;
  recommendations: Recommendation[];
};

export default function Report() {
  const { id } = useParams();

  const [report, setReport] =
    useState<ReportData | null>(null);

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/audit/${id}`
        );

        setReport(response.data);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleLeadSubmit = async () => {
    try {
      setSubmitting(true);

      await axios.post(
        "http://localhost:5000/api/leads",
        {
          email,
          company,
          role,
          auditId: id,

          // honeypot
          website: "",
        }
      );

      setSubmitted(true);

    } catch (error) {
      console.error(error);
      alert("Failed to save lead");

    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        Report not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 mb-10">

          <p className="uppercase tracking-widest text-sm mb-4">
            Estimated Savings
          </p>

          <h1 className="text-6xl font-bold mb-4">
            ${report.monthlySavings}/mo
          </h1>

          <p className="text-2xl text-gray-100">
            ${report.annualSavings}/year potential savings
          </p>

        </div>

        {/* High Savings CTA */}
        {report.monthlySavings > 500 && (
          <div className="bg-green-600 rounded-2xl p-6 mb-8">

            <h2 className="text-3xl font-bold mb-3">
              Significant Savings Opportunity Detected
            </h2>

            <p className="text-lg">
              Your organization may qualify for
              discounted enterprise AI credits
              through Credex.
            </p>

            <button className="mt-5 bg-white text-black px-5 py-3 rounded-xl font-semibold">
              Book Credex Consultation
            </button>

          </div>
        )}

        {/* Low Savings Honest UX */}
        {report.monthlySavings < 100 && (
          <div className="bg-blue-600 rounded-2xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-2">
              Your AI Spending Looks Efficient
            </h2>

            <p>
              Your current tooling stack already
              appears well-optimized for your
              usage patterns.
            </p>

          </div>
        )}

        {/* AI Summary */}
        <div className="bg-[#131a2a] rounded-2xl p-8 mt-10 border border-indigo-500">

          <h2 className="text-3xl font-bold mb-4">
            Personalized Summary
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            {report.summary}
          </p>

        </div>

        {/* Recommendations */}
        <div className="space-y-6 mt-10">

          {report.recommendations.map(
            (recommendation, index) => (
              <div
                key={index}
                className="bg-[#131a2a] rounded-2xl p-6 border border-gray-800"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Current Tool
                    </p>

                    <h2 className="text-2xl font-bold">
                      {recommendation.tool}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Recommended Action
                    </p>

                    <h3 className="text-xl font-semibold text-green-400">
                      {recommendation.action}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Monthly Savings
                    </p>

                    <h3 className="text-3xl font-bold">
                      ${recommendation.savings}
                    </h3>
                  </div>

                </div>

                <div className="mt-6 border-t border-gray-800 pt-5">
                  <p className="text-gray-300 leading-7">
                    {recommendation.reason}
                  </p>
                </div>

              </div>
            )
          )}

        </div>

        {/* Lead Capture */}
        <div className="bg-[#131a2a] rounded-2xl p-8 mt-10 border border-gray-800">

          <h2 className="text-3xl font-bold mb-4">
            Get Full Audit Report
          </h2>

          <p className="text-gray-400 mb-6">
            Receive future AI cost optimization
            recommendations and updated audit insights.
          </p>

          {!submitted ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  className="p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                />

                <input
                  type="text"
                  placeholder="Role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  className="p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                />

                {/* Honeypot */}
                <input
                  type="text"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

              </div>

              <button
                onClick={handleLeadSubmit}
                disabled={submitting}
                className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
              >
                {submitting
                  ? "Saving..."
                  : "Save Audit Report"}
              </button>
            </>
          ) : (
            <div className="bg-green-600 rounded-xl p-5 mt-4">
              <h3 className="text-2xl font-bold mb-2">
                Audit Saved Successfully
              </h3>

              <p>
                We’ll notify you when new AI cost
                optimization opportunities apply
                to your stack.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}