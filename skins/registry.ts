export const WIKI_SKINS = [
    { value: 'standard', label: '기본형' },
    { value: 'classic', label: '클래식형' },
    { value: 'reading', label: '읽기형' },
    { value: 'encyclopedia', label: '백과사전형' }
] as const;

export type WikiSkin = (typeof WIKI_SKINS)[number]['value'];
