# 使用腾讯云函数实现报表自动提交
## Version 2.0
支持自动登录
https://github.com/windiboy/AutoReport.git
---
## 操作步骤
### 获取需要提交的信息
使用chromium浏览器，打开并登录[疫情防控通](https://app.upc.edu.cn/ncov/wap/default/index)。
如果无法获取定位，可以参考[Chrome 自定位置](https://blog.csdn.net/u010844189/article/details/81163438)。
在页面中填好全部信息之后，打开`F12`控制台，输入`vm.save()`，然后查看`network`标签中的`save`项。点击后查看`Headers`标签，点击`Form Data`右侧的`view source`，复制备用。
### 获取Server酱的API Key实现微信推送
打开[Server酱主页](http://sc.ftqq.com/3.version)，按照页面指示获取Key并绑定微信，复制Key备用。
### 代码文件准备
下载本仓库的代码，修改`Index.js`中的代码，使用上述准备的内容替换对应内容即可，修改完后打包即可。
### 新建云函数
这里以腾讯云为例，进入[腾讯云函数页面](https://console.cloud.tencent.com/scf)，点击侧栏的`函数服务`，新建一个函数。
函数名称随意，运行环境选择`Nodejs12.16`，创建方式选择`空白函数`即可，点击完成。
选择`函数代码`标签，提交方法选择`本地上传zip包`，上传方式选择`在线安装依赖`，选择`保存并测试`。成功的话转下一步，失败的话请检查相关字符串是否正确。
### 设置触发器
选择左侧`触发管理`，创建一个新的触发器。选择`定时触发`，出发周期自定义，自己根据想要自动提交的时间输入Cron数据即可。推荐使用`0 1 0,8 * * * *`即可，该触发时间为每天的0:01和8:01，防止因为系统或某方面原因而失败。
	
