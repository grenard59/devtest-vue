<template>
  <div>
    <CityContainer/>
    <CommentContainer/>
    <BookmarkContainer/>
  </div>
</template>
<script>
  import CityContainer from '@/components/CityContainer'
  import BookmarkContainer from '@/components/BookmarkContainer'
  import CommentContainer from '@/components/CommentContainer'

  export default {
    components: {
      CityContainer,
      BookmarkContainer,
      CommentContainer
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
