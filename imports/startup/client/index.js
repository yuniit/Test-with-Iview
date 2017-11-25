import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import locale from 'iview/dist/locale/en-US';
Vue.use(iView, { locale });

import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

import myApp from '../../client/pages/myApp.vue';
Meteor.startup(() => {
    new Vue({
        render: h => h(myApp)
    }).$mount('app');
});