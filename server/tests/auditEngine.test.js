const generateAudit =
  require("../utils/auditEngine");

describe("Audit Engine", () => {

  test(
    "detects ChatGPT Team overspending",
    () => {

      const result = generateAudit([
        {
          name: "ChatGPT",
          plan: "team",
          seats: 2,
        },
      ]);

      expect(
        result.monthlySavings
      ).toBe(20);

      expect(
        result.recommendations.length
      ).toBe(1);
    }
  );

  test(
    "detects Claude Max downgrade opportunity",
    () => {

      const result = generateAudit([
        {
          name: "Claude",
          plan: "max",
          seats: 1,
        },
      ]);

      expect(
        result.monthlySavings
      ).toBe(180);
    }
  );

  test(
    "handles efficient stacks",
    () => {

      const result = generateAudit([]);

      expect(
        result.monthlySavings
      ).toBe(0);

      expect(
        result.recommendations.length
      ).toBe(0);
    }
  );

});