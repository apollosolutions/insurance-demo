const { GraphQLScalarType, Kind } = require('graphql');

let claims = [
  {
      "id": "c1",
      "status": "Approved",
      "amount": 5000.0,
      "dateFiled": "2024-01-10",
      "policy": { "id": "P123" },
      "policyholder": { "id": "PH1" }
  },
  {
      "id": "c2",
      "status": "Pending",
      "amount": 3000.0,
      "dateFiled": "2024-02-05",
      "policy": { "id": "P789" },
      "policyholder": { "id": "PH1" }
  },
  {
      "id": "c3",
      "status": "Denied",
      "amount": 15000.0,
      "dateFiled": "2024-03-15",
      "policy": { "id": "P456" },
      "policyholder": { "id": "PH9" }
  },
  {
      "id": "c4",
      "status": "Processing",
      "amount": 1200.0,
      "dateFiled": "2024-04-08",
      "policy": { "id": "P101" },
      "policyholder": { "id": "PH9" }
  },
  {
      "id": "c5",
      "status": "Approved",
      "amount": 7500.0,
      "dateFiled": "2024-05-22",
      "policy": { "id": "P202" },
      "policyholder": { "id": "PH8" }
  },
  {
      "id": "c6",
      "status": "Pending",
      "amount": 4200.0,
      "dateFiled": "2024-06-10",
      "policy": { "id": "P303" },
      "policyholder": { "id": "PH8" }
  },
  {
      "id": "c201",
      "status": "Approved",
      "amount": 6000.0,
      "dateFiled": "2024-07-01",
      "policy": { "id": "P404" },
      "policyholder": { "id": "PH7" }
  },
  {
      "id": "c202",
      "status": "Processing",
      "amount": 2500.0,
      "dateFiled": "2024-07-15",
      "policy": { "id": "P505" },
      "policyholder": { "id": "PH6" }
  },
  {
      "id": "c203",
      "status": "Denied",
      "amount": 10000.0,
      "dateFiled": "2024-08-02",
      "policy": { "id": "P606" },
      "policyholder": { "id": "PH7" }
  },
  {
      "id": "c204",
      "status": "Approved",
      "amount": 8000.0,
      "dateFiled": "2024-08-20",
      "policy": { "id": "P707" },
      "policyholder": { "id": "PH6" }
  },
  {
      "id": "c205",
      "status": "Pending",
      "amount": 3800.0,
      "dateFiled": "2024-09-10",
      "policy": { "id": "P808" },
      "policyholder": { "id": "PH5" }
  },
  {
      "id": "c206",
      "status": "Processing",
      "amount": 1800.0,
      "dateFiled": "2024-09-25",
      "policy": { "id": "P909" },
      "policyholder": { "id": "PH5" }
  },
  {
      "id": "c207",
      "status": "Denied",
      "amount": 12000.0,
      "dateFiled": "2024-10-05",
      "policy": { "id": "P110" },
      "policyholder": { "id": "PH4" }
  },
  {
      "id": "c208",
      "status": "Approved",
      "amount": 9500.0,
      "dateFiled": "2024-10-22",
      "policy": { "id": "P120" },
      "policyholder": { "id": "PH4" }
  },
  {
      "id": "c209",
      "status": "Pending",
      "amount": 4500.0,
      "dateFiled": "2024-11-12",
      "policy": { "id": "P130" },
      "policyholder": { "id": "PH3" }
  },
  {
      "id": "c210",
      "status": "Processing",
      "amount": 2200.0,
      "dateFiled": "2024-11-28",
      "policy": { "id": "P140" },
      "policyholder": { "id": "PH3" }
  },
      {
      "id": "c211",
      "status": "Approved",
      "amount": 7000.0,
      "dateFiled": "2024-12-03",
      "policy": { "id": "P150" },
      "policyholder": { "id": "PH2" }
  },
  {
      "id": "c212",
      "status": "Denied",
      "amount": 11000.0,
      "dateFiled": "2024-12-18",
      "policy": { "id": "P160" },
      "policyholder": { "id": "PH2" }
  },
  {
      "id": "c213",
      "status": "Pending",
      "amount": 3500.0,
      "dateFiled": "2025-01-08",
      "policy": { "id": "P170" },
      "policyholder": { "id": "PH1313" }
  },
  {
      "id": "c214",
      "status": "Processing",
      "amount": 1900.0,
      "dateFiled": "2025-01-25",
      "policy": { "id": "P180" },
      "policyholder": { "id": "PH1414" }
  },
  {
      "id": "c215",
      "status": "Approved",
      "amount": 5500.0,
      "dateFiled": "2025-02-01",
      "policy": { "id": "P190" },
      "policyholder": { "id": "PH10" }
  },
  {
      "id": "c216",
      "status": "Denied",
      "amount": 9000.0,
      "dateFiled": "2025-02-15",
      "policy": { "id": "P200" },
      "policyholder": { "id": "PH10" }
  },
];

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString(); // Convert outgoing Date to integer for JSON
    }
    if (typeof value === 'string') {
      return new Date(value).toISOString(); 
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    if (typeof value === 'string') {
      return new Date(value); // Convert incoming string to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
  // Resolvers
const resolvers = {
    Date: dateScalar,
    Query: {
      claim: (_, { id }) => claims.find((claim) => claim.id === id),
      claimsByPolicy: (_, { policyId }) =>
        claims.filter((claim) => claim.policy.id === policyId),
      claimsByPolicyholder: (_, { policyholderId }) =>
        claims.filter((claim) => claim.policyholder.id === policyholderId),
    },
    Mutation: {
        createClaim: (_, { policyId, policyholderId, amount, dateFiled }) => {
          const newClaim = {
            id: (Math.floor(Math.random() * 101)).toString(), // Generate a unique claim ID
            status: "Pending", // Default status for a new claim
            amount,
            dateFiled,
            policy: { id: policyId }, // Associate with policy
            policyholder: { id: policyholderId }, // Associate with policyholder
          };
    
          claims.push(newClaim); // Add to in-memory storage
          return newClaim;
        },
      },
    Claim: {
      __resolveReference: (claimRef) => claims.find((claim) => claim.id === claimRef.id),
      policy: (claim) => ({ id: claim.policy.id }),
      policyholder: (claim) => ({ id: claim.policyholder.id }),
    },
  };

  module.exports = resolvers;