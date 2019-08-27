TAG=latest
IMAGE_NAME=ubuntu

DOCKER_IMAGE=${IMAGE_NAME}:${TAG}

.PHONY: build

build:
	docker build . -t ${DOCKER_IMAGE} --no-cache

run:
	docker run -it -p 8080:8080 ${DOCKER_IMAGE}