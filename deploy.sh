docker build -t levonsargsyan1990/multi-client:latest -t levonsargsyan1990/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t levonsargsyan1990/multi-server:latest -t levonsargsyan1990/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t levonsargsyan1990/multi-worker:latest -t levonsargsyan1990/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push levonsargsyan1990/multi-client:latest
docker push levonsargsyan1990/multi-server:latest
docker push levonsargsyan1990/multi-worker:latest
docker push levonsargsyan1990/multi-client:$SHA
docker push levonsargsyan1990/multi-server:$SHA
docker push levonsargsyan1990/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/client-deployment client=levonsargsyan1990/multi-client:$SHA
kubectl set image deployments/server-deployment server=levonsargsyan1990/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=levonsargsyan1990/multi-worker:$SHA