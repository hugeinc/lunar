setup:
	@docker build -t huge/orbit .

up:
	@docker run --name="orbit" -d -p 4000:4000 -v $(PWD)/orbit:/app/orbit huge/orbit

remake:
	@docker rm -f orbit && docker rmi huge/orbit && make setup

ssh:
	@docker exec -i -t orbit bash