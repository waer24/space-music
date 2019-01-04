// 新增： imei跳转到monitor界面
import axios from 'axios'
import qs from 'qs'

export const changeOrigin = true;
export const GO_BACK_URL = 'http://172.16.0.121:8280/fleetIndex';

export function imeiLink(keyword=null, userId=null) {
	let url = 'http://172.16.0.121:8280/console'
	let param = new FormData()  // 创建form对象
	const data = {
			keyword,
			userId
		}
	param.append('imeiLink',data) // 向FormData添加数据
	let config = { headers: {'Content-Type': 'application/x-www-form-urlencoded'}} // 解决跨域问题
	let result = axios.post({
    url,
		param,
		data: qs.stringify(data), //qs 解决跨域问题
		config,
	})
	.then((response) => {
		console.log(response.data)
		console.log('test')
		return response.data
	})  
	.catch((e) => {
		return e
	});
	return result
}