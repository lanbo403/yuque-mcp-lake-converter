import('./dist/utils/converter.js').then(module => {
  const test = `
# 标题

**粗体** 和 *斜体*

> 引用内容

- 列表项1
- 列表项2

[链接](https://yuque.com)

\`代码\`

---

分割线
`;

  const result = module.markdownToLake(test);
  console.log('=== 转换结果 ===');
  console.log(result);
  console.log('');
  console.log('=== 检查 ===');
  console.log('包含 data-lake-id:', result.includes('data-lake-id'));
  console.log('包含 <strong>:', result.includes('<strong>'));
  console.log('包含 <em>:', result.includes('<em>'));
  console.log('包含 <blockquote>:', result.includes('<blockquote'));
  console.log('包含 <ol> 或 <ul>:', result.includes('<ol>') || result.includes('<ul>'));
  console.log('包含 <li>:', result.includes('<li'));
  console.log('包含 <a>:', result.includes('<a href='));
  console.log('包含 fid=:', result.includes('fid='));
});
