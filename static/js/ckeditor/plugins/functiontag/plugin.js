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
      allowedContent: 'div(!ckeditor-function-tag)[data-*];span',
      requiredContent: 'div(ckeditor-function-tag);span',
      upcast: function (element) {
        return element.name === 'div' && element.hasClass('ckeditor-function-tag');
      },
      dialog: 'insertFunctionTag',
      init: function () {
        if (this.element.getAttribute('data-type')) {
          this.setData('type', this.element.getAttribute('data-type'));
        }
        if (this.element.getAttribute('data-mediatag')) {
          this.setData('mediaTag', this.element.getAttribute('data-mediatag'));
        }
        if (this.element.getAttribute('data-customtag')) {
          this.setData('customTag', this.element.getAttribute('data-customtag'));
        }
        if (this.element.getAttribute('data-num')) {
          this.setData('num', this.element.getAttribute('data-num'));
        }
      },
      data: function () {
        if (this.data.type) {
          this.element.setAttribute('data-type', this.data.type)
        }
        if (this.data.mediaTag) {
          this.element.setAttribute('data-mediatag', this.data.mediaTag)
        } else {
          this.element.removeAttribute('data-mediatag')
        }
        if (this.data.customTag) {
          this.element.setAttribute('data-customtag', this.data.customTag)
        } else {
          this.element.removeAttribute('data-customtag')
        }
        if (this.data.num || (!this.data.customTag && this.data.type !== 'navigate')) {
          this.element.setAttribute('data-num', this.data.num || 10)
        } else {
          this.element.removeAttribute('data-num')
        }
        var innerElement = this.element.getChild(0)
        if (!innerElement) {
          innerElement = new CKEDITOR.dom.element('span');
          this.element.append(innerElement);
        }
        if (this.data.typeLabel) {
          innerElement.setText(this.data.typeLabel)
          if (this.data.mediaTagLabel) {
            innerElement.setText(innerElement.getText() + ':' + this.data.mediaTagLabel)
          }
          if (this.data.customTagLabel) {
            innerElement.setText(innerElement.getText() + ':' + this.data.customTagLabel)
          }
          if (this.data.num || (!this.data.customTag && this.data.type !== 'navigate')) {
            innerElement.setText(innerElement.getText() + ':' + (this.data.num || 10))
          }
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
// 目前此处存在1。validate的问题，2.显示的问题，都是二级的select
