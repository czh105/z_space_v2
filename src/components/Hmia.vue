<script lang="ts">
import {
    defineComponent,
    computed,
    watch,
    onMounted,
    ref,
    onBeforeUnmount,
} from "vue";

import * as TWEEN from "@tweenjs/tween.js";

export default defineComponent({
    name: "hmia",
    props: {
        player: Object,
    },
    setup(props, { emit }) {
        let nowType = ref("");
        let topicNum = ref(1);

        let topic = ref((window as any).topic);
        let showMenu = ref(false);
        let waitPageShow = ref(false)
        let questionPageShow = ref(false)
        // let showHelp = ref(true)
        // let showlr = ref(false)
        let dianjiswtich = ref(false)
        let zishouSwitch = ref(false);

        let animateSwitch = ref(false);

        let showVideo = ref(false)


        function goBack() {
            console.log("goBack");
            emit("back");
        }
        const changeNum = (num: number): void => {
            topicNum.value = num
        }
        let player: any = (window as any).player;
        let j1: any = player.scene.getObjectByName("j1");
        let j2: any = player.scene.getObjectByName("j2");
        let j3: any = player.scene.getObjectByName("j3");
        let j4: any = player.scene.getObjectByName("j4");
        let j5: any = player.scene.getObjectByName("j5");
        let j6: any = player.scene.getObjectByName("j6");


        let cang1 = player.scene.getObjectByName(`cang1`)
        let cangitem1 = player.scene.getObjectByName(`cangitem1`)
        let j62 = player.scene.getObjectByName(`j6-2`)
        let cangitemtou = player.scene.getObjectByName(`cangitemtou`)

        let gongzhuangtuopan: any =
      player.scene.getObjectByName("gongzhuangtuopan");
    let gongzhuanglungu: any = player.scene.getObjectByName("gongzhuanglungu");
    let gongzhuangsx: any = player.scene.getObjectByName("gongzhuangsx");
    let gonzhuangzy: any = player.scene.getObjectByName("gonzhuangzy");
    let gongzhuangqh: any = player.scene.getObjectByName("gongzhuangqh");



        let j61: any = player.scene.getObjectByName("j6-1");
        let j66: any = player.scene.getObjectByName("j6-6");

        let zt4: any = player.scene.getObjectByName("zhuotool4");
        let zt6: any = player.scene.getObjectByName("zhuotool6");
        let zt7: any = player.scene.getObjectByName("zhuotool7");

        let robot: any = player.scene.getObjectByName("robot2");
        // scara机器人
        let scara1: any = player.scene.getObjectByName("scara1");
        let scara2: any = player.scene.getObjectByName("scara2");
        let scara3: any = player.scene.getObjectByName("scara3");
        let scara4: any = player.scene.getObjectByName("scara4");
        // setState2([112.87, -29, 174, 10.75])



        // tuo.position.x = -768


        let shangtuiban1: any = player.scene.getObjectByName("shangtuiban1");//y: -536.8  -360  -135
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
            topicNum.value++
            emit("changeTopicNum", topicNum.value);
        });



        const topicOneImg = computed(() => {
            console.log(topicNum.value);
            switch (topicNum.value) {
                case 2:
                    return `background-image: url( "./hmia/b1.png"  )`;
                    break;
                case 3:
                    return `background-image: url( "./hmia/b2.png"  )`;
                    break;
                case 4:
                    return `background-image: url( "./hmia/b3.png"  )`;
                    break;
                case 5:
                    return `background-image: url( "./hmia/b4.png"  )`;
                    break;
                case 6:
                    return `background-image: url( "./hmia/b5.png"  )`;
                    break;
                case 7:
                    return `background-image: url( "./hmia/b6.png"  )`;
                    break;
                case 8:
                    return `background-image: url( "./hmia/b7.png"  )`;
                    break;
                case 9:
                    return `background-image: url( "./hmia/b8.png"  )`;
                    break;


            }
        });

        function getRobotPosition() {
            let arr = [];
            arr = [
                j1.rotation.z.toFixed(2),
                j2.rotation.x.toFixed(2),
                j3.rotation.x.toFixed(2),
                j4.rotation.y.toFixed(2),
                j5.rotation.x.toFixed(2),
                j6.rotation.y.toFixed(2),
            ];
            console.log(arr)
            return arr;
        }
        (window as any).getRobotPosition = getRobotPosition

        function getRobotPosition2() {
            let arr = [];
            arr = [
                scara1.rotation.z,
                scara2.rotation.z,
                scara3.position.z,
                scara4.rotation.z,
            ];
            console.log(arr)
            return arr;
        }
        (window as any).getRobotPosition = getRobotPosition2

        function setState(arr: Array<number>) {
            j1.rotation.z = arr[0];
            j2.rotation.x = arr[1];
            j3.rotation.x = arr[2];
            j4.rotation.y = arr[3];
            j5.rotation.x = arr[4];
            j6.rotation.y = arr[5];
            player.renderer.render(player.scene, player.camera);
        }
        function animateState(
            arr: Array<number>,
            during: number,
            complete?: Function
        ) {
            new TWEEN.Tween(j1.rotation)
                .to({ z: arr[0] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j2.rotation)
                .to({ x: arr[1] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j3.rotation)
                .to({ x: arr[2] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j4.rotation)
                .to({ y: arr[3] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j5.rotation)
                .to({ x: arr[4] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j6.rotation)
                .to({ y: arr[5] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    if (complete) complete()
                })
                .start();
        }

        function setState2(arr: Array<number>) {
            scara1.rotation.z = arr[0] * Math.PI / 180;
            scara2.rotation.z = arr[1] * Math.PI / 180;
            scara3.position.z = arr[2];
            scara4.rotation.z = arr[3] * Math.PI / 180;
            player.renderer.render(player.scene, player.camera);
        }
        function animateState2(
            arr: Array<number>,
            during: number,
            complete?: Function
        ) {
            new TWEEN.Tween(scara1.rotation)
                .to({ z: arr[0] * Math.PI / 180 }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(scara2.rotation)
                .to({ z: arr[1] * Math.PI / 180 }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(scara3.position)
                .to({ z: arr[2] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(scara4.rotation)
                .to({ z: arr[3] * Math.PI / 180 }, during)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    if (complete) complete()
                })
                .start();
        }


        // 初始化位置视角
        function startFree(arr?: Array<number>, posObj?: Object, conObj?: Object): void {

            // j65.visible = true
            // setLeftContent('操作机器人')
            if (arr) animateState(arr, 2000)

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
        function startFree2(posObj: Object, conObj: Object): void {
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

        let actionNum = 0

        // 工作站整体运行
        let ydtimer: any = null
        let fangxiang: any = ''

        function gongzuozhan(type: string) {


            if (type === 'on') {
                showVideo.value = true
                
                // if (ydtimer) clearInterval(ydtimer)
                // if (fangxiang === '左') {
                //     ydtimer = setInterval(() => {
                //         if (robot.position.x > -7) {
                //             clearInterval(ydtimer)
                //         } else {
                //             robot.position.x += 0.05
                //         }
                //     }, 50)
                // } else if (fangxiang === '右') {
                //     ydtimer = setInterval(() => {
                //         if (robot.position.x < -16) {
                //             clearInterval(ydtimer)
                //         } else {
                //             robot.position.x -= 0.05
                //         }
                //     }, 50)
                // } else if (fangxiang === '急停') {
                //     new TWEEN.Tween(robot.position)
                //         .to({ x: -7 }, 2000)
                //         .easing(TWEEN.Easing.Quadratic.Out)
                //         .start();
                // }
            } else if (type === 'off') {
                if (ydtimer) clearInterval(ydtimer)

            } else if (type === 'ofn') {
                if (ydtimer) clearInterval(ydtimer)
                fangxiang = '急停'
            } else if (type === 'zuo') {
                fangxiang = '左'
                if (ydtimer) clearInterval(ydtimer)
                ydtimer = setInterval(() => {
                    if (robot.position.x > -7) {
                        clearInterval(ydtimer)
                    } else {
                        robot.position.x += 0.05
                    }
                }, 50)
            } else if (type === 'you') {
                fangxiang = '右'
                if (ydtimer) clearInterval(ydtimer)
                ydtimer = setInterval(() => {
                    if (robot.position.x < -16) {
                        clearInterval(ydtimer)
                    } else {
                        robot.position.x -= 0.05
                    }
                }, 50)

            }

        }

        //仓储
        function actionfun(item: number, type: string) {
            let obj = player.scene.getObjectByName(`cang${item}`)
            if (type === '伸出') {
                new TWEEN.Tween(obj.position)
                    .to({ y: 125 }, 500)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
            } else if (type === '缩回') {
                new TWEEN.Tween(obj.position)
                    .to({ y: 0 }, 500)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
            }
        }
        // [-2.73, 0.13, 0.22, 0, -1.65, 0.08]

        let arr1 = [[-0.2, -0.50, 0.54, 0, -1.11, -0.10], [-0.30, -0.83, 0.54, -0.03, -1.25, -0.10], [-0.32, -1.03, 0.39, -0.03, -1.01, -0.10]]
        let arr2 = [[-2.78, -0.66, 0.77, 0, -1.65, 0.08], [-2.74, -0.55, 0.96, 0, -1.81, 0.08], [-2.74, -0.66, 0.78, 0, -1.64, 0]]
        function cangchu() {
            new TWEEN.Tween(robot.position)
                .to({ x: -14 }, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            switch (actionNum) {
                case 0:
                    animateState(arr1[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 1:
                    animateState(arr1[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 2:
                    animateState(arr1[2], 1000, () => {
                        actionNum++
                        j62.visible = true
                        zt4.visible = false
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 3:
                    animateState(arr1[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 4:
                    animateState(arr2[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 5:
                    animateState(arr2[1], 1000, () => {
                        actionNum++
                        actionfun(1, '伸出')
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 6:
                    animateState(arr2[2], 1000, () => {
                        actionNum++
                        cangitem1.visible = false
                        cangitemtou.visible = true
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 7:
                    animateState(arr2[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 8:
                    animateState(arr2[2], 1000, () => {
                        actionNum++
                        cangitem1.visible = true
                        cangitemtou.visible = false
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 9:
                    animateState(arr2[1], 1000, () => {
                        actionNum++
                        actionfun(1, '缩回')
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 10:
                    animateState(arr2[0], 1000, () => {
                        actionNum++
                        // setTimeout(() => {
                        //     cangchu()
                        // }, 1000)
                    }); break;
                case 11:
                    animateState(arr1[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 12:
                    animateState(arr1[2], 1000, () => {
                        actionNum++
                        j62.visible = false
                        zt4.visible = true
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 13:
                    animateState(arr1[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            cangchu()
                        }, 1000)
                    }); break;
                case 14:
                    animateState(arr1[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                        }, 1000)
                    }); break;
            }

        }

        //打磨
        let lun1: any = player.scene.getObjectByName("lun1");
        let j64: any = player.scene.getObjectByName("j6-4");

        let arr3 = [[0.26, -0.85, 0.27, 0, -0.51, -0.05], [0.26, -0.85, 0.27, 0, -0.51, -0.05], [0.31, -1.00, 0.13, 0, -0.51, -0.05], [0.31, -0.74, -0.10, 0, -0.51, -0.05], [0.17, -0.76, -0.10, 0, -0.51, -0.05]]
        // 0121341
        function damo() {

            switch (actionNum) {
                case 0:
                    animateState(arr3[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 1:
                    animateState(arr3[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 2:
                    animateState(arr3[2], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 3:
                    animateState(arr3[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 4:
                    animateState(arr3[3], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 5:
                    animateState(arr3[4], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 6:
                    animateState(arr3[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            damo()
                        }, 1000)
                    }); break;
                case 7:
                    animateState(arr3[0], 1000, () => {
                        actionNum = 0
                        setTimeout(() => {
                            // lun1.visible = false
                            // j64.visible = false
                        }, 1000)
                    }); break;

            }

        }

        // 加工
        function jiagong(){
            gongzhuanglungu.visible = true;
        new TWEEN.Tween(robot.position)
          .to({ x: -7 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(() => {
            startFree(
              [0, 0, 0, 0, 0, 0],
              { x: -8.32, y: 18.56, z: -6.2 },
              { x: -20.1, y: 10.85, z: -0.8 }
            );
          })
          .start();
             new TWEEN.Tween(gongzhuangtuopan.position) //70
          .to({ x: 0 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(() => {
            new TWEEN.Tween(gongzhuangqh.position) //-40
              .to({ x: 10 }, 1000)
              .easing(TWEEN.Easing.Linear.None)
              .onComplete(() => {
                new TWEEN.Tween(gonzhuangzy.position) //0
                  .to({ y: -45 }, 1000)
                  .easing(TWEEN.Easing.Linear.None)
                  .onComplete(() => {
                    new TWEEN.Tween(gongzhuangsx.position) //-50
                      .to({ z: -85 }, 1000)
                      .easing(TWEEN.Easing.Linear.None)
                      .onComplete(() => {
                        new TWEEN.Tween(gongzhuangsx.position)
                          .to({ z: -50 }, 1000)
                          .easing(TWEEN.Easing.Linear.None)
                          .onComplete(() => {
                            new TWEEN.Tween(gonzhuangzy.position)
                              .to({ y: 0 }, 1000)
                              .easing(TWEEN.Easing.Linear.None)
                              .onComplete(() => {
                                new TWEEN.Tween(gongzhuangqh.position)
                                  .to({ x: -40 }, 1000)
                                  .easing(TWEEN.Easing.Linear.None)
                                  .onComplete(() => {
                                    new TWEEN.Tween(gongzhuangtuopan.position)
                                      .to({ x: 70 }, 1000)
                                      .easing(TWEEN.Easing.Linear.None)
                                      .onComplete(() => {})
                                      .start();
                                  })
                                  .start();
                              })
                              .start();
                          })
                          .start();
                      })
                      .start();
                  })
                  .start();
              })
              .start();
          })
          .start();
        }
       

        // 压装芯片
        let tuoitem = player.scene.getObjectByName(`tuoitem`)
        let xiaaodi = player.scene.getObjectByName(`xiaaodi`)
        let tuo: any = player.scene.getObjectByName("tuo");
        let g1: any = player.scene.getObjectByName("G-1");

        let arr4 = [-1143, -1001, -175, -130, -1143]

        function yazhuang() {
            switch (actionNum) {
                case 0:
                    new TWEEN.Tween(tuo.position)
                        .to({ x: arr4[0] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            yazhuang()
                        })
                        .start(); break;
                case 1:
                    new TWEEN.Tween(tuo.position)
                        .to({ x: arr4[1] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            yazhuang()
                        })
                        .start(); break;
                case 2:
                    new TWEEN.Tween(g1.position)
                        .to({ z: arr4[2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            yazhuang()
                        })
                        .start(); break;
                case 3:
                    new TWEEN.Tween(g1.position)
                        .to({ z: arr4[3] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            yazhuang()
                        })
                        .start(); break;
                case 4:
                    new TWEEN.Tween(tuo.position)
                        .to({ x: arr4[4] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                        })
                        .start(); break;

            }
        }

        // 压装轮胎

        let g2: any = player.scene.getObjectByName("G-2");
        let yade: any = player.scene.getObjectByName("yade");
        yade.visible = false
        yade.position.set(-915.74, -75.3, -356.2)
        let scaralun: any = player.scene.getObjectByName("scaralun");

        scaralun.visible = false
        scaralun.position.set(-917, -79, -346)
        let Object2120: any = player.scene.getObjectByName("Object2120");
        Object2120.position.z = 9.5

        // scaralun.visible = true
        // scaralun.scale.set(0.884, 0.884, 0.884)
        // scaratou.scale.set(2.2, 2.2, 2.2)

        let arr5 = [-1143, -868, -171, -129]

        function luntai() {
            switch (actionNum) {
                case 0:
                    new TWEEN.Tween(tuo.position)
                        .to({ x: arr5[0] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            luntai()
                        })
                        .start(); break;
                case 1:
                    new TWEEN.Tween(tuo.position)
                        .to({ x: arr5[1] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            yade.visible = true
                            scaralun.visible = true
                            actionNum++
                            luntai()
                        })
                        .start(); break;
                case 2:
                    new TWEEN.Tween(g2.position)
                        .to({ z: arr5[2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            Object2120.position.z = 0
                            actionNum++
                            luntai()
                        })
                        .start(); break;
                case 3:
                    new TWEEN.Tween(g2.position)
                        .to({ z: arr5[3] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            luntai()
                        })
                        .start(); break;


            }
        }


        // 检测轮胎
        let scaratou: any = player.scene.getObjectByName("scaratou");
        scaratou.visible = false

        let arr6 = [[64, 67, 28.9, -40], [64, 67, 340, -40], [64, 109.48, 340, -82], [-128, 109.48, 340, -82], [-128, 67.6, 340, -38.31], [-128, 109.48, 340, -82], [64, 109.48, 340, -82]]

        function jiance() {
            switch (actionNum) {
                case 0:
                    animateState2(arr6[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 1:
                    animateState2(arr6[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 2:
                    animateState2(arr6[2], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 3:
                    animateState2(arr6[3], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 4:
                    animateState2(arr6[4], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 5:
                    animateState2(arr6[5], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
                case 6:
                    animateState2(arr6[6], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            jiance()
                        }, 1000)
                    }); break;
            }
        }

        // 轮胎分拣

        let arr7 = [[5.17, 410.55, -355.15], [758.6, 400.2, -355.15],[762.7,699.2,-355.1],[764.8,853.3,-402],[770.1,1240.1,-501.8]]
        let arr8 = [-181,274]
        let arr9 = [-30]
        function fenjian() {
            switch (actionNum) {
                case 0:
                    new TWEEN.Tween(scaratou.position)
                        .to({ x: arr7[0][0], y: arr7[0][1], z: arr7[0][2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            fenjian()
                        })
                        .start(); break;
                case 1:
                    new TWEEN.Tween(scaratou.position)
                        .to({ x: arr7[1][0], y: arr7[1][1], z: arr7[1][2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            fenjian()
                        })
                        .start(); break;
                case 2:
                    new TWEEN.Tween(shangtuiban1.position)
                        .to({ y: arr8[0] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                    new TWEEN.Tween(scaratou.position)
                        .to({ x: arr7[2][0], y: arr7[2][1], z: arr7[2][2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            fenjian()
                        })
                        .start(); break;
                case 3:
                    new TWEEN.Tween(scaratou.rotation)
                        .to({ x: arr9[0]*Math.PI/180 }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                    new TWEEN.Tween(scaratou.position)
                        .to({ x: arr7[3][0], y: arr7[3][1], z: arr7[3][2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            fenjian()
                        })
                        .start(); break;
                case 4:
                   new TWEEN.Tween(xiatuiban1.position)
                        .to({ y: arr8[1] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                    new TWEEN.Tween(scaratou.position)
                        .to({ x: arr7[4][0], y: arr7[4][1], z: arr7[4][2] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(() => {
                            actionNum++
                            fenjian()
                        })
                        .start(); break;
            }
        }


        function stopTween(type: boolean) {
            if (type) {
                actionNum = 0
            }
            TWEEN.removeAll()
        }


        watch(topicNum, () => {
            console.log("topicNum", topicNum.value);
            emit("changeTopicNum", topicNum.value);
            stopTween(true)
            if (topicNum.value === 2) {
                lun1.visible = false
                j64.visible = false
                startFree([0,0,0,0,0,0], { x: -4.28, y: 22.36, z: -14.54 }, { x: -13.91, y: 7.74, z: 2.39 })
            }

            if (topicNum.value === 4) {
                lun1.visible = true
                j64.visible = true
                new TWEEN.Tween(robot.position)
                    .to({ x: -8 }, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
                startFree([0.26, -0.85, 0.27, 0, -0.51, -0.05], { x: -4.28, y: 22.36, z: -14.54 }, { x: -13.91, y: 7.74, z: 2.39 })
            }
            if (topicNum.value === 6) {
                tuo.visible = true
                tuoitem.visible = true
                 new TWEEN.Tween(tuo.position)
                        .to({ x: arr4[0] }, 1000)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                new TWEEN.Tween(robot.position)
                    .to({ x: -14 }, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
                startFree(getRobotPosition(), { x: -10.265, y: 12, z: -3.30 }, { x: -4.52, y: 10.85, z: 0.074 })
            }

            if (topicNum.value === 8) {
                startFree2({ x: 5.41, y: 21.71, z: -11.46 }, { x: 5.05, y: 2.49, z: 3.48 })
                scaratou.visible = true
                Object2120.position.z = -22
                scaratou.position.set(4.08, 331.39, -95.85)
                scaratou.rotation.x = 0
            }

            if (topicNum.value === 9) {
                startFree2({ x: 9.33, y: 19.23, z: -14.51 }, { x: 8.85, y:  0.61, z: 1.15 })
                setState2([-28.57, 67.66, 329, -38.31])
                scaratou.visible = true
                scaratou.position.set(5.17, 410.55, -355.15)
                shangtuiban1.position.y = -536.8
                xiatuiban1.position.y = -329.6
            }

        });


        onBeforeUnmount(() => {
        });
        return {
            topic,
            // goTest,
            goBack,
            topicOneImg,
            topicNum,
            nowType,
            animateSwitch,
            showMenu,
            zishouSwitch,
            waitPageShow,
            questionPageShow,
            // showHelp,
            // showlr,
            dianjiswtich,
            changeNum,
            gongzuozhan,
            stopTween,
            cangchu,
            damo,
            yazhuang,
            luntai,
            jiance,
            fenjian,
            showVideo,
            jiagong
        };
    },
});
</script>

<template>
    <div class="controls_box">
        <div class="left_box" v-if="topicNum < 10">
            <!-- scara机器人调试实训任务 -->
            <div class="robot_opt" :style="topicOneImg">
                <!-- <div class="otherpage" v-if="topicNum === 1">
                    <div
                        class="dianjideng"
                        :class="{ liang: dianjiswtich }"
                        @click="dianjiswtich = !dianjiswtich"
                    >
                        <div class="text">电机灯</div>
                    </div>
                    <div class="kaiguan">
                        <div class="off">off</div>
                        <div class="on active">on</div>
                        <div class="text">电源开关</div>
                    </div>
                    <div class="tie">
                        <div
                            class="hand"
                            :class="{
                                shou: !zishouSwitch,
                                zi: zishouSwitch,
                            }"
                            @click="zishouSwitch = !zishouSwitch"
                        ></div>
                    </div>
                </div> -->

                <div class="btn_page" v-if="topicNum === 2">
                    <!-- <div
                        class="typeBtn"
                        style="left: 119px;top: 170px;"
                        @click="gongzuozhan('zuo')"
                    >向左</div>
                    <div
                        class="typeBtn"
                        style="left: 213px;top: 170px;"
                        @click="gongzuozhan('you')"
                    >向右</div> -->
                    <div class="conBtn" style="left: 305px;top: 72px;" @click="gongzuozhan('on')"></div>
                    <!-- <div class="conBtn" style="left: 305px;top: 124px;" @click="gongzuozhan('off')"></div> -->
                    <!-- <div class="conBtn" style="left: 305px;top: 174px;" @click="gongzuozhan('ofn')"></div> -->
                </div>

                <div class="btn_page" v-if="topicNum === 3">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 315px;top: 75px;" @click="cangchu()"></div>
                    <div class="conBtn" style="left: 315px;top: 120px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 314px;top: 165px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 4">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 308px;top: 75px;" @click="damo()"></div>
                    <div class="conBtn" style="left: 308px;top: 135px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 308px;top: 190px;" @click="stopTween(true)"></div>
                </div>

                 <div class="btn_page" v-if="topicNum === 5">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 308px;top: 75px;" @click="jiagong()"></div>
                    <div class="conBtn" style="left: 308px;top: 135px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 308px;top: 190px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 6">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 328px;top: 75px;" @click="yazhuang()"></div>
                    <div class="conBtn" style="left: 328px;top: 125px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 328px;top: 175px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 7">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 328px;top: 75px;" @click="luntai()"></div>
                    <div class="conBtn" style="left: 328px;top: 125px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 328px;top: 175px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 8">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 305px;top: 75px;" @click="jiance()"></div>
                    <div class="conBtn" style="left: 305px;top: 125px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 305px;top: 175px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 9">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 328px;top: 75px;" @click="fenjian()"></div>
                    <div class="conBtn" style="left: 328px;top: 125px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 328px;top: 175px;" @click="stopTween(true)"></div>
                </div>
            </div>
        </div>
        <div
            class="overbtn"
            v-if="[1, 2, 3, 4, 5, 6, 7, 8, 9].includes(topicNum)"
            @click="topicNum++"
        >下一步</div>
        <div class="overbtn" v-if="topicNum === 10" @click="goBack">实训结束</div>
    </div>
    <div class="video" v-if="showVideo">
      <div class="close" @click="showVideo = false">+</div>
      <video src="/hmia/jichengVideo.mp4" autoplay width="100%" controls></video>
    </div>
</template>

<style scoped lang="less">
.video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top:0;
    overflow: hidden;

    .close {
      position: absolute;
      font-size: 50px;
      transform: rotateZ(45deg);
      color: #fff;
      right: 0;
      top: 0px;
      width: 30px;
      height: 30px;
      z-index: 1;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
.controls_box {
    position: absolute;
    right: 47px;
    bottom: 119px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .overbtn {
        right: 840px;
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

    .left_box {
        width: 440px;
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
            background-color: #fff;

            .otherpage {
                position: absolute;
                width: 74%;
                height: 100%;
                top: 0;
                right: 0;
                /* border: 2px solid #000; */
                /* background-color: #fff; */

                .dianjideng {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 37px;
                    left: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    background-color: #ccc;

                    .text {
                        position: absolute;
                        top: -26px;
                        font-size: 14px;
                        text-align: center;
                        width: 100%;
                    }
                }
                .liang {
                    background-color: #ffb100;
                }
                @keyframes blink {
                    0% {
                        background-color: #ccc;
                    }
                    50% {
                        background-color: #ffb100;
                    }
                    100% {
                        background-color: #ccc;
                    }
                }

                .shan {
                    animation: blink 0.5s linear infinite;
                }

                .kaiguan {
                    position: absolute;
                    width: 136px;
                    height: 80px;
                    top: 10px;
                    left: 90px;
                    border: 1px solid #ffb100;

                    .off {
                        position: absolute;
                        left: 10px;
                        top: 25px;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #fff;
                        background-color: #ccc;
                        cursor: pointer;
                    }
                    .on {
                        position: absolute;
                        left: 75px;
                        top: 25px;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #fff;
                        background-color: #ccc;
                        cursor: pointer;
                    }
                    .active {
                        background-color: #ff7000a9;
                    }
                    .text {
                        position: absolute;
                        font-size: 14px;
                        top: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                    }
                }
                .tie {
                    position: absolute;
                    width: 220px;
                    height: 210px;
                    top: 100px;
                    left: 10px;
                    background: url(../topic0/tie.png) no-repeat;
                    background-size: 100% 100%;

                    .hand {
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        top: 80px;
                        left: 76px;
                        background: url(../topic0/pointhand.png) no-repeat;
                        background-size: 100% 100%;
                        transform: rotateZ(-38deg);
                    }
                    .shou {
                        transform: rotateZ(0);
                    }
                    .zi {
                        transform: rotateZ(-72deg);
                    }
                }
            }

            .btn_page {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #ffffff33;

                .typeBtn {
                    width: 43px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    color: #fff;
                    background-color: #ffaf4c;
                    position: absolute;
                    border-radius: 25px;
                    cursor: pointer;
                }

                .conBtn {
                    width: 43px;
                    height: 39px;
                    position: absolute;
                    border-radius: 25px;
                    // background-color: #fff;
                    cursor: pointer;
                }
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
