<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header"><h6><b>Post</b></h6></li>
      <li v-for="user in users" v-bind:key="user.id" class="collection-item">
        <div class="chip orange">{{user.post}}</div>
        {{user.user_id}} | {{user.name}} 
         <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.user_id }}"><i class="fa fa-eye"></i></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'home',
    data () {
      return {
        users: [],
        loading: true
      }
    },
    created () {
      db.collection('users').orderBy('post').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'user_id': doc.data().user_id,
            'name': doc.data().name,
            'post': doc.data().post,
            'imageLink': doc.data().imageLink
          }
          this.users.push(data)
        })
      })
    }
  }
</script>