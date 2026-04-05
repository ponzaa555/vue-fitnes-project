<script setup>
import Welcome from './components/pages/Welcome.vue';
import Layout from './components/layouts/Layout.vue';
import Dashboard from './components/pages/Dashboard.vue';
import Workout from './components/pages/Workout.vue';
import { computed, onMounted, ref } from 'vue';
import { workoutProgram } from './utils';

const defaultData = {}
for(let workoutIdx in workoutProgram){
   const workoutData = workoutProgram[workoutIdx]
   // Loop thought workout
   defaultData[workoutIdx] = {} // initial workout data

   // loop thought workout
   for(let e of  workoutData.workout){
      defaultData[workoutIdx][e.name] = ''
   }
}

const selectedDisplay = ref(1)
const data =ref(defaultData) // {1...30 : {exercise: '',...}}
const selectWorkout = ref(-1)

const isWorkoutComplete = computed(() => {
   const currWorkout = data.value?.[selectWorkout.value];
   if(!currWorkout) {return false} 

   /*
      - Object.values convert value object to list
      - every is apply function to all element then if false return all check all element and return to
      - !! convert value to string
    */
   const isCompleteCheck = Object.values(currWorkout).every(ex => !!ex);
   console.log("ISCOMPLETE: " , isCompleteCheck)
   return isCompleteCheck
})

const firstIncompleteWorkoutIndex = computed(() => {
   const allWorkout = data.value
   if(!allWorkout) return -1

   // loop thought workout find first one that incomplete
   // Object.entries return key,value
   for(const[index , workout] of Object.entries(allWorkout)){
      const isComplete = Object.values(workout).every(ex => !!ex);

      if(!isComplete){
         return parseFloat(index)
      }
   }
   return -1 // All complete
})

function handleChangeDisplay(idx){
   selectedDisplay.value = idx;
}

function handleSelectWorkout(idx){
   // Show the workout and disappear other 
   selectedDisplay.value = 3;
   selectWorkout.value = idx;
}

function handleSaveWorkout(){
   // save the current data snap short to local storage
   localStorage.setItem('workout' , JSON.stringify(data.value))

   // show dashboard
   selectedDisplay.value = 2;

   // deselect workout
   selectWorkout.value = -1;
}

function handleResetPlan(){
   selectedDisplay.value = 2;
   selectWorkout.value = -1;
   data.value = defaultData;
   localStorage.removeItem('workout')
}

onMounted(() => {
   if(!localStorage) {return}
   if(localStorage.getItem('workout')){
      // JSON.parse convert json to object
      const saveData = JSON.parse(localStorage.getItem('workout'))
      data.value = saveData
      selectedDisplay.value = 2
      
   }
})

</script>

<template>
   <Layout>
      <!-- PAGE 1 -->
    <Welcome :handleChangeDisplay="handleChangeDisplay" v-if="selectedDisplay == 1"/>
    <!-- PAGE 2  -->
     <Dashboard :handleResetPlan="handleResetPlan" :handleSelectWorkout="handleSelectWorkout" :firstIncompleteWorkoutIndex="firstIncompleteWorkoutIndex" v-if="selectedDisplay == 2"/>
     <!-- PAGE3 -->
      <Workout :handleSaveWorkout="handleSaveWorkout" :isWorkoutComplete="isWorkoutComplete" :selectedWorkout="selectWorkout" :data="data" v-if="workoutProgram?.[selectWorkout]"/>
   </Layout>
</template>

<style lang="scss" scoped>

</style>