<template>
  <div class="container">
    <editor id="tinymce" v-model="tinymceHtml" :init="editorConfig"></editor>
    <div v-html="tinymceHtml"></div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'
import 'tinymce/skins/ui/oxide/skin.min.css' //富文本样式 浅色
// import 'tinymce/skins/ui/oxide-dark/skin.min.css' //富文本样式 深色

import 'tinymce/icons/default' //富文本样式
import 'tinymce/plugins/image' //图片
import 'tinymce/plugins/media' //多媒体
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/code' //代码模式
import 'tinymce/plugins/table' //表格
import 'tinymce/plugins/wordcount' //统计文档
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/insertdatetime' //快捷选择时间
import 'tinymce/plugins/print' //打印
import 'tinymce/plugins/searchreplace' //查找替换
import 'tinymce/plugins/hr' //水平分割线
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/lists' //有序列表 无序列表
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/emoticons' //unicode字符表情 需要单独引入表情文件 用法 emoticons_database_url: '/js/emoji.js'
import 'tinymce/plugins/pagebreak' // 分页
import '/public/tinymce/plugins/axupimgs' // 多图上传

// 配置富文本
import 'tinymce/themes/silver/theme.min.js' //引入富文本的主要脚本
export default {
  data() {
    // 自定义工具
    const toolbar = `undo redo removeformat code searchreplace fontselect  styleselect fontsizeselect  hr alignleft aligncenter alignright alignjustify 
     outdent indent blockquote lineheight subscript superscript forecolor backcolor bold italic underline strikethrough link anchor charmap  pagebreak 
     bullist numlist table lists
     preview image axupimgs media wordcount insertdatetime print fullscreen`

    // 插件配置
    const plugins = `link image code wordcount fullscreen insertdatetime media print searchreplace hr preview table lists axupimgs charmap pagebreak`

    const fontsize_formats = '12px 14px 16px 18px 24px 36px 48px 56px 72px'
    const font_formats =
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;'

    return {
      tinymceHtml: 'Vue 集成 TinyMCE 及 图片上传 demo',
      editorConfig: {
        width: 800, //编辑器宽度
        height: 500, //编辑器高度
        language_url: '/tinymce/lang/zh_CN.js', //引入 中文翻译包
        language: 'zh_CN', //设置语言
        menubar: 'file edit insert view format table tools help', // （1级菜单）最上方的菜单
        fontsize_formats, //字体大小配置
        font_formats, //字体选项配置
        plugins, // 自定义工具
        toolbar, // 插件配置
        toolbar_mode: 'wrap', //工具栏显示模式 wrap换行 sliding抽屉  scrolling滚动 floating浮窗
        toolbar_sticky: true, //粘性布局 吸顶模式
        branding: false, //隐藏右下角技术支持
        browser_spellcheck: true, //拼写检查
        importcss_append: true, //，它将默认将导入的样式附加到“格式”菜单的末尾，它将替换默认格式。
        file_picker_types: 'file media', // 上传文件类型配置  'file image media'
        insertdatetime_formats: ['%Y年%m月%d日', '%Y年%m月%d日 %H点%M分', '%Y年%m月%d日 %H点%M分%S秒'], //自定义下拉列表的日期时间格式
        imagetools_cors_hosts: ['mutouyun-test.oss-cn-shenzhen.aliyuncs.com'],
        init_instance_callback: editor => {
          // 监听富文本框内容改变 传值给父组件
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.$emit('input', editor.getContent())
          })
        },
        images_upload_handler: (blobInfo, success, failure, progress) => {
          // progress=>上传进度
          // 此处写上传图片处理逻辑
          const file = blobInfo.blob()

          console.log(blobInfo, file)

          success('https://titangene.github.io/images/cover/css.png')
        },
        /**
         * 文件上传
         * 配置 file_picker_callback 回调后 图片上传 设置链接  上传媒体弹窗都会出现 上传图标
         * 需要注意上传图片 会先走 file_picker_callback 回调 点击保存操作会进入 images_upload_handler 方法
         * 将 file_picker_types 中 image类型去除可以避免以上问题
         */
        file_picker_callback: function (callback, value, meta) {
          console.log(11111, 123, 123, 123, 123)
          //文件分类
          let filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4'
          //后端接收上传文件的地址
          let upurl = ''
          //为不同插件指定文件类型及后端地址
          switch (meta.filetype) {
            case 'image':
              filetype = '.jpg, .jpeg, .png, .gif'
              break
            case 'media':
              filetype = '.mp3, .mp4'
              break
            case 'file':
            default:
          }
          //模拟出一个input用于添加本地文件
          let input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', filetype)
          input.click()
          input.onchange = function () {
            let file = this.files[0]

            let xhr, formData
            console.log(file.name)
            xhr = new XMLHttpRequest()
            xhr.withCredentials = false
            xhr.open('POST', upurl)
            xhr.onload = function () {
              let json
              if (xhr.status != 200) {
                console.log('上传失败')
                return
              }

              // 此处回调 放 文件链接地址
              callback(json.location)
            }
            formData = new FormData()
            formData.append('file', file, file.name)
            xhr.send(formData)

            //下方被注释掉的是官方的一个例子
            //放到下面给大家参考

            // var reader = new FileReader();
            // reader.onload = function () {
            //   console.log(3);
            //     // Note: Now we need to register the blob in TinyMCEs image blob
            //     // registry. In the next release this part hopefully won't be
            //     // necessary, as we are looking to handle it internally.
            //     var id = 'blobid' + (new Date()).getTime();
            //     var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            //     var base64 = reader.result.split(',')[1];
            //     var blobInfo = blobCache.create(id, file, base64);
            //     blobCache.add(blobInfo);

            //     // call the callback and populate the Title field with the file name
            //     callback(blobInfo.blobUri(), { title: file.name });
            // };
            // reader.readAsDataURL(file);
          }
        },
      },
    }
  },
  components: {
    Editor,
  },
  // watch: {
  //   tinymceHtml(newValue) {
  //     this.$emit('input', newValue)
  //   },
  // },
  mounted() {
    tinymce.init({})
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
