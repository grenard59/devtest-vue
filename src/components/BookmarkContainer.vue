<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-container fluid>
        <span class="headline">Favoris</span>
      </v-container>
      <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
        <v-layout row wrap>
          <v-flex
            v-for="(item, i) in items"
            :key="i"
            xs4
          >
            <v-card

              :key="item.city"
              class="bookmarkStyle"
            >
              <v-card-title primary-title>
                <h3 class="headline mb-0">{{ item.city }}</h3>
                <v-flex xs12>
                  <v-text-field
                    v-model="message[i]"
                    label="Ajouter un message"
                    :rules="[rules.required]"
                    v-on:keyup.enter="submit(item, message[i])"
                  ></v-text-field>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-list class="listStyle">
                  <v-list-tile v-for="message in item.messages" :key="message._id">
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-text="message.message"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="deleteBookmark(item)"
                  class="deleteBookmarkStyle"
                >Supprimer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Bookmark from '@/repository/Bookmark'
  import Bus from '@/Bus'

  export default {
    name: 'BookmarkContainer',
    data () {
      return {
        bookmarkStyle: {
          margin: '0 0 10px 0'
        },
        message: [],
        items: [],
        valid: true,
        rules: {
          required: value => !!value || 'Champs requis :)'
        }
      }
    },
    methods: {
      onAddBookmark (bookmarks) {
        this.items = bookmarks
      },
      deleteBookmark (obj) {
        Bookmark.deleteBookmark(obj.city)
          .then(results => {
            this.items = results
          })
      },

      submit (obj, message) {
        Bookmark.addBookmark(obj.city, message).then(result => {
          this.items = result
        })
      }
    },
    mounted () {
      Bookmark.getBookmarks().then(results => {
        this.items = results
      })
      Bus.$on('onAddBookmark', (bookmarks) => this.onAddBookmark(bookmarks))
    }
  }
</script>

<style scoped>
  .bookmarkStyle {
    height: 400px;

  }

  .listStyle {
    height: 145px;
    overflow-y: auto;
  }
</style>
