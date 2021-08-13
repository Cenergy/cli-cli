import Vue from 'vue';
import vSelect from 'vue-select';
import VxBreadcrumb from './layouts/components/VxBreadcrumb';
import FeatherIcon from './FeatherIcon';
import VxCard from './vx-card/VxCard';

Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxCard.name, VxCard);

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
    Deselect: {
        render: createElement =>
            createElement('feather-icon', {
                props: {
                    icon: 'XIcon',
                    svgClasses: 'w-4 h-4 mt-1',
                },
            }),
    },
    OpenIndicator: {
        render: createElement =>
            createElement('feather-icon', {
                props: {
                    icon: 'ChevronDownIcon',
                    svgClasses: 'w-5 h-5',
                },
            }),
    },
});

Vue.component(vSelect);
