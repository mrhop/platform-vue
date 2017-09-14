import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/cms/dashboard/Dashboard'
import AddBlockTag from '@/components/cms/top/addblocktag/AddBlockTag'
import AddTheme from '@/components/cms/top/addtheme/AddTheme'
import AddWebsite from '@/components/cms/top/addwebsite/AddWebsite'
import BlockTagDetail from '@/components/cms/top/blocktagdetail/BlockTagDetail'
import BlockTagList from '@/components/cms/top/blocktaglist/BlockTagList'
import EditBlockTag from '@/components/cms/top/editblocktag/EditBlockTag'
import EditTheme from '@/components/cms/top/edittheme/EditTheme'
import EditWebsite from '@/components/cms/top/editwebsite/EditWebsite'
import ThemeDetail from '@/components/cms/top/themedetail/ThemeDetail'
import ThemeList from '@/components/cms/top/themelist/ThemeList'
import WebsiteDetail from '@/components/cms/top/websitedetail/WebsiteDetail'
import WebsiteList from '@/components/cms/top/websitelist/WebsiteList'
import AddTemplate from '@/components/cms/theme/addtemplate/AddTemplate'
import EditTemplate from '@/components/cms/theme/edittemplate/EditTemplate'
import TemplateDetail from '@/components/cms/theme/templatedetail/TemplateDetail'
import TemplateList from '@/components/cms/theme/templatelist/TemplateList'

import AddArticle from '@/components/cms/website/addarticle/AddArticle'
import AddEvent from '@/components/cms/website/addevent/AddEvent'
import AddMedia from '@/components/cms/website/addmedia/AddMedia'
import AddMediaTag from '@/components/cms/website/addmediatag/AddMediaTag'

import AddNavigate from '@/components/cms/website/addnavigate/AddNavigate'
import AddNews from '@/components/cms/website/addnews/AddNews'
import ArticleDetail from '@/components/cms/website/articledetail/ArticleDetail'
import ArticleList from '@/components/cms/website/articlelist/ArticleList'

import EditArticle from '@/components/cms/website/editarticle/EditArticle'
import EditEvent from '@/components/cms/website/editevent/EditEvent'
import EditMedia from '@/components/cms/website/editmedia/EditMedia'
import EditMediaTag from '@/components/cms/website/editmediatag/EditMediaTag'

import EditNavigate from '@/components/cms/website/editnavigate/EditNavigate'
import EditNews from '@/components/cms/website/editnews/EditNews'
import EventDetail from '@/components/cms/website/eventdetail/EventDetail'
import EventList from '@/components/cms/website/eventlist/EventList'

import MediaDetail from '@/components/cms/website/mediadetail/MediaDetail'
import MediaList from '@/components/cms/website/medialist/MediaList'
import MediaTagDetail from '@/components/cms/website/mediatagdetail/MediaTagDetail'
import MediaTagList from '@/components/cms/website/mediataglist/MediaTagList'

import NavigateDetail from '@/components/cms/website/navigatedetail/NavigateDetail'
import NavigateList from '@/components/cms/website/navigatelist/NavigateList'
import NewsDetail from '@/components/cms/website/newsdetail/NewsDetail'
import NewsList from '@/components/cms/website/newslist/NewsList'

import AddStaticResource from '@/components/cms/common/addstaticresource/AddStaticResource'
import EditStaticResource from '@/components/cms/common/editstaticresource/EditStaticResource'
import StaticResourceDetail from '@/components/cms/common/staticresourcedetail/StaticResourceDetail'

