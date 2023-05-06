<script lang="ts">
	import {
		defineComponent,
		computed,
		watch,
		onMounted,
		ref,
		reactive,
		onBeforeUnmount,
	} from "vue";

	import * as THREE from "three";
	import * as TWEEN from "@tweenjs/tween.js";
	import $store from "../store/index";
	import Result from "../hooks/result";
	import {
		ElMessage
	} from 'element-plus'
	import ThinkingSelect from "./ThinkingSelect.vue";
	// import { setTimeout } from "timers/promises";
	export default defineComponent({
		name: "bssembling",
		components: {
			ThinkingSelect,
		},
		props: {
			player: Object,
		},
		setup(props, {
			emit
		}) {
			let nowType = ref("");
			let btnType = ref("");
			let topicNum = ref(0);
			let speed = ref(0.01);
			let runState: any = [];
			let leftContent = ref("装配调试实训任务");
			let topic = ref((window as any).topic);
			let showMenu = ref(false);
			let waitPageShow = ref(false);
			let questionPageShow = ref(false);
			let bigType = $store.state.bigType;

			let animateSwitch = ref(false);

			function goBack() {
				let p = {
					name: '装配调试',
					score: score.value
				}
				// console.log('上传',p)
				if (bigType !== "教学演示") {
					alert(`您本次实训成绩为：${p.score}分`, )
				}
				emit("back", p);
			}
			// todo: 折叠面板
			let isFold = ref(false);
			const changeNum = (num: number): void => {
				topicNum.value = num;
			};
			let player: any = (window as any).player;
			let j1: any = player.scene.getObjectByName("j1");
			let j2: any = player.scene.getObjectByName("j2");
			let j3: any = player.scene.getObjectByName("j3");
			let j4: any = player.scene.getObjectByName("j4");
			let j5: any = player.scene.getObjectByName("j5");
			let j6: any = player.scene.getObjectByName("j6");
			let showHelp = ref(true);
			let showlr = ref(false);

			let home: any = player.scene.getObjectByName("home");


			let j63: any = player.scene.getObjectByName("j6-3");
			let xp: any = player.scene.getObjectByName("xp");

			// let j63: any = player.scene.getObjectByName("j6-3");
			let cpugaizitou: any = player.scene.getObjectByName("cpugaizitou");
			cpugaizitou.visible = false;
			let cputou: any = player.scene.getObjectByName("cputou");
			cputou.visible = false;
			let cpugaizi: any = player.scene.getObjectByName("cpugaizi");
			cpugaizi.visible = false;
			let cpugaizikong: any = player.scene.getObjectByName("cpugaizikong");
			cpugaizikong.visible = true
			let cpu1: any = player.scene.getObjectByName("cpu1");
			cpu1.visible = true;
			let cpu2: any = player.scene.getObjectByName("cpu2");
			cpu2.visible = true;
			let cpu3: any = player.scene.getObjectByName("cpu3");
			cpu3.visible = false;
			let chengpintou: any = player.scene.getObjectByName("chengpintou");
			chengpintou.visible = false
			let chengpin: any = player.scene.getObjectByName("chengpin");
			chengpin.visible = true
			let chengpin2: any = player.scene.getObjectByName("chengpin2");
			chengpin2.visible = false
			// debugger
			onMounted(() => {
				nowType.value = "A";
				emit("changeTopicNum", topicNum.value);

				let redBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				let blueBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				let a885 = player.scene.getObjectByName("___NONE");

				const redBox = new THREE.Mesh(
					new THREE.BoxGeometry(100, 100, 100),
					new THREE.MeshBasicMaterial({
						color: 0xffffff
					}) //red box
				);
				redBox.name = "redBox";
				redBox.material.transparent = true;
				redBox.material.opacity = 0.01;
				redBbox.setFromObject(a885); //Object885
				const redBoxHelper = new THREE.BoxHelper(redBox, 0xffffff);
				// redBoxHelper.material.transparent = true
				player.redBbox = redBbox;
				// redBox.add(redBoxHelper);
				j6.add(redBox);
				const blueBox = new THREE.Mesh(
					new THREE.BoxGeometry(10, 10, 10),
					new THREE.MeshBasicMaterial({
						color: 0xffffff
					}) //BLUE box
				);
				blueBox.name = "blueBox";
				blueBox.material.transparent = true;
				blueBox.material.opacity = 0.01;
				blueBox.position.set(-14.5, 12, -4.5);
				blueBox.scale.set(0.4, 0.1, 0.2);
				blueBbox.setFromObject(blueBox);
				const blueBoxHelper = new THREE.BoxHelper(blueBox, 0x000000);
				player.blueBbox = blueBbox;

				player.scene.add(blueBox);
			});

			const m = new THREE.Matrix4();

			m.set(1, 0, 0, 650,
				0, 1, 0, 0,
				0, 0, 1, 1250,
				0, 0, 0, 1);

			let mx = 750
			let my = 0
			let mz = 1250
			let mxx = 0;
			let myx = 0;
			let mzx = 0;
			let m12 = 0
			let m13 = 0
			let m14 = 0

			function transformRobot(arr: any) {
				//先申请内存，后面务必释放。
				let Module = (window as any).Module
				var offset = Module._malloc(8 * 16);
				var i_EndPosture = Module.HEAPF64.subarray(offset / 8, offset / 8 + 16);
				//testing values
				i_EndPosture[0] = arr[0];
				i_EndPosture[1] = arr[1];
				i_EndPosture[2] = arr[2];
				i_EndPosture[3] = arr[3];
				i_EndPosture[4] = arr[4];
				i_EndPosture[5] = arr[5];
				i_EndPosture[6] = arr[6];
				i_EndPosture[7] = arr[7];
				i_EndPosture[8] = arr[8];
				i_EndPosture[9] = arr[9];
				i_EndPosture[10] = arr[10];
				i_EndPosture[11] = arr[11];
				i_EndPosture[12] = arr[12];
				i_EndPosture[13] = arr[13];
				i_EndPosture[14] = arr[14];
				i_EndPosture[15] = arr[15];


				let Calculate_Robot = Module.cwrap('Calculate_Robot', 'number', ['number']);

				//数组大小固定为16
				var result = Calculate_Robot(1, 16, offset);
				//打印结果。结果还是存放在原来的数组中，前6位就是
				console.log(`The result  is ${result}`);
				console.log(`The arr  is ${arr}`)
				console.log(`This 1st joint is ${i_EndPosture[0]}`);
				console.log(`This 2nd joint is ${i_EndPosture[1]}`);
				console.log(`This 3rd joint is ${i_EndPosture[2]}`);
				console.log(`This 4th joint is ${i_EndPosture[3]}`);
				console.log(`This 5th joint is ${i_EndPosture[4]}`);
				console.log(`This 6th joint is ${i_EndPosture[5]}`);
				if (result === 0) {
					ElMessage.error('超出机器人可达范围!')

				} else {
					j1.rotation.z = i_EndPosture[0];
					j2.rotation.x = i_EndPosture[1];
					j3.rotation.x = i_EndPosture[2];
					j4.rotation.y = i_EndPosture[3];
					j5.rotation.x = -i_EndPosture[4];
					j6.rotation.y = i_EndPosture[5];
				}

				//务必释放内存
				Module._free(offset);
			}

			function upDown(type: string) {
				// debugger
				if (nowType.value === "A") {
					// debugger
					switch (type) {
						case "left":
							if (j1.rotation.z > 2) return;
							j1.rotation.z = j1.rotation.z - 0.01;
							break;
						case "right":
							if (j1.rotation.z < -2) return;
							j1.rotation.z = j1.rotation.z + 0.01;
							break;
						case "up":
							if (j2.rotation.x > 0.87) return;
							j2.rotation.x = j2.rotation.x + 0.01;
							break;
						case "down":
							if (j2.rotation.x < -0.87) return;
							j2.rotation.x = j2.rotation.x - 0.01;
							break;
							//new
						case "leftTop":
							if (j1.rotation.z > 2 || j2.rotation.x > 0.87) return;
							j1.rotation.z = j1.rotation.z + 0.01;
							j2.rotation.x = j2.rotation.x + 0.01;
							break;
						case "rightTop":
							if (j1.rotation.z < -2 || j2.rotation.x > 0.87) return;
							j1.rotation.z = j1.rotation.z - 0.01;
							j2.rotation.x = j2.rotation.x + 0.01;
							break;
						case "leftBottom":
							if (j1.rotation.z > 2 || j2.rotation.x < -0.87) return;
							j1.rotation.z = j1.rotation.z + 0.01;
							j2.rotation.x = j2.rotation.x - 0.01;
							break;
						case "rightBottom":
							if (j1.rotation.z < -2 || j2.rotation.x < -0.87) return;
							j1.rotation.z = j1.rotation.z - 0.01;
							j2.rotation.x = j2.rotation.x - 0.01;
							break;

						case "r1":
							if (j3.rotation.x > 1) return;
							j3.rotation.x = j3.rotation.x - 0.01;
							break;
						case "r2":
							if (j3.rotation.x < -1) return;
							j3.rotation.x = j3.rotation.x + 0.01;
							break;
					}
				} else if (nowType.value === "B") {
					switch (type) {
						case "left":
							if (j4.rotation.y > 1) return;
							j4.rotation.y = j4.rotation.y + 0.01;
							break;
						case "right":
							if (j4.rotation.y < -1) return;
							j4.rotation.y = j4.rotation.y - 0.01;
							break;
						case "up":
							// if (j5.rotation.x > 2) return
							j5.rotation.x = j5.rotation.x + 0.01;
							break;
						case "down":
							// if (j5.rotation.x < -0.05) return
							j5.rotation.x = j5.rotation.x - 0.01;
							break;

						case "leftTop":
							if (j4.rotation.y > 1 || j5.rotation.x > 1.6) return;
							j4.rotation.y = j4.rotation.y + 0.01;
							j5.rotation.x = j5.rotation.x + 0.01;
							break;
						case "rightTop":
							if (j4.rotation.y < -1 || j5.rotation.x > 1.6) return;
							j4.rotation.y = j4.rotation.y - 0.01;
							j5.rotation.x = j5.rotation.x + 0.01;
							break;
						case "leftBottom":
							if (j4.rotation.y > 1 || j5.rotation.x < -0.05) return;
							j4.rotation.y = j4.rotation.y + 0.01;
							j5.rotation.x = j5.rotation.x - 0.01;
							break;
						case "rightBottom":
							if (j4.rotation.y < -1 || j5.rotation.x < -0.05) return;
							j4.rotation.y = j4.rotation.y - 0.01;
							j5.rotation.x = j5.rotation.x - 0.01;
							break;

						case "r1":
							if (j6.rotation.y > 2) return;
							j6.rotation.y = j6.rotation.y + 0.01;
							break;
						case "r2":
							if (j6.rotation.y < -2) return;
							j6.rotation.y = j6.rotation.y - 0.01;
							break;
					}
				} else if (nowType.value === "C") {

					// let mx = 750
					// let my = 0
					// let mz = 1250



					console.log('m.elements', m.elements)

					switch (type) {
						case "left":
							// actionsNum--;
							// if (actionsNum < 0) {
							//   actionsNum = 0;
							// }
							// animateState(arrY[actionsNum], 500);
							my -= 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)
							break;
						case "right":
							// actionsNum++;
							// if (actionsNum > 4) {
							//   actionsNum = 4;
							// }
							// animateState(arrY[actionsNum], 500);
							my += 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)

							break;
						case "up":
							// actionsNum++;
							// if (actionsNum > 4) {
							//   actionsNum = 4;
							// }
							// animateState(arrX[actionsNum], 500);
							mz += 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)
							break;
						case "down":
							// actionsNum--;
							// if (actionsNum < 0) {
							//   actionsNum = 0;
							// }
							// animateState(arrX[actionsNum], 500);
							mz -= 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)
							break;

						case "leftTop":
							break;
						case "rightTop":
							break;
						case "leftBottom":
							break;
						case "rightBottom":
							break;

						case "r1":
							// actionsNum--;
							// if (actionsNum < 0) {
							//   actionsNum = 0;
							// }
							// animateState(arrZ[actionsNum], 500);
							mx -= 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)
							break;
							break;
						case "r2":
							// actionsNum++;
							// if (actionsNum > 4) {
							//   actionsNum = 4;
							// }
							// animateState(arrZ[actionsNum], 500);
							mx += 5
							m.makeTranslation(mx, my, mz)
							transformRobot(m.elements)
							break;
							break;
					}
				} else if (nowType.value === "D") {
					switch (type) {
						case "left":
							// actionsNum--;
							// if (actionsNum < 0) {
							//   actionsNum = 0;
							// }
							// animateState(arrCY[actionsNum], 500);
							mxx -= 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationX(mxx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							// let pingyiM = m.makeTranslation(mx, my, mz)
							// xuanzhuanM.copyPosition(pingyiM)
							// console.log('+++++++++++++++++', xuanzhuanM)
							transformRobot(m.elements)
							break;
						case "right":
							// actionsNum++;
							// if (actionsNum > 4) {
							//   actionsNum = 4;
							// }
							// animateState(arrCY[actionsNum], 500);
							mxx += 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationX(mxx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							transformRobot(m.elements)
							break;
						case "up":
							// actionsNum++;
							// if (actionsNum > 4) {
							//   actionsNum = 4;
							// }
							// animateState(arrCX[actionsNum], 500);
							myx += 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationY(myx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							transformRobot(m.elements)
							break;
						case "down":
							// actionsNum--;
							// if (actionsNum < 0) {
							//   actionsNum = 0;
							// }
							// animateState(arrCX[actionsNum], 500);
							myx -= 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationY(myx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							transformRobot(m.elements)
							break;

						case "leftTop":
							break;
						case "rightTop":
							break;
						case "leftBottom":
							break;
						case "rightBottom":
							break;

						case "r1":
							// if (j6.rotation.y > 2) return;
							// j6.rotation.y = j6.rotation.y + 0.01;
							mzx += 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationZ(mzx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							transformRobot(m.elements)
							break;
						case "r2":
							// if (j6.rotation.y < -2) return;
							// j6.rotation.y = j6.rotation.y - 0.01;
							mzx -= 0.01
							m12 = m.elements[12]
							m13 = m.elements[13]
							m14 = m.elements[14]
							m.makeRotationZ(mzx)
							m.elements[12] = m12
							m.elements[13] = m13
							m.elements[14] = m14
							transformRobot(m.elements)
							break;
					}
				}

				// console.log( j4.rotation.x)
				player.renderer.render(player.scene, player.camera);
			}

			const switchTypeImg = computed(() => {
				switch (nowType.value) {
					case "A":
						return `background-image: url( "./clickOpen1-3.png" )`;
						break;
					case "B":
						return `background-image: url( "./clickOpen4-6.png" )`;
						break;
					case "C":
						return `background-image: url( "./clickOpenxian.png" )`;
						break;
					case "D":
						return `background-image: url( "./clickOpenchong.png" )`;
						break;
					case "Ato":
						return `background-image: url( "./actionMode1-3.png" )`;
						break;
					case "Bto":
						return `background-image: url( "./actionMode4-6.png" )`;
						break;
					case "Cto":
						return `background-image: url( "./actionModexian.png" )`;
						break;
					case "Dto":
						return `background-image: url( "./actionModechong.png" )`;
						break;
				}
			});

			const topicOneImg = computed(() => {
				// console.log(topicNum.value);
				switch (topicNum.value) {
					case 0:
						return `background-image: url( "./assembling/t0.png"  )`;
						break;
					case 2:
						return `background-image: url( "./assembling/t1.png"  )`;
						break;
					case 4:
						return `background-image: url( "./assembling/t2.png"  )`;
						break;
					case 5:
						return `background-image: url( "./assembling/b1.png"  )`;
						break;
					case 6:
						return `background-image: url( "./assembling/b2.png"  )`;
						break;
					case 7:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 8:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 9:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 10:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 11:
						return `background-image: url( "./assembling/x0.png"  )`;
						break;
					case 13:
						return `background-image: url( "./assembling/x1.png"  )`;
						break;
					case 15:
						return `background-image: url( "./assembling/x2.png"  )`;
						break;
					case 17:
						return `background-image: url( "./assembling/x3.png"  )`;
						break;
					case 18:
						return `background-image: url( "./assembling/x4.png"  )`;
						break;
					case 19:
						return `background-image: url( "./assembling/x5.png"  )`;
						break;
					case 20:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 21:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 22:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 23:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
						// case 10:
						//     return `background-image: url( "./assembling/t5.png"  )`;
						//     break;
					case 24:
						return `background-image: url( "./assembling/s1.png"  )`;
						break;
					case 26:
						return `background-image: url( "./assembling/s2.png"  )`;
						break;
					case 28:
						return `background-image: url( "./assembling/s3.png"  )`;
						break;
					case 30:
						return `background-image: url( "./assembling/s4.png"  )`;
						break;
					case 32:
						return `background-image: url( "./assembling/s5.png"  )`;
						break;
					case 33:
						return `background-image: url( "./assembling/s6.png"  )`;
						break;
					case 34:
						return `background-image: url( "./assembling/s7.png"  )`;
						break;
					case 35:
						return `background-image: url( "./assembling/s8.png"  )`;
						break;
					case 36:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 37:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
						// case 38:
						//     return `background-image: url( "./assembling/s11.png"  )`;
						//     break;
						//
					case 39:
						return `background-image: url( "./assembling/c1.png"  )`;
						break;
					case 41:
						return `background-image: url( "./assembling/c2.png"  )`;
						break;
					case 43:
						return `background-image: url( "./assembling/c3.png"  )`;
						break;
					case 45:
						return `background-image: url( "./assembling/c4.png"  )`;
						break;
					case 46:
						return `background-image: url( "./assembling/c5.png"  )`;
						break;
					case 47:
						return `background-image: url( "./assembling/c6.png"  )`;
						break;
					case 48:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 49:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 50:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
					case 51:
						return `background-image: url( "./assembling/pp.png"  )`;
						break;
				}
			});

			function switchAction() {
				if (nowType.value === "A") {
					nowType.value = "Ato";
				} else if (nowType.value === "B") {
					nowType.value = "Bto";
				} else if (nowType.value === "C") {
					nowType.value = "Cto";
				} else if (nowType.value === "D") {
					nowType.value = "Dto";
				}
			}

			function switchZhou(type: string) {
				nowType.value = type;
				// if (type === "D") {
				//   topicNum.value = 34
				// }
			}

			function start(type: string) {
				btnType.value = type;
				animateSwitch.value = true;
			}

			function end() {
				animateSwitch.value = false;
			}

			function setLeftContent(type: string) {
				leftContent.value = type;
				showMenu.value = false;
			}

			function getRobotPosition() {
				let arr = [];
				arr = [
					j1.rotation.z,
					j2.rotation.x,
					j3.rotation.x,
					j4.rotation.y,
					j5.rotation.x,
					j6.rotation.y,
				];
				// console.log(arr);
				return arr;
			}
			(window as any).getRobotPosition = getRobotPosition;
			// function run(arr: Array<Array<number>>, during: number) {
			//   setState(arr, 0);
			//   setTimeout(() => {
			//     animateState(arr, 1, during);
			//   }, 1000);
			// }
			function setState(arr: Array < number > ) {
				j1.rotation.z = arr[0];
				j2.rotation.x = arr[1];
				j3.rotation.x = arr[2];
				j4.rotation.y = arr[3];
				j5.rotation.x = arr[4];
				j6.rotation.y = arr[5];
				player.renderer.render(player.scene, player.camera);
			}

			function animateState(
				arr: Array < number > ,
				during: number,
				complete ? : Function
			) {
				new TWEEN.Tween(j1.rotation)
					.to({
						z: arr[0]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(j2.rotation)
					.to({
						x: arr[1]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(j3.rotation)
					.to({
						x: arr[2]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(j4.rotation)
					.to({
						y: arr[3]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(j5.rotation)
					.to({
						x: arr[4]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(j6.rotation)
					.to({
						y: arr[5]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.onComplete(() => {
						if (complete) complete();
					})
					.start();
			}

			let timer: any = null;
			watch(animateSwitch, (newValue, oldValue) => {
				if (animateSwitch.value) {
					// upDown(btnType.value)
					timer = setInterval(() => {
						upDown(btnType.value);
					}, 50);
				} else {
					clearInterval(timer);
					let redBox: any = player.scene.getObjectByName("redBox");
					let blueBox: any = player.scene.getObjectByName("blueBox");
					player.redBbox.setFromObject(redBox);
					player.blueBbox.setFromObject(home);
					if (topicNum.value === 1) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-0.99, 0.03, -0, 0, -0, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 3) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.13, 0.58, 0.11, 0.02, 0.92, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 12) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.72, 0.02, 0.21, 0, 1.27, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 14) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.74, 0.20, 0.56, -0.34, 0.05, -1.99], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 16) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.86, 0.41, 0.22, -0.26, 0.08, -1.93], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 25) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.72, 0.02, 0.21, 0, 1.27, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 27) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.85, 0.31, 0.45, 0.62, 0.08, 0.08], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 29) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([0.26, 0.32, 0.26, -0.05, 0.26, 0.74], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 31) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.88, 0.43, 0.22, -0.05, 0.06, 1.04], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 40) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.72, 0.02, 0.21, 0, 1.27, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 42) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.86, 0.41, 0.22, -0.26, 0.08, -1.93], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 44) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.83, 0.60, -0.24, -0.24, 0.42, -2.01], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
				}
			});

			function topicNext(bool: boolean) {
				// if (!nowAllowClick.value[topicNum.value]) return

				topicNum.value++;

				if (bool) {
					runState.push(getRobotPosition());
					// console.log(runState);
				}
				// if (topicNum.value === 9) {
				//   j63.visible = true;
				//   animateState(runState[0], 2000);
				// }
				// if (topicNum.value === 11) {
				//   waitPageShow.value = true;
				//   animateState(runState[1], 2000, () => {
				//     //隐藏工具
				//     j63.visible = false;
				//     animateState(runState[0], 2000, () => {
				//       waitPageShow.value = false;
				//       runState = [];
				//     });
				//   });
				// }
				// if (topicNum.value === 22) {
				//   j63.visible = true;
				//   animateState(runState[0], 2000);
				// }

				// if (topicNum.value === 24) {
				//   waitPageShow.value = true;

				//   animateState(runState[1], 2000, () => {
				//     cpugaizitou.visible = true;

				//     animateState(runState[2], 2000, () => {
				//       //隐藏工具
				//       j63.visible = false;
				//       cpugaizitou.visible = false;
				//       cpugaizi.visible = true;
				//       waitPageShow.value = false;
				//       runState = [];
				//     });
				//   });
				// }

				// if (topicNum.value === 38) {
				//   j63.visible = true;
				//   waitPageShow.value = true;
				//   animateState(runState[0], 1000, () => {
				//     cputou.visible = true;
				//     animateState(runState[1], 1000, () => {
				//       cputou.visible = true;
				//       cpu1.visible = false;
				//       animateState(runState[2], 1000, () => {
				//         //开启判断
				//         questionPageShow.value = true;
				//       });
				//     });
				//   });
				// }

				// console.log(runState);
			}
			watch(questionPageShow, () => {
				if (!questionPageShow.value) {
					animateState(runState[3], 1000, () => {
						cputou.visible = false;
						cpu2.visible = true;
						waitPageShow.value = false;
						startFree(
							getRobotPosition(), {
								x: -26.32,
								y: 28.22,
								z: -18.77
							}, {
								x: -32.24,
								y: 19.28,
								z: 3.09
							}
						);
					});
				}
			});

			function choseAnswer(type: string) {
				questionPageShow.value = false;
			}

			// 初始化位置视角
			function startFree(
				arr ? : Array < number > ,
				posObj ? : Object,
				conObj ? : Object
			): void {
				// j65.visible = true
				// setLeftContent('操作机器人')
				if (arr) animateState(arr, 2000);

				if (posObj) {
					new TWEEN.Tween(player.camera.position)
						.to(posObj, 2000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}
				if (conObj) {
					new TWEEN.Tween(player.controls.target)
						.to(conObj, 2000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}
			}

			let arr1 = [
				[-1.04, 0.2, -0.17, 0, 1.07, 0],
				[-1.12, 0.45, -0.14, 0, 1.27, 0],
				[-1.13, 0.58, 0.11, 0.02, 0.92, 0],
				[-1.05, 0.45, 0.40, 0.02, 0.72, -0.1],
				[-1.06, 0.28, 0.29, 0.02, 0.92, 0]
			]
			let arr2 = [
				[-1.72, 0.02, 0.21, 0, 1.27, 0],
				[-1.74, 0.20, 0.56, -0.34, 0.05, -1.99],
				[-1.86, 0.41, 0.22, -0.26, 0.08, -1.93]
			]
			let arr3 = [
				[-1.72, 0.02, 0.21, 0, 1.27, 0],
				[-1.85, 0.31, 0.45, 0.62, 0.079, 0.08],
				[-0.78, 0.02, 0.24, -0.04, 0.46, 0.74],
				[0.26, 0.32, 0.26, -0.05, 0.26, 0.74],
				[-1.88, 0.43, 0.22, -0.05, 0.06, 1.04]
			]
			let arr4 = [
				[-1.72, 0.02, 0.21, 0, 1.27, 0],
				[-1.86, 0.41, 0.22, -0.26, 0.08, -1.93],
				[-1.86, 0.37, -0.08, -0.26, 0.49, -1.93],
				[-1.83, 0.60, -0.24, -0.24, 0.42, -2.01]
			]
			watch(topicNum, () => {
				emit("changeTopicNum", topicNum.value);
				console.log(topicNum.value)
				home.visible = false;
				//吸盘工具
				if (topicNum.value === 0) {
					showHelp.value = true;
					showlr.value = false;
					xp.visible = true
					j63.visible = false
					chengpintou.visible = false
					chengpin.visible = true
					chengpin2.visible = false
					cpugaizitou.visible = false
					cpugaizi.visible = false
					cpugaizikong.visible = true
					chengpintou.visible = false
					cputou.visible = false
					cpu3.visible = false
					cpu2.visible = true
					startFree([0, 0, 0, 0, 0, 0], {
						x: -72.40,
						y: 66.14,
						z: 38.98
					}, {
						x: -19.61,
						y: 28.61,
						z: 18.53
					})
				}
				if (topicNum.value === 1) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1900, 3800, 1300);

				}
				if (topicNum.value === 3) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2350, 2350, 1200);

				}
				if (topicNum.value === 8) {
					// player.controls.enabled = false;
					animateState(arr1[0], 1000, () => {
						animateState(arr1[1], 1000, () => {
							animateState(arr1[2], 1000, () => {
								j63.visible = true;
								xp.visible = false;
								animateState(arr1[3], 1000, () => {
									animateState(arr1[4], 1000, () => {

									});
								});
							});
						});
					});
				}
				if (topicNum.value === 10) {
					// player.controls.enabled = false;
					animateState(arr1[3], 1000, () => {
						animateState(arr1[2], 1000, () => {
							j63.visible = false;
							xp.visible = true;
							animateState(arr1[1], 1000, () => {});
						});
					});
				}
				// pcb盖板
				if (topicNum.value === 11) {
					showHelp.value = true;
					showlr.value = false;
					j63.visible = true;
					xp.visible = false;
					cputou.visible = false
					cpu3.visible = false
					cpu2.visible = true
					cpugaizitou.visible = false
					cpugaizi.visible = false
					cpugaizikong.visible = true
					chengpintou.visible = false
					chengpin.visible = true
					chengpin2.visible = false
					startFree([-1.12, 0.45, -0.14, 0, 1.27, 0], {
						x: -50.72,
						y: 48.58,
						z: 38.16
					}, {
						x: -17.19,
						y: 23.05,
						z: 2.33
					})
				}
				if (topicNum.value === 12) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1980, 3300, -200);

				}
				if (topicNum.value === 14) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2150, 2500, -220);

				}
				if (topicNum.value === 16) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2500, 2600, -550);

				}
				if (topicNum.value === 21) {
					animateState(arr2[0], 1000, () => {
						animateState(arr2[1], 1000, () => {
							j63.visible = true;
							cpugaizitou.visible = true
							cpugaizikong.visible = false
							animateState(arr2[0], 1000, () => {});
						});
					});
				}
				if (topicNum.value === 23) {
					animateState(arr2[0], 1000, () => {
						animateState(arr2[2], 1000, () => {
							j63.visible = true;
							cpugaizitou.visible = false
							cpugaizi.visible = true
							animateState(arr2[0], 1000, () => {});
						});
					});
				}
				// pcb芯片
				if (topicNum.value === 24) {
					showHelp.value = true;
					showlr.value = false;
					j63.visible = true;
					xp.visible = false;
					cpugaizitou.visible = false
					cpugaizi.visible = false
					cputou.visible = false
					cpu3.visible = false
					cpu2.visible = true
					chengpintou.visible = false
					chengpin.visible = true
					chengpin2.visible = false
				}
				if (topicNum.value === 25) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1980, 3300, -200);

				}
				if (topicNum.value === 27) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2250, 2550, -500);

				}
				if (topicNum.value === 29) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(600, 2750, 2300);

				}
				if (topicNum.value === 31) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2500, 2600, -650);

				}
				if (topicNum.value === 37) {
					animateState(arr3[0], 1000, () => {
						animateState(arr3[1], 1500, () => {
							j63.visible = true;
							cputou.visible = true
							cpu2.visible = false
							animateState(arr3[2], 1000, () => {
								animateState(arr3[3], 1000, () => {
									animateState(arr3[3], 1000, () => {
										animateState(arr3[2], 1000,
											() => {
												animateState(
													arr3[
													4],
													1500,
													() => {
														cputou
															.visible =
															false
														cpu3.visible =
															true
														animateState
															(arr3[
																	0],
																1000,
																() => {

																}
																);
													});
											});
									});
								});
							});
						});
					});
				}
				// 检测
				if (topicNum.value === 38) {
					showHelp.value = false;
					showlr.value = false;
					cpugaizi.visible = true
					cpu3.visible = true
					chengpintou.visible = false
					chengpin.visible = true
					chengpin2.visible = false
					startFree([0, 0, 0, 0, 0, 0], {
						x: -26.32,
						y: 28.22,
						z: -18.77
					}, {
						x: -32.24,
						y: 19.28,
						z: 3.09
					})
				}

				// 成品
				if (topicNum.value === 39) {
					showHelp.value = true;
					showlr.value = false;
					xp.visible = false
					j63.visible = true
					cpugaizi.visible = true
					cpu3.visible = true
					cpugaizitou.visible = false
					cpugaizikong.visible = false
					cpugaizitou.visible = false
					cputou.visible = false
					cpu2.visible = false
					chengpintou.visible = false
					chengpin.visible = true
					chengpin2.visible = false
					startFree([-1.72, -0.16, 0.21, 0, 1.27, 0], {
						x: -36.13,
						y: 43.23,
						z: -38.29
					}, {
						x: -15.91,
						y: 12.46,
						z: 23.00
					})
				}
				if (topicNum.value === 40) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1980, 3300, -200);

				}
				if (topicNum.value === 42) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2500, 2600, -550);

				}
				if (topicNum.value === 44) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-3000, 2900, -600);
				}

				if (topicNum.value === 49) {
					animateState(arr4[0], 1000, () => {
						animateState(arr4[1], 1000, () => {
							chengpintou.visible = true
							chengpin.visible = false
							animateState(arr4[2], 1000, () => {});
						});
					});
				}
				if (topicNum.value === 51) {
					animateState(arr4[2], 1000, () => {
						animateState(arr4[3], 1000, () => {
							chengpintou.visible = false
							chengpin2.visible = true
							animateState(arr4[0], 1000, () => {});
						});
					});
				}




				// if (topicNum.value === 23) {
				// if (topicNum.value === 38) {
				//     startFree(getRobotPosition(), { x: -26.32, y: 28.22, z: -18.77 }, { x: -32.24, y: 19.28, z: 3.09 })
				// }
				// if (topicNum.value === 39) {
				//   player.camera.position.set(-22, 86, 123);
				//   player.camera.lookAt(0.66, 9.26, 8.98);
				//   player.controls.target.set(0.66, 9.26, 8.98);
				//   player.camera.updateProjectionMatrix();
				//   player.renderer.render(player.scene, player.camera);
				// }
				//     startFree([1.29, -0.25, 0.17, 0, 0, 0], { x: -22, y: 86, z: 123 }, { x: 0.66, y: 9.26, z: 8.98 })

				// }
			});

			function switchAll(type: string) {
				let shensuoqigang: any = player.scene.getObjectByName("shensuoqigang");
				let shengjiangqigang: any =
					player.scene.getObjectByName("shengjiangqigang");
				// let cpugaizi: any = player.scene.getObjectByName("cpugaizi");

				if (type === "left") {
					new TWEEN.Tween(shensuoqigang.position)
						.to({
							x: 10,
							y: 125,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "right") {
					new TWEEN.Tween(shensuoqigang.position)
						.to({
							x: -504,
							y: 125,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "top") {
					new TWEEN.Tween(shengjiangqigang.position)
						.to({
							x: 0,
							y: 0,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "down") {
					new TWEEN.Tween(shengjiangqigang.position)
						.to({
							x: 0,
							y: 0,
							z: -63
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "run") {
					new TWEEN.Tween(shensuoqigang.position)
						.to({
							x: -504,
							y: 125,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(shengjiangqigang.position)
						.to({
							x: 0,
							y: 0,
							z: -63
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "reset") {
					new TWEEN.Tween(shensuoqigang.position)
						.to({
							x: 10,
							y: 125,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(shengjiangqigang.position)
						.to({
							x: 0,
							y: 0,
							z: 0
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}
			}
			let score = ref(53);

			function changeData(params: any) {
				score.value = score.value + params.value;
			}
			onBeforeUnmount(() => {
				// console.log("分数", score.value);
			});
			return {
				topic,
				// goTest,
				isFold,
				goBack,
				switchAction,
				switchZhou,
				switchTypeImg,
				topicOneImg,
				topicNum,
				upDown,
				nowType,
				start,
				end,
				animateSwitch,
				showMenu,
				leftContent,
				setLeftContent,
				topicNext,
				changeData,
				waitPageShow,
				switchAll,
				questionPageShow,
				choseAnswer,
				showlr,
				showHelp,
				changeNum,
			};
		},
	});
</script>

<template>
	<div class="controls_box">
		<div class="helppage" v-if="showHelp">
			<img v-if="topicNum === 0" src="/assembling/t0.png" />
			<img v-if="topicNum === 11" src="/assembling/x0.png" />
			<img v-if="topicNum === 24" src="/assembling/s1.png" />
			<img v-if="topicNum === 39" src="/assembling/c1.png" />
			<div v-if="topicNum === 0" class="nextb" @click="
        topicNum++,
        setLeftContent('操作机器人'),
        (showlr = true),
        (showHelp = false)
      ">
				下一步
			</div>
			<div v-if="topicNum === 11" class="nextb" @click="
        topicNum++,
        setLeftContent('操作机器人'),
        (showlr = true),
        (showHelp = false)
      ">
				下一步
			</div>
			<div v-if="topicNum === 24" class="nextb" @click="
        topicNum++,
        setLeftContent('操作机器人'),
        (showlr = true),
        (showHelp = false)
      ">
				下一步
			</div>
			<div v-if="topicNum === 39" class="nextb" @click="
        topicNum++,
        setLeftContent('操作机器人'),
        (showlr = true),
        (showHelp = false)
      ">
				下一步
			</div>
		</div>
		<div class="left_control" v-if="showlr" @click="isFold = !isFold">
			<div :class="!isFold ? 'fold': 'expand'"></div>
		</div>
		<div class="left_box" v-if="showlr" v-show="!isFold">
			<!-- 操作机器人 -->
			<div class="robot_opt" :style="switchTypeImg" v-if="leftContent === '操作机器人'">
				<div v-if="
          nowType === 'A' ||
          nowType === 'B' ||
          nowType === 'C' ||
          nowType === 'D'
        " class="action_btn1" @click="switchAction()"></div>
				<div class="t1-1 conBtn" v-if="topicNum === 1" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 3" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 12" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 14" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 16" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 25" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 27" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 29" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 31" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 40" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 42" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 44" @click="setLeftContent('装配调试实训任务'), topicNext(true)">
					下一步
				</div>

				<div v-if="
          nowType !== 'A' &&
          nowType !== 'B' &&
          nowType !== 'C' &&
          nowType !== 'D'
        " class="action_btn_box">
					<div class="b1" @click="switchZhou('A')"></div>
					<div class="b2" @click="switchZhou('B')"></div>
					<div class="b3" @click="switchZhou('C')"></div>
					<div class="b4" @click="switchZhou('D')"></div>
				</div>
			</div>
			<!-- 装配调试实训任务 -->
			<div class="robot_opt" :style="topicOneImg" v-if="leftContent === '装配调试实训任务'">
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 2"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 4"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 5">
					<div class="conBtn" style="width: 29px; height: 14px; left: 52px; top: 101px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 41px; height: 14px; left: 53px; top: 222px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              { label: 'MoveC', value: 0 },
              { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 41px; height: 14px; left: 53px; top: 205px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              { label: 'MoveC', value: 0 },
              { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 6">
					<div class="conBtn" style="width: 49px; height: 15px; left: 46px; top: 107px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              { label: 'MoveC', value: 0 },
              { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 49px; height: 15px; left: 46px; top: 140px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              { label: 'MoveC', value: 0 },
              { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 34px; height: 15px; left: 47px; top: 159px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px"
						@click="topicNum = 7"></div>
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 7" @click="topicNum = 8"></div>
				<div class="nextb" v-if="topicNum === 8" @click="topicNum = 9">
					下一步
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 9" @click="topicNum = 10"></div>
				<div class="nextb" v-if="topicNum === 10" @click="topicNum = 11, (showlr = false), (showHelp = true)">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 7"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 8"
          @click="topicNext(false)"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 9"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 10"
          @click="topicNext(false), (showlr = false), (showHelp = true)"
        ></div> -->

				<!-- pcb盖板工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 13"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 15"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 17"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 18">
					<div class="conBtn" style="width: 48px; height: 14px; left: 57px; top: 125px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 31px; height: 14px; left: 57px; top: 143px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 69px; height: 32px; left: 218px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 19">
					<div class="conBtn" style="width: 43px; height: 15px; left: 50px; top: 86px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 41px; height: 15px; left: 50px; top: 115px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px"
						@click="topicNum = 20"></div>
				</div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 20" @click="topicNum = 21"></div>
				<div class="nextb" v-if="topicNum === 21" @click="topicNum = 22">
					下一步
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 22" @click="topicNum = 23"></div>
				<div class="nextb" v-if="topicNum === 23" @click="topicNum = 24, (showlr = false), (showHelp = true)">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 20"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 21"
          @click="topicNext(false)"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 22"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 287px; top: 292px"
          v-if="topicNum === 23"
          @click="topicNext(false), (showlr = false), (showHelp = true)"
        ></div> -->

				<!-- pcb芯片 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 26"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 28"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 30"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 32"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 33">
					<div class="conBtn" style="width: 48px; height: 14px; left: 46px; top: 116px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 31px; height: 14px; left: 46px; top: 133px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 69px; height: 32px; left: 218px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 34">
					<div class="conBtn" style="width: 43px; height: 15px; left: 50px; top: 115px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 41px; height: 15px; left: 51px; top: 133px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px" @click="topicNum++">
					</div>
				</div>
				<div class="codepage" v-if="topicNum === 35">
					<div class="conBtn" style="width: 53px; height: 15px; left: 93px; top: 117px">
						<thinking-select :list="[
              { label: 'GCPU_Pos', value: 0 },
              { label: 'PCPU_Pos', value: 0 },
              { label: 'VIC_Pos', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px"
						@click="topicNum = 36"></div>
				</div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 36" @click="topicNum = 37"></div>
				<div class="nextb" v-if="topicNum === 37" @click="topicNum = 38 ,(showlr = false),(showHelp = true)">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 36"
          @click="topicNext(false)"
        ></div>
        <div
          class="conBtn"
          style="width: 69px; height: 32px; left: 304px; top: 290px"
          v-if="topicNum === 37"
          @click="topicNext(false)"
        ></div> -->



				<!-- pcb成品工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 41"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 43"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 45"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 46">
					<div class="conBtn" style="width: 48px; height: 14px; left: 57px; top: 125px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 31px; height: 14px; left: 57px; top: 143px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 69px; height: 32px; left: 218px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 47">
					<div class="conBtn" style="width: 43px; height: 15px; left: 50px; top: 100px">
						<thinking-select :list="[
              { label: 'MoveJ', value: 0 },
              { label: 'MoveL', value: 1 },
              // { label: 'MoveM', value: 0 },
              // { label: 'MoveAbsj', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 41px; height: 15px; left: 50px; top: 115px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 69px; height: 32px; left: 217px; top: 289px"
						@click="topicNum = 48"></div>
				</div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 48" @click="topicNum = 49"></div>
				<div class="nextb" v-if="topicNum === 49" @click="topicNum = 50">
					下一步
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 50" @click="topicNum = 51"></div>
				<div class="nextb" v-if="topicNum === 51" @click="topicNum = 52, (showlr = false)">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 48"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 49"
          @click="topicNext(false)"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 50"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 287px; top: 292px"
          v-if="topicNum === 51"
          @click="topicNext(false), (showlr = false), (showHelp = false)"
        ></div> -->

				<div class="waitpage" v-if="waitPageShow">
					等待程序执行完毕
					<div class="answer" v-if="questionPageShow">
						<p>
							假设所有程序、点位和通讯都是正确的，当机器人拾取芯片经过视觉检测时，不再继续执行安装芯片的任务，不会是以下哪种原因？
						</p>
						<div class="an_box">
							<div class="an_item" @click="choseAnswer('A')">
								A.芯片检测不合格
							</div>
							<div class="an_item" @click="choseAnswer('B')">
								B.芯片检测不合格
							</div>
							<div class="an_item" @click="choseAnswer('C')">
								C.视觉模板问题
							</div>
							<div class="an_item" @click="choseAnswer('D')">
								D.光照环境问题
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right_box" v-if="showlr">
			<div class="btn up" @mousedown="start('up')" @mouseup="end()"></div>
			<div class="btn down" @mousedown="start('down')" @mouseup="end()"></div>
			<div class="btn left" @mousedown="start('left')" @mouseup="end()"></div>
			<div class="btn right" @mousedown="start('right')" @mouseup="end()"></div>
			<div class="btn leftTop" @mousedown="start('leftTop')" @mouseup="end()"></div>
			<div class="btn rightTop" @mousedown="start('rightTop')" @mouseup="end()"></div>
			<div class="btn leftBottom" @mousedown="start('leftBottom')" @mouseup="end()"></div>
			<div class="btn rightBottom" @mousedown="start('rightBottom')" @mouseup="end()"></div>
			<div class="btn r1" @mousedown="start('r1')" @mouseup="end()"></div>
			<div class="btn r2" @mousedown="start('r2')" @mouseup="end()"></div>
		</div>
		<!-- 检测单元检测 -->
		<div class="waitpage" style="background-color: rgb(255 255 255 / 24%);" v-if="topicNum === 38">
			<div class="screen" style="left: 50px; top: 30px">
				<div class="sc_back">
					<div class="name">芯片伸缩气缸</div>
					<div class="on" @click="switchAll('left')">向左</div>
					<div class="off" @click="switchAll('right')">向右</div>
				</div>

			</div>
			<div class="screen" style="left: 320px; top: 30px">
				<div class="sc_back">
					<div class="name">芯片升降气缸</div>
					<div class="on" @click="switchAll('top')">向上</div>
					<div class="off" @click="switchAll('down')">向下</div>
				</div>

			</div>
			<div class="screen" style="left: 50px; top: 230px">
				<div class="sc_back">
					<div class="name">单元检测运行</div>
					<div class="on" @click="switchAll('run')">运行</div>
					<div class="off" @click="switchAll('reset')">复位</div>
				</div>
			</div>
			<div class="pBtn" @click="topicNum++, (showlr = false), (showHelp = true)">
				下一步
			</div>
		</div>
		<div class="overbtn" v-if="topicNum === 52" @click="goBack">实训结束</div>
	</div>
</template>

<style scoped lang="less">
	.controls_box {
		position: absolute;
		right: 47px;
		bottom: 119px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		.waitpage {
			width: 540px;
			height: 370px;
			padding: 40px;
			right: 0;
			bottom: 0;
			position: absolute;

			.screen {
				position: absolute;
				width: 250px;
				height: 180px;
				border: 2px solid #ff6900;
				background: url(../chukongping.png) no-repeat;
				background-size: 100% 100%;

				.sc_back {
					width: 74%;
					height: 55%;
					left: 32px;
					top: 33px;
					position: absolute;
					background-color: #ffffff;
					/* margin: 0 auto; */
				}

				.name {
					position: absolute;
					left: 20px;
					top: 35px;
					font-size: 16px;
				}

				.on {
					position: absolute;
					left: 130px;
					top: 7px;
					font-size: 16px;
					width: 40px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 5px;
					background-color: #42a4ff;
				}

				.off {
					position: absolute;
					left: 130px;
					top: 70px;
					font-size: 16px;
					width: 40px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 5px;
					background-color: #5bc772;
				}
			}

			.pBtn {
				position: absolute;
				background-color: #ff7c00;
				color: #fff;
				cursor: pointer;
				width: 69px;
				height: 32px;
				left: 505px;
				top: 388px;
				text-align: center;
				line-height: 32px;
			}

			p {
				text-align: center;
				color: #ffffff;
				margin-top: 50px;
				width: 340px;
				line-height: 33px;
				font-size: 18px;
				margin: 50px auto 0;
			}

			.next_btn {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 190px;
				font-size: 16px;
				text-align: center;
				padding: 10px 10px;
				border-radius: 10px;
				color: #ffffff;
				background-color: #666;
				cursor: pointer;
			}

			.allow_click {
				background-color: @mainColor;
			}
		}

		.overbtn {
			right: 780px;
			bottom: -60px;
			position: absolute;
			width: 200px;
			height: 45px;
			margin: 20px auto 0;
			font-size: 18px;
			text-align: center;
			line-height: 45px;
			border-radius: 25px;
			color: #fff;
			cursor: pointer;
			background-color: #ffaf4c;
		}

		.startb {
			left: -1000px;
			top: 0;
			position: absolute;
			width: 200px;
			height: 45px;
			margin: 20px auto 0;
			font-size: 18px;
			text-align: center;
			line-height: 45px;
			border-radius: 25px;
			color: #fff;
			cursor: pointer;
			background-color: #ffaf4c;
		}

		.helppage {
			position: absolute;
			width: 550px;
			height: 400px;
			right: -5px;
			bottom: 0;
			background-color: #ffffff;
			z-index: 1;

			img {
				width: 100%;
				height: 100%;
			}

			.nextb {
				left: 160px;
				top: 410px;
				position: absolute;
				width: 200px;
				height: 45px;
				margin: 20px auto 0;
				font-size: 18px;
				text-align: center;
				line-height: 45px;
				border-radius: 25px;
				color: #fff;
				cursor: pointer;
				background-color: #ffaf4c;
			}
		}

		.left_control {
			position: relative;
			width: 30px;
			height: 30px;
			top: -150px;
			left: -15px;
			cursor: pointer;

			.fold {
				width: 100%;
				height: 100%;
				background-image: url(fold.png);
			}

			.expand {
				width: 100%;
				height: 100%;
				background-image: url(expand.png);
			}
		}

		.left_box {
			width: 480px;
			height: 359px;
			/* float: left; */
			position: relative;
			top: 14px;
			border: 4px solid #666;

			.menu_btn {
				width: 71px;
				height: 36px;
				position: absolute;
				left: 0;
				top: 0;
				background-color: #ffff0066;
				cursor: pointer;
				z-index: 2;
			}

			.robot_opt {
				background: center / contain no-repeat;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;

				.nextb {
					right: 130px;
					bottom: -70px;
					position: absolute;
					width: 200px;
					height: 45px;
					margin: 20px auto 0;
					font-size: 18px;
					text-align: center;
					line-height: 45px;
					border-radius: 25px;
					color: #fff;
					cursor: pointer;
					background-color: #ffaf4c;
				}

				.action_btn1 {
					width: 200px;
					height: 20px;
					position: absolute;
					left: 10px;
					top: 112px;
					cursor: pointer;
					background-color: #00ccff66;
				}

				.action_btn_box {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;

					.b1 {
						width: 50px;
						height: 60px;
						position: absolute;
						left: 36px;
						top: 186px;
						cursor: pointer;
					}

					.b2 {
						width: 50px;
						height: 60px;
						position: absolute;
						left: 121px;
						top: 186px;
						cursor: pointer;
					}

					.b3 {
						width: 50px;
						height: 60px;
						position: absolute;
						left: 204px;
						top: 186px;
						cursor: pointer;
					}

					.b4 {
						width: 50px;
						height: 60px;
						position: absolute;
						left: 287px;
						top: 186px;
						cursor: pointer;
					}
				}

				.small_next {
					width: 80px;
					height: 24px;
					left: 202px;
					top: 320px;
					text-align: center;
					color: #fff;
					background-color: #ea9412;
					font-size: 16px;
				}

				.initpage {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					background-color: #00000033;

					// .el-input--mini .el-input__inner {
					//     height: 20px;
					//     line-height: 20px;
					// }

					.conBtn {
						position: absolute;
						// background-color: #00ccff66;
						cursor: pointer;

						input {
							width: 100%;
							height: 100%;
						}
					}

					.t1-0-0 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 110px;
					}

					.t1-0-1 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 133px;
					}

					.t1-0-2 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 178px;
					}

					.t1-0-3 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 201px;
					}

					.t1-0-4 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 245px;
					}

					.t1-0-5 {
						width: 80px;
						height: 15px;
						left: 12px;
						top: 269px;
					}
				}

				.codepage {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;

					// .conBtn {
					//     position: absolute;
					//     background-color: #00ccff66;
					//     cursor: pointer;
					// }


					.pBtn {
						position: absolute;
						background-color: #ff7c00;
						color: #fff;
						cursor: pointer;
						width: 69px;
						height: 32px;
						left: 217px;
						top: 289px;
						text-align: center;
						line-height: 32px;
					}
				}



				.conBtn {
					position: absolute;
					background-color: #00ccff66;
					cursor: pointer;
				}

				.t1-1 {
					right: 635px;
					bottom: -50px;
					width: 190px;
					height: 35px;
					text-align: center;
					line-height: 35px;
					border-radius: 25px;
					color: #fff;
					background-color: #ffaf4c;
				}
			}

			.waitpage {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				text-align: center;
				line-height: 340px;
				color: #fff;
				font-size: 16px;
				background-color: #00000099;
				z-index: 1;

				.answer {
					width: 100%;
					height: 112%;
					position: absolute;
					left: 0;
					top: -37px;
					background-color: #383838;

					p {
						font-size: 16px;
						/* height: 4px; */
						position: absolute;
						left: 47px;
						width: 390px;
					}

					.an_box {
						width: 100%;
						height: 120px;
						display: flex;
						flex-flow: row wrap;
						align-items: center;
						justify-content: space-evenly;

						.an_item {
							/* flex: 1; */
							width: 170px;
							height: 20px;
							font-size: 16px;
							cursor: pointer;
						}
					}
				}
			}

			.control_menu {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
				background: url(../controlMenu.png) center/contain no-repeat;

				.btn1 {
					width: 100px;
					height: 30px;
					position: absolute;
					left: 18px;
					top: 104px;
					cursor: pointer;
					background-color: #ffff0066;
				}

				.btn2 {
					width: 100px;
					height: 30px;
					position: absolute;
					left: 20px;
					top: 195px;
					cursor: pointer;
					background-color: #ffff0066;
				}
			}
		}

		.right_box {
			width: 195px;
			height: 417px;
			position: relative;
			background: url("../shijiaoqi.png") center / contain no-repeat;
			background-size: 100% 100%;
		}

		.btn {
			width: 28px;
			height: 24px;
			cursor: pointer;
			position: absolute;
		}

		.up {
			left: 118px;
			top: 170px;
			background: url("../jiantou.png") center / contain no-repeat;
		}

		.down {
			left: 119px;
			top: 246px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(180deg);
		}

		.left {
			left: 79px;
			top: 206px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(-90deg);
		}

		.right {
			left: 156px;
			top: 205px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(90deg);
		}

		//新加的
		.leftTop {
			left: 90px;
			top: 179px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(-45deg);
		}

		.rightTop {
			left: 147px;
			top: 179px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(45deg);
		}

		.leftBottom {
			left: 90px;
			top: 237px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(-135deg);
		}

		.rightBottom {
			left: 149px;
			top: 237px;
			background: url("../jiantou.png") center / contain no-repeat;
			transform: rotateZ(135deg);
		}

		.r1 {
			left: 110px;
			top: 208px;
			background: url("../xuanzhuanjiantou.png") center / contain no-repeat;
		}

		.r2 {
			left: 129px;
			top: 208px;
			background: url("../xuanzhuanjiantou.png") center / contain no-repeat;
			transform: rotateZ(0deg) rotateY(180deg);
		}
	}
</style>
