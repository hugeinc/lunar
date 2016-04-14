sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@npm install -g commitizen && npm i ghooks cz-conventional-changelog validate-commit-message && docker build -t huge/lunar .

up:
	@docker run --name="lunar" -d -p 4000:4000 -v $(PWD):/app huge/lunar

remake:
	@docker rm -f lunar && docker rmi huge/lunar && make setup && make up

bundle:
	@docker exec lunar npm run bundle

ssh:
	@docker exec -i -t lunar bash

jshint:
	@docker exec lunar npm run jshint

jscs:
	@docker exec lunar npm run jscs

jscs-fix:
	@docker exec lunar npm run jscsfix

unit:
	@docker exec lunar npm run unit

integration:
	@docker exec lunar npm run integration

stress:
	@docker exec lunar npm run stress

concurrency:
	@docker exec lunar npm run concurrency

unit-pretty:
	@docker exec lunar npm run unit-pretty

integration-pretty:
	@docker exec lunar npm run integration-pretty

stress-pretty:
	@docker exec lunar npm run stress-pretty

concurrency-pretty:
	@docker exec lunar npm run concurrency-pretty

unit-nyan:
	@docker exec lunar npm run unit-nyan

integration-nyan:
	@docker exec lunar npm run integration-nyan

stress-nyan:
	@docker exec lunar npm run stress-nyan

concurrency-nyan:
	@docker exec lunar npm run concurrency-nyan

unit-coverage:
	@docker exec lunar npm run unit-coverage

integration-coverage:
	@docker exec lunar npm run integration-coverage

cover:
	@docker exec lunar npm run coverage

test:
	@docker exec lunar npm run test

ci-test:
	@docker exec lunar npm run ci-test

watch:
	@docker exec lunar npm run watch

dev:
	@docker exec lunar npm run dev
