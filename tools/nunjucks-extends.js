var nunjucks = require('nunjucks')
var is = require('is')
var md = require('./markdown')

function markdownParse(text) {
  if (!is.string(text)) {
    return;
  }
  return new nunjucks.runtime.markSafe(md.render(text));
}

module.exports = function (env) {

  env.addGlobal('parent', function() {
    return
  })

  env.addGlobal('include', function(layout, data, others) {
    //console.log(others.ignore_missing)
    return new nunjucks.runtime.markSafe(nunjucks.render(layout, data||{}));
  })

  env.addFilter('img', function(src, key) {
    return src;
  })

  env.addFilter('post', function(link) {
    console.log(link)
    if (typeof args == 'undefined') {
      return {};
    }
    if (!is.string(link)) {
      return link;
    }
    return global.posts.get(link);
  })

  env.addFilter('posts', function(args) {
    //console.log(args)
    if (typeof args === 'undefined') {
      return [];
    }
    if (is.array(args)) {
      return args;
    }
    return global.posts.getCollections(args);
  })

  env.addFilter('md', markdownParse)

  env.addFilter('markdown', markdownParse)

  env.addGlobal('site_asset', function(src) {
    return src
  })

  env.addGlobal('site_url', function(src) {
    if (!src) {
      return 'index.html';
    }
    return src
  })

  env.addGlobal('asset_url', function(src) {
    return src
  })

  env.addGlobal('rest_url', function(src) {
    return src
  })

  env.addGlobal('form_template', function(template) {
    return new nunjucks.runtime.markSafe(nunjucks.render(template));
  })

  env.addGlobal('site_head', function() {
    return new nunjucks.runtime.markSafe([
      '<base href="/">',
      '<link rel="stylesheet" href="assets/style.css">',
      '<script src="assets/jquery.min.js"></script>'
    ].join("\n\r"))
  })

  env.addGlobal('site_footer', function() {
    return new nunjucks.runtime.markSafe([
      '<script src="assets/main.js"></script>'
    ].join("\n\r"))
  })

}