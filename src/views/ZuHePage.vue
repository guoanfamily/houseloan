<template>
  <div>
    <group v-show="!showsRatePage && !showgRatePage">
      <x-input  title="商业贷款:"  placeholder="请输入贷款总额" v-model="sloanMoney">
        <span slot="right">万元</span>
      </x-input>
       <popup-picker  :data="sloanYearsList" title="商业贷款按揭年数:"  v-model="sloanYear" style="text-align:left">
      </popup-picker>
      <x-input  title="公积金贷款:"  placeholder="请输入贷款总额" v-model="gloanMoney">
        <span slot="right">万元</span>
      </x-input>
       <popup-picker  :data="gloanYearsList" title="公积金贷款按揭年数" v-model="gloanYear"  style="text-align:left">
      </popup-picker>
        <cell is-link @click.native="srateClick">
        <span slot="title"><span>商业利率:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{sshowRate}}</span></span>
      </cell>
      <cell is-link @click.native="grateClick">
        <span slot="title"><span>公积金利率:</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{gshowRate}}</span></span>
      </cell>
      <x-button style="margin: 20px auto; width: 95%;" type="warn" @click.native="caculateLoan">开始计算</x-button>
    </group>
    <MoneyRate v-show="showsRatePage" class="payRate" @submit="sRateSubmit" :baseRate="sbaseRate"></MoneyRate>
    <MoneyRate v-show="showgRatePage" class="payRate" @submit="gRateSubmit" :baseRate="gbaseRate"></MoneyRate>
  </div>
</template>
<script>
import MoneyRate from "../components/MoneyRate"
import {PopupPicker, XInput, Group, Cell, XButton } from "vux";
export default {
  components: {
    MoneyRate,
    PopupPicker,
    XInput,
    Group,
    Cell,
    XButton,
  },
  mounted(){
    let initalLoanYears=[];
    for (let i=1;i<31;i++){
      initalLoanYears.push(i+"年"+"("+i*12+"期)")
    }
    this.sloanYearsList.push(initalLoanYears);
    this.gloanYearsList.push(initalLoanYears);
  },
  data() {
    return {
      sloanMoney:50,
      gloanMoney:50,
      sloanYearsList:[],
      sloanYear:["20年(240期)"],
      gloanYearsList:[],
      gloanYear:["20年(240期)"],
      sshowRate:'4.90%',
      gshowRate:'3.25%',
      sactRate:'0.049',
      gactRate:'0.0325',
      showsRatePage:false,
      showgRatePage:false,
    };
  },
  computed: {
    syears () {
      const month = this.sloanYear[0].match(/\((\S*)\)/);
      return parseInt(month[1].substr(0,month[1].length-1) / 12);
    },
    gyears () {
      const month = this.gloanYear[0].match(/\((\S*)\)/);
      return parseInt(month[1].substr(0,month[1].length-1) / 12);
    },
    sbaseRate () {
      if (this.syears <= 1) {
        return 4.35 / 100
      } else if (this.syears <= 5) {
        return 4.75 / 100
      }

      return 4.9 / 100
    },
    gbaseRate () {
      if (this.gyears <= 5) {
        return 2.75 / 100
      }

      return 3.25 / 100
    },
  },
  methods:{
      caculateLoan() {
      let smonth = this.sloanYear[0].match(/\((\S*)\)/);
      let smonths = smonth[1].substr(0,smonth[1].length-1);
      let gmonth = this.gloanYear[0].match(/\((\S*)\)/);
      let gmonths = gmonth[1].substr(0,gmonth[1].length-1);
      this.$router.push({
        path: "/ZuhePayment",
        query: {
        sloanMoney:this.sloanMoney,//商业贷款总额
        gloanMoney:this.gloanMoney,//公积金贷款总额
        smonths:smonths,//商业贷款年限
        gmonths:gmonths,//公积金贷款年限
        srate:this.sactRate,//商业贷款利率
        grate:this.gactRate,//公积金贷款利率
         }
      });
    },
    sRateSubmit(showValue,actRate){
      this.showsRatePage=false;
      this.showgRatePage=false;
      this.sshowRate = showValue;
      this.sactRate = actRate
    },
    gRateSubmit(showValue,actRate){
      this.showsRatePage=false;
      this.showgRatePage=false;
      this.gshowRate = showValue;
      this.gactRate = actRate;
    },
    srateClick(){
      this.showsRatePage = true;
    },
    grateClick(){
      this.showgRatePage = true;
    },
  }
};
</script>
<style>
.payRate{
  position: absolute;
  top:0;
  bottom: 0;
  background-color: #ffffff
}
</style>
