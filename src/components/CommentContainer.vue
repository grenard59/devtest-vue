<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-card v-if="city">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Commentaires</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="commentInput"
        >
          <v-text-field
            v-model="author"
            :rules="authorRules"
            label="Ecrivez votre nom ici"
            required
          ></v-text-field>
          <v-textarea
            v-model="comment"
            auto-grow
            label="Commentaire"
            :rules="commentRules"
            rows="1"
            required
          ></v-textarea>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            Envoyer mon commentaire
          </v-btn>
        </v-form>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="index"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.message"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import _ from 'lodash'
  import City from '@/repository/City'
  import Bus from '@/Bus'

  export default {
    name: 'CommentContainer',
    data () {
      return {
        valid: true,
        author: '',
        authorRules: [
          v => !!v || 'Hey, le nom est requis',
          v => (v && v.length <= 42) || 'Le nom doit faire moins de 42 caractères.'
        ],
        comment: '',
        commentRules: [
          v => !!v || 'Le commentaire est requis !'
        ],
        isConnected: false,
        socketMessage: '',
        city: '',
        items: []
      }
    },
    sockets: {
      connect: () => {
        this.isConnected = true
      },
      disconect: () => {
        this.isConnected = false
      },

      commentReceived (data) {
        if (_.get(data, 'city') === this.city) {
          console.log('update message')
          this.items = _.get(data, 'messages')
        } else {
          console.log('different city')
        }
      }
    },
    mounted () {
      Bus.$on('onAddComment', (city) => this.onAddComment(city))
      Bus.$on('onRemoveCity', () => this.onRemoveCity())
    },
    methods: {
      onRemoveCity () {
        this.city = null
      },
      onAddComment (city) {
        this.city = city
      },
      submit () {
        if (this.$refs.form.validate()) {
          City.addComment(
            this.city,
            this.comment,
            this.author
          )
            .then(result => {
              this.items = _.get(result, 'messages')
              City.getComment(this.$socket, this.city)
            })
        }
      }
    }
  }
</script>

<style scoped>
  .commentInput {
    margin: 0 35px;
  }
</style>
