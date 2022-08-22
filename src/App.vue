<template>
  <div class="row">
    <div
      class="
        col-12
        bg-white
        search-bar
        d-flex
        align-items-center
        justify-content-between
        fixed-top
      "
    >
      <router-link :to="{ name: 'Home' }" class="beast-font">
        <b>Beast Social</b>
      </router-link>

      <div class="justify-content-center align-items-center d-flex">
        <button
          class="btn btn-fab btn-primary circle"
          title="Add Post"
          data-bs-toggle="modal"
          data-bs-target="#create-post"
        >
          <i class="mdi mdi-plus f-10 text-white"></i>
        </button>
      </div>
      <Login class="mx-5" @click="login" />
    </div>
    <div class="col-2 left-bar text-center mt-5">
      <div
        class="
          d-flex
          flex-column
          align-items-center
          justify-content-between
          h-100
        "
      ></div>
    </div>

    <main class="col-8 mt-5">
      <router-view />
    </main>

    <div class="col-2 right-bar text-center mt-5">
      <div
        class="
          d-flex
          flex-column
          align-items-center
          justify-content-between
          h-100
        "
      ></div>
      <div v-for="a in ads" :key="a.title">
        <AdsCard :ad="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.left-bar {
  height: 100vh;
  width: 250px;
}

main {
  max-height: 100vh;
  padding-bottom: 5rem;
}
.search-bar {
  height: 3.75em;
}

.beast-font {
  font-family: "Luckiest Guy", cursive;
  font-size: 1.5em;
  margin-left: 50px;
}

.icon-img {
  font-size: 25px;
}

.circle {
  border-radius: 50%;
}
</style>
