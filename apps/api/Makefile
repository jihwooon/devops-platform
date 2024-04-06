ARCH=amd64
IMG_TAG="latest"

all:
	cat ./Makefile

test:
	pnpm run test

node:
	pnpm install --frozen-lockfile
	pnpm run build

image: Dockerfile node docker build --platform=linux/${ARCH} --tab ${IMG_TAB} .
