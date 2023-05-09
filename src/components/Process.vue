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
	import {
		ElMessage
	} from 'element-plus'
	import Result from "../hooks/result";
	import ThinkingSelect from "../components/ThinkingSelect.vue";
	// import { setTimeout } from "timers/promises";
	export default defineComponent({
		name: "Process",
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
			let leftContent = ref("多工艺调试实训任务");
			let topic = ref((window as any).topic);
			let showMenu = ref(false);
			let waitPageShow = ref(false);

			let animateSwitch = ref(false);

			let bigType = $store.state.bigType;

			function goBack() {
				let p = {
					name: '多工艺调试',
					score: score.value
				}
				console.log('上传', p)
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
			let showHelp = ref(true);
			let showlr = ref(false);
			//焊接工具
			let j65: any = player.scene.getObjectByName("j6-5");
			let hj: any = player.scene.getObjectByName("hj");

			//打磨抛光工具
			let j64: any = player.scene.getObjectByName("j6-4");
			let dm: any = player.scene.getObjectByName("dm");
			//码垛工具
			let j62: any = player.scene.getObjectByName("j6-2");
			let hjj: any = j62.getObjectByName("hanjiejian");
			let bwj1: any = player.scene.getObjectByName("bianweiji1");
			let bwj2: any = player.scene.getObjectByName("bianweiji2");
			let hjjs: any = bwj1.getObjectByName("hanjiejian");
			// let hjjt: any = bwj2.getObjectByName("hanjiejian");

			let home: any = player.scene.getObjectByName("home");
			// 实现变位机夹紧和松开动画(切换模型)
			function switchbwj(bool: boolean) {
				bwj1.visible = bool;
				bwj2.visible = !bool;
				hjjs.visible = !bool
			}
			// todo: 增加示教器面板折叠功能
			let isFold = ref(false);
			let actionHistory: any = (window as any).actionHistory;
			let actionEnum: any = (window as any).actionEnum;
			// 判断是否是教学演示
			let mode:any = ref((window as any).mode);
			// todo:判断是否是调试程序
			var isDebugger = ref(false);
			// debugger
			const changeNum = (num: number): void => {
				if ([11, 22, 31, 37].includes(num)) {
					showlr.value = false;
					showHelp.value = true;
				}
				if (num === 43) {
					showlr.value = false;
					showHelp.value = false;
				}
				topicNum.value = num;
			};
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
					case 0:
						return `background-image: url( "./process/t0.png"  )`;
						break;
					case 2:
						return `background-image: url( "./process/t1.png"  )`;
						break;
					case 4:
						return `background-image: url( "./process/t2.png"  )`;
						break;
					case 5:
						return `background-image: url( "./process/b1.png"  )`;
						break;
					case 6:
						return `background-image: url( "./process/b2.png"  )`;
						break;
					case 7:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 8:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 9:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 10:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 11:
						return `background-image: url( "./process/t6.png"  )`;
						break;
					case 13:
						return `background-image: url( "./process/t1.png"  )`;
						break;
					case 15:
						return `background-image: url( "./process/t2.png"  )`;
						break;
					case 16:
						return `background-image: url( "./process/b3.png"  )`;
						break;
					case 17:
						return `background-image: url( "./process/b4.png"  )`;
						break;
					case 18:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 19:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 20:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 21:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 22:
						return `background-image: url( "./process/t7.png"  )`;
						break;
					case 24:
						return `background-image: url( "./process/t8.png"  )`;
						break;
					case 27:
						return `background-image: url( "./process/t9.png"  )`;
						break;
					case 28:
						return `background-image: url( "./process/t10.png"  )`;
						break;
					case 29:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 30:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 31:
						return `background-image: url( "./process/t13.png"  )`;
						break;
					case 33:
						return `background-image: url( "./process/t14.png"  )`;
						break;
					case 34:
						return `background-image: url( "./process/b5.png"  )`;
						break;
					case 35:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 36:
						return `background-image: url( "./process/pp.png"  )`;
						break;

					case 37:
						return `background-image: url( "./process/t17.png"  )`;
						break;
					case 39:
						return `background-image: url( "./process/t18.png"  )`;
						break;
					case 40:
						return `background-image: url( "./process/b6.png"  )`;
						break;
					case 41:
						return `background-image: url( "./process/pp.png"  )`;
						break;
					case 42:
						return `background-image: url( "./process/pp.png"  )`;
						break;
						// case 43:
						//     return `background-image: url( "./process/t20.png"  )`;
						//     break;

						// case 12:
						//     return `background-image: url( "./process/t1-6.png"  )`;
						//     break;
						// case 14:
						//     return `background-image: url( "./process/t1-7.png"  )`;
						//     break;

						// case 13: return `background-image: url(${new URL('/topic1/t1-5.png', import.meta.url).href})`; break;
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
							animateState([-1.34, 0.50, 0.27, 0, 0.84, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 12) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-0.99, 0.03, -0, 0, -0, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 14) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([-1.23, 0.53, 0.21, 0, 0.82, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 23) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([1.23, -0.04, 0, 0, 1.56, 0], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 25) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([1.15, 0.36, 0.56, 0.44, -1.23, 0.32], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 32) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([1.15, 0.36, 0.56, 0.44, -1.23, 0.32], 1000, () => {});
							// nowAllowClick.value[topicNum.value] = true;
						} else {
							console.log("不相交");
							// nowAllowClick.value[topicNum.value] = false;
						}
					}
					if (topicNum.value === 38) {
						if (player.redBbox.intersectsBox(player.blueBbox)) {
							console.log("相交");
							animateState([1.08, 0.20, 0.14, -0.67, 1.02, 0.44], 1000, () => {});
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
				console.log(runState);
			}

			// 定制动画相关
			let list1Num = 0;
			let list2Num = 0;
			let pointList1: any = ref([]);
			let pointList2: any = ref([]);
			let listPosition: any = [];
			let aTime1: any = 0;
			let a1: any = null;
			let aTime2: any = 0;
			let a2: any = null;
			// let maduo: any = player.scene.getObjectByName("maduo");
			function runList(name: string) {
				if (name === "list1") {
					setState(listPosition[0]);
					console.log("开始动画");
					a1 = setInterval(() => {
						console.log("执行", aTime1);
						aTime1++;

						if (aTime1 === 2) {
							// maduo.visible = true
						}
						if (aTime1 === listPosition.length) {
							topicNum.value++;
							// maduo.visible = false
							waitPageShow.value = false;
						} else {
							animateState(listPosition[aTime1], 1500);
						}
					}, 2100);
				}
				if (name === "list2") {
					setState(listPosition[0]);
					console.log("开始动画");
					a2 = setInterval(() => {
						console.log("执行", aTime2);
						aTime2++;
						if (aTime2 === 2) {
							// maduo.visible = true
						}
						if (aTime2 === listPosition.length) {
							topicNum.value++;
							// maduo.visible = false
							waitPageShow.value = false;
						} else {
							animateState(listPosition[aTime2], 1500);
						}
					}, 2100);
				}
			}

			function addList(name: string) {
				if (name === "list1") {
					list1Num++;
					switch (list1Num) {
						case 1:
							pointList1.value.push("AreaCtPW10");
							break;
						case 2:
							pointList1.value.push("AreaCtPR");
							break;
					}
					listPosition.push(getRobotPosition());
				}
				if (name === "list2") {
					list2Num++;
					switch (list2Num) {
						case 1:
							pointList2.value.push("AreaCtPW10");
							break;
						case 2:
							pointList2.value.push("AreaCtPR20");
							break;
					}

					listPosition.push(getRobotPosition());
				}
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
			function allDebuggerAnimate(){
				if(!isDebugger.value){
					actionHistory.pushModelsActionHistory([j1, j2, j3, j4, j5, j6], actionEnum.ROTATION);
				}
				// todo: 取焊枪工具的调试运行
				if (topicNum.value === 8) {
					// player.controls.enabled = false;
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j65, hj], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr1[0], 1000, () => {
						animateState(arr1[1], 1000, () => {
							animateState(arr1[2], 1000, () => {
								j65.visible = true;
								hj.visible = false;
								animateState(arr1[1], 1000, () => {});
							});
						});
					});
				}
				// todo: 放焊枪工具的调试运行
				else if (topicNum.value === 10) {
					// player.controls.enabled = false;
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j65, hj], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr1[1], 1000, () => {
						animateState(arr1[2], 1000, () => {
							j65.visible = false;
							hj.visible = true;
							animateState(arr1[1], 1000, () => {});
						});
					});
				}
				// todo: 取打磨抛光工具的调试运行
				else if (topicNum.value === 19) {
					// player.controls.enabled = false;
					if(!isDebugger.value){
					actionHistory.pushModelsActionHistory([j64, dm], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr2[0], 1000, () => {
						animateState(arr2[1], 1000, () => {
							animateState(arr2[2], 1000, () => {
								j64.visible = true;
								dm.visible = false;
								animateState(arr2[1], 1000, () => {});
							});
						});
					});
				}
				// todo: 放打磨抛光工具的调试运行
				else if (topicNum.value === 21) {
					// player.controls.enabled = false;
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([j64, dm], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr2[1], 1000, () => {
						animateState(arr2[2], 1000, () => {
							j64.visible = false;
							dm.visible = true;
							animateState(arr2[1], 1000, () => {});
						});
					});
				}// todo:变位机夹紧和释放的调试运行
				else if (topicNum.value === 30) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([hjj, hjjs], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					animateState(arr3[0], 1000, () => {
						animateState(arr3[1], 2000, () => {
							hjj.visible = false
							hjjs.visible = true
							animateState(arr3[0], 1000, () => {});
						});
					});
				}// todo:变位机控制弧焊程序调试运行
				else if (topicNum.value === 36) {
					if(!isDebugger.value){
						actionHistory.pushModelActionHistory(player.camera, actionEnum.POSITION);
						actionHistory.pushModelActionHistory(player.controls, actionEnum.LOOKAT);
					}
					isDebugger.value = true;
					startFree(
						[0, 0, 0, 0, 0, 0], {
							x: -8.78,
							y: 64.81,
							z: 60.13
						}, {
							x: 23.93,
							y: 25.04,
							z: 5.20
						}
					);
					animateState(arr4[0], 1000, () => {
						animateState(arr4[1], 1000, () => {
							animateState(arr4[2], 2000, () => {
								animateState(arr4[3], 2000, () => {
									animateState(arr4[4], 2000, () => {
										animateState(arr4[5], 2000,
											() => {
												animateState(
													arr4[
													6],
													2000,
													() => {

													});
											});
									});
								});
							});
						});
					});
				}
				// todo:打磨抛光轨迹的调试运行
				else if (topicNum.value === 42) {
					isDebugger.value = true;
					animateState(arr5[0], 1000, () => {
						animateState(arr5[1], 1000, () => {
							animateState(arr5[2], 2000, () => {
								animateState(arr5[3], 1000, () => {
									animateState(arr5[1], 2000, () => {
										animateState(arr5[2], 1000,
											() => {
												animateState(
													arr5[
													3],
													2000,
													() => {
				
													})
											})
									})
								})
							})
						})
					})
				}
				
			}
			// 初始化位置视角
			function startFree(
				arr: Array < number > ,
				posObj: Object,
				conObj: Object
			): void {
				// j65.visible = true
				// setLeftContent('操作机器人')
				animateState(arr, 2000);

				new TWEEN.Tween(player.camera.position)
					.to(posObj, 2000)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(player.controls.target)
					.to(conObj, 2000)
					.easing(TWEEN.Easing.Linear.None)
					.start();
			}
			let arr1 = [
				[-1.04, 0.2, -0.17, 0, 1.07, 0],
				[-1.33, 0.25, 0.06, 0, 1.26, 0],
				[-1.34, 0.50, 0.27, 0, 0.84, 0]
			]
			let arr2 = [
				[-1.04, 0.2, -0.17, 0, 1.07, 0],
				[-1.23, 0.25, 0.06, 0, 1.26, 0],
				[-1.23, 0.53, 0.21, 0, 0.82, 0]
			]
			let arr3 = [
				[1.23, -0.04, 0, 0, 1.56, 0],
				[1.15, 0.36, 0.56, 0.44, -1.23, 0.32]
			]
			let arr4 = [
				[1.23, -0.04, 0, 0, 1.56, 0],
				[1.15, 0.36, 0.56, 0.44, -1.23, 0.32],
				[1.25, 0.33, 0.55, 0.24, -1.10, 1.02],
				[1.25, 0.33, 0.55, 0.36, -1.10, 1.82],
				[1.21, 0.28, 0.47, 0.43, -1.15, 0.20],
				[1.10, 0.34, 0.47, 0.57, -1.10, -1.30],
				[1.08, 0.34, 0.47, 0.57, -1.10, -1.91]
			]
			let arr5 = [
				[1.23, -0.04, 0, 0, 1.56, 0],
				[1.08, 0.20, 0.14, -0.67, 1.02, 0.44],
				[1.31, 0.21, 0.03, 0.22, 1.02, 0.44],
				[1.32, 0.21, 0.06, 0.25, 1.02, 0.44]
			]
			watch(topicNum, () => {
				emit("changeTopicNum", topicNum.value);
				console.log(topicNum.value)
				home.visible = false;
				isDebugger.value = false;
				// 清空历史记录
				actionHistory.clearModelActionHistory();
				// j62.visible = false
				isDebugger.value = false;
				// 清空历史记录
				actionHistory.clearModelActionHistory();
				if (topicNum.value === 0) {
					showHelp.value = true;
					showlr.value = false;
					hj.visible = true
					j65.visible = false
					j62.visible = false
					j64.visible = false
					hjj.visible = false
					startFree(
						[0, 0, 0, 0, 0, 0], {
							x: -52.68,
							y: 70.16,
							z: 63.79
						}, {
							x: 0.99,
							y: 15.97,
							z: 11.57
						}
					);
				}
				// 焊枪
				if (topicNum.value === 1) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1900, 3800, 1300);
				}
				if (topicNum.value === 3) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2300, 2400, 650);

				}
				
				// 打磨

				if (topicNum.value === 11) {
					showHelp.value = true;
					showlr.value = false;
					j62.visible = false
					j65.visible = false
					j64.visible = false
					hjj.visible = false
				}
				if (topicNum.value === 12) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-1900, 3800, 1300);

				}
				if (topicNum.value === 14) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(-2338, 2351, 925);

				}
				
				// 变位机
				if (topicNum.value === 22) {
					showHelp.value = true;
					showlr.value = false;
					j65.visible = false
					j62.visible = true
					j64.visible = false
					hjj.visible = true

					bwj1.visible = true
					bwj2.visible = false
					hjjs.visible = false

					startFree(
						[0.67, 0, 0, 0, 1.58, 0], {
							x: -8.78,
							y: 64.81,
							z: 60.13
						}, {
							x: 23.93,
							y: 25.04,
							z: 5.20
						}
					);

				}
				if (topicNum.value === 23) {
					j62.visible = true
					hjj.visible = true
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(1650, 3800, 650);

				}
				if (topicNum.value === 25) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(1900, 2600, 800);

				}
				
				// 焊接

				if (topicNum.value === 31) {
					showHelp.value = true;
					showlr.value = false;
					j62.visible = false
					hjj.visible = false
					j65.visible = true
					j64.visible = false
					bwj1.visible = true
					bwj2.visible = false
					hjjs.visible = true

					startFree(
						[0.67, 0, 0, 0, 1.58, 0], {
							x: -8.78,
							y: 64.81,
							z: 60.13
						}, {
							x: 23.93,
							y: 25.04,
							z: 5.20
						}
					);
				}
				if (topicNum.value === 32) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(1900, 2600, 800);

				}
				// 抛光
				if (topicNum.value === 37) {
					showHelp.value = true;
					showlr.value = false;
					j62.visible = false
					hjj.visible = false
					j65.visible = false
					j64.visible = true

					bwj1.visible = true
					bwj2.visible = false
					hjjs.visible = true

					startFree(
						[0.67, 0, 0, 0, 1.58, 0], {
							x: -8.78,
							y: 64.81,
							z: 60.13
						}, {
							x: 23.93,
							y: 25.04,
							z: 5.20
						}
					);
				}

				if (topicNum.value === 38) {
					if (bigType !== "教学演示") return;
					home.visible = true;
					home.position.set(1950, 3200, 1000);
				}
				allDebuggerAnimate();

				// if (topicNum.value === 23) {
				//   j62.visible = true;
				//   hjj.visible = true;
				//   hjjs.visible = false;
				//   hjjt.visible = false;
				//   //     listPosition = []

				//   startFree(
				//     [1.29, -0.25, 0.17, 0, 0, 0],
				//     { x: -22, y: 86, z: 123 },
				//     { x: 0.66, y: 9.26, z: 8.98 }
				//   );

				// }
				// if (topicNum.value === 26) {
				//   startFree(
				//     runState[1],
				//     { x: 4.53, y: 42.08, z: 29.48 },
				//     { x: 24.489, y: 20.84, z: 10.32 }
				//   );
				// }
				// if (topicNum.value === 31) {
				//   j62.visible = false;
				//   j65.visible = true;
				//   //     startFree([1.29, -0.25, 0.17, 0, 0, 0], { x: -22, y: 86, z: 123 }, { x: 0.66, y: 9.26, z: 8.98 })
				// }
				// if (topicNum.value === 13) {
				//     if (a1) clearInterval(a1)
				//     listPosition = []
				//     startFree([0.40, 0.52, -0.11, -0.58, 0.95, 1.38], { x: 8.25, y: 34.95, z: 39.11 }, { x: 18.52, y: 19, z: 19.9 })
				//     pointList2.value.push('AreaCtPR10');
				//     listPosition.push([0.40, 0.52, -0.11, -0.58, 0.95, 1.38]);
				// }

				// if (topicNum.value === 15) {
				//     if (a2) clearInterval(a2)
				// }
			});
			let score = ref(44);

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
				goBack,
				resetDubuggerAnimate,
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
				pointList1,
				pointList2,
				addList,
				runList,
				waitPageShow,
				switchbwj,
				showHelp,
				showlr,
				changeNum,
			};
		},
	});
