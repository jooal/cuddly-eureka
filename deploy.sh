export VERSION=<some_version>
export REPO=<some_repo_name>
export USERNAME=<dockerhub_username>
docker build -t $REPO:$VERSION .
docker tag $REPO:$VERSION $USERNAME/$REPO:$VERSION
docker push $USERNAME/$REPO:$VERSION