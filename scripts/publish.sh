#!/bin/bash
# A script to automate the process of building, tagging, and publishing
# the current branch to DockerHub

echo 'Building the project'
npm run build
echo 'Building a Docker image'
npm run build-docker
echo 'Logging into Docker Hub'
docker login

# TODO: Check output for "Login Succeeded" and bail if not found
IMAGEID=$(docker images deciphernow/gm-fabric-dashboard:latest --format "{{.ID}}")

# TODO: Accept optional versioned tag
# docker tag 0566e9ea8bed deciphernow/gm-fabric-dashboard:0.6.0

echo "Are you sure you want to publishing $IMAGEID to Docker Hub as latest"
read -p "Are you sure? " -n 1 -r
if [[ "$REPLY" =~ ^[Yy]$ ]]; then
  docker push deciphernow/gm-fabric-dashboard
fi
