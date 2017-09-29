/**
 * Created by Donghui Huo on 2017/9/29.
 */
CKEDITOR.plugins.add('functiontag', {
  icons: 'functiontag',
  init: function (editor) {
    // editor.ui.addRichCombo('Functiontag', {
    //   label: '插入功能TAG',
    //   title: '插入功能TAG',
    //   // command: 'insertFunctionTag',
    //   toolbar: 'others',
    //   multiSelect: false,
    //   panel: {
    //     css: [CKEDITOR.skin.getPath('editor')].concat(editor.config.contentsCss),
    //     attributes: {'aria-label': '插入功能TAG'}
    //   },
    //   init: function () {
    //     this.startGroup('新闻TAG');
    //     this.add(1, '最新新闻', '最新新闻');
    //     this.add(2, '最热新闻', '最热新闻');
    //     this.startGroup('活动TAG');
    //     this.add(3, '最新活动', '最新活动');
    //     this.add(4, '最热活动', '最热活动');
    //     this.startGroup('媒体库TAG');
    //     this.add(5, '最新文件', '最新文件');
    //     this.add(6, '最热文件', '最热文件');
    //   },
    //   onClick: function (value) {
    //     editor.focus();
    //     editor.fire('saveSnapshot');
    //
    //     console.log(123)
    //     setTimeout(function () {
    //       editor.fire('saveSnapshot');
    //     }, 0);
    //   },
    //   onRender: function () {
    //     editor.on('selectionChange', function (ev) {
    //       console.log(123456)
    //
    //     }, this);
    //   }
    // });
    editor.ui.addButton('Functiontag', {
      label: '插入功能TAG',
      command: 'insertFunctionTag',
      toolbar: 'others'
    });
    editor.addCommand('insertFunctionTag', new CKEDITOR.dialogCommand('insertFunctionTag', {
      allowedContent: 'ft',
      requiredContent: 'ft'
    }));
    CKEDITOR.dialog.add( 'insertFunctionTag', this.path + 'dialogs/insertFunctionTag.js' );
  }
});