</script>

<template>
	<div class="controls_box">
		<div class="helppage" v-if="showHelp">
			<img v-if="topicNum === 0" src="/process/t0.png" />
			<img v-if="topicNum === 11" src="/process/t6.png" />
			<img v-if="topicNum === 22" src="/process/t7.png" />
			<img v-if="topicNum === 31" src="/process/t13.png" />
			<img v-if="topicNum === 37" src="/process/t17.png" />
			<div class="nextb" @click="
        topicNum++,
        setLeftContent('操作机器人'),
        (showlr = true),
        (showHelp = false)
      ">
				下一步
			</div>
		</div>
		<div class="left_control" v-if="showlr">
			<div :class="!isFold ? 'fold': 'expand'" @click="isFold = !isFold"></div>
			<div @click="resetDubuggerAnimate" class="rerun" v-show="isDebugger" v-if="mode == '教学演示'"></div>
		</div>
		<div class="left_box" v-if="showlr" v-show="!isFold">
			<!-- 菜单 -->
			<!-- <div class="menu_btn" v-if="topicNum !== -1" @click="showMenu = !showMenu"></div> -->
			<!-- <div class="control_menu" v-if="showMenu">
                <div class="btn1" @click="setLeftContent('操作机器人')"></div>
                <div class="btn2" v-if="topic === '多工艺调试实训任务'" @click="setLeftContent('多工艺调试实训任务')"></div>
            </div>-->
			<!-- 操作机器人 -->
			<div class="robot_opt" :style="switchTypeImg" v-if="leftContent === '操作机器人'">
				<div v-if="
          nowType === 'A' ||
          nowType === 'B' ||
          nowType === 'C' ||
          nowType === 'D'
        " class="action_btn1" @click="switchAction()"></div>
				<div class="t1-1 conBtn" v-if="topicNum === 1" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 3" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 12" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 14" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 23" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 25" @click="topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 32" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
					下一步
				</div>
				<div class="t1-1 conBtn" v-if="topicNum === 38" @click="setLeftContent('多工艺调试实训任务'), topicNext(true)">
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
			<!-- 多工艺调试实训任务 -->
			<div class="robot_opt" :style="topicOneImg" v-if="leftContent === '多工艺调试实训任务'">
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 2"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 4"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 5">
					<div class="conBtn" style="width: 32px; height: 14px; left: 56px; top: 107px">
						<thinking-select :list="[
              { label: 'set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="    width: 52px;
    height: 14px;
    left: 149px;
    top: 143px;">
						<thinking-select :list="[
              { label: 'Wt_Pos', value: 1 },
              { label: 'Wt_Home', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 46px; height: 14px; left: 56px; top: 193px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="t1-1-9" @click="topicNum++"></div>
				</div>

				<div class="codepage" v-if="topicNum === 6">
					<div class="conBtn" style="width: 48px; height: 14px; left: 127px; top: 118px">
						<thinking-select :list="[
              { label: 'Wt_Home', value: 0 },
              { label: 'Wt_Pos', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 33px; height: 14px; left: 77px; top: 133px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="t1-1-9" @click="topicNum = 7"></div>
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
          v-if="topicNum === 9"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 10"
          @click="topicNext(false), (showlr = false), (showHelp = true)"
        ></div> -->

				<!-- <div class="codepage" v-if="topicNum === 12">
                    <div class="conBtn" style="width: 48px;height: 14px;left: 58px;top: 91px;">
                        <thinking-select
                            :list="['MoveJ', 'MoveL', 'MoveC', 'MoveAbsJ']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div class="conBtn" style="width: 48px;height: 14px;left: 58px;top: 109px;">
                        <thinking-select
                            :list="['Set', 'Reset']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div class="conBtn" style="width: 48px;height: 14px;left: 58px;top: 159px;">
                        <thinking-select
                            :list="['MoveJ', 'MoveL', 'MoveC', 'MoveAbsJ']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div class="conBtn" style="width: 33px;height: 14px;left: 58px;top: 177px;">
                        <thinking-select
                            :list="['Set', 'Reset']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div class="t1-1-9" @click="waitPageShow = true, runList('list1')"></div>
                </div>

                <div class="codepage" v-if="topicNum === 14">
                    <div
                        class="conBtn"
                        style="width: 45px;height: 14px;left: 50px;top: 88px;"
                    >
                        <thinking-select
                            :list="['MoveJ', 'MoveL', 'MoveC', 'MoveAbsJ']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div
                        class="conBtn"
                        style="width: 43px;height: 14px;left: 51px;top: 132px;"
                    >
                        <thinking-select
                            :list="['Set', 'Reset']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>
                    <div
                        class="conBtn"
                        style="width: 73px;height: 14px;left: 98px;top: 147px;"
                    >
                        <thinking-select
                            :list="['AreaCtPR10', 'AreaCtPW10', 'AreaCtPR20']"
                            :res="resultForm.b.b1"
                            @changeData="changeData"
                        ></thinking-select>
                    </div>

                    <div class="t1-1-9" @click="waitPageShow = true, runList('list2')"></div>
                </div>-->

				<!-- 打磨抛光工具 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 13"
					@click="topicNum++, setLeftContent('操作机器人')"></div>
				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 15"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 16">
					<div class="conBtn" style="width: 68px; height: 14px; left: 129px; top: 93px">
						<thinking-select :list="[
              { label: 'Pt_Home', value: 1 },
              { label: 'Pt_Pos', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 47px; height: 14px; left: 57px; top: 196px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>

					<div class="t1-1-9" @click="topicNum++"></div>
				</div>

				<div class="codepage" v-if="topicNum === 17">
					<div class="conBtn" style="width: 48px; height: 14px; left: 57px; top: 108px">
						<thinking-select :list="[
              { label: 'Pt_Home', value: 1 },
              { label: 'Pt_Pos', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 33px; height: 14px; left: 57px; top: 143px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="t1-1-9" @click="topicNum = 18"></div>
				</div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 18" @click="topicNum = 19"></div>
				<div class="nextb" v-if="topicNum === 19" @click="topicNum = 20">
					下一步
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 20" @click="topicNum = 21"></div>
				<div class="nextb" v-if="topicNum === 21" @click="topicNum = 22, (showlr = false), (showHelp = true)">
					下一步
				</div>

				<!-- 变位机夹紧与释放 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 24"
					@click="topicNum++, setLeftContent('操作机器人')"></div>

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 27"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 28">
					<div class="conBtn" style="    width: 32px;
    height: 14px;
    left: 77px;
    top: 102px;">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="    width: 45px;
    height: 14px;
    left: 76px;
    top: 191px;">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="t1-1-9" @click="topicNum = 29"></div>
				</div>
				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 29" @click="topicNum = 30"></div>
				<div class="nextb" v-if="topicNum === 30" @click="topicNum = 31, (showlr = false), (showHelp = true)">
					下一步
				</div>

				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 29"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 30"
          @click="
            topicNext(false),
              setLeftContent('多工艺调试实训任务'),
              (showlr = false),
              (showHelp = true)
          "
        ></div> -->

				<!-- 焊接轨迹 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 33"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 34">
					<div class="conBtn" style="width: 27px; height: 14px; left: 80px; top: 100px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 58px; height: 14px; left: 80px; top: 131px">
						<thinking-select :list="[
              { label: 'MWtrack1', value: 1 },
              { label: 'MWtrack2', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 58px; height: 14px; left: 80px; top: 175px">
						<thinking-select :list="[
              { label: 'MWtrack1', value: 0 },
              { label: 'MWtrack2', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="t1-1-9" @click="topicNum = 35"></div>
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 35" @click="topicNum = 36"></div>
				<div class="nextb" v-if="topicNum === 36" @click="topicNum = 37, (showlr = false), (showHelp = true)">
					下一步
				</div>

				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 35"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 36"
          @click="topicNext(false), (showlr = false), (showHelp = true)"
        ></div> -->

				<!-- 打磨抛光轨迹 -->

				<div class="conBtn" style="width: 94px; height: 25px; left: 194px; top: 268px" v-if="topicNum === 39"
					@click="topicNum++"></div>

				<div class="codepage" v-if="topicNum === 40">
					<div class="conBtn" style="width: 87px; height: 14px; left: 307px; top: 83px">
						<thinking-select :list="[
              { label: 'Polishing_tool', value: 1 },
              { label: 'tool0', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 28px; height: 14px; left: 41px; top: 94px">
						<thinking-select :list="[
              { label: 'Set', value: 1 },
              { label: 'Reset', value: 0 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="conBtn" style="width: 37px; height: 14px; left: 43px; top: 132px">
						<thinking-select :list="[
              { label: 'Set', value: 0 },
              { label: 'Reset', value: 1 },
            ]" @changeData="changeData"></thinking-select>
					</div>
					<div class="t1-1-9" @click="topicNum = 41"></div>
				</div>

				<div class="conBtn" style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          " v-if="topicNum === 41" @click="topicNum = 42"></div>
				<div class="nextb" v-if="topicNum === 42" @click="topicNum = 43, (showlr = false), (showHelp = false)">
					下一步
				</div>

				<!-- <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 41"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 42"
          @click="topicNext(false), (showlr = false), (showHelp = false)"
        ></div> -->
			</div>
			<div class="chumoping" v-if="topicNum === 26">
				<div class="title">测试变位机夹紧和松开</div>
				<div class="screen">
					<div class="name">变位机</div>
					<div class="on" @click="switchbwj(false)">夹紧</div>
					<div class="off" @click="switchbwj(true)">松开</div>
				</div>
				<div class="run_btn" @click="topicNum++, setLeftContent('多工艺调试实训任务')">
					下一步
				</div>
			</div>

			<!-- <div class="jiaoben2" v-if="topicNum === 11">
                <div class="title">在仓储单元中拾取码垛块运动点位列表</div>
                <div class="item_box">
                    <div class="item" v-for="item in pointList1" :key="item">{{ item }}</div>
                </div>

                <div class="add_btn" @click="addList('list1')">添加并记录点位信息</div>
                <div class="run_btn" @click="topicNum++, setLeftContent('多工艺调试实训任务')">下一步</div>
            </div>
            <div class="jiaoben2" v-if="topicNum === 13">
                <div class="title">自重力供料槽中拾取码垛块运动点位列表</div>
                <div class="item_box">
                    <div class="item" v-for="item in pointList2" :key="item">{{ item }}</div>
                </div>

                <div class="add_btn" @click="addList('list2')">添加并记录点位信息</div>
                <div class="run_btn" @click="topicNum++, setLeftContent('多工艺调试实训任务')">下一步</div>
            </div>-->
			<!-- <div class="t1-1 conBtn" v-if="topicNum === 13" @click="goBack">实训结束</div> -->
			<div class="waitpage" v-if="waitPageShow">等待程序执行完毕</div>
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
		<div class="overbtn" v-if="topicNum === 43" @click="goBack">实训结束</div>
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

					.conBtn {
						position: absolute;
						background-color: #00ccff66;
						cursor: pointer;
					}

					.t1-1-0 {
						width: 75px;
						height: 14px;
						left: 58px;
						top: 89px;
						z-index: 9;
					}

					.t1-1-1 {
						width: 30px;
						height: 14px;
						left: 58px;
						top: 107px;
						z-index: 8;
					}

					.t1-1-2 {
						width: 44px;
						height: 14px;
						left: 58px;
						top: 124px;
						z-index: 7;
					}

					.t1-1-3 {
						width: 44px;
						height: 14px;
						left: 58px;
						top: 142px;
						z-index: 6;
					}

					.t1-1-4 {
						width: 47px;
						height: 14px;
						left: 58px;
						top: 160px;
						z-index: 5;
					}

					.t1-1-5 {
						width: 50px;
						height: 14px;
						left: 57px;
						top: 178px;
						z-index: 4;
					}

					.t1-1-6 {
						width: 50px;
						height: 14px;
						left: 57px;
						top: 195px;
						z-index: 3;
					}

					.t1-1-7 {
						width: 70px;
						height: 14px;
						left: 57px;
						top: 212px;
						z-index: 2;
					}

					.t1-1-8 {
						width: 60px;
						height: 14px;
						left: 135px;
						top: 212px;
						z-index: 1;
					}

					.t1-1-9 {
						width: 80px;
						height: 28px;
						left: 205px;
						top: 292px;
						z-index: 1;
						position: absolute;
						background-color: #00f5f696;
					}

					.t1-2-0 {
						width: 75px;
						height: 14px;
						left: 57px;
						top: 90px;
						z-index: 9;
					}

					.t1-2-1 {
						width: 46px;
						height: 14px;
						left: 57px;
						top: 108px;
						z-index: 8;
					}

					.t1-2-2 {
						width: 46px;
						height: 14px;
						left: 57px;
						top: 125px;
						z-index: 7;
					}

					.t1-2-3 {
						width: 30px;
						height: 14px;
						left: 57px;
						top: 142px;
						z-index: 6;
					}

					.t1-2-4 {
						width: 47px;
						height: 14px;
						left: 57px;
						top: 160px;
						z-index: 5;
					}

					.t1-2-5 {
						width: 47px;
						height: 14px;
						left: 57px;
						top: 178px;
						z-index: 4;
					}

					.t1-2-6 {
						width: 70px;
						height: 14px;
						left: 57px;
						top: 195px;
						z-index: 3;
					}

					.t1-2-7 {
						width: 62px;
						height: 14px;
						left: 131px;
						top: 195px;
						z-index: 2;
					}
				}

				.waitpage {
					width: 100%;
					height: 322px;
					background-color: #000000cc;
					left: 0;
					top: 37px;
					position: absolute;

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

			.chumoping {
				width: 253px;
				height: 156px;
				background-color: #fff;
				position: absolute;
				left: 227px;
				top: -220px;

				.title {
					font-size: 14px;
					text-align: center;
					color: #5e5e5e;
					padding: 8px 0;
				}

				.screen {
					position: absolute;
					left: 39px;
					top: 35px;
					width: 170px;
					height: 70px;
					border: 2px solid #ff6900;

					.name {
						position: absolute;
						left: 20px;
						top: 20px;
						font-size: 16px;
					}

					.on {
						position: absolute;
						left: 100px;
						top: 7px;
						font-size: 16px;
						width: 40px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						color: #fff;
						cursor: pointer;
						border-radius: 5px;
						background-color: #fb4f4f;
					}

					.off {
						position: absolute;
						left: 100px;
						top: 40px;
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

				.run_btn {
					text-align: center;
					color: #fff;
					background-color: #ea9412;
					font-size: 14px;
					position: absolute;
					left: 100px;
					top: 121px;
					padding: 5px 10px;
					cursor: pointer;
				}
			}

			.jiaoben2 {
				width: 663px;
				height: 156px;
				background-color: #fff;
				position: absolute;
				left: -3px;
				top: -160px;

				.title {
					font-size: 14px;
					text-align: center;
					color: #5e5e5e;
					padding: 8px 0;
				}

				.item_box {
					position: absolute;
					left: 20px;
					top: 40px;
					width: 636px;
					max-height: 75px;
					overflow: auto;

					&::-webkit-scrollbar {
						width: 4px;
					}

					&::-webkit-scrollbar-thumb {
						border-radius: 10px;
						background: #ffb100a3;
					}

					&::-webkit-scrollbar-track {
						background: #ffffff1a;
					}

					.item {
						font-size: 14px;
						padding: 5px 5px;
						background-color: #fff;
						border: 2px solid #ff5f00;
						color: #ff5f00;
						margin: 2px 11px;
						float: left;
					}
				}

				.add_btn {
					text-align: center;
					color: #fff;
					background-color: #ea9412;
					font-size: 14px;
					position: absolute;
					left: 135px;
					top: 121px;
					padding: 5px 10px;
					cursor: pointer;
				}

				.run_btn {
					text-align: center;
					color: #fff;
					background-color: #ea9412;
					font-size: 14px;
					position: absolute;
					left: 325px;
					top: 121px;
					padding: 5px 10px;
					cursor: pointer;
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
