sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@npm i ghooks && docker build -t huge/orbit .

up:
	@docker run --name="orbit" -d -p 4000:4000 -v $(PWD)/files/orbit:/app/orbit huge/orbit

remake:
	@docker rm -f orbit && docker rmi huge/orbit && make setup

bundle:
	@docker exec orbit npm run bundle

ssh:
	@docker exec -i -t orbit bash

sync-config:
	@docker exec orbit rm package.json webpack.config.js && docker cp package.json orbit:/app/package.json && docker cp files/webpack.config.js orbit:/app/webpack.config.js

jshint:
	@docker exec orbit npm run jshint

jscs:
	@docker exec orbit npm run jscs

jscs-fix:
	@docker exec orbit npm run jscsfix

unit:
	@docker exec orbit npm run unit

integration:
	@docker exec orbit npm run integration

stress:
	@docker exec orbit npm run stress

concurrency:
	@docker exec orbit npm run concurrency

unit-pretty:
	@docker exec orbit npm run unit-pretty

integration-pretty:
	@docker exec orbit npm run integration-pretty

stress-pretty:
	@docker exec orbit npm run stress-pretty

concurrency-pretty:
	@docker exec orbit npm run concurrency-pretty

unit-nyan:
	@docker exec orbit npm run unit-nyan

integration-nyan:
	@docker exec orbit npm run integration-nyan

stress-nyan:
	@docker exec orbit npm run stress-nyan

concurrency-nyan:
	@docker exec orbit npm run concurrency-nyan

unit-coverage:
	@docker exec orbit npm run unit-coverage

integration-coverage:
	@docker exec orbit npm run integration-coverage

cover:
	@docker exec orbit npm run coverage

test:
	@docker exec orbit npm run test

watch:
	@docker exec orbit npm run watch

dev:
	@docker exec orbit npm run dev
