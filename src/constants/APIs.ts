/**
 * 此文件保存项目中使用的所有API的URL
 * 动态部分使用:开头，如 /user/:id/dashboard id部分使用 fillURL 等工具填充为自定义值
 * 如有返回值必须声明返回值类型，本页即API文档
 * */
/* Utils */
import { GET } from '@/utils/request';


/*
* Example
* */
export type TYPE_RETURN = {
  timestamp: Timestamp;
  status: number;
};
export const API_EXAMPLE = () => GET<TYPE_RETURN>`/api`();
