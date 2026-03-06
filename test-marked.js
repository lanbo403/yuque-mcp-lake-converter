import { marked } from 'marked';

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

const tokens = marked.lexer(test);
console.log(JSON.stringify(tokens, null, 2));
