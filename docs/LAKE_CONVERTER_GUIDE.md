# 🚀 Markdown → Lake 自动转换功能指南

> **项目**：yuque-mcp-server 增强版
> **功能**：Markdown 自动转换为语雀 Lake 格式
> **状态**：✅ 生产环境可用

---

## 📖 功能概述

原版 yuque-mcp-server 通过 API 创建文档时，存在以下问题：

- ❌ Markdown 格式文档缺少 `data-lake-id` 属性
- ❌ 部分元素渲染不完整（列表、引用等）
- ❌ 无法完美保留 Markdown 格式

**本项目通过添加自动转换功能解决以上问题。**

---

## ✨ 核心改进

### 1. 自动转换

无需任何手动操作，创建文档时自动转换：

```javascript
// 输入 Markdown
{
  format: "markdown",
  body: "# 标题\n\n**粗体**"
}

// 自动转换为 Lake（无需手动指定）
{
  format: "lake",
  body: "<h1 data-lake-id=\"xxx\"><span>标题</span></h1>..."
}
```

### 2. 完美渲染

支持的 Markdown 元素：

| 元素 | 支持情况 | 说明 |
|------|---------|------|
| 标题 | ✅ | H1-H6，自动生成 data-lake-id |
| 段落 | ✅ | 所有文本用 `<span>` 包裹 |
| 粗体/斜体 | ✅ | 正确嵌套处理 |
| 列表 | ✅ | 无序、有序、嵌套列表 |
| 任务列表 | ✅ | 自动转换为 checkbox |
| 引用 | ✅ | 支持嵌套引用 |
| 代码块 | ✅ | 使用 codeblock card |
| 行内代码 | ✅ | 正确渲染 |
| 链接 | ✅ | 自动添加 target="_blank" |
| 分割线 | ✅ | 转换为 hr card |
| 表格 | ✅ | 完整支持 |
| 图片 | ✅ | 使用 image card |

### 3. 本地部署

使用本地构建版本，而非 npm 版本：

```json
{
  "command": "node",
  "args": ["D:/yuque/yuque-mcp-server/dist/cli.js"],
  "env": {
    "YUQUE_TOKEN": "${YUQUE_PERSONAL_TOKEN}"
  }
}
```

---

## 🎯 适用场景

### ✅ 适合使用

- 使用 Claude Code + 语雀进行知识管理
- 需要通过 API 批量创建语雀文档
- 希望文档完美保留 Markdown 格式
- 需要自定义 MCP 工具行为

### ❌ 不适合使用

- 只使用语雀网页端编辑器
- 不使用 MCP 协议工具
- 对格式要求不高

---

## 🚀 快速部署

### 前置要求

