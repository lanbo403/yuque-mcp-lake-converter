import('./dist/utils/converter.js').then(module => {
  const test = `
# 测试标题

**粗体** 和 *斜体* 和 ***粗斜体***

> 引用内容

- 列表项1
- 列表项2
- [ ] 任务1
- [x] 任务2

\`inline code\`

分割线测试

---

[链接](https://www.yuque.com)
`;

  const result = module.markdownToLake(test);
  console.log('=== 转换结果 ===');
  console.log(result);
  console.log('\n=== 分析 ===');
  console.log('包含 <span>:', result.includes('<span'));
  console.log('包含 data-lake-id:', result.includes('data-lake-id'));
  console.log('包含 fid=:', result.includes('fid='));
  console.log('包含 <card>:', result.includes('<card'));
  console.log('包含 checkbox:', result.includes('checkbox'));
  console.log('包含 codeblock:', result.includes('codeblock'));
});
