/**
 * Created by Donghui Huo on 2017/3/21.
 */
let basePath = 'http://localhost:9092/'
var commonUrls = {
  // leftTree: basePath + 'leftmenu',
  themeMenu: 'static/demo-data/cms/common_theme_menu.json',
  websiteMenu: 'static/demo-data/cms/common_website_menu.json',
  blockTagMenu: 'static/demo-data/cms/common_block_tag.json',
  subThemeMenu: 'static/demo-data/cms/lefttree3.json',
  subWebsiteMenu: 'static/demo-data/cms/lefttree4.json',
  topTree: 'static/demo-data/cms/toptree.json',
  topnavigate: 'static/demo-data/cms/navigate.json',
  relatedUsers: basePath + 'relatedusers',
  theme: {
    list: basePath + 'theme/list',
    info: basePath + 'theme/info',
    update: basePath + 'theme/update',
    updateinfo: basePath + 'theme/updateinfo',
    save: basePath + 'theme/save',
    delete: basePath + 'theme/delete'
  },
  template: {
    list: basePath + 'template/list',
    copyTpl: basePath + 'template/copy',
    info: basePath + 'template/info',
    update: basePath + 'template/update',
    save: basePath + 'template/save',
    delete: basePath + 'template/delete'
  },
  block: {
    list: basePath + 'block/list',
    info: basePath + 'block/info',
    update: basePath + 'block/update',
    save: basePath + 'block/save',
    delete: basePath + 'block/delete'
  },
  blockTag: {
    list: basePath + 'blocktag/list',
    info: basePath + 'blocktag/info',
    update: basePath + 'blocktag/update',
    save: basePath + 'blocktag/save',
    delete: basePath + 'blocktag/delete'
  },
  website: {
    list: basePath + 'website/list',
    info: basePath + 'website/info',
    update: basePath + 'website/update',
    updateinfo: basePath + 'website/updateinfo',
    save: basePath + 'website/save',
    delete: basePath + 'website/delete',
    rulechange: basePath + 'website/form/rulechange'
  },
  article: {
    list: basePath + 'article/list',
    info: basePath + 'article/info',
    update: basePath + 'article/update',
    save: basePath + 'article/save',
    delete: basePath + 'article/delete',
    rulechange: basePath + 'article/form/rulechange',
    publish: basePath + 'article/publish'
  },
  articleTag: {
    list: basePath + 'articletag/list',
    info: basePath + 'articletag/info',
    update: basePath + 'articletag/update',
    save: basePath + 'articletag/save',
    delete: basePath + 'articletag/delete',
    rulechange: basePath + 'articletag/form/rulechange'
  },
  news: {
    list: basePath + 'news/list',
    info: basePath + 'news/info',
    update: basePath + 'news/update',
    save: basePath + 'news/save',
    delete: basePath + 'news/delete',
    rulechange: basePath + 'news/form/rulechange'
  },
  event: {
    list: basePath + 'event/list',
    info: basePath + 'event/info',
    update: basePath + 'event/update',
    save: basePath + 'event/save',
    delete: basePath + 'event/delete',
    rulechange: basePath + 'event/form/rulechange'
  },
  mediaTag: {
    list: basePath + 'mediatag/list',
    info: basePath + 'mediatag/info',
    update: basePath + 'mediatag/update',
    save: basePath + 'mediatag/save',
    delete: basePath + 'mediatag/delete'
  },
  media: {
    list: basePath + 'media/list',
    info: basePath + 'media/info',
    update: basePath + 'media/update',
    save: basePath + 'media/save',
    publish: basePath + 'media/publish',
    delete: basePath + 'media/delete',
    rulechange: basePath + 'media/form/rulechange'
  },
  navigate: {
    list: basePath + 'navigate/list',
    info: basePath + 'navigate/info',
    activate: basePath + 'navigate/activate',
    update: basePath + 'navigate/update',
    save: basePath + 'navigate/save',
    delete: basePath + 'navigate/delete',
    rulechange: basePath + 'navigate/form/rulechange'
  },
  staticresource: {
    list: basePath + 'staticresource/list',
    info: basePath + 'staticresource/info',
    update: basePath + 'staticresource/update',
    save: basePath + 'staticresource/save',
    delete: basePath + 'staticresource/delete',
    rulechange: basePath + 'staticresource/form/rulechange'
  },
  vuerouter: {
    theme: {
      list: '/theme/list',
      add: '/theme/add',
      edit: '/theme/edit',
      detail: '/theme/detail',
      info: '/theme/info' // 用于单个的theme处理
    },
    template: {
      list: '/template/list',
      add: '/template/add',
      edit: '/template/edit',
      detail: '/template/detail'
    },
    blockTag: {
      list: '/blocktag/list',
      add: '/blocktag/add',
      edit: '/blocktag/edit',
      detail: '/blocktag/detail'
    },
    website: {
      list: '/website/list',
      add: '/website/add',
      edit: '/website/edit',
      detail: '/website/detail',
      info: '/website/info' // 用于单个的website处理
    },
    article: {
      list: '/article/list',
      add: '/article/add',
      edit: '/article/edit',
      detail: '/article/detail'
    },
    articleTag: {
      list: '/articletag/list',
      add: '/articletag/add',
      edit: '/articletag/edit',
      detail: '/articletag/detail'
    },
    news: {
      list: '/news/list',
      add: '/news/add',
      edit: '/news/edit',
      detail: '/news/detail'
    },
    event: {
      list: '/event/list',
      add: '/event/add',
      edit: '/event/edit',
      detail: '/event/detail'
    },
    mediaTag: {
      list: '/mediatag/list',
      add: '/mediatag/add',
      edit: '/mediatag/edit',
      detail: '/mediatag/detail'
    },
    media: {
      list: '/media/list',
      add: '/media/add',
      edit: '/media/edit',
      detail: '/media/detail'
    },
    navigate: {
      list: '/navigate/list',
      add: '/navigate/add',
      edit: '/navigate/edit',
      detail: '/navigate/detail'
    },
    staticresource: {
      list: '/staticresource/list',
      add: '/staticresource/add',
      edit: '/staticresource/edit',
      detail: '/staticresource/detail'
    }
  }
}
export {
  commonUrls
}
