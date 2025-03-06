const policies = [
    { id: "P123", policyNumber: "POL-123", type: "Auto", startDate: "2023-01-01", endDate: "2024-01-01", policyholder: { id: "PH1" } },
    { id: "P789", policyNumber: "POL-789", type: "Home", startDate: "2023-06-01", endDate: "2024-06-01", policyholder: { id: "PH1" } },
    { id: "P160", policyNumber: "POL-160", type: "Life", startDate: "2022-12-01", endDate: "2042-12-01", policyholder: { id: "PH2" } },
    { id: "P150", policyNumber: "POL-150", type: "Umbrella", startDate: "2023-09-15", endDate: "2024-09-15", policyholder: { id: "PH2" } },
    { id: "P140", policyNumber: "POL-140", type: "Auto", startDate: "2023-03-10", endDate: "2024-03-10", policyholder: { id: "PH3" } },
    { id: "P130", policyNumber: "POL-130", type: "Home", startDate: "2023-07-20", endDate: "2024-07-20", policyholder: { id: "PH3" } },
    { id: "P120", policyNumber: "POL-120", type: "Business", startDate: "2023-02-14", endDate: "2024-02-14", policyholder: { id: "PH4" } },
    { id: "P110", policyNumber: "POL-110", type: "Life", startDate: "2021-05-10", endDate: "2051-05-10", policyholder: { id: "PH4" } },
    { id: "P909", policyNumber: "POL-909", type: "Umbrella", startDate: "2024-01-01", endDate: "2025-01-01", policyholder: { id: "PH5" } },
    { id: "P808", policyNumber: "POL-808", type: "Auto", startDate: "2023-11-01", endDate: "2024-11-01", policyholder: { id: "PH5" } },
    { id: "P707", policyNumber: "POL-707", type: "Auto", startDate: "2024-02-01", endDate: "2025-02-01", policyholder: { id: "PH6" } },
    { id: "P404", policyNumber: "POL-404", type: "Home", startDate: "2023-08-01", endDate: "2024-08-01", policyholder: { id: "PH6" } },
    { id: "P606", policyNumber: "POL-606", type: "Life", startDate: "2022-11-15", endDate: "2042-11-15", policyholder: { id: "PH7" } },
    { id: "P505", policyNumber: "POL-505", type: "Umbrella", startDate: "2023-10-10", endDate: "2024-10-10", policyholder: { id: "PH7" } },
    { id: "P303", policyNumber: "POL-303", type: "Business", startDate: "2023-05-05", endDate: "2024-05-05", policyholder: { id: "PH8" } },
    { id: "P202", policyNumber: "POL-202", type: "Auto", startDate: "2024-03-01", endDate: "2025-03-01", policyholder: { id: "PH8" } },
    { id: "P101", policyNumber: "POL-101", type: "Home", startDate: "2023-09-01", endDate: "2024-09-01", policyholder: { id: "PH9" } },
    { id: "P456", policyNumber: "POL-456", type: "Life", startDate: "2022-10-20", endDate: "2042-10-20", policyholder: { id: "PH9" } },
    { id: "P200", policyNumber: "POL-200", type: "Umbrella", startDate: "2023-12-01", endDate: "2024-12-01", policyholder: { id: "PH10" } },
    { id: "P190", policyNumber: "POL-190", type: "Business", startDate: "2023-06-15", endDate: "2024-06-15", policyholder: { id: "PH10" } },
  ];
  
// Resolvers
const resolvers = {
    Query: {
      policy: (_, { id }) => policies.find((policy) => policy.id === id),
      policiesByPolicyholder: (_, { policyholderId }) => policies.filter((policy) => policy.policyholder.id === policyholderId),
    },
    Policy: {
      policyholder: (policy) => ({ id: policy.policyholder.id }),
      __resolveReference: (policyRef) => policies.find((policy) => policy.id === policyRef.id),
    },
  };

  module.exports = resolvers;