- Node.js >= 18
- npm 或 yarn
- 语雀账号和 [Personal Access Token](https://www.yuque.com/settings/tokens)

### 部署步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/yuque/yuque-mcp-server.git
cd yuque-mcp-server
```

#### 2. 安装依赖

```bash
npm install
npm install marked dompurify jsdom @types/jsdom --save
```

#### 3. 复制转换器文件

**方式 1：手动复制**

创建 `src/utils/converter.ts`，内容见[完整代码](../src/utils/converter.ts)

**方式 2：使用本项目文件**

```bash
# 如果你有本项目的文件
cp converter.ts yuque-mcp-server/src/utils/converter.ts
```

#### 4. 修改 `src/tools/doc.ts`

在 `yuque_create_doc` handler 中添加转换逻辑：

```typescript
// 添加导入
import { markdownToLake } from '../utils/converter.js';

// 在 handler 中添加转换逻辑
handler: async (client, args) => {
  let body = args.body;
  let format = args.format || 'markdown';

  // 自动转换 Markdown → Lake
  if (format === 'markdown' && body) {
    body = markdownToLake(body);
    format = 'lake';
  }

  const data = {
    title: args.title,
    slug: args.slug,
    body: body,
    format: format,
    public: args.public,
  };

  const doc = await client.createDoc(args.repo_id, data);
  // ... 后续代码
}
```

#### 5. 构建项目

```bash
npm run build
```

#### 6. 配置 Claude Code

**配置文件位置**：
```
C:\Users\{你的用户名}\.claude\plugins\marketplaces\yuque\plugins\yuque-personal\.mcp.json
```

**配置内容**：
```json
{
  "mcpServers": {
    "yuque": {
      "command": "node",
      "args": ["D:/yuque/yuque-mcp-server/dist/cli.js"],
      "env": {
        "YUQUE_TOKEN": "${YUQUE_PERSONAL_TOKEN}"
      }
    }
  }
}
```

#### 7. 重启 Claude Code

**重要**：配置修改后需要完全重启 Claude Code 才能生效。

---

## 🧪 验证功能

### 测试创建文档

```javascript
// 通过 API 创建测试文档
{
  format: "markdown",
  repo_id: "你的知识库ID",
  title: "测试标题",
  body: "# 标题\n\n**粗体** 和 *斜体*\n\n- 列表项1\n- 列表项2"
}
```

### 检查结果

- ✅ 文档创建成功
- ✅ format 为 "lake"
- ✅ body 包含 data-lake-id 属性
- ✅ 语雀中完美渲染

---

## 🔙 回滚机制

### 一键回滚

```bash
C:\Users\{你的用户名}\.claude\plugins\backup\yuque-mcp\rollback.sh
```

### 手动回滚

```bash
# 1. 恢复配置
cp C:\Users\{你的用户名}\.claude\plugins\backup\yuque-mcp\original\.mcp.json.bak \
   C:\Users\{你的用户名}\.claude\plugins\marketplaces\yuque\plugins\yuque-personal\.mcp.json

# 2. 重启 Claude Code
```

---

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| [IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md) | 完整实施总结 |
| [VERIFICATION_GUIDE.md](../VERIFICATION_GUIDE.md) | 转换功能验证指南 |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | 故障排查指南 |

---

## 💡 使用技巧

### 日常使用

```javascript
// 方式 1：使用 Markdown（推荐）
{
  format: "markdown",
  body: "# 标题\n\n内容..."
}
// → 自动转换为 Lake，完美渲染

// 方式 2：直接使用 Lake
{
  format: "lake",
  body: "<!doctype lake>..."
}
// → 完美复刻，无需转换
```

### 批量操作

使用脚本自动化批量创建文档：

```javascript
import fs from 'fs';

const docs = [
  { title: "文档1", content: "# 标题1\n\n内容1" },
  { title: "文档2", content: "# 标题2\n\n内容2" },
];

docs.forEach(doc => {
  createDoc({
    format: "markdown",
    body: doc.content,
    title: doc.title,
    repo_id: "your_repo_id"
  });
});
```

---

## 🐛 常见问题

### Q1: 转换器未生效？

**检查项**：
- [ ] 是否重启了 Claude Code？
- [ ] 配置文件路径是否正确？
- [ ] 构建是否成功？

### Q2: 文档格式不正确？

**检查项**：
- [ ] format 是否为 "lake"？
- [ ] body 是否包含 data-lake-id？
- [ ] 浏览器控制台是否有错误？

### Q3: Token 配置问题？

**正确配置**：
```json
{
  "env": {
    "YUQUE_TOKEN": "${YUQUE_PERSONAL_TOKEN}"
  }
}
```

**错误配置**：
```json
{
  "env": {
    "YUQUE_PERSONAL_TOKEN": "${YUQUE_PERSONAL_TOKEN}"  // ❌ 错误
  }
}
```

---

## 🎉 总结

通过本增强版 yuque-mcp-server，你可以：

- ✅ 自动转换 Markdown 为 Lake 格式
- ✅ 完美保留所有格式和样式
- ✅ 本地部署，无需等待 npm 更新
- ✅ 一键回滚，风险可控

**开始享受完美的语雀集成体验吧！** 🚀
