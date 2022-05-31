/*
* @Author: stephen
* @Date:   2022-05-31 15:27:44
* @Last Modified by:   stephen
* @Last Modified time: 2022-05-31 15:47:23
*/

'use strict'
require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');

var nav = {
	init : function(){
		this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
	},
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//Sign up
		$('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //Exit
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
	},

	//Loading User INFO
	loadUserInfo : function(){
		_user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
	},
	
	// 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();