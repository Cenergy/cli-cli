<template>
    <div class="relative">
        <div class="vx-navbar-wrapper" :class="classObj">
            <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">
                <!-- SM - OPEN SIDEBAR BUTTON -->
                <feather-icon
                    class="sm:inline-flex xl:hidden cursor-pointer p-2"
                    icon="MenuIcon"
                    @click.stop="showSidebar"
                />

                <vs-spacer />

                <search-bar class="mr-4" />

                <profile-drop-down />
            </vs-navbar>
        </div>
    </div>
</template>

<script>
import SearchBar from './components/SearchBar';
import ProfileDropDown from './components/ProfileDropDown';

export default {
    name: 'the-navbar-vertical',
    props: {
        navbarColor: {
            type: String,
            default: '#fff',
        },
    },
    components: {
        SearchBar,
        ProfileDropDown,
    },
    computed: {
        navbarColorLocal() {
            return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor;
        },
        verticalNavMenuWidth() {
            return this.$store.state.verticalNavMenuWidth;
        },
        textColor() {
            return {
                'text-white':
                    (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') ||
                    (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark'),
            };
        },
        windowWidth() {
            return this.$store.state.windowWidth;
        },

        // NAVBAR STYLE
        classObj() {
            if (this.verticalNavMenuWidth === 'default') return 'navbar-default';
            if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced';
            if (this.verticalNavMenuWidth) return 'navbar-full';
            return '';
        },
    },
    methods: {
        showSidebar() {
            this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
        },
    },
};
</script>
