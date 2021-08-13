<template>
    <div class="relative">
        <div class="vx-navbar-wrapper navbar-full p-0">
            <vs-navbar
                class="navbar-custom navbar-skelton"
                :class="navbarClasses"
                :style="navbarStyle"
                :color="navbarColor"
            >
                <router-link tag="div" to="/" class="vx-logo cursor-pointer mx-auto flex items-center">
                    <logo class="w-10 mr-4 fill-current text-primary" />
                    <span class="vx-logo-text text-primary">Vuexy</span>
                </router-link>

                <profile-drop-down />
            </vs-navbar>
        </div>
    </div>
</template>

<script>
import SearchBar from './components/SearchBar';
import ProfileDropDown from './components/ProfileDropDown';
import Logo from '../Logo';

export default {
    name: 'the-navbar-horizontal',
    props: {
        logo: { type: String },
        navbarType: {
            type: String,
            required: true,
        },
    },
    components: {
        Logo,
        SearchBar,
        ProfileDropDown,
    },
    computed: {
        navbarColor() {
            let color = '#fff';
            if (this.navbarType === 'sticky') color = '#f7f7f7';
            else if (this.navbarType === 'static') {
                if (this.scrollY < 50) {
                    color = '#f7f7f7';
                }
            }

            if (this.isThemedark === 'dark') {
                if (color === '#fff') {
                    color = '#10163a';
                } else {
                    color = '#262c49';
                }
            }

            return color;
        },
        isThemedark() {
            return this.$store.state.theme;
        },
        navbarStyle() {
            return this.navbarType === 'static' ? { transition: 'all .25s ease-in-out' } : {};
        },
        navbarClasses() {
            return this.scrollY > 5 && this.navbarType === 'static' ? null : 'd-theme-dark-light-bg shadow-none';
        },
        scrollY() {
            return this.$store.state.scrollY;
        },
        verticalNavMenuWidth() {
            return this.$store.state.verticalNavMenuWidth;
        },
        windowWidth() {
            return this.$store.state.windowWidth;
        },
    },
};
</script>
