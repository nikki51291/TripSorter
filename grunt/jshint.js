module.exports = {
  options: {
    smarttabs: true,
    loopfunc: true,
    shadow: true,
    browser: true,
//    jshintrc: true,
    esversion: 6,
    globals: {
      define: true,
      require: true,
//      module: true,
      console: true,
      esversion: 6
    }
  },
  
  development: [ '<%= srcLocation %>/scripts/**/*js',
				 '<%= srcLocation %>/models/**/*js',
				 '<%= srcLocation %>/services/**/*js',
				 '<%= srcLocation %>/templates/build/**/*js',
				 '<%= srcLocation %>/views/**/*js',
                 'grunt/**/*.js' ]
};
