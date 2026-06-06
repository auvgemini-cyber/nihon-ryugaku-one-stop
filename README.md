# 日本留学一站通

一个面向日本留学路线的纯前端学习工具。当前版本先实现“五十音闪卡”：播放读音，选择对应平假名，支持整体训练、按行训练和按列训练。

## 功能

- 五十音平假名听音选择训练
- 整体训练、按行训练、按列训练
- 四选一答题
- 正确数和答题数统计
- 本地 MP3 读音播放
- 纯 HTML/CSS/JavaScript，无需后端

## 本地预览

```bash
python -m http.server 5173
```

打开 `http://127.0.0.1:5173/`。

## Vercel 部署

- Framework Preset: `Other`
- Build Command: 留空
- Output Directory: 留空
- Install Command: 留空

入口文件是 `index.html`，音频文件位于 `assets/audio/kana/`。
