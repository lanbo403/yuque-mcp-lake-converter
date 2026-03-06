import('./dist/utils/converter.js').then(module => {
  const test = `
# 代码测试

行内代码：\`hello\`

代码块：
\`\`\`javascript
function test() {
  console.log("Hello");
}
\`\`\`
`;

  const result = module.markdownToLake(test);
  console.log('=== 转换结果 ===');
  console.log(result);
  console.log('\n=== 分析 ===');
  console.log('包含 codeblock:', result.includes('codeblock'));
  console.log('包含 mode=javascript:', result.includes('mode'));
  console.log('包含 function test:', result.includes('function'));
});
