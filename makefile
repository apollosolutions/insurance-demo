include .env

deploy-claims:
	gcloud builds submit --config ./deploy/claims.yaml

deploy-policies:
	gcloud builds submit --config ./deploy/policies.yaml

publish-claims:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
		--schema ./subgraphs/claims/claims.graphql \
		--name claims \
		--routing-url $(CLAIMS_ROUTING_URL)

publish-policyholder:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
		--schema ./subgraphs/policyholder/policyholder.graphql \
		--name policyholder

publish-policies:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph publish $(APOLLO_GRAPH_REF) \
		--schema ./subgraphs/policies/policies.graphql \
		--name policies \
		--routing-url $(POLICIES_ROUTING_URL)

deploy-router:
	gcloud builds submit --substitutions=_APOLLO_KEY=$(APOLLO_KEY),_APOLLO_GRAPH_REF=$(APOLLO_GRAPH_REF) \
	--config ./router/cloudbuild.yaml