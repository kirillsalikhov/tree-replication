# README

## Run in production mode

### Setup
Requirements:
- docker, docker compose

Copy the file web/sample.env to web/.env

### Run 
1. ```./integration/bin/main.sh --mod=p up```
2. open browser 'http://localhost:3000'

## Dev

### Setup
Requirements:
- docker, docker compose
- ruby 3.3.6 (MRI)
- node > 20

Inside web folder
1. ```bundle install```
2. ```npm ci```
3. in terminal one (root folder) ```./integration/bin/main.sh up```
4. in terminal two ```bundle exec rake db:setup```

### Run 
1. in terminal one ```./integration/bin/main.sh up```
2. in terminal two (folder web)  ```bundle exec rails s```
3. in terminal three (folder web) ```bundle exec bin/vite dev```
4. open browser 'http://localhost:3000'

### Test

In terminal four (folder web) ```bundle exec rspec```
