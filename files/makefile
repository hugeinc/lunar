sdocker:
	@bash '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'

setup:
	@docker build -t huge/orbit .

up:
	@docker run --name="orbit" -d -p 4000:4000 -v $(PWD)/orbit:/app/orbit huge/orbit

remake:
	@docker rm -f orbit && docker rmi huge/orbit && make setup

bundle:
	@docker exec orbit npm start	

ssh:
	@docker exec -i -t orbit bash

sync-config:
	@docker exec orbit rm package.json webpack.config.js && docker cp package.json orbit:/app/package.json && docker cp webpack.config.js orbit:/app/webpack.config.js

unit:
	@docker exec orbit npm run unit

integration:
	@docker exec orbit npm run integration
