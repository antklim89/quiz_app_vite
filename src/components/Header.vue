<script setup lang="ts">
import Logo from './Logo.vue';
</script>

<template>
    <header class="container flex justify-between mb-6">
        <router-link
            class="text-primary-600"
            :to="{name: 'Home'}"
        >
            <Logo />
        </router-link>
        <router-link
            class="no-underline py-3 self-start text-primary-600"
            :to="{name: 'About'}"
        >
            About
        </router-link>
    </header>
</template>
