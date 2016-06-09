install: # run linting.
	rm -rf node_modules && npm install

lint: # run linting.
	./node_modules/.bin/eslint ./
