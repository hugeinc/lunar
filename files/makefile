sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@docker build -t huge/orbit .

up:
	@docker run --name="orbit" -d -p 4000:4000 -v $(PWD)/orbit:/app/orbit huge/orbit

remake:
	@docker rm -f orbit && docker rmi huge/orbit && make setup

bundle:
	@docker exec orbit npm run bundle

ssh:
	@docker exec -i -t orbit bash

sync-config:
	@docker exec orbit rm package.json webpack.config.js && docker cp package.json orbit:/app/package.json && docker cp webpack.config.js orbit:/app/webpack.config.js

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

unit-pretty:
	@docker exec orbit npm run unit-pretty

integration-pretty:
	@docker exec orbit npm run integration-pretty

unit-diff:
	@docker exec orbit npm run unit-diff

integration-diff:
	@docker exec orbit npm run integration-diff

unit-nyan:
	@docker exec orbit npm run unit-nyan

integration-nyan:
	@docker exec orbit npm run integration-nyan

unit-coverage:
	@docker exec orbit npm run unit-coverage
