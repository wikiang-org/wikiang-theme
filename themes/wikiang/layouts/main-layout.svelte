<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { authActions } from '$lib/stores/auth.svelte';
    import { getComponentsForSlot, subscribeToSlotChanges } from '$lib/components/slot-manager';
    import BookOpen from '@lucide/svelte/icons/book-open';
    import Search from '@lucide/svelte/icons/search';
    import User from '@lucide/svelte/icons/user';
    import Home from '@lucide/svelte/icons/home';
    import Clock from '@lucide/svelte/icons/clock';
    import Shuffle from '@lucide/svelte/icons/shuffle';
    import Wrench from '@lucide/svelte/icons/wrench';
    import Link2 from '@lucide/svelte/icons/link-2';
    import FileText from '@lucide/svelte/icons/file-text';
    import ChevronDown from '@lucide/svelte/icons/chevron-down';
    import Moon from '@lucide/svelte/icons/moon';
    import Sun from '@lucide/svelte/icons/sun';

    /**
     * Wikiang Theme - Main Layout
     *
     * 위키피디아/MediaWiki Vector 스킨 스타일
     * - 좌측: 위키 네비게이션 사이드바
     * - 상단: 검색바 + 유저메뉴
     * - 본문: 문서 콘텐츠 (슬롯)
     * - 하단: 메타 정보 + 푸터
     */

    const { children } = $props();

    const isHomePage = $derived($page.url.pathname === '/');
    let sidebarOpen = $state(true);
    let darkMode = $state(false);
    let searchQuery = $state('');

    let slotVersion = $state(0);
    const backgroundComponents = $derived.by(() => {
        slotVersion;
        return getComponentsForSlot('background');
    });
    const heroComponents = $derived.by(() => {
        slotVersion;
        return getComponentsForSlot('landing-hero');
    });

    type NavSection = {
        title: string;
        collapsed: boolean;
        items: Array<{ name: string; href: string; icon?: typeof Home }>;
    };

    let navSections = $state<NavSection[]>([
        {
            title: '둘러보기',
            collapsed: false,
            items: [
                { name: '대문', href: '/', icon: Home },
                { name: '최근 변경', href: '/wiki?sort=updated', icon: Clock },
                { name: '임의 문서', href: '/wiki?random=1', icon: Shuffle },
                { name: '모든 문서', href: '/wiki', icon: FileText }
            ]
        },
        {
            title: '도구',
            collapsed: true,
            items: [
                { name: '링크된 문서', href: '#', icon: Link2 },
                { name: '특수 문서', href: '#', icon: Wrench }
            ]
        }
    ]);

    function toggleSection(index: number) {
        navSections[index].collapsed = !navSections[index].collapsed;
    }

    function toggleDarkMode() {
        darkMode = !darkMode;
        document.documentElement.classList.toggle('dark', darkMode);
    }

    function handleSearch(e: Event) {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/wiki?q=${encodeURIComponent(searchQuery)}`;
        }
    }

    onMount(() => {
        authActions.initAuth();
        darkMode = document.documentElement.classList.contains('dark');

        const unsubscribe = subscribeToSlotChanges(() => {
            slotVersion++;
        });
        return () => unsubscribe();
    });
</script>

<!-- Background 슬롯 (CSS 변수 오버라이드) -->
{#each backgroundComponents as slotComp (slotComp.id)}
    {@const Component = slotComp.component}
    <Component {...slotComp.props || {}} />
{/each}

{#if isHomePage}
    <!-- 홈페이지: 랜딩 레이아웃 -->
    <div class="flex min-h-screen flex-col bg-white dark:bg-[#1a1a2e]">
        <!-- 랜딩 헤더 -->
        <header class="border-b border-[var(--wiki-border,#a2a9b1)] bg-white px-6 py-3 dark:border-[#444] dark:bg-[#1a1a2e]">
            <div class="mx-auto flex max-w-5xl items-center justify-between">
                <a href="/" class="flex items-center gap-2">
                    <BookOpen class="h-6 w-6 text-[var(--wiki-link-color,#3366cc)]" />
                    <span class="text-xl font-bold">위키앙</span>
                </a>
                <div class="flex items-center gap-3">
                    <button onclick={toggleDarkMode} class="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                        {#if darkMode}<Sun class="h-4 w-4" />{:else}<Moon class="h-4 w-4" />{/if}
                    </button>
                    <a href="/login" class="text-sm text-[var(--wiki-link-color,#3366cc)] hover:underline">로그인</a>
                </div>
            </div>
        </header>

        <!-- 랜딩 히어로 -->
        {#each heroComponents as slotComp (slotComp.id)}
            {@const Component = slotComp.component}
            <Component {...slotComp.props || {}} />
        {/each}
    </div>
{:else}
    <!-- 위키 페이지: MediaWiki 스타일 레이아웃 -->
    <div class="flex min-h-screen bg-white dark:bg-[#1a1a2e]">
        <!-- 좌측 사이드바 -->
        <aside
            class="hidden w-56 shrink-0 border-r border-[var(--wiki-border,#a2a9b1)] bg-[var(--wiki-bg-sidebar,#f6f6f6)] dark:border-[#444] dark:bg-[#16213e] lg:block"
        >
            <!-- 로고 -->
            <div class="border-b border-[var(--wiki-border,#a2a9b1)] p-4 dark:border-[#444]">
                <a href="/" class="flex items-center gap-2">
                    <BookOpen class="h-5 w-5 text-[var(--wiki-link-color,#3366cc)]" />
                    <span class="text-lg font-bold">위키앙</span>
                </a>
                <p class="mt-0.5 text-xs text-gray-500">모두가 함께 만드는 백과사전</p>
            </div>

            <!-- 네비게이션 -->
            <nav class="p-3">
                {#each navSections as section, i (section.title)}
                    <div class="mb-2">
                        <button
                            class="flex w-full items-center justify-between rounded px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                            onclick={() => toggleSection(i)}
                        >
                            {section.title}
                            <ChevronDown class="h-3 w-3 transition-transform {section.collapsed ? '-rotate-90' : ''}" />
                        </button>
                        {#if !section.collapsed}
                            <ul class="mt-1 space-y-0.5">
                                {#each section.items as item (item.name)}
                                    <li>
                                        <a
                                            href={item.href}
                                            class="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            {#if item.icon}
                                                <svelte:component this={item.icon} class="h-3.5 w-3.5 text-gray-400" />
                                            {/if}
                                            {item.name}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                {/each}
            </nav>
        </aside>

        <!-- 메인 영역 -->
        <div class="flex min-w-0 flex-1 flex-col">
            <!-- 위키 헤더 -->
            <header class="border-b border-[var(--wiki-border,#a2a9b1)] bg-white px-4 py-2 dark:border-[#444] dark:bg-[#1a1a2e]">
                <div class="flex items-center justify-between gap-4">
                    <!-- 모바일 로고 -->
                    <a href="/" class="flex items-center gap-1.5 lg:hidden">
                        <BookOpen class="h-5 w-5 text-[var(--wiki-link-color,#3366cc)]" />
                        <span class="font-bold">위키앙</span>
                    </a>

                    <!-- 검색 -->
                    <form onsubmit={handleSearch} class="flex max-w-md flex-1 items-center">
                        <div class="relative w-full">
                            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                bind:value={searchQuery}
                                placeholder="위키앙 검색"
                                class="w-full rounded border border-[var(--wiki-border,#a2a9b1)] bg-white py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wiki-link-color,#3366cc)]/30 dark:border-[#444] dark:bg-[#0f3460]"
                            />
                        </div>
                    </form>

                    <!-- 유저 메뉴 -->
                    <div class="flex items-center gap-2">
                        <button onclick={toggleDarkMode} class="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                            {#if darkMode}<Sun class="h-4 w-4" />{:else}<Moon class="h-4 w-4" />{/if}
                        </button>
                        <a href="/login" class="flex items-center gap-1 text-sm text-[var(--wiki-link-color,#3366cc)] hover:underline">
                            <User class="h-4 w-4" />
                            <span class="hidden sm:inline">로그인</span>
                        </a>
                    </div>
                </div>
            </header>

            <!-- 본문 -->
            <main class="flex-1 px-4 py-4 sm:px-6 lg:px-8">
                <div class="mx-auto" style="max-width: 960px;">
                    {@render children()}
                </div>
            </main>

            <!-- 위키 푸터 -->
            <footer class="border-t border-[var(--wiki-border,#a2a9b1)] bg-[var(--wiki-bg-sidebar,#f6f6f6)] px-4 py-4 dark:border-[#444] dark:bg-[#16213e]">
                <div class="mx-auto max-w-[960px] text-center text-xs text-gray-500">
                    <div class="flex flex-wrap justify-center gap-3">
                        <a href="/content/privacy" class="hover:text-[var(--wiki-link-color,#3366cc)] hover:underline">개인정보처리방침</a>
                        <span>·</span>
                        <a href="/content/provision" class="hover:text-[var(--wiki-link-color,#3366cc)] hover:underline">면책조항</a>
                        <span>·</span>
                        <a href="/content/company" class="hover:text-[var(--wiki-link-color,#3366cc)] hover:underline">위키앙 소개</a>
                    </div>
                    <p class="mt-2">
                        Powered by <a href="https://angple.com" class="text-[var(--wiki-link-color,#3366cc)] hover:underline">Angple</a>
                    </p>
                </div>
            </footer>
        </div>
    </div>
{/if}
