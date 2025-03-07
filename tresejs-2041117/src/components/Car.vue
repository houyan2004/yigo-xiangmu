<template>
  <primitive :object="scene" ></primitive>
</template>

<script setup>
import {useGLTF} from '@tresjs/cientos'
import {useRenderLoop} from "@tresjs/core";

const {scene} = await useGLTF('/models/car/model/scene.gltf')
scene.scale.set(0.03, 0.03, 0.03)
console.log(scene)
scene.position.set(-6,-3,0)


const sudu = 100;
const {onLoop}  = useRenderLoop()
onLoop(({elapsed})=>{
  const group = scene.children[0].children[0].children[0]
  group.children[0].rotation.x = elapsed*sudu
  group.children[2].rotation.x = elapsed*sudu
  group.children[4].rotation.x = elapsed*sudu
  group.children[6].rotation.x = elapsed*sudu
})


</script>

<style scoped>

</style>