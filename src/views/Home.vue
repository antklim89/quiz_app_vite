<template>
  <div>
      <router-link to="/question/1">
        <button>Start Quiz</button>
      </router-link>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({ name: 'Home' })
</script>


<style lang="scss" scoped>
div {
    text-align: center;
}
button {
    font-size: 50px;
    border: none;
    border-radius: 0.5rem;
    background: var(--primary-color);
    color: var(--light-color);
    padding: var(--space-2);
    cursor: pointer;
    margin: 5rem 0;
    text-decoration: none;
}
</style>
