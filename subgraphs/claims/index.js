const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");

const resolvers = require("./resolvers");
const port = process.env.PORT ?? 4002;
const subgraphName = require("../package.json").name;

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
  

async function main() {
  const typeDefs = gql(
    readFileSync("claims.graphql", {
      encoding: "utf-8",
    })
  );
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `In a new terminal, run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
  );
}

main();