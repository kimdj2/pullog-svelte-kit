<script lang="ts">
  import { name } from '$lib/info.js'
  import ArrowLeftIcon from '$lib/components/common/ArrowLeftIcon.svelte'
  import ButtonLink from '$lib/components/common/ButtonLink.svelte'
  import PostPreview from '$lib/components/post/PostPreview.svelte'
	import type { PageData } from './$types';
	import PostList from '$lib/components/post/PostList.svelte';

  export let data: PageData

  $: isFirstPage = data.postList.pageInfo.previous !== null
  $: hasNextPage = data.postList.pageInfo.next !== null
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>

<PostList postList = { data.postList } />
