<script setup lang="ts">
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";

const store = useJobsStore();
const options = computed(() => store.currentOptionsFilter);
</script>

<template>
  <div class="filter container">
    <div class="filter-options">
      <div
        class="filter-options-content d-flex"
        v-for="(option, index) in options"
        :key="index"
      >
        <div class="option">
          <p>{{ option }}</p>
        </div>
        <div
          class="btn-delete"
          role="button"
          @click="store.deleteOption(option)"
        >
          <p>X</p>
        </div>
      </div>
    </div>
    <p class="btn-clear" @click="store.deleteOptions">Clear</p>
  </div>
</template>

<style lang="scss">
@import "./Filter.scss";
</style>