build:
	docker build -t inmemories-crm .
run: 
	docker run -d -p 3000:3000 -e PORT=3000 --rm --name inmemories-crm-container
stop:
	docker stop inmemories-crm-container