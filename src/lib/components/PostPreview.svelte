<script lang="ts">
  import { format, parseISO } from 'date-fns'
  import ButtonLink from './ButtonLink.svelte'
  import type { Post } from '$lib/model/post-list'

  export let post: Post
  export let small = false
</script>

<div class="flex flex-col">
  <div>
    {#if !small}
      <h1 class="!mt-0 !mb-2">
        <a href={`/post/${post.id}`} sveltekit:prefetch>{post.title}</a>
      </h1>
    {:else}
      <h3 class="!mt-0 !mb-2">
        <a href={`/post/${post.id}`} sveltekit:prefetch>{post.title}</a>
      </h3>
    {/if}
    <div class="opacity-70">
      <time>{format(new Date(parseISO(post.created_at)), 'MMMM d, yyyy')}</time>
      •
    </div>
  </div>
  <div class="flex-1">{post.description}</div>
  <slot name="actions">
    <div class="flex justify-end w-full">
      <ButtonLink href={`/post/${post.id}`}>Read More</ButtonLink>
    </div>
  </slot>
</div>
