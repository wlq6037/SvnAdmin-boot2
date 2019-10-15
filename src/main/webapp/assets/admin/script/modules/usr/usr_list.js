/**
 * 用户列表页面
 * @author Hpboys
 * @version 1.0.0
 */
define(function(require, exports, module){
	//引入模块
	require('$');
	var util = require('util');
	var layer = require('layer');
	var template = require('template');
	var constant = require('constant');
	var pageService = require('page_service');

	var pageBean = pageService.init({
		url: 'usrList?action=data',
		isPagination: false,
		after:function(data){
			_scope.view.reBindEvent();
		}
	});

	//页面请求域
	var _scope = {
		view:{
			init:function(){
				$('#addBtn').on('click', function(){
					$('#submitForm')[0].reset();
					_scope.view.addDialog();
				});
			},
			reBindEvent:function(){
				$('.btn-watch').on('click', function(){
					var usr = $(this).attr('data-id');
					_scope.methods.watchUserRight(usr);
				});
				$('.btn-remove').on('click', function(){
					var usr = $(this).attr('data-id');
					_scope.methods.removeUser(usr);
				});
				$('.btn-update').on('click', function(){
					var usr = $(this).attr('data-id');
					//_scope.view.showUpdateDialog(data);
					_scope.methods.searchUser(usr);
				});
			},
			addDialog:function(){
				_scope.view.initData({});
				//用户编辑层
				layer.open({
					type: 1
					,title: '创建用户'
					,area: ['650px', '350px']
					,shade: [0.3, '#393D49']
					,content: $('#submitForm')
				});
			},
			showUpdateDialog:function(data){
				_scope.view.initData(data);
				//用户编辑层
				layer.open({
					type: 1
					,title: '更新用户'
					,area: ['650px', '350px']
					,shade: [0.3, '#393D49']
					,content: $('#submitForm')
				});
			},
			initData:function(data){
				$("#usr").val(data.usr);
				$("#name").val(data.name);
				$("#psw").val(data.psw);
				$("#role").val(data.role);
				if(JSON.stringify(data)=='{}'){
					$("#usr").removeAttr("readonly");
				}else{
					$("#usr").attr("readonly","readonly");
				}
			}
		},
		methods:{
			submitForm:function(){
				var form = util.serializeObject($('#submitForm'));
				var load_index = util.loading();
				$.post('usrCreateHandler',form,function(data){
					util.showMsg(data.info);
					if(data.status){
						layer.closeAll();
						pageBean.reload();
					}
				});
				return false;
			},
			removeUser:function(usr){
				util.confirm({
					msg: '您确定删除用户 “'+usr+'” 吗?',
					confirm:function(){
						// 请求
						$.post('usrRemoveHandler', {"usr" : usr}, function(data){
							if(data.status){
								pageBean.reload();
								util.showMsg(data.info);
							}else{
								util.showMsg(data.info, 3);
							}
						});
						// 关闭弹窗
						layer.closeAll();
					}
				});
			},
			watchUserRight:function(usr){
				pageService.init({
					url: 'usrRightList?action=data&usr='+usr,
					isPagination: false,
					tplId: 'resListView',
					tplContainer: '#resTplContainer',
					intercept:function(data){
						data.resRightStatus = constant.resRightStatus;
						return data;
					},
					after:function(data){
						//用户权限查看层
						layer.open({
							type: 1
							,title: '用户资源权限列表'
							,area: ['700px', '450px']
							,shade: [0.3, '#393D49']
							,shadeClose: true
							,content: $('#userRightList')
						});
					}
				});

			},
			searchUser:function(usr){
				// 请求
				$.post('usrSearchHandler', {"usr" : usr}, function(data){
					if(data.status){
						//util.showMsg(data.info);
						_scope.view.showUpdateDialog(data.info);
					}else{
						util.showMsg(data.info, 3);
					}
				});
			}
		}
	};

	_scope.view.init();
	//暴露方法到Window
	window.submitForm = _scope.methods.submitForm;
	
});



