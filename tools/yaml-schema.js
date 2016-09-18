var yaml = require('js-yaml');
var nunjucks = require('nunjucks')
var posts = require('metalsmith-posts/lib/posts')

function Space(height, width, points) {
  this.klass  = 'Space';
  this.height = height;
  this.width  = width;
}

function Post(link) {
  this.link  = link;
}

var PostYamlType = new yaml.Type('tag:yaml.org,2002:post', {
  kind: 'scalar',
  construct: function (file) {
    var post = posts.get(file);
    //console.log(post)
    return post
  },
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

var PostMapYamlType = new yaml.Type('tag:yaml.org,2002:post/map', {
  kind: 'mapping',
  construct: function (data) {
    var post = posts.get(data.file);
    //console.log(post)
    if (data.return) {
      return post[data.return];
    }
    return post
  },
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

var PostsYamlType = new yaml.Type('tag:yaml.org,2002:posts', {
  kind: 'scalar',
  construct: function (args) {
    return posts.getCollections(args)
    //return global.posts.getCollections(args)
    //return global.posts.getCollections(args);
  },
  //instanceOf: Space
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

var PostsFilterYamlType = new yaml.Type('tag:yaml.org,2002:posts/query', {
  kind: 'mapping',
  construct: function (args) {
    return posts.getCollections(args)
    //return global.posts.getCollections(args)
    //return global.posts.getCollections(args);
  },
  //instanceOf: Space
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

var FormYamlType = new yaml.Type('tag:yaml.org,2002:form', {
  kind: 'scalar',
  construct: function (template) {
    return new nunjucks.runtime.markSafe(nunjucks.render(template));
  },
  //instanceOf: Space
  // `represent` is omitted here. So, Space objects will be dumped as is.
  // That is regular mapping with three key-value pairs but with !space tag.
});

var SPACE_SCHEMA = yaml.Schema.create([ PostsYamlType, PostsFilterYamlType, PostYamlType, PostMapYamlType, FormYamlType ]);

module.exports.SPACE_SCHEMA  = SPACE_SCHEMA;
