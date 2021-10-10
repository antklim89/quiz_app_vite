<template>
    <div class="bg">
        <div class="container header">
            <router-link
                class="logo"
                :to="{name: 'Home'}"
            >
                QUIZ APP
            </router-link>
            <router-link
                class="link"
                :to="{name: 'About'}"
            >
                About
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bg {
        background: var(--primary-color);
        box-shadow: 0px 2px 2px black;
        margin-bottom: .5rem;
        padding: 0 var(--sp-5);
    }
    .logo {
        display: inline-block;
        padding: .7rem 0;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .link {
        color: white;
        text-decoration: none;
        padding: .7rem 0;
    }
</style>
