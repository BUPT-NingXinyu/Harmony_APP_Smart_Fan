import http from '@ohos.net.http';
import prompt from '@system.prompt';
var cloud_url = "根据实际情况填写";
var api_key = "根据实际情况填写"

export default {
    data: {
        title: "",
        state: "0",
        buttonText: "开灯"
    },
    onInit() {
        this.title = this.$t('strings.world');

    },
    switchChange(e){
        if(e.checked){
            this.onclick()
            prompt.showToast({
                message: "风扇已开启"
            });
        }else{
            this.onclick()
            prompt.showToast({
                message: "风扇已关闭"
            });
        }
    },

    onclick: function() {
        console.log(this.state)
        if (this.state == "0"){
            this.state = "1"
            this.post(cloud_url, api_key, "1")
            this.buttonText = "关灯"
        } else {
            this.state = "0"
            this.post(cloud_url, api_key, "0")
            this.buttonText = "开灯"
        }
    },

    post(url,api_key,state) {
        // 每一个httpRequest对应一个http请求任务，不可复用
        let httpRequest = http.createHttp();
        // 用于订阅http响应头，此接口会比request请求先返回。可以根据业务需要订阅此消息
        // 从API 8开始，使用on('headersReceive', Callback)替代on('headerReceive', AsyncCallback)。 8+
        //        httpRequest.on('headersReceive', (header) => {
        //            console.info('header: ' + JSON.stringify(header));
        //        });
        console.log('post')
        httpRequest.request(
            // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
            url,
            {
                method: http.RequestMethod.POST, // 可选，默认为http.RequestMethod.GET
                // 开发者根据自身业务需要添加header字段
                header: {
                    'api-key': api_key,
                    'Content-Type': 'application/json'
                },
                // 当使用POST请求时此字段用于传递内容
                extraData: {
                    'ledSwitch': state
                },
                connectTimeout: 60000, // 可选，默认为60s
                readTimeout: 60000, // 可选，默认为60s
            }, (err, data) => {
            if (!err) {
                // data.result为http响应内容，可根据业务需要进行解析
                console.log(data)
                console.info('Result:' + data.result);
                console.info('code:' + data.responseCode);
                // data.header为http响应头，可根据业务需要进行解析
                console.info('header:' + JSON.stringify(data.header));
                console.info('cookies:' + data.cookies); // 8+
            } else {
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        }
        );

    }

}



