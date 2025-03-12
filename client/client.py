import random, sys, os

from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

HOST_NAME = "https://insurance-router-823878303408.us-east1.run.app/"

def run_client():
    client_name = [
        "iOS",
        "Web",
        "Android",
    ]

    versions = ['1.0', '1.1', '1.2']

    host = HOST_NAME
    if len(sys.argv) > 1:
        host = sys.argv[1]
    host = os.environ.get("GATEWAY_URL", host)

    # Select your transport with a defined url endpoint
    transport = RequestsHTTPTransport(
        url=host, 
        headers={
            'apollographql-client-name': random.choice(client_name),
            'apollographql-client-version': random.choice(versions)
        }, verify=True, retries=3,
    )
    # Create a GraphQL client using the defined transport
    client = Client(transport=transport, fetch_schema_from_transport=False)

    queries = [
    gql("query Policy { policy(id: \"P123\") { policyNumber, endDate, type } }"),
    gql("query Claim { claim(id: \"c1\") {dateFiled, status, amount } } "),
    gql("query PolicyHoldersWithClaims { policyHolders { firstName, lastName, phoneNumber, emailAddress, dateOfBirth, policies { policyNumber, endDate, type } } }"),
    gql("query PolicyHoldersWithClaims { policyHolders { firstName, lastName, phoneNumber, emailAddress, dateOfBirth, claims { amount, dateFiled, status } } }"),
    gql("query PolicyHoldersBasic { policyHolders { firstName, lastName, phoneNumber, emailAddress, dateOfBirth}}"),
    ]

    for i in range(random.randint(50,100)):
        # Provide a GraphQL query
        query = random.choice(queries)
        # Execute the query on the transport
        result = client.execute(query)

if __name__=="__main__":
    run_client()
