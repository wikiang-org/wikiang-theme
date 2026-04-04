<script lang="ts">
    /**
     * Wikiang Background — slot: background
     * 위키피디아 스타일 색상 시스템. 깔끔한 흰 배경 + 파란 링크.
     */
</script>

<svelte:head>
    <style>
        :root {
            --wiki-link-color: #3366cc;
            --wiki-link-visited: #795cb2;
            --wiki-link-broken: #cc3333;
            --wiki-border: #a2a9b1;
            --wiki-bg-content: #ffffff;
            --wiki-bg-sidebar: #f6f6f6;
        }

        /* 위키 스타일 링크 */
        .wiki-link {
            color: var(--wiki-link-color);
            text-decoration: none;
        }
        .wiki-link:hover {
            text-decoration: underline;
        }
        .wiki-link-broken {
            color: var(--wiki-link-broken);
            text-decoration: none;
        }
        .wiki-link-broken:hover {
            text-decoration: underline;
        }

        /* 위키 문서 타이포그래피 */
        .wiki-content h2 {
            border-bottom: 1px solid var(--wiki-border);
            padding-bottom: 0.25em;
            margin-top: 1.5em;
            font-size: 1.5em;
        }
        .wiki-content h3 {
            font-size: 1.2em;
            margin-top: 1.2em;
        }

        /* 다크 모드 */
        .dark {
            --wiki-link-color: #6699ff;
            --wiki-link-visited: #b695c0;
            --wiki-link-broken: #ff6666;
            --wiki-border: #444;
            --wiki-bg-content: #1a1a2e;
            --wiki-bg-sidebar: #16213e;
        }
    </style>
</svelte:head>
