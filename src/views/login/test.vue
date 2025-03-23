<template>
    <div class="login">
        <div class="in">
            <!-- <div class="login-left">
                <img :src="logo"
                     alt="">
                <h3 class="title">{{title}}</h3>
            </div> -->

            <div class="login-title">
                <img :src="logo" alt="" />
                <h3 class="title">{{ title }}</h3>
            </div>

            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
            >
                <!-- <h3 class="title">登录</h3> -->

                <el-form-item prop="user_id">
                    <div class="line"></div>
                    <el-input
                        v-model="loginForm.user_id"
                        type="text"
                        auto-complete="off"
                        placeholder="请输入用户名"
                    >
                        <svg-icon
                            slot="prefix"
                            icon-class="user"
                            class="el-input__icon input-icon"
                        />
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <div class="line"></div>
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="请输入密码"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon
                            slot="prefix"
                            icon-class="password"
                            class="el-input__icon input-icon"
                        />
                    </el-input>
                </el-form-item>

                <!-- <el-form-item prop="code">
                    <div class="line"></div>
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="请输入验证码"
                        style="width: 63%"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon
                            slot="prefix"
                            icon-class="validCode"
                            class="el-input__icon input-icon"
                        />
                    </el-input>
                    <div class="login-code">
                        <img
                            :src="codeUrl"
                            @click="getCode"
                            class="login-code-img"
                        />
                    </div>
                </el-form-item> -->

                <!-- <div class="checkItems">
                    <el-checkbox
                        v-model="loginForm.rememberMe"
                        style="color: #fff"
                        >记住密码</el-checkbox
                    >
                    <div>ip登录</div>
                    <el-button type="primary" size="mini" @click="ipLogin"
                        >ip登录</el-button
                    >
                    <el-checkbox
                        v-model="loginForm.ipLogin"
                        style="color: #fff"
                        >ip登录</el-checkbox>
                </div> -->

                <el-button
                    :loading="loading"
                    size="medium"
                    type="primary"
                    style="width: 100%"
                    class="login-btn"
                    :style="{ background: theme, border: 'none' }"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form>
            <!--  底部  -->
            <div class="el-login-footer">
                <!-- Copyright © 2020 水情中心 All Rights Reserved. -->
                Copyright © 2025 周新宇 All Rights Reserved.
            </div>
        </div>
    </div>
</template>

<script>
// import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
// import { encrypt, decrypt } from "@/utils/jsencrypt";
// import { mapGetters } from "vuex";
// import { getToken, setToken, removeToken } from "@/utils/auth";
// import { removeItem } from "@/utils/localStorage";

import { login } from '@/api/login'
import { constantRoutes, baseRoutes } from "@/router";
import Layout from '@/layout'
export default {
    name: "Login",
    
    data() {
        return {
            title: '学生实习就业管理系统',
            codeUrl: "",
            cookiePassword: "",
            loginForm: {
                username: "",
                password: "",
                rememberMe: false,
                code: "",
                uuid: "",
                // ipLogin: false
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "用户名不能为空",
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "密码不能为空",
                    },
                ],
                code: [
                    {
                        required: true,
                        trigger: "change",
                        message: "验证码不能为空",
                    },
                ],
            },
            loading: false,
            redirect: undefined,
            logo: require("../../assets/logo.png")
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    computed: {
        // ...mapGetters(["isIplogin"]),
    },
    // created() {
    //     this.getCode();
    //     this.getCookie();
    // },
    computed: {
        theme() {
            return this.$store.state.settings.theme;
        },
    },
    methods: {
        // getCode() {
        //     getCodeImg().then((res) => {
        //         this.codeUrl = "data:image/gif;base64," + res.img;
        //         this.loginForm.uuid = res.uuid;
        //     });
        // },
        // getCookie() {
        //     const username = Cookies.get("username");
        //     // const password = Cookies.get("password");
        //     const rememberMe = Cookies.get("rememberMe");
        //     this.loginForm = {
        //         username:
        //             username === undefined ? this.loginForm.username : username,
        //         rememberMe:
        //             rememberMe === undefined ? false : Boolean(rememberMe),
        //     };
        // },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // console.log('this.loginForm', this.loginForm);
                    login(this.loginForm)
                    .then(res => {
                        if(res.code === '000' || res.code === '001') {
                            return this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        console.log('res', res);
                        // 将路由信息存储到cookie中
                        // this.handleCookie(res)
                        Cookies.set('routerInfo', res);
                        this.$router.push({ path: '/website' });
                    }).finally(() =>{
                        this.loading = false;
                    })
                    
                    // if (this.loginForm.rememberMe) {
                    //     Cookies.set("username", this.loginForm.username, {
                    //         expires: 30,
                    //     });
                    //     Cookies.set(
                    //         "password",
                    //         encrypt(this.loginForm.password),
                    //         { expires: 30 }
                    //     );
                    //     Cookies.set("rememberMe", this.loginForm.rememberMe, {
                    //         expires: 30,
                    //     });
                    // } else {
                    //     Cookies.remove("username");
                    //     Cookies.remove("password");
                    //     Cookies.remove("rememberMe");
                    // }
                    // this.$store
                    //     .dispatch("Login", this.loginForm)
                    //     .then(() => {
                    //         this.$router
                    //             .push({ path: this.redirect || "/home" })
                    //             .catch(() => {});
                    //     })
                    //     .catch(() => {
                    //         this.loading = false;
                    //         this.getCode();
                    //     });
                }
            });
        },
        handleCookie(router) {
            const currentValue = Cookies.get('routerInfo');

            if (currentValue !== undefined) {
                Cookies.set('routerInfo', router);
            } else {
                // 不存在则新增（示例：初始值）
                Cookies.set('routerInfo', router);
            }
        }
        // ipLogin() {
        //     if (getToken()) {
        //         removeToken();
        //     }
        //     this.loading = true;
        //     this.$store
        //         .dispatch("IpLogin")
        //         .then(() => {
        //             removeItem("logout")
        //             this.$router
        //                 .push({ path: this.redirect || "/home" })
        //                 .catch(() => {});
        //         })
        //         .catch(() => {
        //             this.loading = false;
        //         });
        // },
    },
    // mounted() {
    //     console.log('mounted => constantRoutes.length', constantRoutes.length)
    // }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.checkItems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}
