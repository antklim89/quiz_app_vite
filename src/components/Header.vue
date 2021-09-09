<template>
    <div class="bg">
        <div class="container header">
            <router-link class="logo" to="/">
                QUIZ APP
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bg {
        background: var(--primary-color);
        box-shadow: 0px 2px 2px black;
        margin-bottom: .5rem;
    }
    .logo {
        display: inline-block;
        padding: .7rem 0;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }
</style>
