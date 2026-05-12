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
  const storedReport = localStorage.getItem("audit-report");

  let report: ReportData = {
    monthlySavings: 0,
    annualSavings: 0,
    recommendations: [],
  };

  if (storedReport) {
    report = JSON.parse(storedReport);
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Hero Section */}
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
          {report.recommendations.length > 0 ? (
            report.recommendations.map(
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
            )
          ) : (
            <div className="bg-[#131a2a] rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">
                No Recommendations Found
              </h2>

              <p className="text-gray-400">
                Your current AI tooling setup already looks efficient.
              </p>
            </div>
          )}
        </div>

        {/* AI Summary */}
        <div className="bg-[#131a2a] rounded-2xl p-8 mt-10 border border-indigo-500">
          <h2 className="text-3xl font-bold mb-4">
            Personalized Summary
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            Your current AI tooling stack shows several
            optimization opportunities. Consolidating overlapping
            subscriptions and switching to more cost-efficient
            plans could significantly reduce your annual AI spend
            while preserving productivity and workflow quality.
          </p>
        </div>

      </div>
    </div>
  );
}