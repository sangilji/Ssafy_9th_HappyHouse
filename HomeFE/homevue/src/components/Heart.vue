<template>
  <div>
    <house-header></house-header>
    <house-banner></house-banner>
    <h1>내가 찜한 매물</h1>
    <div class="d-flex justify-content-center" style="text-align: -webkit-center;">
      <div class="row">
        <house-list-item
          v-for="(interest, index) in interestList"
          :key="index"
          v-bind="interest"
          :index="index"
          :houseList="interestList"
          :isInterest="true"
          @moveHouseDetail="move"
        >
        </house-list-item>
      </div>
    </div>
    <house-footer></house-footer>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import HouseHeader from "@/components/HouseHeader.vue";
import HouseFooter from "@/components/layout/HouseFooter.vue";
import HouseListItem from "@/components/house/HouseListItem";
import HouseBanner from "./layout/HouseBanner.vue";

const memberStore = "memberStore";
const interestStore = "interestStore";
export default {
  name: "HeartView",
  data() {
    return {
      fields: [
        { key: "apartmentName", label: "아파트이름", tdClass: "tdClass" },
        { key: "address", label: "아파트주소", tdClass: "tdAddress" },
        { key: "aptCode", label: "아파트코드", tdClass: "tdClass" },
        { key: "housecomment", label: "아파트설명", tdClass: "tdClass" },
      ],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(interestStore, ["interestList"]),
    // message() {
    //   if (this.article.content) return this.article.content.split("\n").join("<br>");
    //   return "";
    // },
  },
  components: {
    HouseHeader,
    HouseBanner,
    HouseFooter,
    HouseListItem
  },
  methods:{
    ...mapMutations("dealInfoStore", ["SET_HOUSE"]),
    async move(house){
      await this.SET_HOUSE(house);
      console.log(house);
      await this.$router.push("/map").catch((error) => console.log(error));
    }
  }
};
</script>

<style scoped>
h1 {
  color: #494949;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
  text-align: center;
}
</style>
