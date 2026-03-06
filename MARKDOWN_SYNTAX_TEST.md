# Markdown 完整语法测试文档

本文档包含所有 Markdown 语法，用于学习和验证语雀 Lake 格式。

---

## 1. 标题层级测试

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

---

## 2. 文本格式测试

### 2.1 强调文本

这是 **粗体文本**
这是 __粗体文本__
这是 *斜体文本*
这是 _斜体文本_
这是 ***粗斜体文本***
这是 ___粗斜体文本___

### 2.2 删除线

这是 ~~删除线文本~~

### 2.3 行内代码

这是 `行内代码` 示例

### 2.4 转义字符

这不是 *斜体*，因为使用了转义符：\*不是斜体\*

---

## 3. 列表测试

### 3.1 无序列表

- 项目一
- 项目二
- 项目三

使用加号：

+ 项目 A
+ 项目 B
+ 项目 C

使用减号：

* 项目 X
* 项目 Y
* 项目 Z

### 3.2 有序列表

1. 第一项
2. 第二项
3. 第三项

### 3.3 嵌套列表

- 一级项目
  - 二级项目 A
  - 二级项目 B
    - 三级项目 1
    - 三级项目 2
  - 二级项目 C
- 一级项目

1. 一级有序
   1. 二级有序
      1. 三级有序
   2. 二级有序第二项
2. 一级有序第二项

### 3.4 混合列表

- 无序项目
  1. 嵌套有序
  2. 第二项
- 无序项目二

### 3.5 任务列表（GFM）

- [ ] 未完成任务
- [x] 已完成任务
- [ ] 包含 **粗体** 的任务

---

## 4. 引用测试

### 4.1 简单引用

> 这是一段引用文本
> 可以有多行

### 4.2 嵌套引用

> 第一层引用
>> 第二层引用
>>> 第三层引用

### 4.3 引用中包含其他元素

> **引用中的粗体**
>
> - 引用中的列表
> - 第二项
>
> 引用中的代码：`inline code`

---

## 5. 代码测试

### 5.1 行内代码

段落中的 `code` 代码

### 5.2 代码块（无语言）

```
这是普通代码块
没有指定语言
```

### 5.3 代码块（带语言）

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

const result = hello("World");
```

```python
def hello(name):
    print(f"Hello, {name}!")
    return True

result = hello("Python")
```

```bash
#!/bin/bash
echo "Hello, Bash!"
cd /tmp
ls -la
```

```css
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
}
```

### 5.4 代码块包含特殊字符

```html
<div class="container">
  <p>HTML 代码示例</p>
  <a href="https://example.com">链接</a>
</div>
```

---

## 6. 分割线测试

### 使用三个星号

***

### 使用三个减号

---

### 使用三个下划线

___

---

## 7. 链接测试

### 7.1 普通链接

[语雀官网](https://www.yuque.com)

### 7.2 带标题的链接

[语雀知识库](https://www.yuque.com "语雀")

### 7.3 相对路径链接

[相对链接](./other-file.md)

### 7.4 邮箱链接

[联系我](mailto:example@example.com)

### 7.5 引用式链接

这是 [引用式链接][1]

[1]: https://www.yuque.com

---

## 8. 图片测试

### 8.1 网络图片

![语雀 Logo](https://gw.alipayobjects.com/zos/bmw-prod/b9a1f01a-0d75-44c6-8c8f-9b2a3f12e924.svg)

### 8.2 带标题的图片

![示例图片](https://gw.alipayobjects.com/zos/bmw-prod/b9a1f01a-0d75-44c6-8c8f-9b2a3f12e924.svg "图片标题")

### 8.3 引用式图片

![引用图片][img-ref]

[img-ref]: https://gw.alipayobjects.com/zos/bmw-prod/b9a1f01a-0d75-44c6-8c8f-9b2a3f12e924.svg

---

## 9. 表格测试

### 9.1 基本表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| D   | E   | F   |

### 9.2 对齐方式

| 左对齐 | 居中 | 右对齐 |
|:-------|:----:|-------:|
| Left   | Center | Right |
| A      | B      | C      |

### 9.3 表格中的格式

| 功能 | 语法 | 示例 |
|------|------|------|
| **粗体** | `**text**` | **粗体** |
| *斜体* | `*text*` | *斜体* |
| `代码` | `` `code` `` | `代码` |

### 9.4 复杂表格

| 姓名 | 年龄 | 职位 | 描述 |
|------|------|------|------|
| 张三 | 25 | 工程师 | 负责 **前端开发** |
| 李四 | 30 | 设计师 | 负责 *UI 设计* |
| 王五 | 28 | 产品经理 | 负责 `产品规划` |

---

## 10. HTML 标签测试

### 10.1 行内 HTML

这是 <strong>HTML 粗体</strong>
这是 <em>HTML 斜体</em>
这是 <mark>高亮文本</mark>
这是 <u>下划线</u>

### 10.2 HTML 块级元素

<div style="color: red;">
  这是红色文本
</div>

### 10.3 自定义属性

<span data-custom="value">自定义属性</span>

---

## 11. 特殊符号测试

### 11.1 数学符号

© 2024 | ® 商标 | ™ 商标
± ± | × × | ÷ ÷
² ² | ³ ³ | ¼ ¼

### 11.2 货币符号

¥ 人民币 | $ 美元 | € 欧元 | £ 英镑

### 11.3 箭头

→ ← ↑ ↓
⇒ ⇐ ⇑ ⇓

### 11.4 其他特殊字符

& & | < < | > >
" " | ' ' | … ...

---

## 12. 空格和换行测试

### 12.1 多个空格

单词1    单词2（4个空格）

### 12.2 强制换行

第一行
第二行（一行结束两个空格）

### 12.3 多个空行

上面是段落


下面是段落（中间两个空行）

---

## 13. 脚注测试（如果支持）

这是一个脚注引用[^1]

[^1]: 这是脚注内容

---

## 14. emoji 测试

😀 😃 😄 😁 😆
👍 👎 👏 🙌 💪
🎯 🚀 ⭐ 💡 📝

---

## 15. 复杂组合测试

### 文档标题

> **提示**：这是一个包含多种格式的提示框
>
> 在这个提示框中，我们可以包含：
> - **粗体列表项**
> - *斜体列表项*
> - `代码片段`
>
> 并且可以嵌套引用：
>> 这是嵌套的引用
>> 还可以包含 [链接](https://www.yuque.com)

### 代码和文本混合

这是 `inline code`，下面是代码块：

```javascript
function complex() {
  const arr = [1, 2, 3];
  return arr.map(x => x * 2);
}
```

继续文本...

### 表格和列表组合

特性列表：

- 支持所有 Markdown 语法
- 表格渲染：
  | 列1 | 列2 |
  |-----|-----|
  | A   | B   |
- 代码高亮：
  ```python
  print("Hello")
  ```

---

## 16. 性能测试

### 16.1 大量文本

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 16.2 深层嵌套

1. 层级 1
   - 层级 2
     - 层级 3
       > 层级 4
       >> 层级 5
       >>> 层级 6

---

**文档结束**

最后更新：2024-03-06
文档版本：v1.0
