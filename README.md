# TripSorter

### Introduction

Simple Web App to find the shortest/ cheapest path to travel from one city to another

### Getting Started

This project requires Node to be installed in order to build and run the application.

Please run the following commands to get started:

1. Install bower, grunt-cli and http-server
```-> npm install -g bower grunt-cli http-server```

2. Install project dependent npm packages
```-> npm install```

3. Install project dependent bower components
```-> bower install```

4. Build application in development mode
```-> grunt```

5. Run the application in development mode
```-> http-server -p 8888 -c-1 -o```

Development project will be available on http://localhost:8888/src/ with the above server details

6. Build application for distribution
```-> grunt dist --force```

7. Run the application in distribution mode
```-> http-server -p 8888 -c-1 -o```

Distribution project will be available on http://localhost:8888/compiled/tripSorter/ with the above server details

### Technical Details

#### Backbone JS

For structuring the web application in MVVM format

#### Underscore JS

Provides utilies for manipulating Collections, Arrays, Objects, Functions and much more

#### React JS

Reusable templating integrated along with Backbone JS

#### Bootstrap

CSS and Javascript Frontend Framework

#### LESS

CSS Preprocessors for smarter stylesheets

#### Require JS

Script loader to improve speed and quality of code

#### Font Awesome

Fonts and Icons toolkit

#### Moment JS

Dates parser, manipulator, validator and formatter.

#### Q JS

Promise library

#### Amplify JS

Client Side Component Communication and Client Side Browser & Mobile Device Storage

#### Noty JS

Notification Library

#### Graph JS

Dijkstra's algorithm implementation for finding the shortest route points

#### Grunt JS

Javascript automated task runner to perform frequent tasks such as minification, compilation, unit testing, and linting