::v-deep .checkItems .el-button .el-button--primary .el-button--mini {
    padding: 0;
    // height: 15px;
}
// ::v-deep .el-checkbox__input.is-checked .el-checkbox__label {
//     color: #fff !important;
// }
@keyframes loginmove {
    0%,
    10% {
        opacity: 0;
        transform: translate(-50%, -55%);
    }

    100%,
    50% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

.login {
    height: 100%;
    // background-image: url("../assets/images/bg1.png");
	background-image: url("../../assets/schoolgate.jpeg");
    background-size: cover;

    .in {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        /* width: 100%; */
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        animation: loginmove 1s ease-out;
    }

    .el-checkbox__inner {
        border: 1px solid #074c84 !important;

        background: #04477f !important;
    }
}

.login-title {
    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    padding-right: 30px;

    h3 {
        font-size: 30px;
        color: #fff;
        text-shadow: 
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000; /* 四个方向的阴影 */;
    }

    img {
        height: 60px;
        width: 60px;
        margin-right: 15px;
    }
}

.login-left {
    opacity: 1;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    width: 450px;

    height: 500px;

    /* background-image: url("../assets/images/login-background.jpg"); */

    background-size: cover;

    border-radius: 10px 0 0 10px;

    img {
        width: 64px;
        height: auto;
    }
}

.login-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 12px;
    background: rgba($color: #075594, $alpha: 0.5);
    width: 450px;
    // height: 395px;
    height: 280px;
    padding: 33px 24px;
    -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
                90%, rgba(10, 51, 103, 0.3));

    .el-input--prefix .el-input__inner {
        padding-left: 80px !important;
    }

    .el-input {
        position: relative;
        width: 400px;
        height: 50px;
        border: 1px solid #1269ae;
        /* padding-left: 25px; */

        input {
            color: #fff;
            height: 48px;
            background: #074c84;
            border: none;
            transition: all 0.2s;

            &:focus {
                /* transform: scale(1.05); */
            }
        }
    }

    .input-icon {
        position: absolute;
        left: 18px;
        height: 50px;
        width: 20px;
        color: #bcdbe2;
    }

    .line {
        position: absolute;
        left: 60px;
        top: 14px;

        width: 2px;

        height: 24px;

        background: #a5b3be;

        border: none;

        z-index: 2;
    }
}

.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.el-login-footer {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -180px;
    text-align: center;
    width: 450px;
    height: 40px;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
}

.login-code-img {
    height: 48px;
}

.login-btn {
    height: 60px;

    background: #2473bd !important;

    font-size: 16px !important;
}

@media (max-width: 1024px) {
    .login-left {
        opacity: 0;

        width: 0;

        transition: all 0.3s;
    }

    .login-form {
        border-radius: 10px;
    }
}
</style>
