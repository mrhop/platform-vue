# platform use huodh-vue-plugins

> use vue and bootstrap to create some basic html components and plugins like table, tab, panel, modal, form, tree, etc.

Running:

``` bash
$ npm install
$ npm run dev # serve examples at localhost:8080
```

## License

[MIT](http://opensource.org/licenses/MIT)

先逐步实现login的页面设计，目前基本实现
开始实现后台接口【oauth2，登录，注册，默认返回，等需要考虑

然后user部分的实现，然后是
需要提供一个直接的url post的方式，而不是json的方式？？默认是json，其他方式则是一个http post，另一个是action自行处理并返回的方式

开始personalInfo的实现,，然后就是其他功能块的实现，最后是左侧树的实现，然后cms
personalInfo的校验问题，另外一个就是更新时头像无显示
后台在返回数据时，考虑一下判断数据为空时，返回最后一页有数据的处理！！
目前除了这个，还有用户更新的保存操作
