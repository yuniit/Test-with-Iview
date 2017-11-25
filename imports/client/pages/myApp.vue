<template>
    <div>
        <div class="layout">
            <Menu mode="horizontal" theme="dark" active-name="1" class="nav">
                <div class="nav-brand">
                    <a href="#" class="brand-text">Test IviewUI</a>
                </div>
                <div class="layout-nav">
                    <MenuItem name="1" class="nav-item">
                    <Icon type="clipboard"></Icon>
                    <a href="#" class="menu-item-link" style="margin-left:-6px;"> LEARN</a>
                    </MenuItem>
                    <MenuItem name="1" class="nav-item">
                    <Icon type="compose"></Icon>
                    <a href="#" class="menu-item-link" style="margin-left:-6px;"> PLAN</a>
                    </MenuItem>
                    <MenuItem name="1" class="nav-item">
                    <Icon type="person-stalker"></Icon>
                    <a href="#" class="menu-item-link" style="margin-left:-6px;"> DO</a>
                    </MenuItem>
                    <MenuItem name="1" class="nav-item">
                    <Icon type="arrow-graph-up-right"></Icon>
                    <a href="#" class="menu-item-link" style="margin-left:-6px;">GROW</a>
                    </MenuItem>
                </div>
            </Menu>

            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <BreadcrumbItem href="#">____</BreadcrumbItem>
                    <BreadcrumbItem href="#">____</BreadcrumbItem>
                    <BreadcrumbItem href="#">____</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <h1 align="center">Customer Form</h1>
                <row :gutter="16" style="margin :20px 0">
                    <i-col span="12" offset="5">
                        <i-form :model="customerForm" ref="customerForm" :rules="customerRule" :label-width="90">
                            <row :gutter="16">
                                <i-col span="22">
                                    <form-item label="Name" prop="name">
                                        <i-input type="text" v-model="customerForm.name"></i-input>
                                    </form-item>
                                </i-col>
                                <i-col span="12">
                                    <form-item label="Gender" prop="gender">
                                        <i-select v-model="customerForm.gender" placeholder="Select gender">
                                            <i-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value">
                                            </i-option>
                                        </i-select>
                                    </form-item>
                                </i-col>
                                <i-col span="12">
                                    <form-item label="Date of birth" prop="dob">
                                        <date-picker type="date" v-model="customerForm.dob" format="dd/MM/yyyy" placeholder="Select birthdey">
                                        </date-picker>
                                    </form-item>
                                </i-col>
                                <i-col span="22">
                                    <form-item label="Email" prop="email">
                                        <i-input type="text" v-model="customerForm.email">
                                        </i-input>
                                    </form-item>
                                </i-col>
                                <i-col span="22">
                                    <form-item label="Address" prop="address">
                                        <i-input type="textarea" :autosize="{minRows:3,maxRows: 5}" v-model="customerForm.address">
                                        </i-input>
                                    </form-item>
                                </i-col>
                                <i-col span="22">
                                    <form-item label="Tel" prop="tel">
                                        <i-input type="text" v-model="customerForm.tel">
                                        </i-input>
                                    </form-item>
                                </i-col>
                            </row>
                            <i-button type="primary" @click="handleAddCustomer()" style="margin-left:90px;">Submit</i-button>
                            <i-button type="dashed" @click="handleResetCustomerForm()" style="float:right;margin-right:50px;">Reset</i-button>
                        </i-form>
                    </i-col>
                </row>
                <row :gutter="16">
                    <i-col span="20" offset="2">
                        <i-table :columns="cusTableColumn" size="default" :data="customerData" border>
                        </i-table>
                    </i-col>
                </row>
            </div>
            <div class="layout-copy">
                <p>Test IviewUI</p>
            </div>
        </div>
    </div>
