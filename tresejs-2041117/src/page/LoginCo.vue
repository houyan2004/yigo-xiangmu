<script setup>
// 导入 TresJS 相关组件和 Three.js 常量
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { OrbitControls, Html } from "@tresjs/cientos";
import { NoToneMapping, SRGBColorSpace, TextureLoader, NormalBlending} from "three";
import {onMounted, ref} from "vue";
import Login from "../components/Login.vue";
import Car from "../components/Car.vue";
// 配置 WebGL 渲染器
const gl = {
  clearColor: "#000000", // 背景色
  shadows: true, // 启用阴影
   alpha: false, // 不使用透明背景
  outputColorSpace: SRGBColorSpace, // 输出颜色空间
  toneMapping: NoToneMapping, // 不使用色调映射
  depthTest: true // 启用深度测试
}
// 定义天空中的点参数
const para = {
  count: 1000, // 点的数量
  size: 0.5, // 点的大小
  color: "#ffff00" // 点的颜色
}

const initSky = () => {
  const vertices = new Float32Array(para.count * 3) // 创建顶点数组
  for (let i = 0; i < para.count; i++) {
    const i3 = i * 3
    vertices[i3] = (Math.random() - 0.5) * 100 // x 坐标
    vertices[i3 + 1] = (Math.random() - 0.5) * 100 // y 坐标
    vertices[i3 + 2] = (Math.random() - 0.5) * 100 // z 坐标
  }
  return vertices
}

const sakuraTexture = ref(null);
const position = ref(initSky());

const loadTexture = async () => {
  const loader = new TextureLoader();
  let texture = null;
  try {
    texture = await new Promise((resolve, reject) => {
      loader.load(
        'pic/113.png',
        (texture) => {
          texture.needsUpdate = true;
          resolve(texture);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
    sakuraTexture.value = texture;
    console.log("Texture loaded: ", sakuraTexture);
  } catch (error) {
    console.error("Texture loading failed:", error);
  }
};

onMounted(async () => {
  await loadTexture()
})



// 获取渲染循环钩子
const { onLoop } = useRenderLoop()

// 创建一个响应式变量来引用天空中的点
const MySky = ref(null)

// 在每个渲染帧中旋转天空中的点
onLoop(({ delta }) => {
  if (MySky.value) {
    const geometry = MySky.value.geometry
    const positions = geometry.attributes.position.array

    for (let i = 2; i < positions.length; i += 3) {
      positions[i] -= delta * 20; // 每帧减少Z坐标值
      if (positions[i] < -40) { // 如果点移出屏幕，则从右边重新出现
        positions[i] = 40;
      }
    }

    geometry.attributes.position.needsUpdate = true; // 标记位置属性需要更新
  }


})

</script>
<template>
  <!-- 创建 TresCanvas 组件，配置 WebGL 渲染器 -->
  <TresCanvas window-size class="TresCanvas" v-bind="gl">
    <!-- 创建透视相机 -->
    <TresPerspectiveCamera :position="[12, 10, 20]" :look-at="[0, 0, 0]" />
    <Suspense>
          <Car></Car>
    </Suspense>
    <!-- 创建轨道控制，允许用户通过鼠标操作相机 -->
    <OrbitControls
        :min-distance="1"
      :max-distance="50"
      :min-azimuth-angle="-Math.PI/12"
      :max-azimuth-angle="Math.PI/12"
    />
    <!-- 创建环境光 -->
    <TresAmbientLight intensity='10' />
    <TresDirectionalLight
        :color='[0.14, 0.5, 1]'
        :intensity='50'
        :angle='0.6'
        :penumbra="12"
        :position='[10, 10, 0]'
    />
<Suspense v-if="sakuraTexture">
   <TresPoints
      ref="MySky"
    >
      <TresBufferGeometry
        :position="[position, 3]"
      />
      <TresPointsMaterial
        :map="sakuraTexture"
        :size="para.size"
        :sizeAttenuation="true"
        transparent
        :opacity="1.0"
        :alphaTest="0.5"
        :depthWrite="true"
        :blending="NormalBlending"
      />
    </TresPoints>
  </Suspense>

    <Html center transform :distance-factor="10" :position="[10, 0, 0]" :scale="[1.2, 1.2, 1.2] "  :render-order="1" >
      <Login />
    </Html>
  </TresCanvas>
  </template>
<style scoped>
/* 这里可以添加样式，当前没有样式 */
</style>
