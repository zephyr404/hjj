export const api = {
  /**
   * 获取首页数据
   */
  index: '/getIndexStruct',

  /**
   * 装备状况
   */
  zbzk: {
    url: '/cc/ZzllBdZbzkController/zbzk',
    hasPage: true
  },

  /**
   * 主战装备
   */
  zzzb: {
    url: '/cc/ZzllWqzb/zzzb',
    hasPage: true
  },

  /**
   * 关键岗位人员基本情况
   */
  jbqk: {
    url: '/cc/ZzllGjgwryJbqk/jbqk',
    hasPage: true
  },

  /**
   * 训练水平
   */
  xlsp: {
    url: '/cc/ZzllZbspXlspController/xlsp',
    hasPage: true
  },

  /**
   * 机动能力
   */
  jdnl: {
    url: '/cc/ZzllZbspJdnlController/jdnl',
    hasPage: true
  },

  /**
   * 战备水平
   */
  zbsp: {
    url: '/cc/ZzllZbspController/zbsp',
    hasPage: false
  },

  /**
   * 担负任务
   */
  dfrw: {
    url: '/cc/zzllBdDfrw/bdDfrw',
    hasPage: true
  },


  /**
   * 部队部署
   */
  bdbs: {
    url: '/cc/zzllBdBs/bdBs',
    hasPage: false
  },

  /**
   * 部队情况
   */
  bdqk: {
    url: '/cc/zzllBdqk/bdqk',
    hasPage: false
  },

  /**
   * 数据采集信息
   */
  sjcjxx: {
    url: '/cc/SjcjxxController/sjcjxx',
    hasPage: true
  },

  /**
   * 车辆情况
   */
  clqk: {
    url: '/cc/ZbbzDiqkController/clqk',
    hasPage: true
  },


  /**
   * 导弹匹配
   */
  ddpp: {
    url: '/cc/ZbbzDdppController/ddpp',
    hasPage: true
  },

  /**
   * 弹体情况
   */
  diqk: {
    url: '/cc/ZbbzDiqkController/diqk',
    hasPage: true
  },

  /**
   * 弹头情况
   */
  dtqk: {
    url: '/cc/ZbbzDtqkController/dtqk',
    hasPage: true
  },

  /**
   * 待机阵地
   */
  djzd: {
    url: '/cc/ZbgcDjzdController/djzd',
    hasPage: true
  },

  /**
   * 二炮作战区
   */
  epzzq: {
    url: '/cc/ZbgcEpzzqController/epzzq',
    hasPage: true
  },

  /**
   * 发射阵地
   */
  fszd: {
    url: '/cc/ZbgcFszdController/fszd',
    hasPage: true
  },

  /**
   * 技术阵地
   */
  jszd: {
    url: '/cc/ZbgcJszdController/jszd',
    hasPage: true
  },

  /**
   * 坑道工程
   */
  kdgc: {
    url: '/cc/ZbgcKdgcController/kdgc',
    hasPage: true
  },

  /**
   * 指挥防护/战备工程
   */
  zhfhgc: {
    url: '/cc/ZbgcZhfhgcController/zhfhgc',
    hasPage: true
  },

  /**
   * 转载阵地
   */
  zzzd: {
    url: '/cc/ZbgcZzzdController/zzzd',
    hasPage: true
  },

  /**
   * 数据业务人员信息
   */
  sjywryxx: {
    url: '/cc/ZzbzSjryxxController/sjywryxx',
    hasPage: true
  },

  /**
   * 历史沿革
   */
  lsyg: {
    url: '/cc/ZzllBdLsygController/lsyg',
    hasPage: false
  },

  /**
   * 部队媒体
   */
  bdmt: {
    url: '/cc/ZzllBdMtController/bdMt',
    hasPage: true
  },

  /**
   * 装备状况下拉列表
   */
  zbzkSelect: {
    url: '/cc/select/zbzkSelect'
  },

  /**
   * 部队情况下拉列表
   */
  zzllBdqkSelect: {
    url: '/cc/select/zzllBdqkSelect'
  },

  /**
   * 主战装备\武器装备下拉列表
   */
  wqzbSelect: {
    url: '/cc/select/wqzbSelect'
  },

  /**
   * 关键岗位人员下拉列表
   */
  gjgwSelect: {
    url: '/cc/select/gjgwSelect'
  },

  /**
   * 训练水平下拉列表
   */
  xlspSelect: {
    url: '/cc/select/xlspSelect'
  },

  /**
   * 机动能力下拉列表
   */
  jdnlSelect: {
    url: '/cc/select/jdnlSelect'
  },

  /**
   * 机动作战区表格
   */
  jdzzqList: {
    url: '/cc/select/jdzzqList'
  },

  /**
  * 战备水平下拉列表
  */
  zbspSlect: {
    url: '/cc/select/zbspSlect'
  },

  /**
  * 部队部署下拉列表
  */
  zzllBdBsSelect: {
    url: '/cc/select/zzllBdBsSelect'
  },

  /**
  * 部队媒体下拉列表
  */
  mtSelect: {
    url: '/cc/select/mtSelect'
  },

  /**
  * 数据业务人员下拉列表
  */
  sjywryxxSelect: {
    url: '/cc/select/sjywryxxSelect'
  },

  /**
  * 装备下拉列表
  */
  zbSelect: {
    url: '/cc/select/zbSelect'
  },

  /**
  * 装备保障下拉列表
  */
  zbbzSelect: {
    url: '/cc/select/zbbzSelect'
  },

  /**
  * 战备工程内码
  */
  zbgcList: {
    url: '/cc/select/zbgcList'
  },

  /**
  * 战备工程下拉列表
  */
  zbgcSelect: {
    url: '/cc/select/zbgcSelect'
  },

  /**
  * 战备水平下拉列表
  */
  zbspSelect: {
    url: '/cc/select/zbspSelect'
  },

  /**
  * 部队担负任务流水号
  */
  bddfrwlsh: {
    url: '/cc/zzllBdDfrw/bdDfrwLsh'
  },

  /**
  * 历史沿革文件上传
  */
  fileUpload: {
    url: '/cc/FileUploadController/fileUpload'
  },
};