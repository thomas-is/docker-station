#!/bin/sh

DOCKER=$( cat /etc/group | grep ^docker | cut -d: -f3 )

if [ "$DOCKER" = "" ] ; then
  echo "docker not found in /etc/group"
  exit 1
fi

docker run --rm -it \
  --name station \
  -v $(pwd)/ng.conf:/etc/nginx/conf.d/default.conf \
  -v $(pwd)/srv:/srv \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e PHP_UID=$DOCKER \
  -e PHP_GID=$DOCKER \
  -p 8080:80 \
  0lfi/ng-php7:arm32v7
