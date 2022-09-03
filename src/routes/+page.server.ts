import { error } from '@sveltejs/kit';
import { api } from '$lib/api';
import type { PostList } from '$lib/model/post'
import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	console.log("aaa")
	const response = await api('GET', `boards`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			postList: {} as PostList
		};
	}
	if (response.status === 200) {
		return {
			postList: (await response.json()) as PostList
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
