# TripSorter

This project requires Node to be installed in order to build and run the application.

Please run the following commands to get started:

1. Install bower, grunt-cli and http-server
-> npm install -g bower, grunt-cli, http-server

2. Install project dependent npm packages
-> npm install

3. Install project dependent bower components
-> bower install

4. Build application in development mode
-> grunt

5. Run the application in development mode
-> http-server -p 8888 -c-1 -o

Development project will be available on http://localhost:8888/src/ with the above server details

6. Build application for distribution
-> grunt dist --force

7. Run the application in distribution mode
-> http-server -p 8888 -c-1 -o

Distribution project will be available on http://localhost:8888/compiled/tripSorter/ with the above server details