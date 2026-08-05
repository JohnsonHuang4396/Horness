# 编码质量检查清单

> 覆盖范围：分层架构、模块职责、代码复杂度、内存泄漏、可维护性优先级说明：P0 必须修复（阻塞上线），P1 重要建议修复，P2 建议后续优化

---

## 一、分层架构 [P0]

**必须**：严格遵守分层调用链。

```
页面层 (pages/)
  ↓ 只能调用
服务层 (services/)
  ↓ 只能调用
API 层 (api/)
  ↓ 只能调用
HTTP 服务 (snippets/services/http/)
```

**禁止**：

- 禁止页面层直接调用 API 层（必须通过 Service 层）
- 禁止页面层直接调用 HTTP 服务
- 禁止省略 Service 层（API 层不可被页面直接使用）

```ts
// 错误示例：页面跨层调用 API
// pages/order/list/index.vue
import { fetchOrderList } from '@/api/modules/order';
const list = await fetchOrderList();

// 正确示例：页面调用 Service，Service 调用 API
// services/modules/order.ts
import { fetchOrderList } from '@/api/modules/order';
export async function getOrderList(params: IOrderListParams) {
    return fetchOrderList(params);
}

// pages/order/list/index.vue
import { getOrderList } from '@/services/modules/order';
const list = await getOrderList({ page: 1 });
```

---

## 二、模块职责 [P0]

### 2.1 页面层（index.vue）

**必须**：

- 仅负责页面展示和交互逻辑
- 单个 `.vue` 文件不超过 600 行（含模板、script、style 三节总量）

**禁止**：

- 禁止在 index.vue 中包含复杂业务逻辑（应放在 Service 层）
- 禁止在 index.vue 中直接写配置数据（应放在 useConfig.ts）

```vue
<!-- 错误示例：配置数据直接写在 index.vue -->
<script setup lang="ts">
    defineOptions({ name: 'OrderList' });
    const columns = [
        { prop: 'orderId', label: '订单号', width: 120 },
        { prop: 'status', label: '状态', width: 80 },
    ];
</script>

<!-- 正确示例：从 useConfig.ts 引入 -->
<script setup lang="ts">
    defineOptions({ name: 'OrderList' });
    import { useConfig } from './useConfig';
    const { columns } = useConfig();
</script>
```

### 2.2 服务层（services/）

**必须**：Service 层为纯函数，只封装业务逻辑。

**禁止**：禁止在 Service 层操作 Vue 响应式数据。

```ts
// 错误示例：Service 层操作响应式数据
export function useOrderService() {
    const list = ref<IOrderItem[]>([]); // 禁止！
    const isLoading = ref(false); // 禁止！

    async function fetchList() {
        isLoading.value = true;
        list.value = await fetchOrderList();
    }
    return { list, isLoading, fetchList };
}

// 正确示例：Service 层为纯函数
export async function getOrderList(params: IOrderListParams): Promise<IOrderItem[]> {
    return fetchOrderList(params);
}
```

### 2.3 API 层（api/）

**必须**：API 层仅负责 HTTP 请求封装，不包含任何业务逻辑。

---

## 三、代码复杂度 [P0]

**必须**：单个函数圈复杂度不超过 10（ESLint `complexity` 规则强制执行）。

**禁止**：

- 禁止编写过长函数
- 禁止超过 4 层嵌套（JavaScript/TypeScript）

```ts
// 错误示例：圈复杂度过高的函数（多个 if/else 嵌套）
function processOrder(order: IOrder) {
    if (order.status === 'pending') {
        if (order.type === 'normal') {
            if (order.amount > 1000) {
                if (order.vip) {
                    return 'discount';
                } else {
                    return 'normal';
                }
            }
        } else if (order.type === 'express') {
            // ...
        }
    } else if (order.status === 'paid') {
        // ...
    }
}

// 正确示例：拆分子函数降低复杂度
function getOrderDiscount(order: IOrder): string {
    if (!isHighValueOrder(order)) return 'normal';
    return order.vip ? 'discount' : 'normal';
}

function isHighValueOrder(order: IOrder): boolean {
    return order.type === 'normal' && order.amount > 1000;
}

function processOrder(order: IOrder): string {
    if (order.status === 'pending') return getOrderDiscount(order);
    if (order.status === 'paid') return processPaidOrder(order);
    return 'unknown';
}
```

---

## 四、内存泄漏 [P0]

### 4.1 定时器清理

**必须**：`setInterval` / `setTimeout` 必须在组件卸载时清理。

```ts
// 错误示例：未清理定时器
onMounted(() => {
    setInterval(() => {
        fetchData();
    }, 5000);
});

// 正确示例：onUnmounted 清理
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    timer = setInterval(() => {
        fetchData();
    }, 5000);
});

onUnmounted(() => {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
});
```

