const TAG_PATTERN = new RegExp(`^${process.env.TAG_PREFIX}-`);

const PLURAL_TAG_MAP = {
  category: 'categories',
  keyword: 'keywords',
};

export function toTag(name) {
  return `${process.env.TAG_PREFIX}-${name}`;
}

export function fromTag(tagName) {
  const a = tagName.replace(TAG_PATTERN, '');
  return PLURAL_TAG_MAP[a] || a;
}
