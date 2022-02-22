<template>
  <div class="tinymce-editor">
    <Editor @_input="handleGetVal" />
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
export default {
  components: {
    Editor,
  },
  data() {
    return {}
  },
  methods: {
    handleGetVal(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped></style>
