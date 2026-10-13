import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { WIKI_SKINS } from '../skins/registry.ts';
const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'skin-package.json'), 'utf8'));
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

test('versioned package and skin registry satisfy renderer API 1', () => {
    assert.equal(manifest.rendererApi, 1);
    assert.equal(manifest.version, pkg.version);
    assert.deepEqual(WIKI_SKINS.map(skin => skin.value), manifest.skins);
    assert.equal(new Set(manifest.skins).size, manifest.skins.length);
    for (const skin of WIKI_SKINS) {
        assert.match(skin.value, /^[a-z]+$/);
        assert.ok(skin.label.trim().length > 0);
    }
    assert.ok(existsSync(resolve(root, manifest.registry)));
});

test('all stylesheet imports are packaged, local and do not fetch third-party resources', () => {
    const visit = (file, seen = new Set()) => {
        assert.ok(file.startsWith(resolve(root, 'skins') + '/'));
        if (seen.has(file)) return '';
        seen.add(file);
        const css = readFileSync(file, 'utf8');
        assert.doesNotMatch(css, /url\s*\(|https?:|expression\s*\(/i);
        return css + [...css.matchAll(/@import\s+['"]([^'"]+)['"]/g)]
            .map((match) => visit(resolve(dirname(file), match[1]), seen)).join('');
    };
    const styles = visit(resolve(root, manifest.stylesheet));
    for (const skin of manifest.skins) assert.ok(styles.includes(`[data-wiki-skin='${skin}']`));
    assert.ok(styles.includes("[data-wiki-text='large']"));
});
