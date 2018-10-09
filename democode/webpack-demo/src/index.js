import base from './css/base.less';
import { a } from './other/common';

a();

const root = document.getElementById('root');

root.innerHTML = '<div class="'+ base.box +'"></div>';
