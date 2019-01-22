import fetch from 'dva/fetch';
import router from 'umi/router';
import hash from 'hash.js';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。'
};

/**
 *
 * @param type  'GET','POST','DELETE','PUT'
 * @param url
 * @param config
 * @param request
 * @param response
 * @param error bool型true表示是error
 */
function requestGroupLog(type = 'GET', url, config, request, response) {
	console.group(type, url);
	//if(request && request.toString() !== "[object Object]") //request 不等于{}
	console.log('request:', request);
	console.log('response:', response);
	//if(config && config.toString() !== "[object Object]")
	console.log('config:', config);
	//console.group(type, url);
	console.groupEnd();
}

const checkStatus = response => {
	if (response.status === 400) return response;
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const errortext = codeMessage[response.status] || response.statusText;
	//todo 通知错误
	const error = new Error(errortext);
	error.name = response.status;
	//error.response = response;
	throw error;
};

//存储缓存
const cachedSave = (response, hashcode) => {
	const contentType = response.headers.get('Content-Type');
	if (contentType && contentType.match(/application\/json/i)) {
		// All data is saved as text
		response
			.clone()
			.text()
			.then(content => {
				sessionStorage.setItem(hashcode, content);
				sessionStorage.setItem(`${hashcode}:timestamp`, String(Date.now()));
			});
	}
	return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
	const options = {
		...option
	};
	/**
	 * Produce fingerprints based on url and parameters
	 * Maybe url has the same parameters
	 */
	const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
	const hashcode = hash
		.sha256()
		.update(fingerprint)
		.digest('hex');

	const defaultOptions = {
		credentials: 'include'
	};
	const newOptions = { ...defaultOptions, ...options };
	if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
		if (!(newOptions.body instanceof FormData)) {
			newOptions.headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				...newOptions.headers
			};
			newOptions.body = JSON.stringify(newOptions.body);
		} else {
			// newOptions.body is FormData
			newOptions.headers = {
				Accept: 'application/json',
				...newOptions.headers
			};
		}
	}

	//填充token
	// newOptions.headers = {
	// 	Authorization: access_tokenType + ' ' + access_token,
	// 	...newOptions.headers
	// };

	const expirys = options.expirys && 60;
	// options.expirys !== false, return the cache,
	if (options.expirys !== false) {
		const cached = sessionStorage.getItem(hashcode);
		const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
		if (cached !== null && whenCached !== null) {
			const age = (Date.now() - Number(whenCached)) / 1000;
			if (age < expirys) {
				const response = new Response(new Blob([cached]));
				return response.json();
			}
			sessionStorage.removeItem(hashcode);
			sessionStorage.removeItem(`${hashcode}:timestamp`);
		}
	}

	return fetch(url, newOptions)
		.then(checkStatus)
		.then(response => cachedSave(response, hashcode))
		.then(response => {
			// DELETE and 204 do not return data by default
			// using .json will report an error.
			if (newOptions.method === 'DELETE' || response.status === 204) {
				return response.text();
			}
			return response.json();
		})
		.then(content => {
			// request日志
			requestGroupLog(newOptions.method, url, newOptions, newOptions.body, content);
			//自定义处理
			if (!!newOptions.handleSelf) {
				if (!!content.err_code) {
					return content;
				}
				return { err_code: 200, data: content };
			}
			//统一处理，仅处理400错误
			else {
				//400错误
				if (!!content.err_code) {
          console.log("400错误",content);
					const error = new Error(`url:${url}` + content.err_msg);
					error.name = String(content.err_code);
					throw error;
				}
				//正确
				else {
					return content;
				}
			}
		})
		.catch(e => {
      console.log(e);
      const status = Number.parseInt(e.name);
			if (status === 400) {
        //通知400错误
				return;
			}

			requestGroupLog(newOptions.method, url, newOptions, newOptions.body, status);
			if (status === 401) {
				window['g_app']._store.dispatch({
					type: 'login/fetchLogout'
				});
				return;
			}
			// environment should not be used
			if (status === 403) {
				router.push('/exception/403');
				return;
			}
			if (status <= 504 && status >= 500) {
				//router.push('/exception/500');
				return;
			}
			if (status >= 404 && status < 422) {
				router.push('/exception/404');
			}
		});
}
