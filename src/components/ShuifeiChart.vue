<template>
<div style="margin-top:10px;text-align: center;width:220px;transform: translateZ(0px);">
  <canvas ref="canvas" width="160" height="160"></canvas>
  <div style="">
    <p class="houseMoney">
        <span></span>
        <span>{{totalHousePrice.name}}</span>
        <span>:</span>
        <span>{{totalHousePrice.value}}</span>
        <span>万元</span>
    </p>
    <ul>
      <li class="houseMoney" v-for="item in ringList" :key="item.name">
        <span :style="{color:item.color}">▇</span>
        <span>{{item.name}}</span>
        <span>:</span>
        <span>{{item.value}}</span>
        <span>元</span>
      </li>
    </ul>
    <p class="houseMoney">
        <span></span>
        <span>{{totalPrice.name}}</span>
        <span>:</span>
        <span>{{totalPrice.value}}</span>
        <span>元</span>
    </p>
  </div>
</div>
</template>
<script>
export default {
  props: {
    ringList:"",
    totalHousePrice: "",
    totalPrice:""
  },
  data() {
    return {
      chartColor: false,
      aniend: 0,
      ctx: null,
      startarc: 0,
      endarc: 0,
      aniid:"",
      drawList: [],
      drawCount: 0,
      rcolor: "#ff0000",
      maxEndArc:0
    };
  },
  watch: {
    ringList() {
      console.log("watch");
      this.ctx = this.$refs.canvas.getContext("2d");
      this.drawlist(this.ringList);
    }
  },
  methods: {
    drawlist(numList) {
      let totalNum = 0;
      numList.map(num => {
        totalNum += ~~num.value;
      });

      let startvalue = 0;
      this.drawList = [];
      numList.map(num => {
        let dnum = Math.ceil(~~num.value / totalNum * 100)-1;
        this.maxEndArc= dnum>this.maxEndArc?dnum:this.maxEndArc;
        this.drawList.push({
          startarc: startvalue,
          endarc: dnum,
          rcolor: num.color
        });
        startvalue += dnum+1;
      });
      //初始化参数
      window.cancelAnimationFrame(this.aniid); //可以取消该次动画。
      this.drawCount = 0;
      this.startarc = 0;
      this.aniend = 0;
      this.endarc = 0;
      this.rcolor = "#ff0000";
      this.drawAniRing();
    },
    drawAniRing() {
      this.aniid = window.requestAnimationFrame(this.drawAniRing);
      this.aniend += 2;
      this.ctx.clearRect(0, 0, 160, 160);
      this.drawText(this.ctx, "");
      this.drawList.map(drawitem=>{
        let drawEnd = this.aniend;
        drawEnd=Math.round(drawitem.endarc/this.maxEndArc*drawEnd)
        this.drawRing(this.ctx, drawitem.startarc,
        drawEnd, drawitem.rcolor);
      })
      if (this.aniend >= this.maxEndArc) {       
          window.cancelAnimationFrame(this.aniid); //可以取消该次动画。
          return;
      }
    },
    drawRingBorder(ctx){
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle ="#000000"; // rcolor;
      
      ctx.arc(
        80,
        80,
        38,
        -90 * Math.PI / 180,
        (360 - 90) * Math.PI / 180
      );
      ctx.arc(
        80,
        80,
        76,
        -90 * Math.PI / 180,
        (360 - 90) * Math.PI / 180
      );
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    drawRing(ctx, s, e, rcolor) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 36;
      ctx.strokeStyle = rcolor; // rcolor;
      //设置开始处为0点钟方向(-90 * Math.PI / 180)
      //x为百分比值(0-100)
      let endarc = s + e;
      if (endarc > 99) endarc = 99;
      ctx.arc(
        80,
        80,
        58,
        (s * 3.6 - 90) * Math.PI / 180,
        (endarc * 3.6 - 90) * Math.PI / 180
      );
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    drawText(ctx, showText) {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#83868f";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("参考税金", 80, 80);
      ctx.fillText(showText, 80, 95);
    }
  }
};
</script>


