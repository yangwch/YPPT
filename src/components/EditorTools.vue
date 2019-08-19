<template>
  <div class="editor-tools">
    <!-- 段落 -->
    <p-btn>
      <i class="iconfont icon-twenbenkuang" @click="$emit('startPicking')"></i>
    </p-btn>
    <!-- 图片 -->
    <p-btn>
      <i class="iconfont icon-image" @click="loadImg"></i>
      <input type="file" ref="loadImg" name="file" style="display:none" @change ="uploadFile">
    </p-btn>
    <!-- 列表 -->
    <p-btn>
      <i class="iconfont icon-list"></i>
    </p-btn>
    <!-- 分隔 -->
    <e-separate></e-separate>
    <!-- 撤销back，向前redo -->
    <p-btn>
      <i class="iconfont icon-back"></i>
    </p-btn>
    <p-btn>
      <i class="iconfont icon-redo"></i>
    </p-btn>
    <e-separate></e-separate>
    <!-- 字体 -->
    <p-btn no-border>
      <e-font-select></e-font-select>
    </p-btn>
    <p-btn no-border>
      <e-font-size-select></e-font-size-select>
    </p-btn>
    <e-separate></e-separate>
    <p-btn>
      <i class="iconfont icon-bold"></i>
    </p-btn>
    <p-btn>
      <i class="iconfont icon-i"></i>
    </p-btn>
    <p-btn>
      <i class="iconfont icon-underline"></i>
    </p-btn>
    <p-btn>
      <i class="iconfont icon-shanchuxian"></i>
    </p-btn>
    <e-separate></e-separate>
    <p-btn>
      <a-icon type="font-colors"></a-icon>
    </p-btn>
    <p-btn>
      <i class="iconfont icon-color-fill"></i>
    </p-btn>
  </div>
</template>
<script>
import PBtn from './PBtn.vue'
import ESeparate from './ESeparate.vue'
import EFontSelect from './EFontSelect.vue'
import EFontSizeSelect from './EFontSizeSelect.vue'
export default {
  name: 'EditorTools',
  components: {
    PBtn,
    ESeparate,
    EFontSelect,
    EFontSizeSelect
  },
  data () {
    return {
    }
  },
  methods: {
    loadImg () {
      this.$refs.loadImg.click()
    },
    uploadFile (evt) {
      let files = evt.target.files
      // console.log(files)
      this.handleDropedFiles(files)
    },
    handleDropedFiles (files) {
      let _this = this
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var imageType = /^image\//
        
        if (!imageType.test(file.type)) {
          continue
        }
        // this.dropedImgs.push(window.URL.createObjectURL(file))
        var reader = new FileReader()
        reader.onload = function (e) {
          let imgUrl = e.target.result
          let image = new Image()
          image.src = imgUrl
          image.onload = function () {
            let imgData = {
              src: imgUrl,
              width: this.width,
              height: this.height
            }
            // console.log(imgData)
            _this.$emit('addImg', imgData)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>
<style lang="less">
  .editor-tools {
    height: 100%;
    line-height: 100%;
    text-align: left;
  }
</style>
