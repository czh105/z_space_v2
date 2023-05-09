<script lang="ts">
	import {
		defineComponent,
		computed,
		watch,
		onBeforeUnmount,
		onMounted,
		ref,
		reactive,
	} from "vue";

	import * as THREE from "three";
	import * as TWEEN from "@tweenjs/tween.js";

	import Result from "../hooks/result";
	import ThinkingSelect from "./ThinkingSelect.vue";
	import $store from "../store/index";
	import {
		ElMessage
	} from 'element-plus'
	// import ElementPlus from "element-plus"
	// import { setTimeout } from "timers/promises";
	export default defineComponent({
		name: "implement",
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
			let leftContent = ref("执行单元调试");
			let topic = ref((window as any).topic);
			let showMenu = ref(false);
			let waitPageShow = ref(false);
			let questionPageShow = ref(false);
			let showHelp = ref(false);
			let showlr = ref(false);
			let bigType = $store.state.bigType;

			let animateSwitch = ref(false);
			//todo: 增加示教器面板折叠功能
			let isFold = ref(false);
			let actionHistory: any = (window as any).actionHistory;
			let actionEnum: any = (window as any).actionEnum;
			// 判断是否是教学演示
			let mode:any = ref((window as any).mode);
			// todo:判断是否是调试程序
			var isDebugger = ref(false);
			function goBack() {
				let p = {
					name: "执行单元调试",
					score: score.value,
				};
				console.log("上传", p);
				if (bigType !== "教学演示") {
					alert(`您本次实训成绩为：${p.score}分`, )
				}
				emit("back", p);
			}
			let player: any = (window as any).player;
			let j1: any = player.scene.getObjectByName("j1");
			let j2: any = player.scene.getObjectByName("j2");
			let j3: any = player.scene.getObjectByName("j3");
			let j4: any = player.scene.getObjectByName("j4");
			let j5: any = player.scene.getObjectByName("j5");
			let j6: any = player.scene.getObjectByName("j6");

			let j61: any = player.scene.getObjectByName("j6-1");
			let j62: any = player.scene.getObjectByName("j6-2");
			let j66: any = player.scene.getObjectByName("j6-6");

			let zt4: any = player.scene.getObjectByName("zhuotool4");
			let zt6: any = player.scene.getObjectByName("zhuotool6");
			let zt7: any = player.scene.getObjectByName("zhuotool7");

			let robot: any = player.scene.getObjectByName("robot2");
			robot.position.x = -7;

			let home: any = player.scene.getObjectByName("home");


			// debugger
			onMounted(() => {
				nowType.value = "A";
				topicNum.value++;
				emit("changeTopicNum", topicNum.value);

				let scene = player.scene;

				let redBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				let blueBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				let greenBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				let a885 = player.scene.getObjectByName("Object885");

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
				player.greenBbox = greenBbox;
				// blueBox.add(blueBoxHelper);
				// if (topic === "涂胶调试实训任务") {
				//   blueBox.position.set(-23.53, 23.22, 17.12);
				// }

				scene.add(blueBox);
			});
			const changeNum = (num: number): void => {
				topicNum.value = num;
			};

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

			function calcRota(meshRota: any, gap: number, type: string) {
				let Rota = 0;

				if (type === "add") {
					meshRota = meshRota < 0 ? 3 : meshRota;
					Rota = (Math.PI / 180) * meshRota + gap;
				} else if (type === "sub") {
					meshRota = meshRota > 0 ? -3 : meshRota;
					Rota = (Math.PI / 180) * meshRota - gap;
				}
				return Rota;
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
				console.log(topicNum.value);
				switch (topicNum.value) {
					case 2:
						return `background-image: url( "./implement/a1.png"  )`;
						break;
					case 4:
						return `background-image: url( "./implement/a2.png"  )`;
						break;
					case 6:
						return `background-image: url( "./implement/a3.png"  )`;
						break;
					case 7:
						return `background-image: url( "./implement/a4.png"  )`;
						break;
					case 8:
						return `background-image: url( "./implement/a5.png"  )`;
						break;
					case 9:
						return `background-image: url( "./implement/zz1.png"  )`;
						break;
					case 9.1:
						return `background-image: url( "./implement/zz2.png"  )`;
						break;
					case 9.2:
						return `background-image: url( "./implement/zz3.png"  )`;
						break;
					case 9.3:
						return `background-image: url( "./implement/zz4.png"  )`;
						break;
					case 10:
						return `background-image: url( "./implement/a7.png"  )`;
						break;
					case 10.5:
						return `background-image: url( "./implement/zz4.png"  )`;
						break;
					case 11:
						return `background-image: url( "./implement/zz1.png"  )`;
						break;
					case 11.1:
						return `background-image: url( "./implement/zz2.png"  )`;
						break;
					case 11.2:
						return `background-image: url( "./implement/zz5.png"  )`;
						break;
					case 11.3:
						return `background-image: url( "./implement/zz6.png"  )`;
						break;
					case 12:
						return `background-image: url( "./implement/a9.png"  )`;
						break;
					case 12.5:
						return `background-image: url( "./implement/zz6.png"  )`;
						break;
						// 夹爪
					case 13:
						return `background-image: url( "./implement/b1.png"  )`;
						break;
					case 15:
						return `background-image: url( "./implement/b2.png"  )`;
						break;
					case 17:
						return `background-image: url( "./implement/b3.png"  )`;
						break;
					case 18:
						return `background-image: url( "./implement/b4.png"  )`;
						break;
					case 19:
						return `background-image: url( "./implement/b5.png"  )`;
						break;
					case 20:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 21:
						return `background-image: url( "./implement/b7.png"  )`;
						break;
					case 21.5:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 22:
						return `background-image: url( "./implement/b8.png"  )`;
						break;
					case 23:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 23.5:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
						// 吸盘
					case 24:
						return `background-image: url( "./implement/c1.png"  )`;
						break;
					case 26:
						return `background-image: url( "./implement/c2.png"  )`;
						break;
					case 28:
						return `background-image: url( "./implement/c3.png"  )`;
						break;
					case 29:
						return `background-image: url( "./implement/c4.png"  )`;
						break;
					case 30:
						return `background-image: url( "./implement/c5.png"  )`;
						break;
					case 31:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 32:
						return `background-image: url( "./implement/c7.png"  )`;
						break;
					case 32.5:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 33:
						return `background-image: url( "./implement/c8.png"  )`;
						break;
					case 34:
						return `background-image: url( "./implement/pp.png"  )`;
						break;
					case 34.5:
						return `background-image: url( "./implement/pp.png"  )`;
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
				console.log(arr);
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
					let greenBox: any = player.scene.getObjectByName("greenBox");
					player.redBbox.setFromObject(redBox);
					player.blueBbox.setFromObject(blueBox);
					player.greenBbox.setFromObject(home);

					if (topicNum.value === 3 || topicNum.value === 14 || topicNum.value === 25) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							animateState([0.24, -0.51, 0.38, 0, -0, 0], 1000, () => {});
							ElMessage.success('机器人位置调整正确!')

							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 14) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							ElMessage.success('机器人位置调整正确!')
							animateState([-0.2, -0.5, 0.54, 0, -1.11, -0.1], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 25) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							ElMessage.success('机器人位置调整正确!')
							animateState([0.46, -0.85, 0.83, -0.03, -1.24, 0.24], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
							// nowAllowClick.value[topicNum.value] = false;
						}
					}

					if (topicNum.value === 5) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							ElMessage.success('机器人位置调整正确!')
							animateState([0.1, -1.31, 0.82, 0, -1.11, -0.1], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 16) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							ElMessage.success('机器人位置调整正确!')
							animateState(
								[-0.32, -1.03, 0.39, -0.03, -1.01, -0.1],
								1000,
								() => {}
							);
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
							// nowAllowClick.value[topicNum.value] = false;
						}
					}

					if (topicNum.value === 27) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							ElMessage.success('机器人位置调整正确!')
							animateState(
								[0.37, -1.43, 1.02, -0.03, -1.01, -0.1],
								1000,
								() => {}
							);
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							ElMessage.error('机器人位置调整错误!')
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
					// console.log(runState)
				}

				// console.log(runState);
			}
			// watch(questionPageShow, () => {
			//     if (!questionPageShow.value) {
			//         animateState(runState[3], 1000, () => {
			//             cputou.visible = false
			//             cpu2.visible = true
			//             waitPageShow.value = false
			//             startFree(getRobotPosition(), { x: -26.32, y: 28.22, z: -18.77 }, { x: -32.24, y: 19.28, z: 3.09 })
			//         })
			//     }

			// })
			function choseAnswer(type: string) {
				questionPageShow.value = false;
			}
			// todo:0508防抖函数
			let antiShakeTimer: any = null;
			function resetDubuggerAnimate(){
				if(antiShakeTimer) return;
				antiShakeTimer = setTimeout(() => {
					// 重置状态
					actionHistory.resetModelAction();
					allDebuggerAnimate();
					antiShakeTimer = null;
				}, 500)
			}
			// todo:0508所有的调试程序的动画
			function allDebuggerAnimate() {
				if(!isDebugger.value){
					actionHistory.pushModelsActionHistory([j1, j2, j3, j4, j5, j6], actionEnum.ROTATION);
				}
				if (topicNum.value === 10.5) {
					// showHelp.value = true;
					// showlr.value = false;
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j61, zt6], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr1[0], 1000, () => {
						animateState(arr1[1], 1000, () => {
							animateState(arr1[2], 1000, () => {
								j61.visible = true;
								zt6.visible = false;
								animateState(arr1[1], 1000, () => {});
							});
						});
					});
				}
				else if (topicNum.value === 12.5) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j61, zt6], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr1[2], 1000, () => {
						j61.visible = false;
						zt6.visible = true;
						animateState(arr1[1], 1000, () => {
							animateState(arr1[0], 1000, () => {});
						});
					});
				}
				else if (topicNum.value === 21.5) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j62, zt4], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr2[0], 1000, () => {
						animateState(arr2[1], 1000, () => {
							animateState(arr2[2], 1000, () => {
								j62.visible = true;
								zt4.visible = false;
								animateState(arr2[1], 1000, () => {});
							});
						});
					});
				}
				else if (topicNum.value === 23.5) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j62, zt4], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr2[2], 1000, () => {
						j62.visible = false;
						zt4.visible = true;
						animateState(arr2[1], 1000, () => {
							animateState(arr2[0], 1000, () => {});
						});
					});
				}
				else if (topicNum.value === 32.5) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j66, zt7], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr3[0], 1000, () => {
						animateState(arr3[1], 1000, () => {
							animateState(arr3[2], 1000, () => {
								j66.visible = true;
								zt7.visible = false;
								animateState(arr3[1], 1000, () => {});
							});
						});
					});
				}else if (topicNum.value === 34.5) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j66, zt7], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr3[2], 1000, () => {
						j66.visible = false;
						zt7.visible = true;
						animateState(arr3[1], 1000, () => {
							animateState(arr3[0], 1000, () => {});
						});
					});
				}
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
				[0.24, -0.51, 0.38, 0, -0, 0],
				[0.16, -1.08, 0.91, 0, -1.31, -0.09],
				[0.1, -1.31, 0.82, 0, -1.11, -0.1],
			];
			let arr2 = [
				[-0.2, -0.5, 0.54, 0, -1.11, -0.1],
				[-0.3, -0.83, 0.54, -0.03, -1.25, -0.1],
				[-0.32, -1.03, 0.39, -0.03, -1.01, -0.1],
			];
			let arr3 = [
				[0.46, -0.85, 0.83, -0.03, -1.24, 0.24],
				[0.37, -1.23, 1.09, -0.03, -1.16, -0.1],
				[0.37, -1.43, 1.02, -0.03, -1.01, -0.1],
			];
			watch(topicNum, () => {
				console.log(topicNum.value);
				emit("changeTopicNum", topicNum.value);
				home.visible = false
				isDebugger.value = false;
				// 清空历史记录
				actionHistory.clearModelActionHistory();
				let sp4 = zt4.getObjectByName("Sphere");
				sp4.visible = false;
				let sp6 = zt6.getObjectByName("Sphere");
				sp6.visible = false;
				let sp7 = zt7.getObjectByName("Sphere");
				sp7.visible = false
				// if (topicNum.value === 23) {
				if (topicNum.value === 1) {
					showHelp.value = false;
					showlr.value = false;
					TWEEN.removeAll();
					new TWEEN.Tween(robot.position)
						.to({
							x: -7
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					startFree(
						[0, 0, 0, 0, 0, 0], {
							x: -4.28,
							y: 22.36,
							z: -14.54
						}, {
							x: -13.91,
							y: 7.74,
							z: 2.39
						}
					);
				}
				if (topicNum.value === 2) {
					showHelp.value = true;
					showlr.value = false;
					sp7.visible = false;
					j61.visible = false;
					j62.visible = false;
					j66.visible = false;
					zt6.visible = true
					zt4.visible = true
					zt7.visible = true
					TWEEN.removeAll();
					if (ydtimer) clearInterval(ydtimer);
					new TWEEN.Tween(robot.position)
						.to({
							x: -14
						}, 2000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}

				if (topicNum.value === 3) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2480, 480, 535);
					animateState([0, 0, 0, 0, 0, 0], 1000, () => {})
				}

				if (topicNum.value === 5) {
					if (bigType !== "教学演示") return;
					sp6.visible = true;
				}

				// if(topicNum.value === 9){
				//   sp6.visible = true
				// }


				if (topicNum.value === 13) {
					showHelp.value = true;
					showlr.value = false;
					sp7.visible = false;
					j61.visible = false;
					j62.visible = false;
					j66.visible = false;
					zt6.visible = true
					zt4.visible = true
					zt7.visible = true

					TWEEN.removeAll();
					if (ydtimer) clearInterval(ydtimer);
					new TWEEN.Tween(robot.position)
						.to({
							x: -14
						}, 2000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}

				if (topicNum.value === 14) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2335, 420, 520);
					animateState([0, 0, 0, 0, 0, 0], 1000, () => {})
				}

				if (topicNum.value === 16) {
					if (bigType !== "教学演示") return;
					sp4.visible = true;
				}




				if (topicNum.value === 24) {
					showHelp.value = true;
					showlr.value = false;
					sp7.visible = false;
					j61.visible = false;
					j62.visible = false;
					j66.visible = false;
					zt6.visible = true
					zt4.visible = true
					zt7.visible = true
					TWEEN.removeAll();
					if (ydtimer) clearInterval(ydtimer);
					new TWEEN.Tween(robot.position)
						.to({
							x: -14
						}, 2000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}

				if (topicNum.value === 25) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2580, 470, 500);
					animateState([0, 0, 0, 0, 0, 0], 1000, () => {})
				}

				if (topicNum.value === 27) {
					if (bigType !== "教学演示") return;
					sp7.visible = true;
				}
				allDebuggerAnimate()


				//     startFree([1.29, -0.25, 0.17, 0, 0, 0], { x: -22, y: 86, z: 123 }, { x: 0.66, y: 9.26, z: 8.98 })

				// }
			});

			let yunzuo: any;
			let yunyou: any;
			let zuoA = new TWEEN.Tween(robot.position)
				.to({
					x: -7
				}, 5000)
				.easing(TWEEN.Easing.Linear.None)
			let youA = new TWEEN.Tween(robot.position)
				.to({
					x: -16
				}, 5000)
				.easing(TWEEN.Easing.Linear.None)
			let ydtimer: any = null;
			let fangxiang: any = "";
			//todo: 修复点击急停后，向左和向右点击有效bug，并且需要点击运行后才能继续
			let isMoveLeftAndRight: boolean = true;

			function switchAll(type: string) {
				if (type === "on") {
					if (fangxiang === "急停") {
						let s = robot.position.x
						new TWEEN.Tween(robot.position)
							.to({
								x: -7
							}, Math.abs(s - (-7)) / 0.0018)
							.easing(TWEEN.Easing.Linear.None)
							.start();
					} else {
						// debugger
						let s = robot.position.x
						if (fangxiang === "左") {
							new TWEEN.Tween(robot.position)
								.to({
									x: -7
								}, Math.abs(s - (-7)) / 0.0018)
								.easing(TWEEN.Easing.Linear.None)
								.start();
						} else if (fangxiang === "右") {
							new TWEEN.Tween(robot.position)
								.to({
									x: -16
								}, Math.abs(s - (-16)) / 0.0018)
								.easing(TWEEN.Easing.Linear.None)
								.start();
						}

					}
					isMoveLeftAndRight = true;
				} else if (type === "off") {
					// if (ydtimer) clearInterval(ydtimer);
					// fangxiang = "暂停"
					TWEEN.removeAll()
					// zuoA.stop()
					// youA.stop()
					// if(yunzuo.stop) {yunzuo.stop()}
					// if(yunyou.stop) {yunyou.stop()}
				} else if (type === "ofn") {
					TWEEN.removeAll()
					// if (ydtimer) clearInterval(ydtimer);
					// zuoA.stop()
					// youA.stop()
					fangxiang = "急停";
					isMoveLeftAndRight = false;
				} else if (type === "zuo") {
					// if(fangxiang === "急停"){
					// fangxiang = "左"; 
					// return

					// }
					if (isMoveLeftAndRight == false) return;
					fangxiang = "左";
					let s = robot.position.x
					new TWEEN.Tween(robot.position)
						.to({
							x: -7
						}, Math.abs(s - (-7)) / 0.0018)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					// if (ydtimer) clearInterval(ydtimer);

					// ydtimer = setInterval(() => {
					//   if (robot.position.x > -7) {
					//     clearInterval(ydtimer);
					//   } else {
					//     robot.position.x += 0.01;
					//   }
					// }, 10);
				} else if (type === "you") {
					// if(fangxiang === "急停"){
					// fangxiang = "右";
					// return
					// }
					if (isMoveLeftAndRight == false) return;
					fangxiang = "右";
					let s = robot.position.x
					new TWEEN.Tween(robot.position)
						.to({
							x: -16
						}, Math.abs(s - (-16)) / 0.0018)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					// if (ydtimer) clearInterval(ydtimer);

					// ydtimer = setInterval(() => {
					//   if (robot.position.x < -16) {
					//     clearInterval(ydtimer);
					//   } else {
					//     robot.position.x -= 0.01;
					//   }
					// }, 10);
				}
			}
			let score = ref(36);

			function changeData(params: any) {
				score.value = score.value + params.value;
			}
			onBeforeUnmount(() => {
				console.log("分数", score.value);
			});
			return {
				topic,
				// goTest,
				isFold,
				mode,
				isDebugger,
				resetDubuggerAnimate,
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
				showHelp,
				showlr,
				changeNum,
			};
		},
	});
