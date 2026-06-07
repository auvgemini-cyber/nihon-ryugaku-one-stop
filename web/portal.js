const stages = [
  {
    id: "n4",
    code: "N4",
    name: "N4 基础构建",
    type: "JLPT Foundation",
    badge: "初级完成",
    duration: "建议 6-9 个月",
    target: "能读懂短文、完成基本日常表达，并建立后续中级学习所需的假名、发音、词汇、文法基础。",
    exitGoal: "完成假名自动化识别，掌握基础动词变形、助词和常用表达；能听慢速对话、读教材短文、写 100-200 字日记。",
    metrics: [
      ["核心能力", "假名 / 教材点读 / 基础文法"],
      ["输出要求", "自我介绍、购物、问路"],
      ["检测方式", "短文阅读 + 慢速听力"]
    ],
    weekly: [
      ["每日", "五十音或词汇 20 分钟，基础听力跟读 20 分钟。"],
      ["每周", "完成 2 篇短文阅读，写 1 篇 100-200 字日记。"],
      ["复盘", "整理助词、动词变形和易错发音。"]
    ],
    tasks: [
      {
        kind: "入口",
        title: "五十音闪卡",
        desc: "听读音，选择对应平假名。支持整体训练、按行训练和按段训练。",
        output: "目标：听到读音能选出假名，看到假名能稳定读出。",
        status: "可进入",
        href: "kana.html"
      },
      {
        kind: "教材",
        title: "七年级教材点读",
        desc: "七年级全一册 TTS 点读版，点击教材红框朗读对应句子或词条。",
        output: "目标：建立课文句子跟读和单词反复听读入口。",
        status: "可进入",
        href: "tts_reader.html?book=grade-7-tts"
      },
      {
        kind: "教材",
        title: "八年级教材点读",
        desc: "八年级全一册点读版，点击教材红框播放对应课文音频片段。",
        output: "目标：承接 N4 后半段到 N3 衔接的课文听读。",
        status: "可进入",
        href: "tts_reader.html?book=grade-8"
      },
      {
        kind: "词汇",
        title: "基础词汇背诵",
        desc: "名词、动词、形容词、副词、数字、时间、地点、学校生活与日常场景。",
        output: "目标：形成第一批可听、可读、可写的核心词汇。",
        status: "菜单预留"
      },
      {
        kind: "文法",
        title: "基础文法骨架",
        desc: "助词、です/ます、动词变形、て形、た形、ない形、授受与基础敬语。",
        output: "目标：能拆开教材句子，知道谓语和助词承担的功能。",
        status: "菜单预留"
      },
      {
        kind: "阅读",
        title: "短文阅读",
        desc: "对话、日记、通知、说明短文，训练逐句理解和关键词定位。",
        output: "目标：能读懂 300-600 字以内的基础文章。",
        status: "菜单预留"
      }
    ]
  },
  {
    id: "n3",
    code: "N3",
    name: "N3 中级衔接",
    type: "JLPT Bridge",
    badge: "日常中级",
    duration: "建议 6-8 个月",
    target: "从短句理解推进到复句理解，建立中级阅读、听力和表达能力。",
    exitGoal: "能听接近自然语速的日常材料，进行 3 分钟口头说明，阅读 NHK Easy 或中级教材文章，写 300-500 字要约和意见文。",
    metrics: [
      ["核心能力", "复句 / 授受 / 被动使役"],
      ["输出要求", "3 分钟说明 + 要约"],
      ["检测方式", "中级阅读 + 场景听力"]
    ],
    weekly: [
      ["每日", "词汇 20 分钟，复句朗读与长句拆解 30 分钟。"],
      ["每周", "阅读 2 篇中级文章，写 1 篇要约或意见文。"],
      ["复盘", "整理连接表达、授受关系和句末语气。"]
    ],
    tasks: [
      {
        kind: "词汇",
        title: "中级词汇扩展",
        desc: "学校、社会、生活、情绪、关系、观点表达和常见书面词。",
        output: "目标：从单词记忆转为按主题建立表达网络。",
        status: "菜单预留"
      },
      {
        kind: "文法",
        title: "中级文法体系",
        desc: "复句、授受关系、被动、使役、推量、转折、让步和常用书面表达。",
        output: "目标：能解释句子关系，而不是只背中文释义。",
        status: "菜单预留"
      },
      {
        kind: "句法",
        title: "长句拆解",
        desc: "按谓语、修饰语、连接词和主题结构拆解教材与阅读句子。",
        output: "目标：看到长句能快速找到主干和逻辑关系。",
        status: "菜单预留"
      },
      {
        kind: "阅读",
        title: "中级文章阅读",
        desc: "NHK Easy、教材文章、生活说明文和短评论，训练段落理解。",
        output: "目标：读完能复述核心内容并提取作者观点。",
        status: "菜单预留"
      },
      {
        kind: "听力",
        title: "日常场景听力",
        desc: "学校通知、朋友对话、店铺服务、交通问询和电话信息。",
        output: "目标：能抓住人物、时间、地点、原因和行动。",
        status: "菜单预留"
      },
      {
        kind: "写作",
        title: "作文入门",
        desc: "日记升级为要约、理由说明、简单意见文和经历说明。",
        output: "目标：能写 300-500 字结构清楚的短文。",
        status: "菜单预留"
      }
    ]
  },
  {
    id: "n2",
    code: "N2",
    name: "N2 留学门槛",
    type: "JLPT Advanced Base",
    badge: "留学基础门槛",
    duration: "建议 8-10 个月",
    target: "掌握书面语、抽象表达和新闻评论阅读，开始向 EJU 计时训练过渡。",
    exitGoal: "能听新闻或讲座片段，进行 5 分钟发表，阅读评论和说明文，写 600-800 字小论文，并开始 EJU 阅读/听读解计时。",
    metrics: [
      ["核心能力", "抽象表达 / 逻辑连接"],
      ["输出要求", "5 分钟发表 + 小论文"],
      ["检测方式", "N2 阅读 + EJU 入门计时"]
    ],
    weekly: [
      ["每日", "新闻词汇与抽象表达 30 分钟，阅读 30-60 分钟。"],
      ["每周", "完成 1 次计时阅读，写 1 篇 600 字以上短论述。"],
      ["复盘", "记录逻辑连接、段落结构和误听原因。"]
    ],
    tasks: [
      {
        kind: "词汇",
        title: "高频词汇与汉字",
        desc: "新闻、评论、社会议题、校园材料和说明文常用词汇。",
        output: "目标：词汇不只会认，还能放进段落表达。",
        status: "菜单预留"
      },
      {
        kind: "文法",
        title: "抽象文法与书面语",
        desc: "书面表达、逻辑连接、转折递进、比较让步和因果论证。",
        output: "目标：能判断句子语气、立场和论证功能。",
        status: "菜单预留"
      },
      {
        kind: "阅读",
        title: "新闻/说明文阅读",
        desc: "新闻报道、说明文、评论文和校园公告，训练速度与定位。",
        output: "目标：能在限定时间内完成段落主旨判断。",
        status: "菜单预留"
      },
      {
        kind: "听力",
        title: "讲座与新闻听力",
        desc: "短讲座、新闻片段、访谈和校园广播，训练笔记和信息筛选。",
        output: "目标：能抓住观点、理由、例子和结论。",
        status: "菜单预留"
      },
      {
        kind: "写作",
        title: "600-800 字小论文",
        desc: "从观点句、理由、例子、让步反驳到结论，建立论述模板。",
        output: "目标：形成 EJU 记述前置能力。",
        status: "菜单预留"
      },
      {
        kind: "真题",
        title: "EJU 计时入门",
        desc: "提前引入读解、听读解和记述的时间压力与题型意识。",
        output: "目标：知道 EJU 和 JLPT 的能力差异。",
        status: "菜单预留"
      }
    ]
  },
  {
    id: "n1",
    code: "N1",
    name: "N1 高阶理解",
    type: "JLPT High Level",
    badge: "高阶理解",
    duration: "建议 8-12 个月",
    target: "处理抽象议论、社论、访谈和学科入门文本，强化批判性阅读与论述表达。",
    exitGoal: "能听自然语速新闻、访谈和讲座，参与观点辩论，阅读社论和论文导入，撰写 1000 字以上报告或志望理由书。",
    metrics: [
      ["核心能力", "批判性阅读 / 高阶听力"],
      ["输出要求", "辩论 + 1000 字报告"],
      ["检测方式", "N1 阅读 + 学术表达"]
    ],
    weekly: [
      ["每日", "高阶词汇、社论阅读和自然语速听力交替训练。"],
      ["每周", "完成 1 篇评论复述，1 次口头观点发表。"],
      ["复盘", "记录论点、论据、反驳和表达准确性。"]
    ],
    tasks: [
      {
        kind: "词汇",
        title: "高阶词汇库",
        desc: "抽象概念、政策社会、心理文化、经济教育和学科入门词。",
        output: "目标：能理解并复用高阶议论词汇。",
        status: "菜单预留"
      },
      {
        kind: "句法",
        title: "复杂句法理解",
        desc: "长定语、插入结构、倒装、省略、指代和多层逻辑连接。",
        output: "目标：读懂长句并能压缩成中文/日文概要。",
        status: "菜单预留"
      },
      {
        kind: "阅读",
        title: "评论/社论阅读",
        desc: "社论、评论、专栏和论文导入，训练立场判断与批判阅读。",
        output: "目标：能识别作者观点、证据和弱点。",
        status: "菜单预留"
      },
      {
        kind: "听力",
        title: "长篇听力",
        desc: "新闻访谈、课堂讲座、讨论节目和学术介绍。",
        output: "目标：听完能用结构化笔记复述内容。",
        status: "菜单预留"
      },
      {
        kind: "表达",
        title: "论述表达",
        desc: "结论先行、理由展开、例证支撑、反驳回应和总结提升。",
        output: "目标：面试和发表时表达稳定、有结构。",
        status: "菜单预留"
      },
      {
        kind: "申请",
        title: "志望理由书预备",
        desc: "目标专业、问题意识、学习计划和未来路径的日语表达。",
        output: "目标：为校内考和申请材料提前积累素材。",
        status: "菜单预留"
      }
    ]
  },
  {
    id: "eju",
    code: "EJU",
    name: "EJU 留考专项",
    type: "Exam Track",
    badge: "本科入学核心",
    duration: "建议高二开始",
    target: "围绕 EJU 日语读解、听解、听读解和记述建立计时训练系统，同时规划文理选考科目。",
    exitGoal: "目标建议 EJU 日语 330+、记述 40+；冲刺顶尖校按 350+、记述 45+ 标准准备。",
    metrics: [
      ["核心能力", "读解 / 听读解 / 记述"],
      ["输出要求", "图表分析 + 论证写作"],
      ["检测方式", "全真计时 + 错题复盘"]
    ],
    weekly: [
      ["每日", "EJU 读解或听读解专项 45-60 分钟。"],
      ["每周", "完成 1 套计时训练，写 1 篇记述并精修。"],
      ["复盘", "统计题型耗时、误选原因和记述逻辑问题。"]
    ],
    tasks: [
      {
        kind: "读解",
        title: "日语读解",
        desc: "校园文本、说明文、评论文、图表信息和长篇阅读计时。",
        output: "目标：在时限内稳定完成主旨、细节和推断题。",
        status: "菜单预留"
      },
      {
        kind: "听解",
        title: "听解/听读解",
        desc: "听材料、看图表、抓任务、记录关键信息并快速作答。",
        output: "目标：听时能同步判断题目意图和信息层级。",
        status: "菜单预留"
      },
      {
        kind: "记述",
        title: "EJU 记述",
        desc: "观点选择、理由展开、图表描述、反方处理和结论收束。",
        output: "目标：形成 40+ 分所需的结构与表达稳定性。",
        status: "菜单预留"
      },
      {
        kind: "科目",
        title: "文理选考路线",
        desc: "文科：综合科目 + 数学1；理科：理科两科 + 数学2。",
        output: "目标：依据目标大学募集要项确定科目组合。",
        status: "菜单预留"
      },
      {
        kind: "真题",
        title: "全真计时训练",
        desc: "按真实考试节奏完成阅读、听力、听读和记述。",
        output: "目标：建立分数、耗时、题型和弱点记录。",
        status: "菜单预留"
      },
      {
        kind: "申请",
        title: "志望校要项",
        desc: "整理目标大学 EJU 分数、英语要求、校内考科目和申请材料。",
        output: "目标：把备考计划和申请截止日期绑定。",
        status: "菜单预留"
      }
    ]
  },
  {
    id: "academic",
    code: "学术",
    name: "学术日语",
    type: "Academic Japanese",
    badge: "校内考/大学预备",
    duration: "建议 N3 后持续加入",
    target: "面向小论文、面试、发表、研究计划书和大学课堂报告，训练真实输出能力。",
    exitGoal: "能围绕一个主题阅读 2-3 篇材料，写概要、立论与反驳，并进行 5-8 分钟日语发表和问答。",
    metrics: [
      ["核心能力", "论文阅读 / 发表 / 面试"],
      ["输出要求", "小论文 + 研究计划"],
      ["检测方式", "发表问答 + 材料精修"]
    ],
    weekly: [
      ["每日", "专业词汇和学术表达积累 20-30 分钟。"],
      ["每周", "围绕一个主题完成阅读、概要、小论文和口头发表。"],
      ["复盘", "由老师或同伴纠正逻辑、表达和面试回答。"]
    ],
    tasks: [
      {
        kind: "阅读",
        title: "论文读法",
        desc: "标题、摘要、问题意识、研究方法、结论和参考文献的阅读顺序。",
        output: "目标：能快速判断论文回答了什么问题。",
        status: "菜单预留"
      },
      {
        kind: "写作",
        title: "摘要与概要写作",
        desc: "从原文提取论点、压缩信息、避免照抄，形成日语概要。",
        output: "目标：能写清楚“作者说了什么”和“依据是什么”。",
        status: "菜单预留"
      },
      {
        kind: "发表",
        title: "发表表达",
        desc: "开场、结构提示、图表说明、观点陈述、结论和 Q&A 回答。",
        output: "目标：能进行 5-8 分钟结构化日语发表。",
        status: "菜单预留"
      },
      {
        kind: "申请",
        title: "研究计划书",
        desc: "研究主题、背景、问题意识、方法、意义和未来学习计划。",
        output: "目标：把兴趣表达升级为可申请的研究问题。",
        status: "菜单预留"
      },
      {
        kind: "面试",
        title: "邮件/面试日语",
        desc: "教授邮件、面试自述、追问回答、礼貌表达和确认事项。",
        output: "目标：能应对校内考和教授沟通。",
        status: "菜单预留"
      },
      {
        kind: "词汇",
        title: "专业词汇库",
        desc: "按目标专业建立术语表、例句、常用搭配和中日对照。",
        output: "目标：减少阅读论文和面试表达中的词汇断点。",
        status: "菜单预留"
      }
    ]
  }
]

