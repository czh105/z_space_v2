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
	import {
		ElMessage
	} from 'element-plus'
	import Result from "../hooks/result";
	import ThinkingSelect from "./ThinkingSelect.vue";
	import $store from "../store/index";
	// import { setTimeout } from "timers/promises";
	export default defineComponent({
		name: "polish",
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
			let leftContent = ref("打磨单元调试实训任务");
			let topic = ref((window as any).topic);
			let showMenu = ref(false);
			let waitPageShow = ref(false);
			let questionPageShow = ref(false);
			let showHelp = ref(false);
			let showlr = ref(false);
			let checkScreen = ref(0);
			let bigType = $store.state.bigType;

			let animateSwitch = ref(false);
			//todo: 增加示教器面板折叠功能
			let isFold = ref(false);
			const changeNum = (num: number): void => {
				topicNum.value = num;
				//   TWEEN.removeAll()
			};

			function goBack() {
				let p = {
					name: "打磨单元调试",
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
			let zhuan1: any = player.scene.getObjectByName("zhuan1"); //rotarion y 0-180
			let jia1: any = player.scene.getObjectByName("jia1"); //y+5
			let jia2: any = player.scene.getObjectByName("jia2"); //y-5
			let jia3: any = player.scene.getObjectByName("jia3"); //y+5
			let jia4: any = player.scene.getObjectByName("jia4"); //y-5
			let jia5: any = player.scene.getObjectByName("jia5"); //y+5
			let jia6: any = player.scene.getObjectByName("jia6"); //y-5
			let lun1: any = player.scene.getObjectByName("lun1");

			let zhuanwei: any = player.scene.getObjectByName("zhuanwei"); //rotarion y 0-180 // z + 20

			let robot: any = player.scene.getObjectByName("robot2");
			let j62 = player.scene.getObjectByName(`j6-2`);
			let cangitemtou = player.scene.getObjectByName(`cangitemtou`);

			let home: any = player.scene.getObjectByName("home"); // [1203,58,-252]  [1465,58,-304]

			// debugger
			onMounted(() => {
				nowType.value = "A";
				topicNum.value++;
				emit("changeTopicNum", topicNum.value);

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

				player.redBbox = redBbox;

				j6.add(redBox);

				player.blueBbox = blueBbox;
				player.greenBbox = greenBbox;
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
				console.log(topicNum.value);
				switch (topicNum.value) {
					case 2:
						return `background-image: url( "./polish/a1.png"  )`;
						break;
					case 4:
						return `background-image: url( "./polish/a2.png"  )`;
						break;
					case 6:
						return `background-image: url( "./polish/a3.png"  )`;
						break;
					case 7:
						return `background-image: url( "./polish/a4.png"  )`;
						break;
					case 8:
						return `background-image: url( "./polish/a5.png"  )`;
						break;
					case 9:
						return `background-image: url( "./polish/a6.png"  )`;
						break;
					case 10:
						return `background-image: url( "./polish/pp.png"  )`;
						break;
					case 10.5:
						return `background-image: url( "./polish/pp.png"  )`;
						break;
					case 11:
						return `background-image: url( "./polish/a8.png"  )`;
						break;
					case 12:
						return `background-image: url( "./polish/pp.png"  )`;
						break;
					case 12.5:
						return `background-image: url( "./polish/pp.png"  )`;
						break;
						// 吹屑
					case 13:
						return `background-image: url( "./polish/b1.png"  )`;
						break;
					case 15:
						return `background-image: url( "./polish/b2.png"  )`;
						break;
					case 16:
						return `background-image: url( "./polish/b3.png"  )`;
						break;
					case 17:
						return `background-image: url( "./polish/b4.png"  )`;
						break;
					case 18:
						return `background-image: url( "./polish/pp.png"  )`;
						break;
					case 18.5:
						return `background-image: url( "./polish/pp.png"  )`;
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
					// player.blueBbox.setFromObject(Object832);
					player.greenBbox.setFromObject(home);

					if (topicNum.value === 3) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							animateState([0.31, -0.74, 0.42, 0, -1.04, 0], 1000, () => {});
						} else {
							console.log("不相交");
						}
					}

					if (topicNum.value === 5) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							animateState([0.32, -1.38, 0.29, 0, -0.54, 0.01], 1000, () => {});
						} else {
							console.log("不相交");
						}
					}

					if (topicNum.value === 14) {
						if (player.redBbox.intersectsBox(player.greenBbox)) {
							console.log("相交");
							animateState([-0.34, -2.14, 1.38, 0, -0.73, -0.13], 1000, () => {});
						} else {
							console.log("不相交");
						}
					}
				}
			});

			function topicNext(bool: boolean) {
				// if (!nowAllowClick.value[topicNum.value]) return

				topicNum.value++;

				if (bool) {
					runState.push(getRobotPosition());
				}
			}

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
				[0.32, -0.46, 0.17, 0, -1.07, 0.01],
				[0.32, -0.82, -0.01, 0, -0.54, 0.01],
				[0.32, -1.38, 0.29, 0, -0.54, 0.01],
				[-0.37, -1.05, 0.09, 0, -0.54, 0.01],
				[-0.37, -1.53, 0.31, 0, -0.38, 0.02],
			];
			let arr2 = [
				[-0.28, -1.09, 0.36, -0.08, -0.67, 0.24],
				[-0.31, -1.71, 1.02, -0.06, -0.73, 0.24],
				[-0.34, -2.14, 1.38, 0, -0.73, -0.13],
			];
			watch(topicNum, () => {
				console.log(topicNum.value);
				emit("changeTopicNum", topicNum.value);
				// if (topicNum.value === 23) {
				home.visible = false;
				if (topicNum.value === 1) {
					showlr.value = false;
					showHelp.value = false;
					j62.visible = false;

					startFree(
						[0, 0, 0, 0, 0, 0], {
							x: -4.22,
							y: 15.68,
							z: 1.81
						}, {
							x: -7.38,
							y: 9.07,
							z: -4.49
						}
					);
				}
				if (topicNum.value === 2) {
					showHelp.value = true;
					showlr.value = false;
				}

				if (topicNum.value === 3) {
					robot.position.x = -8;
					j62.visible = true;
					cangitemtou.visible = true;
					if (bigType === "教学演示") {
						home.visible = true;
						home.position.set(1203, 58, 136);
					}

					startFree(
						[0.32, -0.46, 0.17, 0, -1.07, 0.01], {
							x: 0.23,
							y: 20.37,
							z: -9.84
						}, {
							x: -9.31,
							y: 11.86,
							z: -4.57
						}
					);
				}
				if (topicNum.value === 5) {
					j62.visible = true;

					if (bigType === "教学演示") {
						home.visible = true;
						home.position.set(1203, 58, -252);
					}


				}

				if (topicNum.value === 10.5) {
					j62.visible = true;
					animateState(arr1[0], 1000, () => {
						animateState(arr1[1], 1000, () => {
							animateState(arr1[2], 1000, () => {
								lun1.visible = true;
								cangitemtou.visible = false;
								animateState(arr1[1], 1000, () => {});
							});
						});
					});
				}
				if (topicNum.value === 12.5) {
					new TWEEN.Tween(zhuanwei.rotation)
						.to({
							y: 3.14
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.onComplete(() => {
							animateState(arr1[3], 1000, () => {
								animateState(arr1[4], 1000, () => {
									lun1.visible = false;
									cangitemtou.visible = true;
									animateState(arr1[3], 1000, () => {});
								});
							});
						})
						.start();
				}
				if (topicNum.value === 13) {
					j62.visible = true;
					showHelp.value = true;
					showlr.value = false;
					zhuanwei.rotation.set(0, 3.14, 0);
					lun1.visible = false;
					cangitemtou.visible = true;
					animateState(arr1[3], 1000, () => {});
				}
				if (topicNum.value === 14) {
					home.visible = true;
					home.position.set(1503, 222, -294);
				}

				if (topicNum.value === 18.5) {
					j62.visible = true;
					lun1.visible = false;
					cangitemtou.visible = true;
					animateState(arr2[0], 1000, () => {
						animateState(arr2[1], 1000, () => {
							animateState(arr2[2], 3000, () => {
								animateState(arr2[1], 1000, () => {});
							});
						});
					});
				}
			});

			function switchAll(type: string) {
				if (type === "转台夹紧") {
					new TWEEN.Tween(jia1.position)
						.to({
							y: -2
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia2.position)
						.to({
							y: 7
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转台松开") {
					new TWEEN.Tween(jia1.position)
						.to({
							y: -7
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia2.position)
						.to({
							y: 12
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转台顺时针") {
					new TWEEN.Tween(zhuan1.rotation)
						.to({
							z: -90 * (Math.PI / 180)
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转台逆时针") {
					new TWEEN.Tween(zhuan1.rotation)
						.to({
							z: 0
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "工台夹紧") {
					new TWEEN.Tween(jia3.position)
						.to({
							y: -86
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia4.position)
						.to({
							y: -75
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "工台松开") {
					new TWEEN.Tween(jia3.position)
						.to({
							y: -91
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia4.position)
						.to({
							y: -66
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位上升") {
					new TWEEN.Tween(zhuanwei.position)
						.to({
							z: 20
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位下降") {
					new TWEEN.Tween(zhuanwei.position)
						.to({
							z: 0
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位顺时针") {
					new TWEEN.Tween(zhuanwei.rotation)
						.to({
							y: 180 * (Math.PI / 180)
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位逆时针") {
					new TWEEN.Tween(zhuanwei.rotation)
						.to({
							y: 0
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位夹紧") {
					new TWEEN.Tween(jia5.position)
						.to({
							y: -2
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia6.position)
						.to({
							y: 2
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "转位松开") {
					new TWEEN.Tween(jia5.position)
						.to({
							y: -7
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
					new TWEEN.Tween(jia6.position)
						.to({
							y: 7
						}, 500)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}
			}
			let score = ref(20);

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
				checkScreen,
				changeNum,
				// runOfState
			};
		},
	});
</script>

<template>
	<div class="controls_box">
		<!-- <div class="startb" v-if="topicNum === 0" @click="topicNum++">开始</div> -->

		<div class="helppage" v-if="showHelp">
			<img style="width: 490px; height: 340px" v-if="topicNum === 2" src="/polish/a1.png" />
			<img style="width: 490px; height: 300px" v-if="topicNum === 13" src="/polish/b1.png" />
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
			<div class="screen" style="left: 80px; top: 78px">
				<div class="daogui"></div>
				<div class="name" style="top: 172px; left: 70px">打磨工位夹具</div>
				<div class="name" style="top: 32px; left: 240px">转台</div>
				<div class="ld" style="left: 320px; top: 10px; background-color: rgb(247, 75, 75)"
					@click="switchAll('转台夹紧')">
					夹紧
				</div>
				<div class="ld" style="left: 370px; top: 10px; background-color: rgb(75, 247, 104)"
					@click="switchAll('转台松开')">
					松开
				</div>
				<div class="ld" style="left: 320px; top: 50px; background-color: rgb(247, 75, 75)"
					@click="switchAll('转台顺时针')">
					顺时针
				</div>
				<div class="ld" style="left: 370px; top: 50px; background-color: rgb(75, 247, 104)"
					@click="switchAll('转台逆时针')">
					逆时针
				</div>
				<div class="name" style="top: 100px; left: 240px">工台</div>
				<div class="ld" style="left: 320px; top: 100px; background-color: rgb(247, 75, 75)"
					@click="switchAll('工台夹紧')">
					夹紧
				</div>
				<div class="ld" style="left: 370px; top: 100px; background-color: rgb(75, 247, 104)"
					@click="switchAll('工台松开')">
					松开
				</div>
				<div class="name" style="top: 184px; left: 240px">转位</div>
				<div class="ld" style="left: 320px; top: 150px; background-color: rgb(247, 75, 75)"
					@click="switchAll('转位上升')">
					上升
				</div>
				<div class="ld" style="left: 370px; top: 150px; background-color: rgb(75, 247, 104)"
					@click="switchAll('转位下降')">
					下降
				</div>
				<div class="ld" style="left: 320px; top: 185px; background-color: rgb(247, 75, 75)"
					@click="switchAll('转位顺时针')">
					顺时针
				</div>
				<div class="ld" style="left: 370px; top: 185px; background-color: rgb(75, 247, 104)"
					@click="switchAll('转位逆时针')">
					逆时针
				</div>
				<div class="ld" style="left: 320px; top: 218px; background-color: rgb(247, 75, 75)"
					@click="switchAll('转位夹紧')">
					夹紧
				</div>
				<div class="ld" style="left: 370px; top: 218px; background-color: rgb(75, 247, 104)"
					@click="switchAll('转位松开')">
					松开
				</div>
			</div>

			<div class="pBtn" @click="topicNum++, (showHelp = true)">下一步</div>
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
				<div class="t1-1 conBtn" v-if="topicNum === 3" @click="setLeftContent('打磨单元调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 5" @click="setLeftContent('打磨单元调试实训任务'), topicNext(true)">
					下一步
				</div>
				<!-- 吹屑 -->
				<div class="t1-1 conBtn" v-if="topicNum === 14" @click="setLeftContent('打磨单元调试实训任务'), topicNext(true)">
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
			<!-- 打磨单元调试实训任务 -->
			<div class="robot_opt" :style="topicOneImg" v-if="leftContent === '打磨单元调试实训任务'">
				<!-- <div class="codepage" style="background-color: #fff;" v-if="topicNum === 1">
                    <div class="pBtn" @click="topicNum++">下一步</div>
                </div>-->
				<!-- 上下料 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 4"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 6"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 7">
					<div class="conBtn" style="width: 41px; height: 14px; left: 59px; top: 108px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 133px; height: 14px; left: 103px; top: 108px">
						<thinking-select :list="[
              { label: 'TOpTabletight1', value: 1 },
              { label: 'ToTDigGrip', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 41px; height: 14px; left: 59px; top: 176px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 132px; height: 14px; left: 103px; top: 176px">
						<thinking-select :list="[
              { label: 'TOpTabletight1', value: 1 },
              { label: 'ToTDigGrip', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px" @click="topicNum++">
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 8">
					<div class="conBtn" style="width: 128px; height: 14px; left: 92px; top: 126px">
						<thinking-select :list="[
              { label: 'TOpTabletight1', value: 1 },
              { label: 'ToTDigGrip', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 127px; height: 14px; left: 107px; top: 160px">
						<thinking-select :list="[
              { label: 'TOpTabletight1', value: 0 },
              { label: 'ToTDigGrip', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px"
						@click="topicNum = 10"></div>
				</div>

				<div class="conBtn" style="width: 96px; height: 23px; left: 276px; top: 102px" v-if="topicNum === 9"
					@click="topicNum++"></div>
				<!-- <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 10"
          @click="topicNext(false)"
        ></div> -->
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 10" @click="topicNum = 10.5"></div>
				<div class="nextb" v-if="topicNum === 10.5" @click="topicNum = 12">
					下一步
				</div>
				<div class="conBtn" style="width: 96px; height: 23px; left: 276px; top: 102px" v-if="topicNum === 11"
					@click="topicNum++"></div>
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
          " v-if="topicNum === 12" @click="topicNum = 12.5"></div>
				<div class="nextb" v-if="topicNum === 12.5" @click="
          (topicNum = topicNum + 0.5), (showHelp = true), (showlr = false)
        ">
					下一步
				</div>

				<!-- 吹屑 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 193px; top: 286px" v-if="topicNum === 15"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 16">
					<div class="conBtn" style="width: 44px; height: 14px; left: 52px; top: 117px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 127px; height: 14px; left: 100px; top: 117px">
						<thinking-select :list="[
              { label: 'TOpBlowcrumb', value: 1 },
              { label: 'ToTDigGrip', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>


					<div class="conBtn" style="width: 44px; height: 14px; left: 52px; top: 160px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="conBtn" style="width: 127px; height: 14px; left: 100px; top: 160px">
						<thinking-select :list="[
              { label: 'TOpBlowcrumb', value: 1 },
              { label: 'ToTDigGrip', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>






					<div class="conBtn" style="width: 90px; height: 34px; left: 200px; top: 292px"
						@click="topicNum = 18"></div>
				</div>



				<div class="conBtn" style="width: 96px; height: 23px; left: 276px; top: 102px" v-if="topicNum === 17"
					@click="topicNum++"></div>
				<!-- <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 18"
          @click="topicNext(false), (showHelp = false), (showlr = false)"
        ></div> -->
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 18" @click="topicNum = 18.5"></div>
				<div class="nextb" v-if="topicNum === 18.5" @click="
          (topicNum = topicNum + 0.5), (showHelp = false), (showlr = false)
        ">
					下一步
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
		<div class="overbtn" v-if="topicNum === 19" @click="goBack">实训结束</div>
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
			// width: 490px;
			// height: 370px;
			right: -35px;
			bottom: 0;
			background-color: #ffffff;
			z-index: 1;

			// img {
			//   width: 100%;
			//   height: 100%;
			// }

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
			width: 600px;
			height: 450px;
			right: -10px;
			bottom: -40px;
			background: url(../chukongping.png) no-repeat;
			background-size: 100% 100%;

			.screen {
				position: absolute;
				width: 437px;
				height: 254px;
				left: 60px;
				top: 58px;
				background-color: #fff;
				border: 2px solid #ff6900;

				.daogui {
					position: absolute;
					left: 71px;
					top: 27px;
					width: 110px;
					height: 118px;
					background: url(../polish/damo.png) no-repeat;
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

				.type {
					position: absolute;
					left: 70px;
					top: 102px;
					font-size: 18px;
					color: #70e2ff;
					font-weight: bold;
				}

				.ld {
					position: absolute;
					left: 120px;
					top: 136px;
					font-size: 14px;
					width: 46px;
					height: 25px;
					line-height: 25px;
					text-align: center;
					color: #fff;
					cursor: pointer;
					border-radius: 5px;
					background-color: #71f33e;
				}
			}

			.pBtn {
				left: -410px;
				top: 400px;
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
