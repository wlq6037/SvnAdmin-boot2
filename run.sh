#!/bin/bash
#������滻Ϊ���Լ���ִ�г������������������
APP_NAME=svnadmin-boot2.jar
APP_PATH=/data/svnadmin
LOG_NAME=svnadmin.log
#ʹ��˵����������ʾ�������
usage() {
 echo "Usage: sh �ű���.sh [start|stop|restart|status]"
 exit 1
}
  
#�������Ƿ�������
is_exist(){
 pid=`ps -ef|grep $APP_NAME|grep -v grep|awk '{print $2}' `
 #��������ڷ���1�����ڷ���0 
 if [ -z "${pid}" ]; then
 return 1
 else
 return 0
 fi
}
  
#��������
start(){
 is_exist
 if [ $? -eq "0" ]; then
 echo "${APP_NAME} is already running. pid=${pid} ."
 else
 nohup java -jar $APP_PATH/$APP_NAME > $APP_PATH/logs/$LOG_NAME 2>&1 &
 echo "${APP_NAME} start success"
 fi
}
  
#ֹͣ����
stop(){
 is_exist
 if [ $? -eq "0" ]; then
 kill -9 $pid
 else
 echo "${APP_NAME} is not running"
 fi
}
  
#�������״̬
status(){
 is_exist
 if [ $? -eq "0" ]; then
 echo "${APP_NAME} is running. Pid is ${pid}"
 else
 echo "${APP_NAME} is NOT running."
 fi
}
  
#����
restart(){
 stop
 start
}
  
#�������������ѡ��ִ�ж�Ӧ��������������ִ��ʹ��˵��
case "$1" in
 "start")
 start
 ;;
 "stop")
 stop
 ;;
 "status")
 status
 ;;
 "restart")
 restart
 ;;
 *)
 usage
 ;;
esac