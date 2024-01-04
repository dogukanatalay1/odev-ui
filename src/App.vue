<template>
  <div id="app">
    <FileForm></FileForm>
  </div>
</template>

<script>
import FileForm from "./components/FileForm.vue" 

export default {
  name: 'App',
  components: {
    FileForm
  }
}
</script>

<style>
#app{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