### 4.2 事件监听器解绑

**必须**：`window` / `document` / `Element` 上注册的事件，必须在 `onUnmounted` 中解绑。

**禁止**：禁止使用匿名函数注册事件（无法移除）。

```ts
// 错误示例：匿名函数无法移除
onMounted(() => {
    window.addEventListener('resize', () => {
        handleResize();
    });
});

// 正确示例：具名函数，可正确移除
function onWindowResize() {
    handleResize();
}

onMounted(() => {
    window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
});
```

### 4.3 Watch 停止

**必须**：在组件 `setup()` 之外（如异步函数中）创建的 `watch` / `watchEffect`，必须手动保存 stop 函数并调用。

```ts
// 错误示例：异步创建 watch 后不停止
async function init() {
    await fetchUserInfo();
    watchEffect(() => {
        // 不会自动停止！
        updateTitle(userInfo.value);
    });
}

// 正确示例：保存 stop 并在 onUnmounted 停止
let stopWatcher: (() => void) | null = null;

async function init() {
    await fetchUserInfo();
    stopWatcher = watchEffect(() => {
        updateTitle(userInfo.value);
    });
}

onUnmounted(() => {
    stopWatcher?.();
});
```

### 4.4 第三方实例销毁

**必须**：图表库、地图 SDK、富文本编辑器等第三方实例必须在 `onUnmounted` 中销毁。

```ts
// 正确示例：ECharts 实例销毁
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
    chartInstance = echarts.init(chartRef.value!);
});

onUnmounted(() => {
    chartInstance?.dispose();
    chartInstance = null;
});
```

### 4.5 Observer 断开

**必须**：`ResizeObserver` / `IntersectionObserver` / `MutationObserver` 必须在 `onUnmounted` 中调用 `disconnect()`。

```ts
// 正确示例
let observer: ResizeObserver | null = null;

onMounted(() => {
    observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.value!);
});

onUnmounted(() => {
    observer?.disconnect();
    observer = null;
});
```

---

## 五、组件设计 [P1]

**必须**：

- 优先使用现有组件库：`mcsp-*` > `mdms-fe` > `MDesign 3` > 自定义
- 禁止在已有组件可覆盖的场景下使用原生 `div` 或自行封装

**建议**：

- 单个组件 Props 不超过 10 个（超出应考虑拆分子组件或使用 provide/inject）
- 单个组件 Emits 不超过 5 个

---

## 六、代码可维护性 [P1]

### 6.1 代码注释

**必须**：

- 特殊业务逻辑（绕过系统默认行为）必须注释说明原因
- 自定义错误处理必须注释原因

### 6.2 组件代码顺序

**必须**：`<script setup>` 内部按如下顺序组织：

```ts
// 1. defineOptions
defineOptions({ name: 'ComponentName' })

// 2. Props / Emits 定义
const props = defineProps<{ ... }>()
const emit = defineEmits<{ ... }>()

// 3. 响应式数据（ref / reactive）
const list = ref<IOrderItem[]>([])

// 4. 计算属性
const total = computed(() => list.value.length)

// 5. 从 useConfig 引入配置
const { columns } = useConfig()

// 6. 方法定义
function handleSearch() { ... }

// 7. 生命周期钩子
onMounted(() => { ... })
onUnmounted(() => { ... })

// 8. Watch
watch(list, () => { ... })
```

---

## 七、渲染与性能 [P0/P1/P2]

### 7.1 v-for 必须使用唯一 key [P0]

**禁止**：禁止使用 `index` 作为 `v-for` 的 `key`（会导致 DOM 复用错误）。

```vue
<!-- 错误示例：使用 index 作 key -->
<div v-for="(item, index) in list" :key="index">{{ item.name }}</div>

<!-- 正确示例：使用唯一 ID 作 key -->
<div v-for="item in list" :key="item.id">{{ item.name }}</div>
```

### 7.2 大列表必须虚拟滚动 [P0]

**必须**：数据量超过 10000 条的列表必须使用虚拟滚动（如 `vue-virtual-scroller`）。

```vue
<!-- 错误示例：直接渲染大量数据 -->
<div v-for="item in largeList" :key="item.id">{{ item.name }}</div>

<!-- 正确示例：使用虚拟滚动 -->
<RecycleScroller :items="largeList" :item-size="48" key-field="id">
    <template #default="{ item }">
        <div>{{ item.name }}</div>
    </template>
</RecycleScroller>
```

### 7.3 禁止 v-if 与 v-for 同用 [P1]

**禁止**：禁止在同一元素上同时使用 `v-if` 和 `v-for`（`v-if` 优先级高于 `v-for`，会导致意外行为）。

