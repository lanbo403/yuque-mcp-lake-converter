import('./dist/utils/converter.js').then(module => {
  const test = `
**粗体** 和 *斜体*

- 列表项1
- 列表项2

> 引用内容
`;

  const result = module.markdownToLake(test);
  console.log('=== 转换结果 ===');
  console.log(result);
  console.log('\n=== 分析 ===');
  console.log('包含 <strong>:', result.includes('<strong>'));
  console.log('包含 <em>:', result.includes('<em>'));
  console.log('包含 <ul>:', result.includes('<ul'));
  console.log('包含 <li>:', result.includes('<li'));
  console.log('包含 fid=:', result.includes('fid='));
  console.log('包含 <blockquote>:', result.includes('<blockquote'));
});
