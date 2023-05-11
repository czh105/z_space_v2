import { Vector3, Quaternion } from 'three';
// 模型操作枚举
export const modelActionEnum: any = {
	VISIBLE: 0, // 显隐
	ROTATION: 1, // 旋转
	POSITION: 2, // 位移
	LOOKAT: 3, // 控制器的看向的方向
	CONTROL_ENABLED: 4, // 控制器开关
	ATTACH: 5, // 添加（更新)父类节点
}
export class History {
	modelActionHistory: any[];
	constructor() {
		// todo:czh 重新记录机器人状态
		this.modelActionHistory = [];
	}
	public pushModelActionHistory(object: any, type: number = 0) {
		if (!object) {
			return;
		}
		let item: any = {
			obj: object,
			type: type,
			value: null
		}
		switch (type) {
			case modelActionEnum.VISIBLE:
				item.value = object.visible;
				break;
			case modelActionEnum.ROTATION:
				item.value = new Vector3().copy(object.rotation);
				break;
			case modelActionEnum.POSITION:
				item.value = new Vector3().copy(object.position);
				break;
			case modelActionEnum.LOOKAT:
				item.value = new Vector3().copy(object.target);
				break;
			case modelActionEnum.CONTROL_ENABLED:
				item.value = object.enabled;
				break;
			case modelActionEnum.ATTACH:
				// 记录位置
				let _value = {
					parent: object.parent,
					matrix: object.matrix,
					position: new Vector3().copy(object.position),
					quaternion: new Quaternion().copy(object.quaternion),
					scale: new Vector3().copy(object.scale)
				}
				item.value = _value;
				break;
		}
		this.modelActionHistory.push(item);
	}
	public pushModelsActionHistory(objects: any[], type: number) {
		if (objects) {
			for (let i = 0; i < objects.length; i++) {
				this.pushModelActionHistory(objects[i], type);
			}
		}
	}
	// 清空
	public clearModelActionHistory(){ 
		this.modelActionHistory = [];
	}
	// 重置调试运行之前的状态
	public resetModelAction() {
		let attachActions: any[] = [];
		for (let i = 0; i < this.modelActionHistory.length; i++) {
			const actionObj = this.modelActionHistory[i];
			if (actionObj.value == null) continue;
			switch (actionObj.type) {
				case modelActionEnum.VISIBLE:
					actionObj.obj.visible = actionObj.value;
					// console.log(actionObj.obj.visible)
					break;
				case modelActionEnum.ROTATION:
					actionObj.obj.rotation.set(actionObj.value.x, actionObj.value.y, actionObj.value.z);
					break;
				case modelActionEnum.POSITION:
					actionObj.obj.position.set(actionObj.value.x, actionObj.value.y, actionObj.value.z);
					break;
				case modelActionEnum.LOOKAT:
					actionObj.obj.target = actionObj.value;
					break;
				case modelActionEnum.CONTROL_ENABLED:
					actionObj.obj.enabled = actionObj.value;
					break;
				case modelActionEnum.ATTACH:
					// actionObj.value.attach(actionObj.obj);
					attachActions.push(actionObj);
					break;
			}
		}
		for(let j = 0; j < attachActions.length; j++){
			const attachAction = attachActions[j];
			console.log(attachAction);
			const matrix = attachAction.value.matrix;
			const parent = attachAction.value.parent;
			const position = attachAction.value.position;
			const quaternion = attachAction.value.quaternion;
			const scale = attachAction.value.scale;
			attachAction.obj.position.copy(position);
			attachAction.obj.quaternion.copy(quaternion);
			attachAction.obj.scale.copy(scale);
			parent.updateWorldMatrix(true, false);
			attachAction.obj.matrix.copy(matrix);
			attachAction.obj.matrix.decompose(position, quaternion, scale);
			parent.add(attachAction.obj);
			attachAction.obj.updateWorldMatrix(false, true);
		}
	}
}