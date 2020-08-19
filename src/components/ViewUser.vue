<template>
  <div id="view-user">
    <ul class="collection with-header">
      <li class="collection-header"><h5>{{name}}</h5></li>
      <li class="collection-item orange"><b>Post:</b> {{post}}</li>
      <li class="collection-item"><b>ImageLink:</b> {{imageLink}}</li>
      <li class="collection-item"><b>User ID#:</b> {{user_id}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteUser" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-user', params: { user_id: user_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-user',
    data () {
      return {
        user_id: null,
        name: null,
        post: null,
        imageLink: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('users').where('user_id', '==', to.params.user_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.user_id = doc.data().user_id
            vm.name = doc.data().name
            vm.post = doc.data().post
            vm.imageLink = doc.data().imageLink
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.user_id = doc.data().user_id
            this.name = doc.data().name
            this.post = doc.data().post
            this.imageLink = doc.data().imageLink
          })
        })
      },
      deleteUser () {
        if(confirm ('Are you sure?')) {
          db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>
