<template>
    <div class="vx-auto-suggest">
        <div class="flex items-center relative">
            <!-- Input -->
            <vs-input
                ref="input"
                :placeholder="placeholder"
                :class="inputClassses"
                class="z-50"
                icon-pack="feather"
                icon="icon-search"
                icon-no-border
                v-model="searchQuery"
                @keyup.esc="escPressed"
                @keyup.up="increaseIndex(false)"
                @keyup.down="increaseIndex"
                @keyup.enter="suggestionSelected"
                @focus="updateInputFocus"
                @blur="updateInputFocus(false)"
            />
        </div>

        <!-- Group List -->
        <ul
            ref="scrollContainer"
            :class="{ hidden: !inputFocused }"
            class="auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-x-hidden"
            @mouseenter="insideSuggestions = true"
            @mouseleave="insideSuggestions = false"
            @focus="updateInputFocus"
            @blur="updateInputFocus(false)"
            tabindex="-1"
        >
            <li
                ref="grp_list"
                v-for="(suggestion_list, grp_name, grp_index) in filteredData"
                :key="grp_index"
                class="auto-suggest__suggestion-group-container"
            >
                <!-- Group Header -->
                <p class="auto-suggest__suggestion-group-title pt-3 pb-1 px-4" v-if="!hideGroupTitle">
                    <slot name="group" :group_name="grp_name"></slot>
                </p>

                <!-- Suggestion List of each group -->
                <ul>
                    <li
                        v-for="(suggestion, index) in suggestion_list"
                        :key="index"
                        class="auto-suggest__suggestion-group__suggestion py-3 px-4 cursor-pointer"
                        :class="{ 'vx-auto-suggest__current-selected': currentSelected == `${grp_index}.${index}` }"
                        @mouseenter="currentSelected = `${grp_index}.${index}`"
                        @click="suggestionSelected"
                    >
                        <slot :name="grp_name" :suggestion="suggestion"></slot>
                    </li>

                    <li
                        class="auto-suggest__suggestion-group__suggestion py-3 px-4 no-results"
                        v-if="!suggestion_list.length && searchQuery"
                    >
                        <slot name="noResult" :group_name="grp_name">
                            <p>No Results Found.</p>
                        </slot>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Search..',
        },
        data: {
            type: Object,
            required: true,
        },
        initalData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        inputClassses: {
            type: [String, Object, Array],
        },
        autoFocus: {
            type: Boolean,
            default: false,
        },
        showPinned: {
            type: Boolean,
            default: false,
        },
        searchLimit: {
            type: Number,
            default: 4,
        },
        hideGroupTitle: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchQuery: '',
            filteredData: {},
            currentSelected: -1,
            inputFocused: false,
            insideSuggestions: false,
        };
    },
    watch: {
        // UPDATE SUGGESTIONS LIST
        searchQuery(val) {
            this.$emit('input', val);

            if (val === '') {
                this.inputInit();
            } else {
                const queriedData = {};
                const dataGrps = Object.keys(this.data);

                dataGrps.forEach((grp, i) => {
                    queriedData[dataGrps[i]] = this.filter_grp(this.data[grp]);
                });

                // Check if any of group has at least one queried item
                if (!Object.values(queriedData).some(obj => obj.length)) {
                    this.currentSelected = -1;
                }

                this.filteredData = queriedData;
            }
        },
        autoFocus(val) {
            if (val) this.focusInput();
            else this.searchQuery = '';
        },
        filteredData(val) {
            // Auto Select first item if it's not item-404
            let grpIndex = null;

            for (const [index, grpSuggestions] of Object.values(val).entries()) {
                if (grpSuggestions.length) {
                    grpIndex = index;
                    break;
                }
            }

            if (grpIndex !== null) this.currentSelected = `${grpIndex}.0`;
        },
    },
    methods: {
        escPressed() {
            this.$emit('closeSearchbar');
            this.searchQuery = '';
        },
        filter_grp(grp) {
            const exactEle = grp.data.filter(item => {
                return item[grp.key].toLowerCase().startsWith(this.searchQuery.toLowerCase());
            });
            const containEle = grp.data.filter(item => {
                return (
                    !item[grp.key].toLowerCase().startsWith(this.searchQuery.toLowerCase()) &&
                    item[grp.key].toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
                );
            });
            return exactEle.concat(containEle).slice(0, this.searchLimit);
        },
        inputInit() {
            if (Object.entries(this.initalData).length === 0 && this.initalData.constructor === Object) {
                this.filteredData = {};
            } else {
                this.filteredData = this.initalData;
            }
        },
        updateInputFocus(val = true) {
            if (val) {
                if (this.searchQuery === '') this.inputInit();
                setTimeout(() => {
                    this.inputFocused = true;
                }, 100);
            } else {
                if (this.insideSuggestions) return;
                setTimeout(() => {
                    this.inputFocused = false;
                }, 100);
                this.escPressed();
            }
        },
        suggestionSelected() {
            if (this.currentSelected > -1) {
                const [grpIndex, itemIndex] = this.currentSelected.split('.');

                const grpOfSelectedItem = Object.keys(this.data)[grpIndex];
                const selectedItem = this.filteredData[grpOfSelectedItem][itemIndex];

                this.$emit('selected', { [grpOfSelectedItem]: selectedItem });

                this.searchQuery = '';
            }
        },
        increaseIndex(val = true) {
            /* eslint-disable no-lonely-if */

            // If there's no matching items
            if (!Object.values(this.filteredData).some(grpItems => grpItems.length)) return;

            const [grpI, itemI] = this.currentSelected.split('.');

            const grpArr = Object.entries(this.filteredData);
            const activeGrpTotalItems = grpArr[grpI][1].length;

            if (val) {
                // If active item is not of last item in grp
                if (activeGrpTotalItems - 1 > itemI) {
                    this.currentSelected = `${grpI}.${Number(itemI) + 1}`;

                    // If active item grp is not last in grp list
                } else if (grpI < grpArr.length - 1) {
                    for (let i = Number(grpI) + 1; i < grpArr.length; i += 1) {
                        // If navigating group have items => Then move in that group
                        if (grpArr[i][1].length > 0) {
                            this.currentSelected = `${Number(i)}.0`;
                            break;
                        }
                    }
                }
            } else {
                // If active item is not of first item in grp
                if (Number(itemI)) {
                    this.currentSelected = `${grpI}.${Number(itemI) - 1}`;

                    // If active item grp  is not first in grp list
                } else if (Number(grpI)) {
                    for (let i = Number(grpI) - 1; i >= 0; i -= 1) {
                        // If navigating group have items => Then move in that group
                        if (grpArr[i][1].length > 0) {
                            this.currentSelected = `${i}.${grpArr[i][1].length - 1}`;
                            break;
                        }
                    }
                }
            }
            /* eslint-enable no-lonely-if */
        },
        focusInput() {
            this.$refs.input.$el.querySelector('input').focus();
        },
    },
    mounted() {
        if (this.autoFocus) this.focusInput();
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/components/vxAutoSuggest.scss';
</style>
