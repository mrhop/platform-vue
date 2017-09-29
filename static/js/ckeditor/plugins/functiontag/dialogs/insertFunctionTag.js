/**
 * Created by Donghui Huo on 2017/9/29.
 */
CKEDITOR.dialog.add('insertFunctionTag', function (editor) {
  // Function called in onShow to load selected element.
  var linkTypeChanged = function () {
    var dialog = this.getDialog(),
      typeValue = this.getValue()

    var element = dialog.getContentElement('info', 'mediaTags');
    if (this.getValue() === 'hotfiles' || this.getValue() === 'newfiles') {
      element.getElement().show();
    } else {
      element.getElement().hide();
    }
    dialog.layout();
  };

  return {
    title: '插入功能Tag',
    minWidth: ( CKEDITOR.skinName || editor.config.skin ) == 'moono-lisa' ? 450 : 350,
    minHeight: 240,
    onOk: function () {
      console.log('ok')
    },

    onHide: function () {
      console.log('hide')
    },

    onShow: function () {
      console.log('show')
      this.getContentElement('info', 'tagType').focus();
      // 这个data从edit window中得来
      var data = {}
      this.setupContent(data);
    },
    contents: [{
      id: 'info',
      label: '插入功能Tag',
      elements: [{
        type: 'select',
        id: 'tagType',
        label: 'Tag类型',
        required: true,
        validate: function () {
          if (!this.getValue()) {
            alert('请选择Tag类型'); // jshint ignore:line
            return false;
          }
          return true;
        },
        'default': 'hotnews',
        items: [
          ['最热新闻', 'hotnews'],
          ['最新新闻', 'newnews'],
          ['最热活动', 'hotevents'],
          ['最新活动', 'newevents'],
          ['最热媒体文件', 'hotfiles'],
          ['最新媒体文件', 'newfiles']
        ],
        setup: function (data) {
          if (data.tagType) {
            this.setValue(data.tagType);
          }
        },
        commit: function (data) {
          data.tagType = this.getValue();
        },
        onChange: linkTypeChanged,
      }, {
        type: 'select',
        id: 'mediaTags',
        label: '媒体库',
        required: true,
        items: [],
        validate: function () {
          var dialog = this.getDialog();
          if (!dialog.getContentElement('info', 'tagType') || (dialog.getValueOf('info', 'tagType') !== 'hotfiles' && dialog.getValueOf('info', 'tagType') !== 'newfiles')) {
            return true;
          }
          if (!this.getValue()) {
            alert('请选择媒体库'); // jshint ignore:line
            return false;
          }
          return true;
        },
        setup: function (data) {
          var dialog = this.getDialog();
          if (!dialog.getContentElement('info', 'tagType') || (dialog.getValueOf('info', 'tagType') !== 'hotfiles' && dialog.getValueOf('info', 'tagType') !== 'newfiles')) {
            this.getElement().hide();
            return;
          }
          // ajax 读取数据
          // 然后设置初值
          if (data.mediaTag) {
            this.setValue(data.mediaTag);
          }
        },
        commit: function (data) {
          data.mediaTag = this.getValue();
        }
      }, {
        type: 'text',
        id: 'num',
        label: '显示数量',
        'default': 0,
        setup: function (data) {
          if (data.num) {
            this.setValue(data.num);
          }
        },
        commit: function (data) {
          data.num = this.getValue();
        }
      }]
    }]
  };
});
