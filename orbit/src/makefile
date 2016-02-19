setup:
	@docker build -t huge/orbit .

up:
	@docker run --name="orbit" -d -p 4000:4000 -v $(PWD):/src huge/orbit
