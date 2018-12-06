<template>
  <v-app light>
    <v-toolbar class="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <router-view/>
    <v-footer :fixed="fixed" app>
      <span>Guillaume Renard&copy; <a href="mailto:gui.renard@gmail.com">gui.renard@gmail.com</a> 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        title: 'CityFinder'
      }
    },
    name: 'App'
  }
</script>
