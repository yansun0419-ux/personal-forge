# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## 1. 核心架构与技术栈

- 框架：Next.js (App Router 模式)
- 语言：严格使用 TypeScript
- 样式：Tailwind CSS v4 （注意没有tailwind.config文件，所有配置都在代码里）
- 部署：Vercel (必须保证无服务器环境的兼容性)

## 2. 代码产出纪律 (Code Discipline)

- **拒绝幻觉：** 如果你不确定某个包是否支持当前 Next.js 版本，必须[要求我]先去查阅文档，禁止盲目引入。
- **类型安全：** 禁止使用 `any` 类型。所有组件必须有清晰的 Interface 定义。
- **组件拆分：** 单个文件尽可能不要超过 150 行（非必须）。如果超过，检查是否可以拆分成更小的组件或模块，如果可以，必须拆分。

## 3. 性能与 A11y 约束 (Lighthouse 100 目标：业务需求永远第一。如果一个极其炫酷的 3D 交互让性能掉到了 85 分，但用户体验极佳，那就上 3D！我们追求的是“不犯低级错误的高分”，而不是“阉割功能的满分”。)

- 所有图片使用 Next.js 原生的 `<Image>` 组件，并强制包含 `alt` 属性。
- 所有的按钮 `<button>` 和链接 `<a>` 有清晰的 `aria-label`。
- 所有复杂的交互模块使用 Next.js 的 `next/dynamic` 进行懒加载（Lazy Loading）。

## 4. 自动化闭环与工作流 (Agent Workflow)

- **强制测试先行：** 编写核心逻辑文件前，必须先写好对应的单元测试文件。
- **自我验证：** 编写完代码后，你必须主动在终端运行 `npm run build` 或对应的测试命令。
- **自我修复门控：** 如果终端输出报错（Error），你必须自己读取 Error Log 并进行修复，直到编译通过，才能向我汇报“任务完成”。

## 5. Git 节点控制 (Checkpointing)

- **任务切片：** 每次只能向我交付一个独立的功能节点。
- **强制停止：** 完成该节点并确保测试通过后，必须停止行动，并输出一句：“功能已完成，请 Review 并执行 git commit。确认后请回复‘继续’”。
- **禁止越权：** 未经明确指令，绝对禁止擅自执行 `git add` 或 `git commit`。

---

**最高指令：** 若有任何不清楚的地方，先查询 `rules/` 目录下的文档，若仍有疑问，再向我提问。请严格遵守以上规则，确保项目的高质量和可维护性。
