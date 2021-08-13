let logger;

class Example {
    constructor({ rdappnodelogger }) {
        logger = rdappnodelogger;
    }

    /**
     * init example
     * @param {Object} option 配置项
     * @param {ip} option.ip localhost ip
     * @param {port} option.port 9000 port
     * @param {env} option.env 'browser','node'
     * @param {logLevel} option.logLevel 0,1,2 日志级别：0：all 1：info & error & warn 2：none
     * @param {requestTimeout} option.requestTimeout 请求超时时间，默认为5秒
     * @param {isWaitForLogin} option.isWaitForLogin 是否等待超时
     * @returns {boolean} init result
     */
    async init() {
        logger.info(`${trace()} [init:%j]`, {});
        return true;
    }

    /**
     * 执行查询工作
     * @param {Object} {} 传入工作描述对象
     * @param {Object} jobInfo 工作基本信息，详看Demo jobInfo
     * @param {function} subscriber 工作回调，参数详看Demo subscriber
     * @returns {Object} 返回查询到的工作数据
     * @example
     * const jobInfo = {
     *   Name: 'job_name_in_das',
     *   Parameters: {
     *     parameter01: 'string parameter',
     *     parameter02: Date(),
     *   },
     * };
     *
     * const subscriber = (msg, data) => {
     *   _log.get(this)('rd: subscriber -> msg', msg, data);
     * };
     *
     * // execute
     * var jobData = executeJob({ jobInfo, subscriber })
     */
    async executeJob({ jobInfo, subscriber }) {
        logger.debug(`${trace()} [jobInfo:%j]`, jobInfo);
        logger.debug(`${trace()} [has subscriber:%j]`, subscriber === null);
        return "executeJob succeed.";
    }

    /**
     * 工作参数变更
     * @param {Object} parameter 变更参数
     * @returns {boolean} 返回执行结果
     * @example
     * const parameter = {
     *   JobId: '48675067',
     *   Parameters: {
     *     parameter01: 'string parameter',
     *     parameter02: Date(),
     *   },
     * };
     *
     * // execute
     * var result = updateJobParameter(parameter)
     */
    async updateJobParameter(parameter) {
        logger.debug(`${trace()} [parameter:%j]`, parameter);
        return "updateJobParameter succeed.";
    }

    /**
     * 取消工作回调
     * @param {object} jobInfo 需传入到executeJob的参数对象jobInfo
     * @returns {boolean} 取消执行结果
     */
    async unSubscribeJob(jobInfo) {
        logger.debug(`${trace()} [jobInfo:%j]`, jobInfo);
        return "unSubscribeJob succeed.";
    }

    /**
     * 销毁
     * @returns {void}
     */
    async dispose() {
        logger.info(`${trace()} [dispose:%j]`, {});
    }
}

module.exports = Example;
