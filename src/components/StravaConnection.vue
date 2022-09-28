<script >

import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      athleteInfo: null,
      state: null,
      error: null,
      code: null
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
  },
  methods: {
    fetchData() {

      this.loading = true;
      this.athleteInfo=null;
      this.state=null;
      this.error=null;
      this.code=null;

      if (this.$route.query.error) {
        this.error = this.$route.query.error
      } else if (this.$route.query.code) {
        this.code = this.$route.query.code;

        axios
            .get("http://localhost:3000/get-strava-token?code="+this.code)
            .then(
                response => {
                  this.loading = true;
                  this.athleteInfo = response.data;
                  console.log("token: " + this.athleteInfo)
                }
            )
            .catch(error => console.log(error));

      }
      this.state = this.$route.query.state
    },
  },
}
</script>

<template>
  <div>

    <div v-if="error" >
      <div class="alert alert-danger" role="alert">
        Stava replied with {{ error }}. Did you authorized mytrainings?
      </div>
    </div>

    <div v-if="athleteInfo" class="alert alert-primary">

      <div class="card" style="width: 15rem;">
        <img v-bind:src="athleteInfo.athlete.profile" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{athleteInfo.athlete.firstname}} {{athleteInfo.athlete.lastname}}</h5>
          <p class="card-text">Athlete from {{athleteInfo.athlete.country}}</p>
          <a href="#" class="btn btn-primary">Go to the trainings</a>
        </div>
      </div>

    </div>
  </div>
</template>