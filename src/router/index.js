import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/bdqk',
    component: Home,
    children: [
      {
        path: '/bdqk', // 部队情况
        name: 'bdqk',
        component: () => import('@/components/bdqk/index.vue'),
      },
      {
        path: '/bdbs', // 部队部署
        name: 'bdbs',
        component: () => import('@/components/bdbs/index.vue'),
      },
      {
        path: '/dfrw', // 担负任务
        name: 'dfrw',
        component: () => import('@/components/dfrw/index.vue'),
      },
      {
        path: '/lsyg', // 历史沿革
        name: 'lsyg',
        component: () => import('@/components/lsyg/index.vue'),
      },
      {
        path: '/bdmt', // 部队媒体
        name: 'bdmt',
        component: () => import('@/components/bdmt/index.vue'),
      },
      {
        path: '/jbqk', // 关键岗位人员
        name: 'jbqk',
        component: () => import('@/components/jbqk/index.vue'),
      },
      {
        path: '/zzzb', // 主战/武器装备
        name: 'zzzb',
        component: () => import('@/components/zzzb/index.vue'),
      },
      {
        path: '/zbsp', // 战备水平
        name: 'zbsp',
        component: () => import('@/components/zbsp/index.vue'),
      },
      {
        path: '/jdnl', // 机动能力
        name: 'jdnl',
        component: () => import('@/components/jdnl/index.vue'),
      },
      {
        path: '/xlsp', // 训练水平
        name: 'xlsp',
        component: () => import('@/components/xlsp/index.vue'),
      },
      {
        path: '/zbzk', // 装备状况
        name: 'zbzk',
        component: () => import('@/components/zbzk/index.vue'),
      },
      {
        path: '/zhfhgc', // 指挥防护/战备工程
        name: 'zhfhgc',
        component: () => import('@/components/zhfhgc/index.vue'),
      },
      {
        path: '/epzzq', // 二炮作战区
        name: 'epzzq',
        component: () => import('@/components/epzzq/index.vue'),
      },
      {
        path: '/zzzd', // 转载阵地
        name: 'zzzd',
        component: () => import('@/components/zzzd/index.vue'),
      },
      {
        path: '/djzd', // 待机阵地
        name: 'djzd',
        component: () => import('@/components/djzd/index.vue'),
      },
      {
        path: '/fszd', // 发射阵地
        name: 'fszd',
        component: () => import('@/components/fszd/index.vue'),
      },
      {
        path: '/jszd', // 技术阵地
        name: 'jszd',
        component: () => import('@/components/jszd/index.vue'),
      },
      {
        path: '/kdgc', // 坑道工程
        name: 'kdgc',
        component: () => import('@/components/kdgc/index.vue'),
      },
      {
        path: '/dtqk', // 弹头情况
        name: 'dtqk',
        component: () => import('@/components/dtqk/index.vue'),
      },
      {
        path: '/diqk', // 弹体情况
        name: 'diqk',
        component: () => import('@/components/diqk/index.vue'),
      },
      {
        path: '/clqk', // 车辆情况
        name: 'clqk',
        component: () => import('@/components/clqk/index.vue'),
      },
      {
        path: '/ddpp', // 导弹匹配
        name: 'ddpp',
        component: () => import('@/components/ddpp/index.vue'),
      },
      {
        path: '/sjywryxx', // 导弹匹配
        name: 'sjywryxx',
        component: () => import('@/components/sjywryxx/index.vue'),
      },
      {
        path: '/sjcjxx', // 导弹匹配
        name: 'sjcjxx',
        component: () => import('@/components/sjcjxx/index.vue'),
      }
    ],
  }, {
    path: '*',
    name: 'notfount',
    component: () => import('@/components/404/index.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
