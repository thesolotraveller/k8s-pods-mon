Contents
--------

A hello world react electron app code in `src`
Electron window initiator file -> `index.js`
Kubernetes deployment file -> `k8-deployment.yaml`
Docker files used for pushing to dockerise -> `Dockerfile`

Commands:

On a running kubernetes kluster with metrics server enabled execute,
`kubectl apply -f k8-deployment.yaml`

This will create a pod for the client app and navigate to `127.0.0.1:32767` or `localhost:32767`
on your local machine to see it working