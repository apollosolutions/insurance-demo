# workshop-order-api

The Golang Order API for the SE Federation Workshop.  

If building this on an M1 Mac for the GCP Cloud Run deploy, make sure to set `GOOS=linux` and `GOARCH=amd64`.  
To build and deploy the container to cloudrun, use the following command:

```sh
gcloud builds submit \
  --tag gcr.io/federation-workshop/policyholderusersrest-api:0.1
```

To launch the API from the container, run

```sh
gcloud run deploy policy-holder-users-rest \
  --image gcr.io/federation-workshop/policyholderusersrest-api:0.1 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --max-instances=2
```

Alternatively, if using `make` you can run:

```sh
make build deploy run
```

This will run the commands above.
