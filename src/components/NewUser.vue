<template>
  <div id="new-user">
    <h5 class="center"><b>New User | Post</b></h5>
    <div class="row">
      <form @submit.prevent="saveUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Your name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="post" required />
            <label>What's on your mind?</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="imageLink" required />
            <label>Add an image link to your post</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="user_id" required />
            <label>Your ID#</label>
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
  name: "new-user",
  data() {
    return {
      user_id: null,
      name: null,
      post: null,
      imageLink: null,
    };
  },
  methods: {
    saveUser() {
      db.collection("users")
        .add({
          user_id: this.user_id,
          name: this.name,
          post: this.post,
          imageLink: this.imageLink,
        })
        .then((docRef) => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error adding user: ", error);
        });
    },
  },
};
</script>