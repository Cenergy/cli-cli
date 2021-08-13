import Vue from 'vue';

Vue.filter('title', (value, replacer = '_') => {
    if (!value) return '';
    const val = value.toString();

    const arr = val.split(replacer);
    const capitalizedArray = [];
    arr.forEach(word => {
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
        capitalizedArray.push(capitalized);
    });
    return capitalizedArray.join(' ');
});
