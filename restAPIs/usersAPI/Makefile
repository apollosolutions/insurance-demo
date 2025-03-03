
build:
	GOOS=linux GOARCH=amd64 go build -o server

deploy:
	gcloud builds submit \
		--tag gcr.io/federation-workshop/rest-api:0.1

run:
	gcloud run deploy rest-api \
		--image gcr.io/federation-workshop/rest-api:0.1 \
		--platform managed \
		--region us-central1 \
		--allow-unauthenticated \
		--max-instances=2
