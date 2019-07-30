<template>
  <a-button-group>
    <a-button size="small" @click="$emit('startPicking')" icon="font-colors" />
    <a-button size="small" icon="picture" @click="loadImg">
      <input type="file" ref="loadImg" name="file" style="display:none" @change ="uploadFile">
    </a-button>
  </a-button-group>
</template>
<script>
export default {
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
  }
</style>
