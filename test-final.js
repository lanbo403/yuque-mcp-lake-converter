import('./dist/utils/converter.js').then(module => {
  const simple = `
# 标题

- 列表项1
- 列表项2

**粗体**
`;

  const result = module.markdownToLake(simple);
  console.log('=== 实际发送的 Lake 格式 ===');
  console.log(result);
  console.log('\n=== 验证 ===');
  console.log('包含 <h1>:', result.includes('<h1'));
  console.log('包含 <span>:', result.includes('<span'));
  console.log('包含 <ul>:', result.includes('<ul'));
  console.log('包含 <li>:', result.includes('<li'));
  console.log('包含 <strong>:', result.includes('<strong'));
  console.log('不包含 fid=:', !result.includes('fid='));
});
