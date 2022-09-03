import { error } from '@sveltejs/kit'
import { api } from '$lib/api'
import type { PageServerLoad, Action } from './$types'
import type { PostDetail } from '$lib/model/post-detail';


export const load: PageServerLoad = async (data) => {
	console.log()
	// locals.userid comes from src/hooks.js
	const response = await api('GET', `boards/${data.params.id}`)

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			postDetail: {} as PostDetail
		};
	}

	if (response.status === 200) {
		return {
			postDetail: (await response.json()) as PostDetail
		};
	}

	throw error(response.status);
};

// export const POST: Action = async ({ request, locals }) => {
// 	const form = await request.formData();

// 	await api('POST', `todos/${locals.userid}`, {
// 		text: form.get('text')
// 	});
// };

// export const PATCH: Action = async ({ request, locals }) => {
// 	const form = await request.formData();

// 	await api('PATCH', `todos/${locals.userid}/${form.get('uid')}`, {
// 		text: form.has('text') ? form.get('text') : undefined,
// 		done: form.has('done') ? !!form.get('done') : undefined
// 	});
// };

// export const DELETE: Action = async ({ request, locals }) => {
// 	const form = await request.formData();

// 	await api('DELETE', `todos/${locals.userid}/${form.get('uid')}`);
// };
