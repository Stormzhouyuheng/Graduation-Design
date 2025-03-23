<template>
    <div class="personal-operate">
        <div class="left">
            <el-menu
                :default-active="active"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item v-for="(item, index) in routerInfo.routerMessage" :key="index" :index="item.permission_name">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.permission_name }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <div class="right-title" v-if="Object.keys(routerInfo).length > 0">
                <!-- {{ active }}
                {{ routerInfo }} -->
                <div v-if="routerInfo.role[0].role_name === '学生'">
                    <StudentInfo 
                        v-if="active === '学生信息'"
                        :userId="routerInfo.user_id"/>
                    <StudentTaskManage 
                        v-if="active === '任务管理'"
                        :userId="routerInfo.user_id"/>
                    <HireInfo
                        v-if="active === '招聘信息'"
                        :userId="routerInfo.user_id"/>
                </div>
                <div v-if="routerInfo.role[0].role_name === '企业'">
                </div>
                <div v-if="routerInfo.role[0].role_name === '教师'">
                    <TaskManage
                        v-if="active === '任务管理'"
                        :userId="routerInfo.user_id" />
                    <StudentManage
                        v-if="active === '学生管理'"
                        :userId="routerInfo.user_id" />
                </div>
                <div v-if="routerInfo.role[0].role_name === '管理员'">
                    <ManageStudent
                        v-if="active === '学生信息'"
                        :userId="routerInfo.user_id" />
                    <ManageTeacher
                        v-if="active === '教师信息'"
                        :userId="routerInfo.user_id" />
                    <ManageCompany
                        v-if="active === '企业信息'"
                        :userId="routerInfo.user_id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
// 学生
import StudentInfo from '@/views/student/studentInfo.vue'
import StudentTaskManage from '@/views/student/taskManage.vue'
import HireInfo from '@/components/HireInfo/index.vue'
// 教师
import TaskManage from '@/views/teacher/taskManage.vue'
import StudentManage from '@/views/teacher/studentManage.vue'
// 管理员
import ManageStudent from '@/views/manager/manageStudent.vue'
import ManageTeacher from '@/views/manager/manageTeacher.vue'
import ManageCompany from '@/views/manager/manageCompany.vue'
export default {
    name: 'PersonalOperate',
    data() {
        return {
            routerInfo: {},
            active: ''
        }
    },
    components: {
        StudentInfo,
        StudentTaskManage,
        HireInfo,
        
        TaskManage,
        StudentManage,

        ManageStudent,
        ManageTeacher,
        ManageCompany
    },
    methods: {
        handleSelect(index, indexPath) {
            this.active = index;
            // console.log('index', index, 'indexPath', indexPath);
        }
    },
    mounted() {
        this.routerInfo = JSON.parse(Cookies.get('routerInfo'));
        this.active = this.routerInfo.routerMessage[0].permission_name;
    }
}
</script>

<style lang="scss" scoped>
.personal-operate {
    width: 100%;
    display: flex;
    // background-color: red;
}
.el-menu {
    background: none;
}
.left {
    width: 25%
}
.right {
    width: 75%;
    padding: 30px;
}
</style>