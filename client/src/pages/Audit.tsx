import axios from "axios";
import API_URL from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TOOL_OPTIONS = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
  "Windsurf",
];
export default function Audit() {

  const navigate = useNavigate();

  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("coding");

  const [tools, setTools] = useState([
    {
      name: "ChatGPT",
      plan: "",
      monthlySpend: "",
      seats: 1,
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("audit-form");

    if (saved) {
      const parsed = JSON.parse(saved);

      setTeamSize(parsed.teamSize);
      setUseCase(parsed.useCase);
      setTools(parsed.tools);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify({
        teamSize,
        useCase,
        tools,
      })
    );
  }, [teamSize, useCase, tools]);

  const updateTool = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...tools];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        name: "Cursor",
        plan: "",
        monthlySpend: "",
        seats: 1,
      },
    ]);
  };

  const removeTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/audit`,
      {
        teamSize,
        useCase,
        tools,
      }
    );

    localStorage.setItem(
      "audit-report",
      JSON.stringify(response.data)
    );

    navigate(`/report/${response.data._id}`);
  } catch (error) {
    console.error(error);
    alert("Failed to generate audit");
  }
};
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 mb-10">
          Analyze your AI stack and discover savings instantly.
        </p>

        <div className="bg-[#131a2a] rounded-2xl p-6 mb-8">
          <label className="block mb-3 font-medium">
            Team Size
          </label>

          <input
            type="number"
            value={teamSize}
            onChange={(e) =>
              setTeamSize(Number(e.target.value))
            }
            className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
          />
        </div>

        <div className="bg-[#131a2a] rounded-2xl p-6 mb-8">
          <label className="block mb-3 font-medium">
            Primary Use Case
          </label>

          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="space-y-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#131a2a] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Tool #{index + 1}
                </h2>

                {tools.length > 1 && (
                  <button
                    onClick={() => removeTool(index)}
                    className="text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2">
                    Tool
                  </label>

                  <select
                    value={tool.name}
                    onChange={(e) =>
                      updateTool(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                  >
                    {TOOL_OPTIONS.map((option) => (
                      <option key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">
                    Plan
                  </label>

                  <input
                    type="text"
                    value={tool.plan}
                    onChange={(e) =>
                      updateTool(
                        index,
                        "plan",
                        e.target.value
                      )
                    }
                    placeholder="Pro / Team / Enterprise"
                    className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Monthly Spend ($)
                  </label>

                  <input
                    type="number"
                    value={tool.monthlySpend}
                    onChange={(e) =>
                      updateTool(
                        index,
                        "monthlySpend",
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Seats
                  </label>

                  <input
                    type="number"
                    value={tool.seats}
                    onChange={(e) =>
                      updateTool(
                        index,
                        "seats",
                        Number(e.target.value)
                      )
                    }
                    className="w-full p-3 rounded-lg bg-[#1b2235] border border-gray-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addTool}
            className="bg-[#1b2235] px-5 py-3 rounded-xl"
          >
            Add Tool
          </button>

          <button
            onClick={handleSubmit}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Generate Audit
          </button>
        </div>
      </div>
    </div>
  );
}