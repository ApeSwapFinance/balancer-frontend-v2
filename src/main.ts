import '@/assets/css/tailwind.css';
import '@/assets/css/index.css';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';

import { Web3Provider } from '@ethersproject/providers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { createApp } from 'vue';
import VueVirtualScroller from 'vue3-virtual-scroller';

import blocknative from '@/plugins/blocknative';
import { registerGlobalComponents } from '@/plugins/components';
import registerDirectives from '@/plugins/directives';
import i18n from '@/plugins/i18n';
import mixins from '@/plugins/mixins';
import router from '@/plugins/router';
import initSentry from '@/plugins/sentry';
import vueQuery from '@/plugins/vueQuery';
import Web3Plugin from '@/services/web3/web3.plugin';
import store from '@/store';

import { IS_DEV } from './constants/env';
import Root from './Root';

use([
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  LineChart,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
  PieChart,
  PolarComponent,
  BarChart
]);

const app = createApp(Root)
  .use(i18n)
  .use(router)
  .use(store)
  .use(blocknative)
  .use(vueQuery)
  .use(Web3Plugin, Web3Provider)
  .mixin(mixins)
  .use(VueVirtualScroller);

registerDirectives(app);
registerGlobalComponents(app);
initSentry(app);

app.config.performance = IS_DEV;

app.mount('#app');

export default app;