import ThemeInfo from '@/components/cms/theme/themeinfo/ThemeInfo'
import WebsiteInfo from '@/components/cms/website/websiteinfo/WebsiteInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/theme/list',
      name: 'ThemeList',
      component: ThemeList
    },
    {
      path: '/theme/add',
      name: 'AddTheme',
      component: AddTheme
    },
    {
      path: '/theme/edit',
      name: 'EditTheme',
      component: EditTheme
    },
    {
      path: '/theme/detail',
      name: 'ThemeDetail',
      component: ThemeDetail
    },
    {
      path: '/website/list',
      name: 'WebsiteList',
      component: WebsiteList
    },
    {
      path: '/website/add',
      name: 'AddWebsite',
      component: AddWebsite
    },
    {
      path: '/website/edit',
      name: 'EditWebsite',
      component: EditWebsite
    },
    {
      path: '/website/detail',
      name: 'WebsiteDetail',
      component: WebsiteDetail
    },
    {
      path: '/blocktag/list',
      name: 'BlockTagList',
      component: BlockTagList
    },
    {
      path: '/blocktag/add',
      name: 'AddBlockTag',
      component: AddBlockTag
    },
    {
      path: '/blocktag/edit',
      name: 'EditBlockTag',
      component: EditBlockTag
    },
    {
      path: '/blocktag/detail',
      name: 'BlockTagDetail',
      component: BlockTagDetail
    },
    {
      path: '/template/list',
      name: 'TemplateList',
      component: TemplateList
    },
    {
      path: '/template/add',
      name: 'AddTemplate',
      component: AddTemplate
    },
    {
      path: '/template/edit',
      name: 'EditTemplate',
      component: EditTemplate
    },
    {
      path: '/template/detail',
      name: 'TemplateDetail',
      component: TemplateDetail
    },
    {
      path: '/article/list',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/add',
      name: 'AddArticle',
      component: AddArticle
    },
    {
      path: '/article/edit',
      name: 'EditArticle',
      component: EditArticle
    },
    {
      path: '/article/detail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/news/add',
      name: 'AddNews',
      component: AddNews
    },
    {
      path: '/news/edit',
      name: 'EditNews',
      component: EditNews
    },
    {
      path: '/news/detail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/event/list',
      name: 'EventList',
      component: EventList
    },
    {
      path: '/event/add',
      name: 'AddEvent',
      component: AddEvent
    },
    {
      path: '/event/edit',
      name: 'EditEvent',
      component: EditEvent
    },
    {
      path: '/event/detail',
      name: 'EventDetail',
      component: EventDetail
    },
    {
      path: '/mediatag/list',
      name: 'MediaTagList',
      component: MediaTagList
    },
    {
      path: '/mediatag/add',
      name: 'AddMediaTag',
      component: AddMediaTag
    },
    {
      path: '/mediatag/edit',
      name: 'EditMediaTag',
      component: EditMediaTag
    },
    {
      path: '/mediatag/detail',
      name: 'MediaTagDetail',
      component: MediaTagDetail
    },
    {
      path: '/media/list',
      name: 'MediaList',
      component: MediaList
    },
    {
      path: '/media/add',
      name: 'AddMedia',
      component: AddMedia
    },
    {
      path: '/media/edit',
      name: 'EditMedia',
      component: EditMedia
    },
    {
      path: '/media/detail',
      name: 'MediaDetail',
      component: MediaDetail
    },
    {
      path: '/navigate/list',
      name: 'NavigateList',
      component: NavigateList
    },
    {
      path: '/navigate/add',
      name: 'AddNavigate',
      component: AddNavigate
    },
    {
      path: '/navigate/edit',
      name: 'EditNavigate',
      component: EditNavigate
    },
    {
      path: '/navigate/detail',
      name: 'NavigateDetail',
      component: NavigateDetail
    },
    {
      path: '/staticresource/add',
      name: 'AddStaticResource',
      component: AddStaticResource
    },
    {
      path: '/staticresource/edit',
      name: 'EditStaticResource',
      component: EditStaticResource
    },
    {
      path: '/staticresource/detail',
      name: 'StaticResourceDetail',
      component: StaticResourceDetail
    },
    {
      path: '/website/info/:key',
      name: 'WebsiteInfo',
      component: WebsiteInfo
    },
    {
      path: '/theme/info/:key',
      name: 'ThemeInfo',
      component: ThemeInfo
    },
    {
      path: '/*',
      name: 'All',
      component: Dashboard
    }
  ]
})