</template>
<script>
import Customer from '../../api/collections/customers';
export default {
    name: 'app',
    data() {
        return {
            customerForm: {
                name: '',
                gender: '',
                dob: '',
                email: '',
                address: '',
                tel: ''
            },
            customerRule: {
                name: [
                    { required: true, message: '' }
                ],
                gender: [
                    { required: true, message: '' }
                ],
                dob: [
                    { required: true, message: '' }
                ],
                email: [
                    { required: true, message: '' }
                ],
                address: [
                    { required: true, message: '' }
                ],
                tel: [
                    { required: true, message: '' }
                ]
            },
            genderList: [
                {
                    label: 'Male',
                    value: 'Male'
                },
                {
                    label: 'Famale',
                    value: 'Famale'
                }
            ],
            customerData: [],
            cusTableColumn: [
                {
                    title: 'Name',
                    key: 'name',
                    width: 170
                },
                {
                    title: 'Gender',
                    key: 'gender',
                    width: 100
                },
                {
                    title: 'Date of  birth',
                    key: 'dob',
                    width: 170
                },
                {
                    title: 'Email',
                    key: 'email',
                    width: 175
                },
                {
                    title: 'Adress',
                    key: 'address',
                    width: 180
                },
                {
                    title: 'Tel',
                    key: 'tel',
                    width: 150
                },
                {
                    title: 'Remove',
                    key: 'removeCus',
                    width: 110,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('i-button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                on: {
                                    click: () => {
                                        this.removeCustomer(params.row);
                                    }
                                },
                            }, 'Delete')
                        ]);
                    }
                },
            ]
        }
    },
    created() {
        this.callCustomers();
    },
    methods: {
        handleAddCustomer() {
            let data = {
                name: this.customerForm.name,
                gender: this.customerForm.gender,
                dob: this.customerForm.dob,
                email: this.customerForm.email,
                address: this.customerForm.address,
                tel: this.customerForm.tel,
            }
            this.$refs.customerForm.validate((val) => {
                if (val) {
                    this.$Loading.start();
                    Meteor.call('insertCustomers', data, (err, res) => {
                        if (!err) {
                            this.callCustomers();
                            this.$Loading.finish();
                            this.$Message.success({
                                content: 'Costumer add complete .',
                            });
                            this.handleResetCustomerForm();
                        }
                    })
                }
                else {
                    this.$Message.warning({
                        content: 'Costumer add incomplete !!',
                    })
                    setTimeout(() => {
                        this.handleResetCustomerForm();
                    }, 2000);
                }
            })
        },
        callCustomers() {
            Meteor.call('findCustomers', (err, res) => {
                if (!err) {
                    this.customerData = res;
                }
            })
        },
        removeCustomer(row) {
            this.$Modal.confirm({
                title: 'Remove',
                content: '<p>Are you sure to remove this one ?</p>',
                onOk: () => {
                    this.$Loading.start();
                    Meteor.call('removeCustomer', row._id, (err, res) => {
                        if (!err) {
                            this.callCustomers();
                            this.$Loading.finish();
                            this.$Message.success({
                                content: 'Customer remove completed !',
                                duration: 5,
                            });
                        }
                    })
                },
                onCancel: () => {
                    this.$Loading.start();
                    setTimeout(() => {
                        this.$Loading.error();
                        this.$Message.warning({
                            content: 'Customer remove canceled !',
                            duration: 5,
                        });
                    }, 1500);
                }
            });
        },
        handleResetCustomerForm() {
            this.$refs.customerForm.resetFields();
        },
        dateFormat: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY");
        },
    },
}
</script>
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.nav {
    background: #FB8C00;
}

.nav-brand {
    width: 150px;
    height: 80%;
    background: #FAFAFA;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10%;
    left: 20px;
    text-align: center;
    position: relative;
    line-height: 50px;
}

.brand-text {
    font-size: 23px;
    color: #F57C00;
}

.brand-text:hover {
    color: #FFA726;
    text-decoration: underline;
}

.nav-item {
    width: auto;
    height: 60px;
    font-size: 15px;
    text-align: center;
}

.menu-item-link {
    color: #fff;
}

.menu-item-link:hover {
    text-decoration: underline;
}

.layout-nav {
    width: 100%;
    margin: 0 auto;
    padding-left: 60%;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 100%;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.ivu-btn-primary {
    background-color: #F57C00;
    border: 1px solid #F57C00;
    font-size: 13px;
    border-radius: 1px;
}

.ivu-btn-primary:hover {
    background-color: #FFA726;
    border: 1px solid #FB8C00;
    font-size: 13px;
}
</style>