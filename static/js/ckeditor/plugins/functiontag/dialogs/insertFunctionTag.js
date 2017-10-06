/**
 * Created by Donghui Huo on 2017/9/29.
 */
CKEDITOR.dialog.add('insertFunctionTag', function (editor) {

  function createRangeForFunctionTag (editor, functionTag) {
    var range = editor.createRange();

    range.setStartBefore(functionTag);
    range.setEndAfter(functionTag);

    return range;
  }

  var linkTypeChanged = function () {
    var dialog = this.getDialog()
    var element = dialog.getContentElement('info', 'mediaTag');
    if (this.getValue() === 'hotfiles' || this.getValue() === 'newfiles') {
      element.getElement().show();
    } else {
      element.getElement().hide();
    }
    dialog.layout();
  }

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
    },
    contents: [{
      id: 'info',
      label: '插入功能Tag',
      elements: [{
        type: 'select',
        id: 'tagType',
        label: 'Tag类型',
        required: true,
        validate: CKEDITOR.dialog.validate.notEmpty("请选择Tag类型."),
        'default': 'hotnews',
        items: [
          ['最热新闻', 'hotnews'],
          ['最新新闻', 'newnews'],
          ['最热活动', 'hotevents'],
          ['最新活动', 'newevents'],
          ['最热媒体文件', 'hotfiles'],
          ['最新媒体文件', 'newfiles']
        ],
        setup: function (widget) {
          if (widget.data.type) {
            this.setValue(widget.data.type)
          }
        },
        commit: function (widget) {
          widget.setData('type', this.getValue());
          for (var key in this.items) {
            if (this.items[key][1] === this.getValue()) {
              widget.setData('typeLabel', this.items[key][0]);
              return
            }
          }
        },
        onChange: linkTypeChanged,
      }, {
        type: 'select',
        id: 'mediaTag',
        label: '媒体库',
        required: true,
        items: [],
        validate: function () {
          if (!this.getElement().isEditable()) {
            return true;
          }
          if (!this.getValue()) {
            alert('请选择媒体库');
            return false;
          }
          return true;
        },
        onLoad: function (widget) {
          if (editor.config.mediaTagsUrl) {
            CKEDITOR.ajax.load(editor.config.mediaTagsUrl, function (data) {
              if (data) {
                var dataParsed = JSON.parse(data)
                this.dataParsed = dataParsed
                for (var k in dataParsed) {
                  this.add(dataParsed[k].label, dataParsed[k].value);
                }
              }
            }.bind(this))
          }
        },
        setup: function (widget) {
          if (widget.data.mediaTag) {
            this.setValue(widget.data.mediaTag)
          } else {
            this.getElement().hide();
          }
        },
        commit: function (widget) {
          if (this.isVisible()) {
            widget.setData('mediaTag', this.getValue());
            for (var key in this.dataParsed) {
              if (this.dataParsed[key].value + '' === this.getValue()) {
                widget.setData('mediaTagLabel', this.dataParsed[key].label);
                return
              }
            }
          }
        }
      }, {
        type: 'text',
        id: 'num',
        label: '显示数量',
        'default': 0,
        setup: function (widget) {
          if (widget.data.num) {
            this.setValue(widget.data.num)
          }
        },
        validate: function () {
          if (this.getValue() && !/^\+?[1-9][0-9]*$/.test(this.getValue())) {
            alert('请输入正确的正整数');
            return false;
          }
          return true;
        },
        commit: function (widget) {
          if (this.getValue()) {
            widget.setData('num', this.getValue());
          } else {
            widget.setData('num', 10);
          }
        }
      }]
    }]
  };
});
