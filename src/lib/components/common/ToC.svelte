<script lang="ts">
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

  type Heading = {
    title: string | undefined
    depth: number
    node: HTMLElement
  }

  export let allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  export let activeHeading: Heading = {} as Heading


  let scrollY: number
  let headings: Heading[] = []

  function moveScroll(node: HTMLElement) {
    const position = cumulativeOffset(node)
    window.scrollTo(0, position.top)
    updateHeadings()
    setActiveHeading()
  }

  const cumulativeOffset = (node: HTMLElement | null)  => {
    let top = 0, left = 0;
    do {
        top += node?.offsetTop  || 0
        left += node?.offsetLeft || 0
        node = node?.offsetParent
    } while(node);

    return {
        top: top,
        left: left
    };
};

  function updateHeadings() {
    const nodes = [
      // Exclude h1 as those should be reserved for the post title
      ...document.querySelectorAll<HTMLElement>(`article :where(${allowedHeadings.join(', ')}):not(#__sections)`)
    ]
    const depths = nodes.map((node) => Number(node.nodeName[1]))
    const minDepth = Math.min(...depths)

    headings = nodes.map((node, idx) => ({
      title: node.innerText,
      depth: depths[idx] - minDepth,
      node
    }))

    // set first heading as active if null on page load
    if (activeHeading === null) {
      activeHeading = headings[0]
    }
  }

  onMount(() => {
    updateHeadings()
    setActiveHeading()
  })

  if (typeof window !== 'undefined') {
    page.subscribe(() => {
      updateHeadings()
      setActiveHeading()
    })
  }

  function setActiveHeading() {
    scrollY = window.scrollY

    const visibleIndex =
      headings.findIndex(
        (heading) => heading.node.offsetTop + heading.node.clientHeight > scrollY
      ) - 1

    activeHeading = headings[visibleIndex]

    const pageHeight = document.body.scrollHeight
    const scrollProgress = (scrollY + window.innerHeight) / pageHeight
    if (scrollProgress > 0.999) {
      activeHeading = headings[headings.length - 1]
    }
  }
</script>

<svelte:window on:scroll={setActiveHeading} />

<h6 id="__sections" class="uppercase text-slate-400/75 dark:text-slate-600 font-bold text-sm">
  Sections
</h6>

<ul class="mt-2 !pl-0">
  {#each headings as heading}
    <li
      class="heading list-none my-2 !pl-0 text-base text-slate-400 hover:text-slate-900 dark:text-slate-500 hover:dark:text-slate-100 transition-colors cursor-pointer"
      class:active={activeHeading?.node === heading.node}
      style={`--depth: ${heading.depth}`}
    >
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="!no-underline" on:click={()=> moveScroll(heading.node)}>{heading.title}</a>
    </li>
  {/each}
</ul>

<style lang="postcss">
  .heading {
    margin-left: calc(var(--depth, 0) * 0.75rem);
  }

  .active {
    @apply text-slate-900 font-medium;
  }

  /* can't use dark: modifier in @apply */
  :global(.dark) .active {
    @apply text-slate-100;
  }
</style>
