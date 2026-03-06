# Yuque MCP Lake Converter

<div align="center">

**让语雀 MCP 工具支持 Markdown → Lake 自动转换**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Yuque](https://img.shields.io/badge/Yuque-MCP%20Server-blue.svg)](https://github.com/yuque/yuque-mcp-server)

[English](./README.md) | [中文文档](#)

</div>

---

## 📖 项目简介

本项目是对 [yuque-mcp-server](https://github.com/yuque/yuque-mcp-server) 的本地化增强版本，解决了原版 MCP 工具的两个关键问题：

1. ❌ **原版问题**：通过 API 创建的 Markdown 文档缺少 \`data-lake-id\` 等必要属性
2. ✅ **本项目解决**：自动将 Markdown 转换为语雀 Lake 格式，完美保留所有格式

### 核心特性

- ✅ **自动转换**：Markdown → Lake 格式，无需手动操作
- ✅ **完美渲染**：支持表格、列表、任务列表、链接、代码块等所有元素
- ✅ **本地部署**：使用本地构建版本，无需等待 npm 更新
- ✅ **一键回滚**：完善的备份和恢复机制
- ✅ **即插即用**：配置一次，永久生效

---

## 🎯 适用场景

### 适合使用

- ✅ 使用 Claude Code + 语雀进行知识管理
- ✅ 需要通过 API 批量创建语雀文档
- ✅ 希望文档完美保留 Markdown 格式
- ✅ 需要自定义 MCP 工具行为

### 不适合使用

- ❌ 只使用语雀网页端编辑器
- ❌ 不使用 MCP 协议工具
- ❌ 对格式要求不高

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- npm 或 yarn
- 语雀账号和 [Personal Access Token](https://www.yuque.com/settings/tokens)

### 5 分钟部署

\`\`\`bash
# 1. 克隆原仓库
git clone https://github.com/yuque/yuque-mcp-server.git
cd yuque-mcp-server

# 2. 安装依赖
npm install

# 3. 安装额外依赖
npm install marked dompurify jsdom @types/jsdom --save

# 4. 复制转换器文件
# 将本项目 src/utils/converter.ts 复制到对应位置

# 5. 修改 src/tools/doc.ts
# 在 yuque_create_doc handler 中添加转换逻辑

# 6. 构建项目
npm run build

# 7. 配置 Claude Code
# 修改 .mcp.json 指向本地构建版本
\`\`\`

**详细步骤请查看**：[docs/LAKE_CONVERTER_GUIDE.md](./docs/LAKE_CONVERTER_GUIDE.md)

---

## 🔧 核心功能

### 自动转换示例

**输入**：
\`\`\`javascript
{
  format: "markdown",
  body: "# 标题\n\n**粗体**"
}
\`\`\`

**输出**（自动）：
\`\`\`html
{
  format: "lake",
  body: "<h1 data-lake-id=\\\"xxx\\"><span>标题</span></h1>..."
}
\`\`\`

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [docs/LAKE_CONVERTER_GUIDE.md](./docs/LAKE_CONVERTER_GUIDE.md) | 完整功能指南 |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | 实施总结 |
| [VERIFICATION_GUIDE.md](./VERIFICATION_GUIDE.md) | 验证指南 |

---

## 💡 使用技巧

### 日常使用

1. **写作**：使用 Markdown
2. **导入**：使用 Lake 格式
3. **批量**：使用脚本

---

## 📄 许可证

[MIT](./LICENSE)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star！**

Made with ❤️ by [lanbo403](https://github.com/lanbo403)

</div>