```vue
<!-- 错误示例 -->
<div v-for="item in list" v-if="item.visible" :key="item.id">{{ item.name }}</div>

<!-- 正确示例：用 computed 过滤或包裹 template -->
<template v-for="item in visibleList" :key="item.id">
    <div>{{ item.name }}</div>
</template>

<script setup lang="ts">
    const visibleList = computed(() => list.value.filter((item) => item.visible));
</script>
```

### 7.4 模板内禁止直接调用函数 [P1]

**禁止**：禁止在模板中直接调用函数计算显示值（每次渲染都会重新执行）。

```vue
<!-- 错误示例 -->
<template>
    <div>{{ formatDate(order.createdAt) }}</div>
</template>

<!-- 正确示例：使用 computed 缓存 -->
<template>
    <div>{{ formattedDate }}</div>
</template>

<script setup lang="ts">
    const formattedDate = computed(() => formatDate(order.value.createdAt));
</script>
```

**例外**：事件处理函数（如 `@click="handleClick"`）不受此限制。

### 7.5 路由组件必须懒加载 [P1]

**必须**：路由组件必须使用动态导入。

```ts
// 错误示例：同步导入
import OrderList from '@/pages/order/list/index.vue';

// 正确示例：动态导入（懒加载）
const routes = [{ path: '/order/list', component: () => import('@/pages/order/list/index.vue') }];
```

### 7.6 高频操作防抖/节流 [P1]

**必须**：搜索输入、滚动监听等高频操作必须使用防抖（debounce）或节流（throttle）。

```ts
// 错误示例：输入即触发请求
function onSearchInput(value: string) {
    fetchSearchResult(value);
}

// 正确示例：防抖 300ms
import { useDebounceFn } from '@vueuse/core';
const onSearchInput = useDebounceFn((value: string) => {
    fetchSearchResult(value);
}, 300);
```

### 7.7 避免重复请求 [P1]

**必须**：同一份数据不得在多处重复发起请求，应通过 Store 共享或由父组件统一获取后传递。

### 7.8 第三方库按需导入 [P1]

**必须**：体积较大的第三方库必须按需导入，禁止全量引入。

```ts
// 错误示例：全量引入 lodash（70KB+）
import _ from 'lodash';

// 正确示例：按需引入
import debounce from 'lodash/debounce';
```

### 7.9 图片优化 [P2]

**建议**：

- 使用 WebP 格式（比 PNG/JPG 体积减少 25%~35%）
- 长页面中的图片使用懒加载（`loading="lazy"` 或 `v-lazy`）

---

## 快速速查表

| 检查项       | 优先级 | 常见错误                           | 正确做法                                       |
| ------------ | ------ | ---------------------------------- | ---------------------------------------------- |
| 分层架构     | P0     | 页面直接调用 API 层                | 页面 → Service → API → HTTP                    |
| Service 纯净 | P0     | Service 层使用 ref/reactive        | Service 为纯函数，不操作响应式数据             |
| 文件大小     | P0     | 单个 .vue 文件超过 600 行          | 拆分子组件                                     |
| 函数复杂度   | P0     | 函数圈复杂度超过 10                | 拆分子函数                                     |
| 定时器       | P0     | setInterval 未在 onUnmounted 清理  | 保存 id，onUnmounted 调用 clearInterval        |
| 事件监听     | P0     | 匿名函数无法 removeEventListener   | 具名函数，onUnmounted 调用 removeEventListener |
| Watch 停止   | P0     | 异步创建的 watchEffect 未手动 stop | 保存 stop 函数，onUnmounted 调用               |
| 三方实例     | P0     | ECharts 等图表实例未 dispose       | onUnmounted 调用 dispose()                     |
| Observer     | P0     | ResizeObserver 未 disconnect       | onUnmounted 调用 observer.disconnect()         |
| v-for key    | P0     | key 使用 index                     | 使用唯一业务 ID                                |
| 大列表渲染   | P0     | 直接渲染 10000+ 条数据             | 使用虚拟滚动                                   |
| 组件库优先   | P1     | 自行封装已有组件                   | mcsp-\* > mdms-fe > MDesign 3                  |
| Props 数量   | P1     | 单组件 Props 超过 10 个            | 拆分子组件或使用 provide/inject                |
| v-if + v-for | P1     | 同一元素同时使用 v-if 和 v-for     | 用 computed 预先过滤数据                       |
| 模板内函数   | P1     | 模板中调用 `formatDate()` 等函数   | 改为 computed 属性缓存                         |
| 路由懒加载   | P1     | 同步 import 路由组件               | 使用 `() => import(...)` 动态导入              |
| 搜索防抖     | P1     | 每次输入都触发请求                 | 使用 debounce/throttle                         |
| 全量导入     | P1     | `import _ from 'lodash'` 全量引入  | `import debounce from 'lodash/debounce'`       |
| 图片格式     | P2     | 使用 PNG/JPG 且未压缩              | 使用 WebP 格式，长页面启用懒加载               |
