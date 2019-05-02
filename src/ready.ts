type ReadyConfig = {};

//todo: 添加需要加载的环境变量
const actions: Array<Promise<any>> = [];

export default (config?: ReadyConfig) => Promise.all(actions);
