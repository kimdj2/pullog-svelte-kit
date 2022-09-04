<script lang="ts">
  import type { PostList } from '$lib/model/post-list';
  import ArrowLeftIcon from '../common/ArrowLeftIcon.svelte';
  import ButtonLink from '../common/ButtonLink.svelte';
  import PostPreview from './PostPreview.svelte';
  
  export let postList: PostList

  $: isFirstPage = postList.pageInfo.previous !== null
  $: hasNextPage = postList.pageInfo.next !== null
</script>


<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-slate-300 dark:divide-slate-700">
    {#each postList.posts as post}
      <div class="py-8 first:pt-0">
        <PostPreview {post} />
      </div>
    {/each}
  </div>

  <!-- pagination -->
  <div class="flex visible items-center justify-between pt-8 opacity-70">
    {#if !isFirstPage}
      <ButtonLink raised={false} href={`/posts/page/${postList.pageInfo.previous}`}>
        <slot slot="icon-start">
          <ArrowLeftIcon class="h-5 w-5" />
        </slot>
        Previous
        <slot slot="icon-end" /></ButtonLink
      >
    {:else}
      <div />
    {/if}

    {#if hasNextPage}
      <ButtonLink raised={false} href={`/posts/page/${postList.pageInfo.next}`}>Next</ButtonLink>
    {/if}
  </div>
</div>
