<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
export default {
  name: "Account",
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped>
</style>
