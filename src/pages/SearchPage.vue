<template>
  <div class="card">
    <div class="card-title">
      <div class="p-3">
        <h6 class="text-dark">
          <div class="row text-dark pb-3 border-bottom">
            <div class="col-2" v-if="post.creator">
              <router-link
                :to="{ name: 'Profile', params: { profileId: post.creatorId } }"
              >
                <img class="profile-picture" :src="post.picture" alt="" />
              </router-link>
            </div>
            <div class="col-7 d-flex align-items-center">
              <div>
                {{ post.name }}
                <div>
                  {{
                    new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                </div>
              </div>
            </div>
            <div
              class="col-3 d-flex align-items-center justify-content-end"
              v-if="post.creatorId == account.id"
            >
              <i
                class="icon mdi mdi-dots-horizontal selectable"
                data-bs-toggle="modal"
                data-bs-target="#update"
              ></i>
              <div
                class="modal"
                id="update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body text-end">
                      <i class="mdi mdi-pencil selectable" @click="toggleEdit">
                        Edit</i
                      >
                    </div>
                    <div class="modal-footer">
                      <i
                        class="mdi mdi-delete selectable"
                        @click="deletePost(post.id)"
                        data-bs-dismiss="modal"
                      >
                        Delete</i
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </h6>

        <h6 class="text-dark py-3 d-flex align-items-center">
          {{ post.body }}
        </h6>
      </div>
      <img class="img-fluid w-100 post-img" :src="post.imgUrl" alt="none" />

      <div class="heart d-flex m-3 justify-content-end">
        <i class="mdi mdi-cards-heart-outline text-end"></i>
      </div>
    </div>
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

    async function searchPosts() {
        try {
          await postsService.getPostsBySearch(query.value);
          query.value = "";
        } catch (error) {
          logger.error("[Searching Posts]", error);
          Pop.error(error);
        }
      },

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