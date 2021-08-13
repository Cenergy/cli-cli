<template>
    <div class="relative">
        <div class="vx-navbar-wrapper nav-menu-wrapper">
            <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColor">
                <ul class="menu-items flex flex-wrap w-full items-center">
                    <li
                        class="menu-item"
                        v-for="(item, index) in navMenuItems"
                        :key="index"
                        :class="{ 'mr-2': !(navMenuItems.length === index + 1) }"
                    >
                        <!-- If header -->
                        <template v-if="item.header">
                            <h-nav-menu-header :header="item" class="menu-header relative" />
                        </template>

                        <!-- If it's group -->
                        <template v-else-if="item.submenu">
                            <h-nav-menu-group
                                class="menu-group relative py-4"
                                bottom
                                :key="`group-${index}`"
                                :group="item"
                                :groupIndex="index"
                                :open="checkGrpChildrenActive(item)"
                            />
                        </template>

                        <!-- If it's link -->
                        <div v-else-if="item.url" class="menu-link">
                            <h-nav-menu-item
                                class="relative py-4 cursor-pointer"
                                :to="item.slug !== 'external' ? item.url : null"
                                :href="item.slug === 'external' ? item.url : null"
                                :icon="item.icon"
                                :target="item.target"
                                :isDisabled="item.isDisabled"
                                :slug="item.slug"
                            >
                                <span class="truncate">{{ item.name }}</span>
                                <vs-chip :color="item.tagColor" v-if="item.tag">{{ item.tag }}</vs-chip>
                            </h-nav-menu-item>
                        </div>
                    </li>
                </ul>
            </vs-navbar>
        </div>
    </div>
</template>

<script>
import HNavMenuGroup from './HorizontalNavMenuGroup';
import HNavMenuHeader from './HorizontalNavMenuHeader';
import HNavMenuItem from './HorizontalNavMenuItem';

export default {
    props: {
        // navbarColor  : { type: String, default: "#fff", },
        navMenuItems: { type: Array, required: true },
    },
    components: {
        HNavMenuGroup,
        HNavMenuHeader,
        HNavMenuItem,
    },
    computed: {
        navbarColor() {
            return this.$store.state.theme === 'dark' ? '#10163a' : '#fff';
        },
    },
    methods: {
        checkGrpChildrenActive(group) {
            const path = this.$route.fullPath;
            let active = false;
            const routeParent = this.$route.meta ? this.$route.meta.parent : undefined;

            if (group.submenu) {
                for (let index = 0; index < group.submenu.length; index += 1) {
                    const element = group.submenu[index];
                    if (active) return true;
                    if ((path === element.url || routeParent === element.slug) && element.url) {
                        active = true;
                    } else if (element.submenu) {
                        this.checkGrpChildrenActive(element);
                    }
                }
            }

            return active;
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/components/horizontalNavMenu.scss';
</style>
