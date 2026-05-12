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
  monthlySavings: number;
  annualSavings: number;
  recommendations: Recommendation[];
};

export default function Report() {
  const { id } = useParams();

  const [report, setReport] =
    useState<ReportData | null>(null);

  const [loading, setLoading] = useState(true);

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

        {/* Recommendations */}
        <div className="space-y-6">
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

      </div>
    </div>
  );
}