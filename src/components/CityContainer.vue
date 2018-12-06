<template>
  <v-content>
    <section>
      <v-parallax
        src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
        height="600">
        <v-flex xs10 offset-xs1 class="custom-center">
          <div class="divStyle">
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              color="white lighten-1"
              hide-no-data
              dark
              hide-selected
              item-text="Description"
              item-value="API"
              :change="model"
              label="City finder"
              autofocus
              placeholder="Chercher votre ville ici"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </div>
        </v-flex>

      </v-parallax>
    </section>
    <section>
      <v-layout column>
        <v-list v-if="model" class="cityDetailStyle">
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Nom complet : {{city.full_name}}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Nom : {{city.name}}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Population : {{city.population}}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-layout row wrap>
            <v-flex md4 offset-sm4>
              <v-btn
                flat icon color="pink"
                @click="addFavorite"
              >
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-flex>
            <v-flex md4>
              <v-btn
                icon
                :disabled="!model"
                color="white"
                @click="removeModel"
              >
                <v-icon>cached</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

        </v-list>

      </v-layout>
    </section>
  </v-content>
</template>

<script>
  import _ from 'lodash'
  import City from '@/repository/City'
  import Bookmark from '@/repository/Bookmark'
  import Bus from '@/Bus'

  export default {
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      city: {
        full_name: '',
        population: '',
        name: ''
      },
      isLoading: false,
      model: null,
      search: null,
      debounce: 500,
      debounceTask: undefined
    }),
    methods: {
      removeModel () {
        this.model = null
        Bus.$emit('onRemoveCity')
      },
      getCity (val) {
        if (!val) {
          return
        }
        City.getCity(_.first(_.filter(this.entries, o => o.full_name === val)).id)
          .then(data => {
            this.city = data
            Bus.$emit('onAddComment', this.city.name)
            City.getComment(this.$socket, this.city.name)
            return data
          })
      },

      async addFavorite () {
        const bookmark = await Bookmark.addBookmark(_.get(this.city, 'name'))
        Bus.$emit('onAddBookmark', bookmark)
      },
      mapData (results) {
        return _.map(results, o => {
          return {
            full_name: _.get(o, 'matching_full_name'),
            name: _.first(_.get(o, 'matching_alternate_names')),
            id: _.get(o, '_links.city:item.href').match(/\d+/i)
          }
        })
      }
    },
    computed: {
      items () {
        return this.entries.map(o => o.full_name)
      }
    },

    watch: {
      search (val) {
        if (this.debounceTask !== undefined) {
          clearTimeout(this.debounceTask)
        }
        this.isLoading = true
        // Lazily load input items
        this.debounceTask = setTimeout(
          () => {
            if (!val || val.length < 2) {
              this.entries = []
              this.removeModel()
              this.isLoading = false
              return
            }
            City.getCities(val)
              .then(res => {
                const result = this.mapData(res)
                this.entries = result
                this.isLoading = false
              })
              .catch(() => {
                this.isLoading = false
              })
          }, this.debounce)
      },
      model (val) {
        this.getCity(val)
      }
    }
  }
</script>

<style scoped>
  .cityDetailStyle {
    margin: 10px;
  }

  .autocompleteStyle {
    width: 40%;
  }

  .custom-center {
    display: flex;
    align-items: center;
  }

  .divStyle {
    max-height: 64px;
    width: 100%;
  }

  .v-input {
    flex: 0 !important;
  }
</style>
