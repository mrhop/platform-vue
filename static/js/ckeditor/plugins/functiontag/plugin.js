/**
 * Created by Donghui Huo on 2017/9/29.
 */
CKEDITOR.plugins.add('functiontag', {
  requires: 'widget',
  icons: 'functiontag',
  init: function (editor) {
    editor.widgets.add('functiontag', {
      button: '插入功能TAG',
      template: '<div class="ckeditor-function-tag"></div>',
      allowedContent: 'div(!ckeditor-function-tag);span',
      requiredContent: 'div(ckeditor-function-tag);span',
      upcast: function (element) {
        return element.name === 'div' && element.hasClass('ckeditor-function-tag');
      },
      dialog: 'insertFunctionTag',
      init: function () {
        if (this.element.getAttribute('type')) {
          this.setData('type', this.element.getAttribute('type'));
        }
        if (this.element.getAttribute('mediaTag')) {
          this.setData('mediaTag', this.element.getAttribute('mediaTag'));
        }
        if (this.element.getAttribute('num')) {
          this.setData('num', this.element.getAttribute('num'));
        }
        // 进行mediatag 的ajax获取
        // var mediaTags = []
        // if (editor.config.mediaTagsUrl) {
        //   CKEDITOR.ajax.load(editor.config.mediaTagsUrl, function (data) {
        //     if (data) {
        //       var dataParsed = JSON.parse(data)
        //       this.setData('mediaTags', dataParsed);
        //     }
        //   }.bind(this))
        // }
      },
      data: function () {
        if (this.data.type) {
          this.element.setAttribute('type', this.data.type)
        }
        if (this.data.mediaTag) {
          this.element.setAttribute('mediaTag', this.data.mediaTag)
        }
        if (this.data.num) {
          this.element.setAttribute('num', this.data.num)
        }
        var innerElement = this.element.getChild(0)
        if (!innerElement) {
          innerElement = new CKEDITOR.dom.element('span');
          this.element.append(innerElement);
        }
        if (this.data.typeLabel) {
          innerElement.setText(this.data.typeLabel)
        }
        if (this.data.mediaTagLabel) {
          innerElement.setText(innerElement.getText() + ':' + this.data.mediaTagLabel)
        }
        if (this.data.num) {
          innerElement.setText(innerElement.getText() + ':' + this.data.num)
        }
      }
    })
    if (editor.contextMenu) {
      editor.addMenuGroup('functiontagGroup');
      editor.addMenuItem('functiontagPropertiesItem', {
        label: '功能TAG',
        icon: 'functiontag',
        command: 'functiontag',
        group: 'functiontagGroup'
      });

      editor.contextMenu.addListener(function (element) {
        if (element &&
          element.getChild(0) &&
          element.getChild(0).hasClass &&
          element.getChild(0).hasClass('ckeditor-function-tag')) {
          return {functiontagPropertiesItem: CKEDITOR.TRISTATE_OFF};
        }
      });
    }
    CKEDITOR.dialog.add('insertFunctionTag', this.path + 'dialogs/insertFunctionTag.js');
  }
});
