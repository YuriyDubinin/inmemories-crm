build:
	docker build -t inmemories-cms .
run: 
	docker run -d -p 3000:3000 -e PORT=3000 --rm --name inmemories-cms-container
stop:
	docker stop inmemories-cms-container