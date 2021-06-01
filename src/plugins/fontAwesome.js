import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faBars,
  faSignOutAlt,
  faHome,
  faColumns,
  faSpinner,
  faPlus,
  faArrowLeft,
  faArrowRight,
  faEllipsisV,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import {
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add({
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faBars,
  faSignOutAlt,
  faHome,
  faColumns,
  faPlayCircle,
  faSpinner,
  faPlus,
  faArrowLeft,
  faArrowRight,
  faEllipsisV,
  faTrash,
  faTimes,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
