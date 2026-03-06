import { marked } from 'marked';

// 测试 1: 简单列表
const test1 = `
- 项目一
- 项目二
`;

// 测试 2: 混合内容
const test2 = `
**粗体** 和 *斜体*

- 列表项1
- 列表项2

> 引用内容
`;

console.log('=== 测试 1: 简单列表 ===');
const tokens1 = marked.lexer(test1);
console.log(JSON.stringify(tokens1, null, 2));

console.log('\n=== 测试 2: 混合内容 ===');
const tokens2 = marked.lexer(test2);
console.log(JSON.stringify(tokens2, null, 2));
