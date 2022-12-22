#include <stdio.h>
#include <unistd.h>
#include "MQTTClient.h"
#include "onenet.h"

#include "stdio.h"
#include "ohos_init.h"
#include "cmsis_os2.h"
#include "iot_gpio.h"

#define ONENET_INFO_DEVID "根据实际情况填写"
#define ONENET_INFO_AUTH "根据实际情况填写"
#define ONENET_INFO_APIKEY "根据实际情况填写"
#define ONENET_INFO_PROID "根据实际情况填写"
#define ONENET_MASTER_APIKEY "根据实际情况填写"

#define LED_TEST_GPIO 9 // for hispark_pegasus
#define MOTOR_TEST_GPIO 12


void onenet_cmd_rsp_cb(uint8_t *recv_data, size_t recv_size, uint8_t **resp_data, size_t *resp_size)
{
    printf("recv data is %.*s\n", recv_size, recv_data);
    printf("recv_data is %c\n", recv_data[14]);
    
    if(recv_data[14]=='1')
    {
    	IoTGpioSetDir(LED_TEST_GPIO, 1);
    	IoTGpioSetDir(MOTOR_TEST_GPIO, 1);
    }
    if(recv_data[14]=='0'){
    	IoTGpioSetDir(LED_TEST_GPIO, 0);
    	IoTGpioSetDir(MOTOR_TEST_GPIO, 0);
    }

    *resp_data = NULL;
    *resp_size = 0;
}

int onenet_test(void)
{
	
    device_info_init(ONENET_INFO_DEVID, ONENET_INFO_PROID, ONENET_INFO_AUTH, ONENET_INFO_APIKEY, ONENET_MASTER_APIKEY);
    onenet_mqtt_init();

    onenet_set_cmd_rsp_cb(onenet_cmd_rsp_cb);

	return 0;
}
