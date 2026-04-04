<script lang="ts">
    import BookOpen from '@lucide/svelte/icons/book-open';
    import Search from '@lucide/svelte/icons/search';
    import Users from '@lucide/svelte/icons/users';
    import FileText from '@lucide/svelte/icons/file-text';
</script>

<section class="py-16 text-center">
    <div class="mx-auto max-w-3xl px-4">
        <!-- 로고 -->
        <div class="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <BookOpen class="text-primary h-10 w-10" />
        </div>

        <h1 class="text-foreground text-3xl font-bold sm:text-4xl">위키앙</h1>
        <p class="text-muted-foreground mt-2 text-lg">모두가 함께 만드는 백과사전</p>

        <!-- 검색 -->
        <div class="mx-auto mt-8 max-w-lg">
            <form action="/wiki" method="get" class="relative">
                <Search class="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
                <input
                    type="text"
                    name="q"
                    placeholder="문서 검색..."
                    class="border-border bg-background w-full rounded-full border py-3 pl-12 pr-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
            </form>
        </div>

        <!-- 통계 -->
        <div class="mt-10 flex justify-center gap-8">
            <div class="text-center">
                <FileText class="text-muted-foreground mx-auto mb-1 h-5 w-5" />
                <p class="text-foreground text-xl font-bold">0</p>
                <p class="text-muted-foreground text-xs">문서</p>
            </div>
            <div class="text-center">
                <Users class="text-muted-foreground mx-auto mb-1 h-5 w-5" />
                <p class="text-foreground text-xl font-bold">0</p>
                <p class="text-muted-foreground text-xs">편집자</p>
            </div>
        </div>
    </div>
</section>
