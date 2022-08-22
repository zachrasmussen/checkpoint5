<template>
  <div class="profile-page card elevation-2 m-5" v-if="profile">
    <div class="cover-img">
      <img class="profile-img" :src="profile.picture" alt="" />
      <div class="d-flex justify-content-end">
        <a class="icon-img mdi mdi-github px-2" :href="profile.github"
          ><i></i
        ></a>
        <a class="icon-img mdi mdi-linkedin px-2" :href="profile.linkedin"
          ><i></i
        ></a>
        <a class="icon-img mdi mdi-file-outline px-2" :href="profile.resume"
          ><i></i
        ></a>
        <div class="edit-icon" v-if="profile.id == account.id">
          <router-link
            class="btn rounded-circle btn-warning m-2"
            :to="{ name: 'Account' }"
            ><i class="mdi mdi-cog"></i
          ></router-link>
        </div>
      </div>
    </div>

    <div>
      <div>
        <h3 class="text-dark creator-name text-center">{{ profile.name }}</h3>
        <!-- <div class="d-flex justify-content-center">
          <p class="text-dark creator-bio mb-2">
            {{ profile.graduated }} | {{ profile.class }}
          </p>
        </div> -->
        <p class="text-dark creator-bio mb-5">{{ profile.bio }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    loading<i class="mdi mdi-spin mdi-star"></i
    ><i class="mdi mdi-spin mdi-star"></i><i class="mdi mdi-spin mdi-star"></i>
  </div>
  <div class="container">
    <div class="row">
      <div class="mx-auto my-3 col-md-10" v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
      </div>
    </div>
  </div>
  <div class="row mb-5 pb-5 mt-5">
    <div class="col-6 text-end">
      <button
        @click="changePage(previousPage)"
        class="btn btn-outline-dark w-50"
        :disabled="!previousPage"
      >
        Previous
      </button>
    </div>

    <div class="col-6">
      <button
        @click="changePage(nextPage)"
        class="btn btn-outline-dark w-50"
        :disabled="!nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { router } from "../router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";

export default {
  setup() {
    const route = useRoute();
    console.log("route params", route.params);

    async function getPostsByCreatorId() {
      try {
        console.log("route.params.profileId", route.params.profileId);
        await postsService.getPostsByCreatorId(route.params.profileId);
      } catch (error) {
        logger.error("[GettingProfilePosts]", error);
        Pop.error(error);
      }
    }

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      } catch (error) {
        logger.error("[GettingProfile]", error);
        Pop.error(error);
        router.push({ name: "Home" });
      }
    }

    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
    });

    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      cover: computed(
        () =>
          `url(${
            AppState.activeProfile?.coverImg ||
            "https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg"
          })`
      ),
      posts: computed(() => AppState.profilePosts),
      async changePage(url) {
        console.log("url", url);
        try {
          await postsService.changePage(url);
        } catch (error) {}
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.cover-img {
  height: 200px;
  background-position: center;
  background-size: cover;
  background-image: v-bind(cover);
  object-fit: cover;
}

.profile-img {
  height: 125px;
  widows: 125px;
  border-radius: 50%;
  transform: translateY(130px);
  margin-left: 50px;
}

.creator-name {
  font-family: "Luckiest Guy", cursive;
  font-size: 3em;
  margin-top: 100px;
}

.creator-bio {
  margin: 0 50px;
}

.edit-icon {
  height: 25px;
  widows: 25px;
  border-radius: 50%;
  transform: translateY(77px);
}

.icon-img {
  font-size: 40px;
  margin: 0 10px;
  transform: translateY(75px);
}
</style>