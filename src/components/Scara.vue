<script lang="ts">
	import {
		defineComponent,
		computed,
		watch,
		onMounted,
		ref,
		onBeforeUnmount,
		reactive,
	} from "vue";

	import * as THREE from "three";
	import * as TWEEN from "@tweenjs/tween.js";
	import $store from "../store/index";
	import Result from "../hooks/result";
	import ThinkingSelect from "./ThinkingSelect.vue";
	// import { setTimeout } from "timers/promises";
	export default defineComponent({
		name: "scara",
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
			let leftContent = ref("scara机器人调试实训任务");
			let topic = ref((window as any).topic);
			let showMenu = ref(false);
			let waitPageShow = ref(false);
			let questionPageShow = ref(false);
			let showHelp = ref(true);
			let showlr = ref(false);
			let bigType = $store.state.bigType;
			let allowClickList: any = {
				scara机器人调试实训任务: {
					2: true,
					6: false,
					9: true,
					12: true,
				},
			};
			let resultForm: any = ref({
				a: {
					a1: ref(""),
					a2: ref(""),
					a3: ref(""),
					a4: ref(""),
					a5: ref(""),
					a6: ref(""),
				},
				b: {
					b1: ref(""),
				},
			});
			let result = Result[topic];
			let nowAllowClick = ref(allowClickList[topic.value]);
			// console.log(nowAllowClick)

			let animateSwitch = ref(false);
			//todo: 增加示教器面板折叠功能
			let isFold = ref(false);
			let actionHistory: any = (window as any).actionHistory;
			let actionEnum: any = (window as any).actionEnum;
			// 判断是否是教学演示
			let mode:any = ref((window as any).mode);
			// todo:判断是否是调试程序
			var isDebugger = ref(false);
			const changeNum = (num: number): void => {
				topicNum.value = num;
			};

			// function goTest(num: number) {
			//     console.log('gotest')
			//     emit('my-emit', num)
			// }
			function goBack() {
				let p = {
					name: "SCARA机器人",
					score: score.value,
				};
				console.log("上传", p);
				if (bigType !== "教学演示") {
					alert(`您本次实训成绩为：${p.score}分`, )
				}
				emit("back", p);
			}
			let player: any = (window as any).player;
			// scara机器人
			let scara1: any = player.scene.getObjectByName("scara1");
			let scara2: any = player.scene.getObjectByName("scara2");
			let scara3: any = player.scene.getObjectByName("scara3");
			let scara4: any = player.scene.getObjectByName("scara4");
			setState([112.87, -29, 174, 10.75]);
			let scaralun: any = player.scene.getObjectByName("scaralun");
			let scaratou: any = player.scene.getObjectByName("scaratou");
			let yadetou: any = player.scene.getObjectByName("yadetou");
			let yade: any = player.scene.getObjectByName("lungugongju2");
			let tuo: any = player.scene.getObjectByName("tuo");
			let tuoitem: any = player.scene.getObjectByName("tuoitem");
			tuoitem.visible = false;
			tuo.position.x = -768;
			scaralun.visible = true;
			scaralun.scale.set(0.884, 0.884, 0.884);
			scaratou.scale.set(2.2, 2.2, 2.2);

			let shangtuiban1: any = player.scene.getObjectByName("shangtuiban1"); //y: -536.8  -360  -135
			let shangtuiban2: any = player.scene.getObjectByName("shangtuiban2");
			let shangtuiban3: any = player.scene.getObjectByName("shangtuiban3");
			let xiatuiban1: any = player.scene.getObjectByName("xiatuiban1"); // y: -329.6  -130  240
			let xiatuiban2: any = player.scene.getObjectByName("xiatuiban2");
			let xiatuiban3: any = player.scene.getObjectByName("xiatuiban3");
			let hengdangban1: any = player.scene.getObjectByName("hengdangban1"); // z:210  300
			let hengdangban2: any = player.scene.getObjectByName("hengdangban2");
			let hengdangban3: any = player.scene.getObjectByName("hengdangban3");

			// let j63: any = player.scene.getObjectByName("j6-3");

			// let j63: any = player.scene.getObjectByName("j6-3");

			// debugger
			onMounted(() => {
				topicNum.value++;
				emit("changeTopicNum", topicNum.value);
			});

			const topicOneImg = computed(() => {
				console.log(topicNum.value);
				switch (topicNum.value) {
					case 1:
						return `background-image: url( "./scara/a1.png"  )`;
						break;
					case 2:
						return `background-image: url( "./scara/s1.png"  )`;
						break;
					case 3:
						return `background-image: url( "./scara/a2.png"  )`;
						break;
					case 4:
						return `background-image: url( "./scara/a3.png"  )`;
						break;
					case 5:
						return `background-image: url( "./scara/s2.png"  )`;
						break;
					case 6:
						return `background-image: url( "./scara/b1.png"  )`;
						break;
					case 7:
						return `background-image: url( "./scara/s1.png"  )`;
						break;
					case 8:
						return `background-image: url( "./scara/b2.png"  )`;
						break;
					case 9:
						return `background-image: url( "./scara/b3.png"  )`;
						break;
					case 10:
						return `background-image: url( "./scara/s2.png"  )`;
						break;
					case 11:
						return `background-image: url( "./scara/c1.png"  )`;
						break;
					case 12:
						return `background-image: url( "./scara/s1.png"  )`;
						break;
					case 13:
						return `background-image: url( "./scara/c2.png"  )`;
						break;
					case 14:
						return `background-image: url( "./scara/c3.png"  )`;
						break;
					case 15:
						return `background-image: url( "./scara/s2.png"  )`;
						break;
					case 16:
						return `background-image: url( "./scara/d1.png"  )`;
						break;
					case 17:
						return `background-image: url( "./scara/s1.png"  )`;
						break;
					case 18:
						return `background-image: url( "./scara/d2.png"  )`;
						break;
					case 19:
						return `background-image: url( "./scara/d3.png"  )`;
						break;
					case 20:
						return `background-image: url( "./scara/s2.png"  )`;
						break;
					case 21:
						return `background-image: url( "./scara/e1.png"  )`;
						break;
					case 22:
						return `background-image: url( "./scara/s1.png"  )`;
						break;
					case 23:
						return `background-image: url( "./scara/e2.png"  )`;
						break;
					case 24:
						return `background-image: url( "./scara/e3.png"  )`;
						break;
					case 25:
						return `background-image: url( "./scara/s2.png"  )`;
						break;
				}
			});

			function getRobotPosition() {
				let arr = [];
				arr = [
					scara1.rotation.z,
					scara2.rotation.z,
					scara3.position.z,
					scara4.rotation.z,
				];
				console.log(arr);
				return arr;
			}
			(window as any).getRobotPosition = getRobotPosition;

			function setState(arr: Array < number > ) {
				scara1.rotation.z = (arr[0] * Math.PI) / 180;
				scara2.rotation.z = (arr[1] * Math.PI) / 180;
				scara3.position.z = arr[2];
				scara4.rotation.z = (arr[3] * Math.PI) / 180;
				player.renderer.render(player.scene, player.camera);
			}

			function animateState(
				arr: Array < number > ,
				during: number,
				complete ? : Function
			) {
				new TWEEN.Tween(scara1.rotation)
					.to({
						z: (arr[0] * Math.PI) / 180
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(scara2.rotation)
					.to({
						z: (arr[1] * Math.PI) / 180
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(scara3.position)
					.to({
						z: arr[2]
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.start();
				new TWEEN.Tween(scara4.rotation)
					.to({
						z: (arr[3] * Math.PI) / 180
					}, during)
					.easing(TWEEN.Easing.Linear.None)
					.onComplete(() => {
						if (complete) complete();
					})
					.start();
			}
			// todo:0508所有的调试程序的动画
			function allDebuggerAnimate() {
				if(!isDebugger.value){
					actionHistory.pushModelsActionHistory([scara1, scara2, scara4], actionEnum.ROTATION);
					actionHistory.pushModelsActionHistory([scara3], actionEnum.POSITION);
				}
				// 机器人轮毂拾取程序调试运行
				if (topicNum.value === 6) {
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([tuoitem, scaralun, scaratou], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					showlr.value = false;
					tuoitem.visible = false;
					scaralun.visible = true;
					let arr = [
						[112.87, -29, 174, 10.75],
						[112.87, -29, 58, 10.75],
					];
					animateState(arr[0], 1000, () => {
						animateState(arr[1], 1000, () => {
							scaralun.visible = false;
							scaratou.visible = true;
							animateState(arr[0], 1000, () => {
								startFree({
									x: 6.12,
									y: 19.08,
									z: -15.08
								}, {
									x: -2.36,
									y: 0.09,
									z: 3.04
								});
								// setState([90, -90, 284, 0]);
								animateState([90, -90, 284, 0], 1000, () => {});
								showlr.value = true;
							});
						});
					});
				} else if (topicNum.value === 11) { // 机器人轮毂放置程序调试运行
					if(!isDebugger.value){
						// actionHistory.pushModelsActionHistory([scaralun], actionEnum.POSITION);
						actionHistory.pushModelsActionHistory([scaralun, scaratou, yadetou], actionEnum.VISIBLE);
						actionHistory.pushModelActionHistory(player.camera, actionEnum.POSITION);
						actionHistory.pushModelActionHistory(player.controls, actionEnum.LOOKAT);
					}
					isDebugger.value = true;
					showlr.value = false;
					scaralun.visible = false;
					scaratou.visible = true;
					let arr = [
						[90, -90, 284, 0],
						[23, -43.91, 94, 24.85],
					];
					animateState(arr[0], 1000, () => {
						animateState(arr[1], 1000, () => {
							scaralun.visible = true;
							scaratou.visible = false;
							scaralun.position.set(-322.31, 458.11, -357.87);
							animateState(arr[0], 1000, () => {
								animateState(arr[0], 3000, () => {
									startFree({
										x: 2.25,
										y: 20.62,
										z: -11.23
									}, {
										x: 0.17,
										y: 6.63,
										z: 4.12
									});
									// setState([112.87, -29, 288, 4.75]);
									animateState([112.87, -29, 288, 4.75],
										1000, () => {});
									scaralun.position.set(-821.31, -79.11,
										-357.87);

									yadetou.visible = true;
									scaralun.visible = true;
									showlr.value = true;
								})

							});
						});
					});
				} else if (topicNum.value === 16) { // 机器人压装工位上料程序调试运行
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([scaralun, scaratou, yadetou, yade], actionEnum.VISIBLE);
					}
					isDebugger.value = true;
					yadetou.visible = true;
					scaralun.visible = true;
					scaratou.visible = false
					showlr.value = false;
					let arr = [
						[112.87, -29, 288, 4.75],
						[112.87, -29, 173, 10.75],
					];
					animateState(arr[0], 1000, () => {
						animateState(arr[1], 1000, () => {
							yadetou.visible = false;
							yade.visible = true;

							animateState(arr[0], 1000, () => {
								showlr.value = true;
							});
						});
					});
				} else if (topicNum.value === 21) { // 机器人压装工位下料程序调试运行
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([scaralun, scaratou, yadetou, yade], actionEnum.VISIBLE);
						actionHistory.pushModelActionHistory(player.camera, actionEnum.POSITION);
						actionHistory.pushModelActionHistory(player.controls, actionEnum.LOOKAT);
					}
					isDebugger.value = true;
					yadetou.visible = false;
					yade.visible = true;
					showlr.value = false;
					let arr = [
						[112.87, -29, 288, 4.75],
						[112.87, -29, 173, 10.75],
					];
					animateState(arr[0], 1000, () => {
						animateState(arr[1], 1000, () => {
							yadetou.visible = true;
							yade.visible = false;

							animateState(arr[0], 1000, () => {
								startFree({
									x: 10.56,
									y: 21.38,
									z: -12.96
								}, {
									x: 1.89,
									y: 0.57,
									z: 6.07
								});
								yadetou.visible = false;
								scaratou.visible = true;
								showlr.value = true;
								scaralun.visible = false;
							});
						});
					});
				} else if (topicNum.value === 26) { // 机器人视觉检测程序调试运行
					if(!isDebugger.value){
						actionHistory.pushModelsActionHistory([scaratou, yadetou], actionEnum.VISIBLE);
						actionHistory.pushModelActionHistory(player.camera, actionEnum.POSITION);
						actionHistory.pushModelActionHistory(player.controls, actionEnum.LOOKAT);
					}
					isDebugger.value = true;
					yadetou.visible = false;
					scaratou.visible = true;
					showlr.value = false;
					let arr = [
						[0, -0, 173, 0],
						[38, -38, 332, -77],
						[-54, -38, 332, -77],
						[-63, -38, 332, -12],
						// [-26, -60, 173, -37],
						// [-68, -39, 173, 6.18],
					];
					animateState(arr[0], 1000, () => {
						animateState(arr[1], 1000, () => {
							animateState(arr[2], 1000, () => {
								animateState(arr[3], 1000, () => {
									animateState(arr[2], 1000, () => {
										animateState(arr[1], 1000,
											() => {
												animateState(arr[0],
													1000, () => {
														startFree({
															x: 6.55,
															y: 17.01,
															z: -13.36
														}, {
															x: 10.4,
															y: 6.36,
															z: -4.18
														});

													});
											});
									});
								});
							});
						});
					});
				}

			}


			// 初始化位置视角
			function startFree(posObj: Object, conObj: Object): void {
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
			watch(topicNum, () => {
				emit("changeTopicNum", topicNum.value);
				// tuoitem.visible = false
				//   scaratou.visible = false
				//   yadetou.visible = false
				//   scaralun.visible = false;
				TWEEN.removeAll();
				isDebugger.value = false;
				// 清空历史记录
				actionHistory.clearModelActionHistory();
				if ([1, 6, 11, 16, 21].includes(topicNum.value)) {
					showHelp.value = true;
					showlr.value = false;
				}
				if (topicNum.value === 1) {
					tuoitem.visible = false;
					scaratou.visible = false;
					yadetou.visible = false;
					scaralun.visible = true;
					startFree({
						x: 2.25,
						y: 20.62,
						z: -11.23
					}, {
						x: 0.17,
						y: 6.63,
						z: 4.12
					});
				}

				if (topicNum.value === 26) {
					showHelp.value = false;
				}
				allDebuggerAnimate();
				// if (topicNum.value === 21) {
				//     scaratou.position.z = -196
				//     scaratou.traverse((m: any) => {
				//         if (m.name === "yade") {
				//             m.visible = false
				//         } else {
				//             m.visible = false
				//         }
				//     })

				//     let arr = [[112.87, -29, 288, 10.75], [112.87, -29, 58, 10.75]]
				//     animateState(arr[0], 1000, () => {
				//         animateState(arr[1], 1000, () => {
				//             scaralun.visible = false
				//             scaralun.traverse((m: any) => {
				//                 m.visible = false
				//             })
				//             scaratou.visible = true
				//             scaratou.traverse((m: any) => {
				//                 if (m.name === "yade") {
				//                     m.visible = true
				//                 }
				//             })
				//             animateState(arr[0], 1000, () => {

				//             })
				//         })
				//     })
				// }
				// if (topicNum.value === 38) {
				//     startFree(getRobotPosition(), { x: -26.32, y: 28.22, z: -18.77 }, { x: -32.24, y: 19.28, z: 3.09 })
				// }
			});

			function switchAll(num: number, type: string) {
				let shangtuiban = null;
				let xiatuiban = null;
				let hengdangban = null;
				if (num === 1) {
					shangtuiban = shangtuiban1;
					xiatuiban = xiatuiban1;
					hengdangban = hengdangban1;
				} else if (num === 2) {
					shangtuiban = shangtuiban2;
					xiatuiban = xiatuiban2;
					hengdangban = hengdangban2;
				} else if (num === 3) {
					shangtuiban = shangtuiban3;
					xiatuiban = xiatuiban3;
					hengdangban = hengdangban3;
				}

				// let shensuoqigang: any = player.scene.getObjectByName("shensuoqigang");
				// let shengjiangqigang: any = player.scene.getObjectByName("shengjiangqigang");
				// let cpugaizi: any = player.scene.getObjectByName("cpugaizi");

				if (type === "横挡板抬起") {
					new TWEEN.Tween(hengdangban.position)
						.to({
							z: 300
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "横挡板落下") {
					new TWEEN.Tween(hengdangban.position)
						.to({
							z: 210
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "上推版回缩") {
					new TWEEN.Tween(shangtuiban.position)
						.to({
							y: -536.8
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "上推版伸出") {
					new TWEEN.Tween(shangtuiban.position)
						.to({
							y: -360
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "上推版推出") {
					new TWEEN.Tween(shangtuiban.position)
						.to({
							y: -135
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "下推版回缩") {
					new TWEEN.Tween(xiatuiban.position)
						.to({
							y: -329.6
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "下推版伸出") {
					new TWEEN.Tween(xiatuiban.position)
						.to({
							y: -130
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				} else if (type === "下推版推出") {
					new TWEEN.Tween(xiatuiban.position)
						.to({
							y: 240
						}, 1000)
						.easing(TWEEN.Easing.Linear.None)
						.start();
				}
			}
			let score = ref(28);

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
				topicOneImg,
				topicNum,
				nowType,
				resultForm,
				animateSwitch,
				showMenu,
				nowAllowClick,
				changeData,
				waitPageShow,
				switchAll,
				questionPageShow,
				showHelp,
				showlr,
				changeNum,
				// runOfState
			};
		},
	});
</script>

<template>
	<div class="controls_box">
		<div class="helppage" v-if="showHelp">
			<img style="width: 490px; height: 330px" v-if="topicNum === 1" src="/scara/a1.png" />
			<img style="width: 490px; height: 330px" v-if="topicNum === 6" src="/scara/b1.png" />
			<img style="width: 490px; height: 330px" v-if="topicNum === 11" src="/scara/c1.png" />
			<img style="width: 490px; height: 330px" v-if="topicNum === 16" src="/scara/d1.png" />
			<img style="width: 490px; height: 330px" v-if="topicNum === 21" src="/scara/e1.png" />
			<!-- <img v-if="topicNum === 14" src="/scara/b1.png" /> -->
			<div class="nextb" @click="topicNum++, (showlr = true), (showHelp = false)">
				下一步
			</div>
		</div>

		<div class="touchpage" v-if="topicNum === 26">
			<div class="screen" style="left: 80px; top: 78px">
				<div class="daogui"></div>
				<div class="name" style="top: 172px; left: 20px">打磨工位夹具</div>
				<div class="right" style="left: 150px; top: 1px">
					<div class="r_name" style="left: 4px; top: 25px">1号口</div>
					<div class="r_item" style="left: 65px; top: 0px">
						<div class="ai i1">横挡板</div>
						<div class="ai i2" @click="switchAll(1, '横挡板抬起')">抬起</div>
						<div class="ai i4" @click="switchAll(1, '横挡板落下')">落下</div>
					</div>
					<div class="r_item" style="left: 64px; top: 28px">
						<div class="ai i1">上推版</div>
						<div class="ai i2" @click="switchAll(1, '上推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(1, '上推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(1, '上推版推出')">推出</div>
					</div>
					<div class="r_item" style="left: 64px; top: 56px">
						<div class="ai i1">下推版</div>
						<div class="ai i2" @click="switchAll(1, '下推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(1, '下推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(1, '下推版推出')">推出</div>
					</div>
				</div>
				<div class="right" style="left: 150px; top: 86px">
					<div class="r_name" style="left: 4px; top: 25px">2号口</div>
					<div class="r_item" style="left: 65px; top: 0px">
						<div class="ai i1">横挡板</div>
						<div class="ai i2" @click="switchAll(2, '横挡板抬起')">抬起</div>
						<div class="ai i4" @click="switchAll(2, '横挡板落下')">落下</div>
					</div>
					<div class="r_item" style="left: 64px; top: 28px">
						<div class="ai i1">上推版</div>
						<div class="ai i2" @click="switchAll(2, '上推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(2, '上推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(2, '上推版推出')">推出</div>
					</div>
					<div class="r_item" style="left: 64px; top: 56px">
						<div class="ai i1">下推版</div>
						<div class="ai i2" @click="switchAll(2, '下推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(2, '下推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(2, '下推版推出')">推出</div>
					</div>
				</div>
				<div class="right" style="left: 150px; top: 171px">
					<div class="r_name" style="left: 4px; top: 25px">3号口</div>
					<div class="r_item" style="left: 65px; top: 0px">
						<div class="ai i1">横挡板</div>
						<div class="ai i2" @click="switchAll(3, '横挡板抬起')">抬起</div>
						<div class="ai i4" @click="switchAll(3, '横挡板落下')">落下</div>
					</div>
					<div class="r_item" style="left: 64px; top: 28px">
						<div class="ai i1">上推版</div>
						<div class="ai i2" @click="switchAll(3, '上推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(3, '上推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(3, '上推版推出')">推出</div>
					</div>
					<div class="r_item" style="left: 64px; top: 56px">
						<div class="ai i1">下推版</div>
						<div class="ai i2" @click="switchAll(3, '下推版回缩')">回缩</div>
						<div class="ai i3" @click="switchAll(3, '下推版伸出')">伸出</div>
						<div class="ai i4" @click="switchAll(3, '下推版推出')">推出</div>
					</div>
				</div>
			</div>

			<div class="pBtn" @click="topicNum++, (showHelp = false), (showlr = false)">
				下一步
			</div>
		</div>
		<div class="left_control" v-if="showlr">
			<div :class="!isFold ? 'fold': 'expand'"  @click="isFold = !isFold"></div>
			<div @click="resetDubuggerAnimate" class="rerun" v-show="isDebugger" v-if="mode == '教学演示'"></div>
		</div>
		<div class="left_box" v-if="showlr" v-show="!isFold">
			<!-- scara机器人调试实训任务 -->
			<div class="robot_opt" :style="topicOneImg">
				<!-- <div class="waitpage" v-if="topicNum === 0">
                    <div class="start_btn" @click="topicNum++">开始实训</div>
                </div>-->

				<!-- scara1 -->

				<div class="conBtn" style="width: 71px; height: 21px; left: 319px; top: 287px" v-if="topicNum === 2"
					@click="topicNum++"></div>

				<div class="pointPage" v-if="topicNum === 3">
					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 4">
					<div class="codeItem" style="width: 25px; height: 14px; left: 159px; top: 131px">
						<thinking-select :list="[
              { label: 'OFF', value: 1 },
              { label: 'ON', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 57px; height: 14px; left: 160px; top: 179px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 1 },
              { label: 'SRt_Home', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 28px; height: 14px; left: 160px; top: 194px">
						<thinking-select :list="[
              { label: 'OFF', value: 0 },
              { label: 'ON', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 65px; height: 14px; left: 161px; top: 243px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 0 },
              { label: 'SRt_Home', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>

					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>
				<div class="runBtn" v-if="topicNum === 5" @click="topicNum++, (showlr = false), (showHelp = true)">
				</div>

				<!-- scara2 -->

				<div class="conBtn" style="width: 71px; height: 21px; left: 319px; top: 287px" v-if="topicNum === 7"
					@click="topicNum++"></div>

				<div class="pointPage" v-if="topicNum === 8">
					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 9">
					<div class="codeItem" style="width: 57px; height: 14px; left: 160px; top: 139px">
						<thinking-select :list="[
               { label: 'SRt_Pos', value: 1 },
               { label: 'SRt_Home', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>

					<div class="codeItem" style="width: 25px; height: 14px; left: 159px; top: 154px">
						<thinking-select :list="[
               { label: 'OFF', value: 1 },
               { label: 'ON', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 65px; height: 14px; left: 161px; top: 203px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 0 },
              { label: 'SRt_Home', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>

					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>
				<div class="runBtn" v-if="topicNum === 10" @click="topicNum++, (showlr = false), (showHelp = true)">
				</div>

				<!-- scara3 -->

				<div class="conBtn" style="width: 71px; height: 21px; left: 319px; top: 287px" v-if="topicNum === 12"
					@click="topicNum++"></div>

				<div class="pointPage" v-if="topicNum === 13">
					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 14">
					<div class="codeItem" style="width: 66px; height: 14px; left: 160px; top: 110px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 0 },
              { label: 'SRt_Home', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 55px; height: 14px; left: 160px; top: 127px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 1 },
              { label: 'SRt_Home', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 28px; height: 14px; left: 161px; top: 156px">
						<thinking-select :list="[
              { label: 'OFF', value: 1 },
              { label: 'ON', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>

					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>
				<div class="runBtn" v-if="topicNum === 15" @click="topicNum++, (showlr = false), (showHelp = true)">
				</div>

				<!-- scara4 -->

				<div class="conBtn" style="width: 71px; height: 21px; left: 319px; top: 287px" v-if="topicNum === 17"
					@click="topicNum++"></div>

				<div class="pointPage" v-if="topicNum === 18">
					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 19">
					<div class="codeItem" style="width: 66px; height: 14px; left: 159px; top: 110px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 0 },
              { label: 'SRt_Home', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 25px; height: 14px; left: 160px; top: 127px">
						<thinking-select :list="[
              { label: 'OFF', value: 0 },
              { label: 'ON', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 60px; height: 14px; left: 158px; top: 155px">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 1 },
              { label: 'SRt_Home', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 25px; height: 14px; left: 160px; top: 186px">
						<thinking-select :list="[
              { label: 'OFF', value: 1 },
              { label: 'ON', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>

					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>
				<div class="runBtn" v-if="topicNum === 20" @click="topicNum++, (showlr = false), (showHelp = true)">
				</div>

				<!-- scara5 -->

				<div class="conBtn" style="width: 71px; height: 21px; left: 319px; top: 287px" v-if="topicNum === 22"
					@click="topicNum++"></div>

				<div class="pointPage" v-if="topicNum === 23">
					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>

				<div class="codepage" v-if="topicNum === 24">
					<div class="codeItem" style="width: 25px; height: 14px; left: 159px; top: 156px">
						<thinking-select :list="[
              { label: 'OFF', value: 0 },
              { label: 'ON', value: 1 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="    width: 59px;
    height: 14px;
    left: 159px;
    top: 141px;">
						<thinking-select :list="[
              { label: 'SRt_Pos', value: 1 },
              { label: 'SRt_Home', value: 0 },
              { label: 'SRt_PPos', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<div class="codeItem" style="width: 28px; height: 14px; left: 160px; top: 187px">
						<thinking-select :list="[
              { label: 'OFF', value: 1 },
              { label: 'ON', value: 0 },
            ]" :res="resultForm.b.b1" @changeData="changeData"></thinking-select>
					</div>
					<!-- <div
            class="codeItem"
            style="width: 65px; height: 14px; left: 161px; top: 233px"
          >
            <thinking-select
              :list="[
                { label: 'SRt_Pos', value: 0 },
                { label: 'SRt_Home', value: 1 },
              ]"
              :res="resultForm.b.b1"
              @changeData="changeData"
            ></thinking-select>
          </div> -->

					<div class="nextb" style="left: -516px; top: 310px" @click="topicNum++">
						下一步
					</div>
				</div>
				<div class="runBtn" v-if="topicNum === 25" @click="topicNum++, (showlr = false)"></div>
			</div>
		</div>
		<div class="overbtn" v-if="topicNum === 27" @click="goBack">实训结束</div>
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
			right: -4px;
			bottom: -12px;
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
					left: 21px;
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

				.right {
					position: absolute;
					width: 270px;
					height: 80px;
					// border: 1px solid #f00;

					.r_name {
						position: absolute;
						font-size: 18px;
						color: #ff8d00;
						font-weight: bold;
					}

					.r_item {
						position: absolute;
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						justify-content: space-evenly;

						.ai {
							font-size: 14px;
							width: 46px;
							height: 22px;
							margin: 0 2px;
							line-height: 22px;
							text-align: center;
							color: #fff;
							cursor: pointer;
							border-radius: 5px;
						}

						.i1 {
							background-color: #58b4ff;
						}

						.i2 {
							background-color: #71f33e;
						}

						.i4 {
							background-color: #f3713e;
						}

						.i3 {
							background-color: #64f2f7;
						}
					}
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
			top: -135px;
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
			height: 320px;
			/* float: left; */
			position: relative;
			top: 14px;
			border: 4px solid #666;

			.robot_opt {
				background: no-repeat;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background-size: 100% 100%;

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

					.codeItem {
						position: absolute;
					}
				}

				.pointPage {
					background: no-repeat;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background-size: 100% 100%;
				}

				.runBtn {
					width: 35px;
					height: 33px;
					left: 2px;
					top: 211px;
					position: absolute;
					cursor: pointer;
					background-color: #ffaf4c96;
				}

				.conBtn {
					position: absolute;
					text-align: center;
					line-height: 35px;
					/* border-radius: 25px; */
					color: #fff;
					background-color: #ffaf4c96;
					cursor: pointer;
				}

				.nextb {
					width: 144px;
					height: 35px;
					line-height: 35px;
					position: absolute;
					margin: 20px auto 0;
					font-size: 18px;
					text-align: center;
					border-radius: 25px;
					color: #fff;
					cursor: pointer;
					background-color: #ffaf4c;
				}
			}
		}
	}
</style>