const elements = {
  quickStages: document.getElementById("quickStages"),
  stageRail: document.getElementById("stageRail"),
  stageKicker: document.getElementById("stageKicker"),
  stageTitle: document.getElementById("stageTitle"),
  stageBadge: document.getElementById("stageBadge"),
  stageIntro: document.getElementById("stageIntro"),
  stageMetrics: document.getElementById("stageMetrics"),
  taskGrid: document.getElementById("taskGrid"),
  exitGoal: document.getElementById("exitGoal"),
  weeklyPlan: document.getElementById("weeklyPlan")
}

const savedStage = window.localStorage.getItem("nihon-ryugaku-stage")
let activeStageId = stages.some((stage) => stage.id === savedStage) ? savedStage : "n4"

function getActiveStage() {
  return stages.find((stage) => stage.id === activeStageId) || stages[0]
}

function setActiveStage(stageId) {
  activeStageId = stageId
  window.localStorage.setItem("nihon-ryugaku-stage", stageId)
  render()
}

function createStageButton(stage, compact) {
  const button = document.createElement("button")
  button.type = "button"
  button.dataset.stage = stage.id
  button.className = compact ? "quick-stage" : "stage-button"
  button.classList.toggle("is-active", stage.id === activeStageId)

  if (compact) {
    button.innerHTML = `<span>${stage.code}</span><strong>${stage.badge}</strong>`
  } else {
    button.innerHTML = `
      <span class="stage-code">${stage.code}</span>
      <span>
        <span class="stage-name">${stage.name}</span>
        <span class="stage-desc">${stage.duration} · ${stage.badge}</span>
      </span>
    `
  }

  button.addEventListener("click", () => {
    setActiveStage(stage.id)
    document.getElementById("stage-workspace").scrollIntoView({ block: "start" })
  })

  return button
}