</script>

<template>
	<div class="controls_box">
		<div class="startb" v-if="topicNum === 0" @click="topicNum++">开始</div>

		<div class="helppage" v-if="showHelp">
			<img v-if="topicNum === 2" src="/implement/a1.png" />
			<img v-if="topicNum === 13" src="/implement/b1.png" />
			<img v-if="topicNum === 24" src="/implement/c1.png" />
			<div class="nextb" @click="
          topicNum++,
            setLeftContent('操作机器人'),
            (showlr = true),
            (showHelp = false)
        ">
				下一步
			</div>
		</div>

		<div class="touchpage" v-if="topicNum === 1">
			<div class="screen">
				<div class="daogui"></div>
				<div class="name">线性导轨</div>
				<div class="on" @click="switchAll('on')">运行</div>
				<div class="off" @click="switchAll('off')">暂停</div>
				<div class="ofn" @click="switchAll('ofn')">急停</div>
				<div class="ol" @click="switchAll('zuo')">向左</div>
				<div class="or" @click="switchAll('you')">向右</div>
			</div>

			<div class="pBtn" @click="topicNum++, (showHelp = true)">下一步</div>
			<!-- <img src="/topic1/t1-0.png" /> -->
			<!-- <div class="nextb" v-if="topicNum === 0" @click="topicNum++">开始</div> -->
		</div>
		<div class="left_control" v-if="showlr">
			<div :class="!isFold ? 'fold': 'expand'" @click="isFold = !isFold"></div>
			<div @click="resetDubuggerAnimate" class="rerun" v-show="isDebugger" v-if="mode == '教学演示'"></div>
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
				<div class="t1-1 conBtn" v-if="topicNum === 3" @click="setLeftContent('执行单元调试'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 5" @click="setLeftContent('执行单元调试'), topicNext(true)">
					下一步
				</div>
				<!-- 夹爪 -->
				<div class="t1-1 conBtn" v-if="topicNum === 14" @click="setLeftContent('执行单元调试'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 16" @click="setLeftContent('执行单元调试'), topicNext(true)">
					下一步
				</div>
				<!-- 吸盘 -->
				<div class="t1-1 conBtn" v-if="topicNum === 25" @click="setLeftContent('执行单元调试'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 27" @click="setLeftContent('执行单元调试'), topicNext(true)">
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
			<!-- 执行单元调试 -->
			<div class="robot_opt" :style="topicOneImg" v-if="leftContent === '执行单元调试'">
				<!-- 打磨抛光工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 4"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 6"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 7">
					<div class="conBtn" style="width: 33px; height: 14px; left: 56px; top: 108px">
						<thinking-select :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 47px; height: 14px; left: 57px; top: 211px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 8">
					<div class="conBtn" style="width: 48px; height: 14px; left: 57px; top: 124px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 33px; height: 14px; left: 57px; top: 143px">
						<thinking-select :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>
				<div class="conBtn" style="width: 96px; height: 32px; left: 196px; top: 292px" v-if="topicNum === 9"
					@click="topicNum = 9.1"></div>
				<div class="conBtn" style="width: 96px; height: 23px; left: 276px; top: 102px" v-if="topicNum === 9.1"
					@click="topicNum = 9.2"></div>
				<div class="conBtn" style="width: 96px; height: 31px; left: 290px; top: 292px" v-if="topicNum === 9.2"
					@click="topicNum = 9.3"></div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 9.3" @click="topicNum = 10.5"></div>
				<div class="nextb" v-if="topicNum === 10.5" @click="topicNum = topicNum + 0.5">
					下一步
				</div>
				<div class="conBtn" style="width: 96px; height: 32px; left: 196px; top: 292px" v-if="topicNum === 11"
					@click="topicNum = 11.1"></div>
				<div class="conBtn" style="width: 96px; height: 23px; left: 276px; top: 102px" v-if="topicNum === 11.1"
					@click="topicNum = 11.2"></div>
				<div class="conBtn" style="width: 96px; height: 31px; left: 290px; top: 292px" v-if="topicNum === 11.2"
					@click="topicNum = 11.3"></div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 12"
          @click="topicNext(false), (showHelp = true), (showlr = false)"
        ></div> -->

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 11.3" @click="topicNum = 12.5"></div>
				<div class="nextb" v-if="topicNum === 12.5" @click="
            (topicNum = topicNum + 0.5), (showHelp = true), (showlr = false)
          ">
					下一步
				</div>

				<!-- 夹爪类工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 15"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 17"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 18">
					<div class="conBtn" style="width: 33px; height: 14px; left: 56px; top: 108px">
						<thinking-select :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 47px; height: 14px; left: 57px; top: 211px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 19">
					<div class="conBtn" style="width: 48px; height: 14px; left: 90px; top: 124px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 33px; height: 14px; left: 90px; top: 143px">
						<thinking-select :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px"
						@click="topicNum = 20"></div>
				</div>
				<div class="conBtn" style="width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;" v-if="topicNum === 20" @click="topicNum = 21.5"></div>
				<!-- <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 21"
          @click="topicNext(false)"
        ></div> -->
				<!-- <div
          class="conBtn"
          style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          "
          v-if="topicNum === 21"
          @click="topicNum = 21.5"
        ></div> -->
				<div class="nextb" v-if="topicNum === 21.5" @click="topicNum = 23">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 22"
          @click="topicNum++"
        ></div> -->
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 23"
          @click="topicNext(false), (showHelp = true), (showlr = false)"
        ></div> -->
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 23" @click="topicNum = 23.5"></div>
				<div class="nextb" v-if="topicNum === 23.5" @click="
            (topicNum = topicNum + 0.5), (showHelp = true), (showlr = false)
          ">
					下一步
				</div>

				<!-- 吸盘类工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 26"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 28"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 29">
					<div class="conBtn" style="width: 33px; height: 14px; left: 56px; top: 108px">
						<thinking-select :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 60px; height: 14px; left: 48px; top: 226px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 30">
					<div class="conBtn" style="width: 48px; height: 14px; left: 90px; top: 124px">
						<thinking-select :list="[
                { label: 'MoveJ', value: 0 },
                { label: 'MoveL', value: 1 },
                // { label: 'MoveM', value: 0 },
                // { label: 'MoveAbsj', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 33px; height: 14px; left: 90px; top: 143px">
						<thinking-select :list="[

                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
              ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>
				<div class="conBtn" style="width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;" v-if="topicNum === 31" @click="topicNum = 32.5"></div>
				<!-- <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 32"
          @click="topicNext(false)"
        ></div> -->
				<!-- <div
          class="conBtn"
          style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          "
          v-if="topicNum === 32"
          @click="topicNum = 32.5"
        ></div> -->
				<div class="nextb" v-if="topicNum === 32.5" @click="topicNum = 34">
					下一步
				</div>
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 33"
          @click="topicNum++"
        ></div> -->
				<!-- <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 34"
          @click="topicNext(false), (showHelp = false), (showlr = false)"
        ></div> -->
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 34" @click="topicNum = 34.5"></div>
				<div class="nextb" v-if="topicNum === 34.5" @click="
            (topicNum = topicNum + 0.5), (showHelp = false), (showlr = false)
          ">
					下一步
				</div>

				<div class="waitpage" v-if="waitPageShow">
					等待程序执行完毕
					<!-- <div class="answer" v-if="questionPageShow">
                        <p>假设所有程序、点位和通讯都是正确的，当机器人拾取芯片经过视觉检测时，不再继续执行安装芯片的任务，不会是以下哪种原因？</p>
                        <div class="an_box">
                            <div class="an_item" @click="choseAnswer('A')">A.芯片检测不合格</div>
                            <div class="an_item" @click="choseAnswer('B')">B.芯片检测不合格</div>
                            <div class="an_item" @click="choseAnswer('C')">C.视觉模板问题</div>
                            <div class="an_item" @click="choseAnswer('D')">D.光照环境问题</div>
                        </div>
                    </div>-->
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
		<div class="overbtn" v-if="topicNum === 35" @click="goBack">实训结束</div>
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
			width: 490px;
			height: 370px;
			right: -35px;
			bottom: 0;
			background-color: #ffffff;
			z-index: 1;

			img {
				width: 100%;
				height: 100%;
			}

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
		}

		.touchpage {
			position: absolute;
			width: 460px;
			height: 320px;
			right: -10px;
			bottom: -40px;
			background: url(../chukongping.png) no-repeat;
			background-size: 100% 100%;

			.screen {
				position: absolute;
				width: 335px;
				height: 174px;
				left: 60px;
				top: 58px;
				background-color: #fff;
				border: 2px solid #ff6900;

				.daogui {
					position: absolute;
					left: 21px;
					top: 7px;
					width: 170px;
					height: 91px;
					background: url(../implement/daogui.png) no-repeat;
					background-size: 100% 100%;
				}

				.name {
					position: absolute;
					left: 70px;
					top: 102px;
					font-size: 18px;
					color: #ff8d00;
					font-weight: bold;
				}

				.on {
					position: absolute;
					left: 250px;
					top: 10px;
					font-size: 16px;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 50%;
					background-color: #71f33e;
				}

				.off {
					position: absolute;
					left: 250px;
					top: 64px;
					font-size: 16px;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 50%;
					background-color: #e9d200;
				}

				.ofn {
					position: absolute;
					left: 250px;
					top: 119px;
					font-size: 16px;
					width: 50px;
					height: 50px;
					line-height: 50px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 50%;
					background-color: #f3683e;
				}

				.ol {
					position: absolute;
					left: 30px;
					top: 136px;
					font-size: 18px;
					width: 70px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 5px;
					background-color: #71f33e;
				}

				.or {
					position: absolute;
					left: 120px;
					top: 136px;
					font-size: 18px;
					width: 70px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 5px;
					background-color: #71f33e;
				}
			}

			.pBtn {
				left: -550px;
				top: 260px;
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
			.rerun{
				margin-top:20px;
				width: 100%;
				height: 100%;
				background-image: url(rerun.png);
			}
		}

		.left_box {
			width: 480px;
			height: 359px;
			/* float: left; */
			position: relative;
			top: 14px;
			border: 4px solid #666;
			animation: 0.5s;

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
						top: 99px;
					}

					.t1-0-1 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 122px;
					}

					.t1-0-2 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 145px;
					}

					.t1-0-3 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 190px;
					}

					.t1-0-4 {
						width: 80px;
						height: 16px;
						left: 12px;
						top: 213px;
					}

					.t1-0-5 {
						width: 80px;
						height: 15px;
						left: 12px;
						top: 258px;
					}

					.t1-0-6 {
						width: 80px;
						height: 15px;
						left: 12px;
						top: 280px;
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
					.screen {
						position: absolute;
						width: 190px;
						height: 110px;
						border: 2px solid #ff6900;

						.name {
							position: absolute;
							left: 20px;
							top: 42px;
							font-size: 18px;
							color: #ff8d00;
							font-weight: bold;
						}

						.on {
							position: absolute;
							left: 130px;
							top: 10px;
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

						.off {
							position: absolute;
							left: 130px;
							top: 45px;
							font-size: 16px;
							width: 40px;
							height: 20px;
							line-height: 20px;
							text-align: center;
							color: #fff;
							cursor: pointer;
							border-radius: 5px;
							background-color: #f3e13e;
						}

						.ofn {
							position: absolute;
							left: 130px;
							top: 80px;
							font-size: 16px;
							width: 40px;
							height: 20px;
							line-height: 20px;
							text-align: center;
							color: #fff;
							cursor: pointer;
							border-radius: 5px;
							background-color: #f5573b;
						}
					}

					.pBtn {
						position: absolute;
						background-color: #ff7c00;
						color: #fff;
						cursor: pointer;
						width: 69px;
						height: 32px;
						left: 200px;
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
					right: 585px;
					bottom: -70px;
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

				.start_btn {
					position: absolute;
					background-color: #ff7c00;
					color: #fff;
					cursor: pointer;
					width: 69px;
					height: 32px;
					left: 209px;
					top: 318px;
					text-align: center;
					line-height: 32px;
				}

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
