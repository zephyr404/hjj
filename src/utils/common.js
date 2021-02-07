import { api } from '@/utils/api';
import axios from "axios";

/**
 * 获取路由
 */
function getPath(jdid) {
  try {
    switch (jdid) {
      case "002.001.001.001.018":
        return "zbzk"; // 装备状况
      case "002.001.001.001.008":
        return "zzzb"; // 主战装备
      case "002.001.001.001.007":
        return "jbqk"; // 关键岗位人员
      case "002.001.001.001.016":
        return "xlsp"; // 训练水平
      case "002.001.001.001.015":
        return "jdnl"; // 机动能力
      case "002.001.001.001.013":
        return "zbsp"; // 战备水平
      case "002.001.001.001.004":
        return "dfrw"; // 担负任务
      case "002.001.001.001.002":
        return "bdbs"; // 部队部署
      case "002.001.001.001.006":
        return "bdmt"; // 部队媒体
      case "002.001.001.001.001":
        return "bdqk"; // 部队情况
      case "002.001.001.001.005":
        return "lsyg"; // 历史沿革

      case "002.001.001.002.001":
        return "zhfhgc"; // 指挥防护工程
      case "002.001.001.002.002":
        return "epzzq"; // 二炮作战区
      case "002.001.001.002.003":
        return "zzzd"; // 转载阵地
      case "002.001.001.002.004":
        return "djzd"; // 待机阵地
      case "002.001.001.002.005":
        return "fszd"; // 发射阵地
      case "002.001.001.002.006":
        return "jszd"; // 技术阵地
      case "002.001.001.002.007":
        return "kdgc"; // 坑道（洞库）工程

      case "002.001.001.003.001":
        return "dtqk"; // 弹头情况
      case "002.001.001.003.002":
        return "diqk"; // 弹体情况
      case "002.001.001.003.003":
        return "clqk"; // 车辆情况
      case "002.001.001.003.004":
        return "ddpp"; // 导弹匹配

      case "002.001.001.004.001":
        return "sjywryxx"; // 数据业务人员信息
      case "002.001.001.004.002":
        return "sjcjxx"; // 数据采集信息
      default:
        return '';
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 获取请求接口地址
 * @param nm {String} 内码
 * @return string
 */
function getRequestUrl(jdid) {
  try {
    switch (jdid) {
      case "002.001.001.001.018":
        return api.zbzk; // 装备状况
      case "002.001.001.001.008":
        return api.zzzb; // 主战装备
      case "002.001.001.001.007":
        return api.jbqk; // 关键岗位人员
      case "002.001.001.001.016":
        return api.xlsp; // 训练水平
      case "002.001.001.001.015":
        return api.jdnl; // 机动能力
      case "002.001.001.001.013":
        return api.zbsp; // 战备水平
      case "002.001.001.001.004":
        return api.dfrw; // 担负任务
      case "002.001.001.001.002":
        return api.bdbs; // 部队部署
      case "002.001.001.001.006":
        return api.bdmt; // 部队媒体
      case "002.001.001.001.001":
        return api.bdqk; // 部队情况
      case "002.001.001.001.005":
        return api.lsyg; // 历史沿革

      case "002.001.001.002.001":
        return api.zhfhgc; // 指挥防护工程
      case "002.001.001.002.002":
        return api.epzzq; // 二炮作战区
      case "002.001.001.002.003":
        return api.zzzd; // 转载阵地
      case "002.001.001.002.004":
        return api.djzd; // 待机阵地
      case "002.001.001.002.005":
        return api.fszd; // 发射阵地
      case "002.001.001.002.006":
        return api.jszd; // 技术阵地
      case "002.001.001.002.007":
        return api.kdgc; // 坑道（洞库）工程

      case "002.001.001.003.001":
        return api.dtqk; // 弹头情况
      case "002.001.001.003.002":
        return api.diqk; // 弹体情况
      case "002.001.001.003.003":
        return api.clqk; // 车辆情况
      case "002.001.001.003.004":
        return api.ddpp; // 导弹匹配

      case "002.001.001.004.001":
        return api.sjywryxx; // 数据业务人员信息
      case "002.001.001.004.002":
        return api.sjcjxx; // 数据采集信息
      default:
        return '';
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 获取select接口地址
 * @param jdid string 内码
 * @return string
 */
function getSelectUrl(jdid) {
  try {
    switch (jdid) {
      case "002.001.001.001.018":
        return api.zbzkSelect; // 装备状况
      case "002.001.001.001.008":
        return api.wqzbSelect; // 主战装备
      case "002.001.001.001.007":
        return api.gjgwSelect; // 关键岗位人员
      case "002.001.001.001.016":
        return api.xlspSelect; // 训练水平
      case "002.001.001.001.015":
        return api.jdnlSelect; // 机动能力
      case "002.001.001.001.013":
        return api.zbspSelect; // 战备水平
      case "002.001.001.001.004":
        return api.dfrw; // 担负任务
      case "002.001.001.001.002":
        return api.zzllBdBsSelect; // 部队部署
      case "002.001.001.001.006":
        return api.mtSelect; // 部队媒体
      case "002.001.001.001.001":
        return api.zzllBdqkSelect; // 部队情况
      case "002.001.001.001.005":
        return api.mtSelect; // 历史沿革

      case "002.001.001.002.001":
        return api.zbgcSelect; // 指挥防护工程
      case "002.001.001.002.002":
        return api.zbgcSelect; // 二炮作战区
      case "002.001.001.002.003":
        return api.zbgcSelect; // 转载阵地
      case "002.001.001.002.004":
        return api.zbgcSelect; // 待机阵地
      case "002.001.001.002.005":
        return api.zbgcSelect; // 发射阵地
      case "002.001.001.002.006":
        return api.zbgcSelect; // 技术阵地
      case "002.001.001.002.007":
        return api.zbgcSelect; // 坑道（洞库）工程

      case "002.001.001.003.001":
        return api.zbbzSelect; // 弹头情况
      case "002.001.001.003.002":
        return api.zbbzSelect; // 弹体情况
      case "002.001.001.003.003":
        return api.zbbzSelect; // 车辆情况
      case "002.001.001.003.004":
        return api.zbbzSelect; // 导弹匹配

      case "002.001.001.004.001":
        return api.sjywryxxSelect; // 数据业务人员信息
      case "002.001.001.004.002":
        return api.sjcjxx; // 数据采集信息
      default:
        return;
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 判断字段是否为内码
 * @param {Object}
 * @return {String}
 */
function isNm(item) {
  try {
    if (item.field.substring(item.field.length - 2) == 'nm') {
      return item.fieldName.substring(0, item.fieldName.length - 2);
    } else {
      return item.fieldName;
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 判断该节点是否使用下拉框
 * @param data,node
 * @return false | array
 */
function isSelect(data, node) {
  try {
    return Object.keys(data).includes(node) ? data[node] : false;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 判断该节点是否使用多级下拉框
 * @param data,node
 * @return boolean
 */
function isMultiSelect(data, node) {
  try {
    return Object.keys(eval(`data.${node}[0]`)).includes('children') ? true : false;
    // return data[node][0].children ? true : false;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 时间格式转换
 * @param date string
 * @return string
 */
function dateParse(str) {
  try {
    if (str == 'null') {
      return ''
    }

    let _date = new Date(str);
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let date = _date.getDate();

    return `${year}-${month}-${date}`;

  } catch (err) {
    console.log(err);
  }
}

/**
 * 递归通过value找出所在obj
 * @param date string
 * @return string
 */
function findObj(value, obj) {
  let result = "";
  function find(arrayObj) {
    Object.keys(arrayObj).find((k) => {
      let v = arrayObj[k];
      if (v === value) {
        result = arrayObj;
        return;
      } else if (v && typeof v === "object") {
        find(v);
      }
    });
  }
  find(obj);
  return result;
}

/**
 * 生成删除数据中select的值
 */
function generateDeleteData(data) {
  let _selects = JSON.parse(sessionStorage.getItem("_selects"));

  if (_selects) {
    if (data.fields && data.fields.length > 0) {
      data.fields.forEach((item) => {
        if (this.isSelect(_selects, item.field)) {
          let newValObj = this.findObj(
            item.fieldValue,
            _selects[item.field]
          );
          if (newValObj) {
            item.fieldValue = newValObj[Object.keys(newValObj)[0]];
          }
        }
      });
    }
    if (data.tables && data.tables.length > 0) {
      data.tables.forEach((item) => {
        item.fields.forEach((item2) => {
          if (this.isSelect(_selects, item2.field)) {
            let newValObj = this.findObj(
              item2.fieldValue,
              _selects[item2.field]
            );
            if (newValObj) {
              item2.fieldValue = newValObj[Object.keys(newValObj)[0]];
            }
          }
        });
      });
    }
  }
  return data;
}

// 判断是否为对象
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function refresh() {
  setTimeout(() => {
    this.$router.go(0);
  }, 1000);
}

function validateForms(formRefs) {
  let objectList = [];
  let results = formRefs.map(formRef =>
    new Promise((resolve, reject) => {
      formRef.validate((valid, object) => {
        if (valid) {
          resolve();
        } else {
          objectList.push(object);
          reject();
        }
      });
    })
  )
  return Promise.all(results).catch(() => {
    return Promise.reject(objectList);
  });
}

async function getZbbzSelects() {
  let [zb, zbgc, jdzzq] = await Promise.all([
    axios.get(api.zbSelect.url, { params: { currentPage: 1, pageSize: 10 } }).catch((err) => { console.log(err) }),
    axios.get(api.zbgcList.url, { params: { currentPage: 1, pageSize: 10 } }).catch((err) => { console.log(err) }),
    axios.get(api.jdzzqList.url, { params: { currentPage: 1, pageSize: 10 } }).catch((err) => { console.log(err) })
  ])
  return { zb: zb.data.data, zbgc: zbgc.data.data, jdzzq: jdzzq.data.data }
}

async function getZbSelect() {
  let zb = await new Promise((resolve, reject) => {
    resolve(axios.get(api.zbSelect.url, { params: { currentPage: 1, pageSize: 10 } }).catch((err) => { reject(err) }))
  })
  return { zb: zb.data.data };
}


export {
  getRequestUrl,
  getSelectUrl,
  isNm,
  isSelect,
  isMultiSelect,
  dateParse,
  findObj,
  generateDeleteData,
  isObject,
  getPath,
  refresh,
  validateForms,
  getZbbzSelects,
  getZbSelect
}
