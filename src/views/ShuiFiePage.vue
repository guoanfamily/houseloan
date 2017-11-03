<template>
  <div>
       <button-tab v-model="demo01" style="padding:15px;">
        <button-tab-item @on-item-click="consoleIndex()">新房</button-tab-item>
        <button-tab-item @on-item-click="consoleIndex()">二手房</button-tab-item>
      </button-tab>
      <div v-show="index == 0">
          <NewHouse></NewHouse>
      </div>
      <div v-show="index == 1">
          <SecondHouse></SecondHouse>
      </div>
  </div>
</template>
<script>
import { ButtonTab, ButtonTabItem } from 'vux';
import NewHouse from './NewHouse';
import SecondHouse from './SecondHouse';
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    NewHouse,
    SecondHouse
  },
  data(){
      return{
         index: 0,
         demo01:0
      }
  },
   methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01);
      this.index = this.demo01;
    }
  },
}
</script>

