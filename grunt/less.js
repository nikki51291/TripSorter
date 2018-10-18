module.exports = {
  options: {
    report: 'min'
  },
  development: {
    options: {
      sourceMap: true,
      sourceMapFilename: '<%= srcLocation %>/styles/build/styles.css.map',
      sourceMapURL: 'styles.css.map',
      sourceMapBasepath: '',
      sourceMapRootpath: '/',
      javascriptEnabled: true
    },
    files: {
      '<%= srcLocation %>/styles/build/styles.css': '<%= srcLocation %>/styles/src/styles.less'
    },
  },
  dist: {
    options: {
      compress: true,
      cleancss: true,
      javascriptEnabled: true
    },
    files: {
      '<%= distLocation %>/styles/build/styles.css': '<%= srcLocation %>/styles/src/styles.less'
    },
  }
};