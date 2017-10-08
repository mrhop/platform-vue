/**
 * Created by Donghui Huo on 2017/9/28.
 */
/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
import {commonUrls} from '../../components/common/cms'

let config = {
  language: 'zh-cn',
  uiColor: '#9AB8F3',
  bodyClass: 'main-content'
}
// 因为无法判定文件类型
// 所以浏览的时候，除去图片，其他都按照名称浏览
// 图片按照名称浏览，放上去时候显示图片
// 但是给出tag分类来进行处理
// 上传的时候需要考虑到后台进行细分，判断文件类型，图片则不需要
// 以后会考虑给出额外的url和后缀的校验判定处理
// 仍然需要一个file module来实现filebrowser？分类和列表做统一的名称处理
config.mediaTagsUrl = commonUrls.mediaTag.selectOptions
let mediaUploadUrl = commonUrls.media.upload
config.filebrowserBrowseUrl = 'file.html'
config.filebrowserImageBrowseUrl = 'file.html?type=image'
config.filebrowserFlashUploadUrl = 'file.html?type=flash'
config.filebrowserUploadUrl = mediaUploadUrl
config.filebrowserImageUploadUrl = mediaUploadUrl + '?type=image'
config.filebrowserFlashUploadUrl = mediaUploadUrl + '?type=flash'
config.toolbarGroups = [
  {name: 'clipboard', groups: ['clipboard', 'undo']},
  {name: 'editing', groups: ['find', 'selection', 'spellchecker']},
  {name: 'links'},
  {name: 'insert'},
  // {name: 'forms'},
  {name: 'tools'},
  {name: 'document', groups: ['mode', 'document', 'doctools']},
  {name: 'others'},
  '/',
  {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
  {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
  {name: 'styles'},
  {name: 'colors'},
  // {name: 'pbckcode'},
  {name: 'about'}
]

config.extraPlugins = 'functiontag'
// Remove some buttons provided by the standard plugins, which are
// not needed in the Standard(s) toolbar.
config.removeButtons = 'Underline,Subscript,Superscript,FMathEditor'

// Set the most common block elements.

config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div'

// Simplify the dialog windows.
// config.removeDialogTabs = 'image:advanced;link:advanced'

// custom
// for Media Embed plugin
config.embed_provider = '//iframe.ly/api/oembed?api_key=ec2d47de556ce05483578b&url={url}&callback={callback}'

// config.allowedContent = true
// config.extraAllowedContent = 'a[!href]'
// FMathEditor.png

export default config
