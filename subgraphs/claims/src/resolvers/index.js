const claims = [
    {
      id: "1",
      status: "Approved",
      amount: 5000.0,
      dateFiled: "2024-01-10",
      policy: { id: "P123" },
      policyholder: { id: "PH456" },
    },
    {
      id: "2",
      status: "Pending",
      amount: 3000.0,
      dateFiled: "2024-02-05",
      policy: { id: "P789" },
      policyholder: { id: "PH123" },
    },
    {
      id: "3",
      status: "Denied",
      amount: 15000.0,
      dateFiled: "2024-03-15",
      policy: { id: "P456" },
      policyholder: { id: "PH789" },
    },
    {
      id: "4",
      status: "Processing",
      amount: 1200.0,
      dateFiled: "2024-04-08",
      policy: { id: "P101" },
      policyholder: { id: "PH321" },
    },
    {
      id: "5",
      status: "Approved",
      amount: 7500.0,
      dateFiled: "2024-05-22",
      policy: { id: "P202" },
      policyholder: { id: "PH654" },
    },
    {
      id: "6",
      status: "Pending",
      amount: 4200.0,
      dateFiled: "2024-06-10",
      policy: { id: "P303" },
      policyholder: { id: "PH987" },
    },
  ];
  
  // Resolvers
const resolvers = {
    Query: {
      claim: (_, { id }) => claims.find((claim) => claim.id === id),
      claimsByPolicy: (_, { policyId }) =>
        claims.filter((claim) => claim.policy.id === policyId),
      claimsByPolicyholder: (_, { policyholderId }) =>
        claims.filter((claim) => claim.policyholder.id === policyholderId),
    },
    Claim: {
      __resolveReference: (claimRef) => claims.find((claimRef) => claim.id === claimRef.id),
      policy: (claim) => ({ id: claim.policy.id }),
      policyholder: (claim) => ({ id: claim.policyholder.id }),
    },
  };

  module.exports = resolvers;