<template>

  <div style="padding-top: 20px;padding-left:100px;padding-right:100px;">
    <button-tab>
        <button-tab-item selected>等额本息</button-tab-item>
        <button-tab-item>等额本金</button-tab-item>       
    </button-tab>
    <p class="disctext">{{lineOne}}</p>
    <RingChart></RingChart>
    
  </div>

</template>
<script>
import { ButtonTab, ButtonTabItem, Divider } from "vux";
import RingChart from "../components/RingChart"
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    RingChart
  },  
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      console.log(echarts);
     
      
    }
  },
  data() {
    return {
      lineOne: "每月还款额固定，所还总利息较多，适合收入稳定者。",
    }
  }
};
</script>
<style>
.disctext {
  color: #b3b6be;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  padding: 0 20px;
}
</style>

