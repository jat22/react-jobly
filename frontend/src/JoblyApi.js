import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

class JoblyApi {
	static token;

	static async request(endpoint, data = {}, method="get"){
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization : `Bearer ${JoblyApi.token}`};
		const params = (method === "get") ? data : {};

		try{
			return (await axios({ url, method, data, params, headers })).data;
		} catch(e){
			console.error("API Error", e.response);
			let message = e.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	};

	//////////////// AUTH REQUESTS /////////////////////
	static async getToken(data) {
		let token = await this.request('auth/token', data, "post")
		return token
	}

	static async register(data) {
		let res = await this.request('auth/register', data, "post");
		return res
	}

	//////////////// COMPANY REQUESTS //////////////////
	static async getAllCompanies(data={}) {
		let res = await this.request('companies', data);
		return res.companies;
	}

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		console.log(res)
		return res.company;
	}

	static async postCompany(newCompanyInfo) {
		let res = await this.request('companies', newCompanyInfo, 'post');
		return res.company;
	}

	static async patchCompany(handle,info) {
		let res = await this.request(`companies/${handle}`, info, 'patch')
		return res.company
	}

	static async deleteCompany(handle) {
		let res = await this.request(`companies/${handle}`, 'delete')
		return res
	}

	///////////////// JOBS REQUESTS ////////////////////

	static async getJobs(data={}) {
		let res = await this.request('jobs', data);
		return res.jobs
	}

	static async getAJob(id) {
		let res = await this.request(`jobs/${id}`)
		return res.job
	}

	static async postJob(info) {
		let res = await this.request('jobs', info, 'post');
		return res.job
	}

	static async patchJob(id, info) {
		let res = await this.request(`jobs/${id}`, info, 'patch')
		return res.job
	} 

	static async deleteJob(id) {
		let res = await this.request(`jobs/${id}`, 'delete')
		return res
	}

	///////////////// USER REQUESTS /////////////////
	static async getAllUsers() {
		let res = await this.request('users');
		return res.users
	}

	static async getUser(username) {
		let res = await this.request(`users/${username}`)
		return res.user
	}

	static async postUser(newUser) {
		let res = await this.request('users', newUser, 'post')
		return res.user
	}

	static async patchUser(username, info) {
		let res = await this.request(`users/${username}`, info, 'patch')
		return res.user
	}

	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, "delete")	
		return res
	}

	static async addUserJob(username, jobId) {
		console.log(username)
		console.log(jobId)
		let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
		return res
	}
}

export default JoblyApi