# One-time setup: NGINX Ingress Controller (Docker Desktop Kubernetes)
$ErrorActionPreference = "Stop"

$manifestUrl =
  "https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.3/deploy/static/provider/cloud/deploy.yaml"

Write-Host "Applying ingress-nginx manifest..."
kubectl apply -f $manifestUrl

Write-Host "Waiting for ingress-nginx controller..."
kubectl wait --namespace ingress-nginx `
  --for=condition=ready pod `
  --selector=app.kubernetes.io/component=controller `
  --timeout=180s

Write-Host ""
Write-Host "Done. Start the app from repo root: skaffold dev"
Write-Host "Then open: http://ticketing.com/api/users/currentuser"
Write-Host "(Use http, not https, unless you add TLS to the ingress.)"
