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
                      <PostForm v-if="editing" />
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
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup(props) {
    const editing = ref(false);

    return {
      editing,
      account: computed(() => AppState.account),
      cover: computed(() => `url(${props.post.coverImg})`),
      toggleEdit() {
        AppState.activePost = props.post;
        this.editing = !this.editing;
      },

      async deletePost(id) {
        try {
          const yes = await Pop.confirm("Delete the Post?");
          if (!yes) {
            return;
          }
          await postsService.deletePost(id);
        } catch (error) {
          logger.error("[Deleting Post]", error);
          Pop.error(error);
        }
      },
    };
  },
};
</script>




<style lang="scss" scoped>
.card:hover {
  box-shadow: 0 5px 5px -2px rgb(75, 75, 75);
}

.heart {
  font-size: 30px;
  color: red;
}

.icon {
  font-size: 30px;
  color: black;
}

.post-img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}

.profile-picture {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-picture:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 5px -2px #0aadd6;
}
</style>
