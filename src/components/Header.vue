<template>
    <header class="container">
        <router-link
            class="logo"
            :to="{name: 'Home'}"
        >
            <Logo />
        </router-link>
        <router-link
            class="link"
            :to="{name: 'About'}"
        >
            About
        </router-link>
    </header>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--sp-5);
    }

    .link {
        text-decoration: none;
        padding: .7rem 0;
        align-self: flex-start;
    }
</style>