function renderStageMenus() {
  elements.quickStages.innerHTML = ""
  elements.stageRail.querySelectorAll(".stage-button").forEach((button) => button.remove())

  stages.forEach((stage) => {
    elements.quickStages.appendChild(createStageButton(stage, true))
    elements.stageRail.appendChild(createStageButton(stage, false))
  })
}

function renderMetrics(stage) {
  elements.stageMetrics.innerHTML = ""
  stage.metrics.forEach(([label, value]) => {
    const metric = document.createElement("div")
    metric.className = "metric"
    metric.innerHTML = `
      <span class="metric-label">${label}</span>
      <span class="metric-value">${value}</span>
    `
    elements.stageMetrics.appendChild(metric)
  })
}

function taskActionMarkup(task) {
  if (task.href) {
    return `<a class="task-link" href="${task.href}">进入</a>`
  }

  return `<span class="task-link is-muted">规划中</span>`
}

function renderTasks(stage) {
  elements.taskGrid.innerHTML = ""
  stage.tasks.forEach((task) => {
    const card = document.createElement("article")
    card.className = "task-card"
    card.innerHTML = `
      <div class="task-meta">
        <span>${task.kind}</span>
        <span class="task-status">${task.status}</span>
      </div>
      <h4>${task.title}</h4>
      <p>${task.desc}</p>
      <div class="task-output">${task.output}</div>
      ${taskActionMarkup(task)}
    `
    elements.taskGrid.appendChild(card)
  })
}

function renderWeeklyPlan(stage) {
  elements.weeklyPlan.innerHTML = ""
  stage.weekly.forEach(([label, value]) => {
    const row = document.createElement("div")
    row.className = "mini-row"
    row.innerHTML = `
      <span class="mini-label">${label}</span>
      <span>${value}</span>
    `
    elements.weeklyPlan.appendChild(row)
  })
}

function render() {
  const stage = getActiveStage()
  renderStageMenus()
  elements.stageKicker.textContent = stage.type
  elements.stageTitle.textContent = stage.name
  elements.stageBadge.textContent = stage.badge
  elements.stageIntro.textContent = stage.target
  elements.exitGoal.textContent = stage.exitGoal
  renderMetrics(stage)
  renderTasks(stage)
  renderWeeklyPlan(stage)
}

render()
