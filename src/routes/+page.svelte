<script lang="ts">
  import ButtonLink from '$lib/components/common/ButtonLink.svelte'
  import PostPreview from '$lib/components/post/PostPreview.svelte'
  import { name } from '$lib/info.js'
	import type { PageData } from './$types'

	export let data: PageData;
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <!-- recent posts -->
  <h2 class="flex items-baseline gap-4 !mb-2">
    Recent Posts
    <ButtonLink href="/post" size="small" raised={false} class="opacity-60">View All</ButtonLink>
  </h2>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
    {#each data.postList as post}
      <div class="flex p-4 border border-slate-300 dark:border-slate-700 rounded-lg">
        <PostPreview {post} small />
      </div>
    {/each}
  </div>
</div>
