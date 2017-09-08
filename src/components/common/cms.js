/**
 * Created by Donghui Huo on 2017/3/21.
 */
let basePath = 'http://localhost:9092/'
var commonUrls = {
  // leftTree: basePath + 'leftmenu',
  themeMenu: 'static/demo-data/cms/common_theme_menu.json',
  websiteMenu: 'static/demo-data/cms/common_website_menu.json',
  subThemeMenu: 'static/demo-data/cms/lefttree3.json',
  subWebsiteMenu: 'static/demo-data/cms/lefttree4.json',
  topTree: 'static/demo-data/cms/toptree.json',
  topnavigate: 'static/demo-data/cms/navigate.json',
  articleList: basePath + 'article/list',
  vuerouter: {
    theme: {
      dashboard: '/theme/dashboard'
    },
    website: {
      dashboard: '/website/dashboard'
    }
  }
}
export {
  commonUrls
}
