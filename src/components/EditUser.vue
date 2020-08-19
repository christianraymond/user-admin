<template>
  <div id="new-user">
    <h5 class="center">Edit User</h5>
    <div class="row">
      <form @submit.prevent="updateUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="post" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="imageLink" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="user_id" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-user",
  data() {
    return {
      user_id: null,
      name: null,
      post: null,
      imageLink: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("users")
      .where("user_id", "==", to.params.user_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.user_id = doc.data().user_id;
            vm.name = doc.data().name;
            vm.post = doc.data().post;
            vm.imageLink = doc.data().imageLink;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("users")
        .where("user_id", "==", this.$route.params.user_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.user_id = doc.data().user_id;
            this.name = doc.data().name;
            this.post = doc.data().post;
            this.imageLink = doc.data().imageLink;
          });
        });
    },
    updateUser() {
      db.collection("users")
        .where("user_id", "==", this.$route.params.user_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                user_id: this.user_id,
                name: this.name,
                post: this.post,
                imageLink: this.imageLink,
              })
              .then(() => {
                this.$router.push({
                  name: "view-user",
                  params: { user_id: this.user_id },
                });
              });
          });
        });
    },
  },
};
</script>