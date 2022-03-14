/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "header-max-length": () => [0, "always", 72]
  },
  prompt: {
    messages: {
      type: "选择你的提交类型   | Select the type of change that you\'re committing:",
      scope: "选择一个模块范围(可选) | Denote the SCOPE of this change (optional)",
      customScope: "自定义修改模块名 | Denote the SCOPE of this change:",
      subject: "简短说明 | Write a SHORT, IMPERATIVE tense description of the change:\n",
      body: '详细说明(可选) 使用"|"可换行 \n  Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: '非兼容性说明(可选) 使用"|"可换行 | List any BREAKING CHANGES (optional):\n',
      footerPrefixsSelect: "选择关联issue前缀 | Select the ISSUES type of changeList by this change (optional):",
      customFooterPrefixs: "输入自定义issue前缀 | Input ISSUES Prefix:",
      footer: "列举关联issue (可选) 例如: #31, #I3244  List any ISSUES CLOSED by this change (optional) :\n",
      confirmCommit: "是否提交或修改commit | Are you sure you want to proceed with the commit above?"
    },
    types: [
      {value: 'feat',     name: 'feat:     ✨ 新增功能 | A new feature', emoji: ":sparkles:"},
      {value: 'fix',      name: 'fix:      🐛 修复缺陷 | A bug fix', emoji: ":bug:"},
      {value: 'docs',     name: 'docs:     📝 文档更新 | Documentation only changes', emoji: ":memo:"},
      {value: 'style',    name: 'style:    💄 代码格式 | Changes that do not affect the meaning of the code', emoji: ":lipstick:" },
      {value: 'refactor', name: 'refactor: ♻️ 代码重构 | A code change that neither fixes a bug nor adds a feature', emoji: ":recycle:"},
      {value: 'perf',     name: 'perf:     ⚡️ 性能提升 | A code change that improves performance', emoji: ":zap:"},
      {value: 'test',     name: 'test:     ✅ 测试相关 | Adding missing tests or correcting existing tests', emoji: ":white_check_mark:"},
      {value: 'build',    name: 'build:    🏗️ 构建相关 | Changes that affect the build system or external dependencies', emoji: ":building_construction:"},
      {value: 'ci',       name: 'ci:       💚 持续集成 | Changes to our CI configuration files and scripts', emoji: ":green_heart:"},
      {value: 'revert',   name: 'revert:   ⏪️ 回退代码 | Revert to a commit', emoji: ":rewind:"},
      {value: 'chore',    name: 'chore:    🔨 其他修改 | Other changes that do not modify src or test files', emoji: ":hammer:"},
    ],
    useEmoji: true,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    allowBreakingChanges: ['feat', 'fix'],
    upperCaseSubject: false,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: "link", name: "link:     将任务状态更改为进行中"},
      { value: "closed", name: "closed:   ISSUES 已经解决" }
    ],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
}