---
layout: post
title: Jekyll 入门教程：从零开始搭建静态博客
categories: [技术, 博客]
tags: [Jekyll, 静态网站, 教程]
description: 本文详细介绍如何使用 Jekyll 搭建静态博客，包括安装、配置、编写文章和部署等步骤。
---

# Jekyll 入门教程：从零开始搭建静态博客

Jekyll 是一个简单的静态网站生成器，特别适合用来搭建博客。它使用 Markdown 语法编写文章，支持模板、插件等功能，最棒的是可以免费托管在 GitHub Pages 上。

## 为什么选择 Jekyll？

- **简单易用**：无需数据库，纯文本编写
- **性能优秀**：生成静态 HTML，访问速度快
- **安全**：无后端代码，无需担心安全漏洞
- **免费托管**：与 GitHub Pages 完美集成
- **可定制性强**：支持主题、插件等扩展

## 环境准备

### 1. 安装 Ruby

Jekyll 是用 Ruby 开发的，所以需要先安装 Ruby。

**macOS**：
```bash
brew install ruby
```

**Ubuntu/Debian**：
```bash
sudo apt-get install ruby-full build-essential
```

**Windows**：
推荐使用 [RubyInstaller](https://rubyinstaller.org/) 进行安装。

### 2. 安装 Bundler 和 Jekyll

```bash
# 安装 Bundler
gem install bundler

# 安装 Jekyll
gem install jekyll

# 验证安装
jekyll -v
```

## 创建 Jekyll 站点

### 1. 创建新站点

```bash
# 创建一个新的 Jekyll 站点
jekyll new my-blog

# 进入站点目录
cd my-blog
```

### 2. 目录结构说明

```
my-blog/
├── _config.yml          # 站点配置文件
├── _includes/          # 包含的模板片段
├── _layouts/           # 布局文件
├── _posts/             # 博客文章
│   └── 2024-01-15-hello-world.md
├── _site/              # 生成的静态网站（默认不提交到 Git）
├── assets/             # 资源文件（CSS、JS、图片等）
├── index.md            # 首页
└── Gemfile             # Ruby 依赖配置
```

### 3. 配置文件 `_config.yml`

```yaml
# 站点基本信息
name: 我的博客
title: 我的博客
email: your@email.com
description: >-
  这是我的个人博客，记录我的学习和思考。
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com

# 作者信息
author:
  name: Your Name
  email: your@email.com

# 时区设置
timezone: Asia/Shanghai

# 分页设置
paginate: 10
paginate_path: /page/:num

# Markdown 设置
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge

# 插件
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-feed

# 排除文件
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
```

## 编写博客文章

### 1. 创建文章

在 `_posts` 目录下创建 Markdown 文件，文件名格式为：`YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: 我的第一篇文章
date: 2024-01-15 10:00:00 +0800
categories: [技术]
tags: [Jekyll, 博客]
author: Your Name
description: 这是我的第一篇博客文章
---

# 我的第一篇文章

这是文章的正文内容，使用 Markdown 语法编写。

## 二级标题

- 列表项 1
- 列表项 2
- 列表项 3

```python
# 代码块
print("Hello, World!")
```
```

### 2. Front Matter 说明

每篇文章开头的 YAML 格式的元数据称为 Front Matter，用于配置文章的属性：

- `layout`: 使用的布局模板
- `title`: 文章标题
- `date`: 发布日期
- `categories`: 文章分类（数组）
- `tags`: 文章标签（数组）
- `author`: 作者
- `description`: 描述，用于 SEO

## 布局和模板

### 1. 创建布局

在 `_layouts` 目录下创建 HTML 模板文件。

**`default.html`**：
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{ page.title }} - {{ site.title }}</title>
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
</head>
<body>
  <header>
    <h1>{{ site.title }}</h1>
  </header>
  
  <main>
    {{ content }}
  </main>
  
  <footer>
    <p>&copy; {{ site.time | date: '%Y' }}</p>
  </footer>
</body>
</html>
```

**`post.html`**：
```html
---
layout: default
---

<article>
  <h1>{{ page.title }}</h1>
  <time>{{ page.date | date: "%Y-%m-%d" }}</time>
  <div>{{ content }}</div>
</article>
```

### 2. 使用 Liquid 模板语言

Jekyll 使用 Liquid 模板语言来处理动态内容：

```liquid
<!-- 输出变量 -->
{{ page.title }}

<!-- 条件判断 -->
{% if page.categories %}
  <span>分类: {{ page.categories | join: ', ' }}</span>
{% endif %}

<!-- 循环 -->
{% for post in site.posts %}
  <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}

<!-- 过滤器 -->
{{ "hello" | upcase }}  <!-- 输出: HELLO -->
{{ page.date | date: "%Y-%m-%d" }}
```

## 本地预览

```bash
# 启动本地服务器
jekyll serve

# 或者使用 drafts 功能
jekyll serve --drafts

# 指定端口
jekyll serve --port 4000
```

然后在浏览器中访问 `http://localhost:4000` 即可预览网站。

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 上创建一个名为 `username.github.io` 的仓库，其中 `username` 是你的 GitHub 用户名。

### 2. 推送代码

```bash
# 初始化 Git 仓库
git init

# 添加远程仓库
git remote add origin https://github.com/username/username.github.io.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 GitHub
git push -u origin main
```

### 3. 访问博客

几分钟后，你的博客就可以通过 `https://username.github.io` 访问了。

## 使用主题

### 1. 安装主题

```bash
# 方法 1: 使用 Gem 安装
# 在 Gemfile 中添加
gem "jekyll-theme-minima"

# 然后运行
bundle install

# 在 _config.yml 中配置
theme: minima
```

### 2. 自定义主题

你可以修改主题的默认文件，或者创建自己的主题。Jekyll 主题通常包含以下目录：

```
my-theme/
├── _includes/
├── _layouts/
├── _sass/
└── assets/
```

## 进阶功能

### 1. 分页

在 `index.md` 中添加：

```markdown
---
layout: home
---

{% for post in paginator.posts %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}

{% include pagination.html %}
```

### 2. 集成 Disqus 评论

在 `_layouts/post.html` 中添加：

```html
{% if page.comments %}
<div id="disqus_thread"></div>
<script>
  var disqus_config = function () {
    this.page.url = '{{ page.url | absolute_url }}';
    this.page.identifier = '{{ page.id }}';
  };
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://your-disqus-shortname.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
{% endif %}
```

### 3. 添加 Google Analytics

在 `_config.yml` 中添加：

```yaml
google_analytics: UA-XXXXXX-X
```

然后在 `_layouts/default.html` 中添加：

```html
{% if site.google_analytics %}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.google_analytics }}');
</script>
{% endif %}
```

## 常用插件

| 插件 | 功能 |
|------|------|
| `jekyll-paginate` | 分页功能 |
| `jekyll-sitemap` | 生成网站地图 |
| `jekyll-feed` | 生成 RSS feed |
| `jekyll-archives` | 归档功能 |
| `jekyll-seo-tag` | SEO 优化 |
| `jekyll-assets` | 资源管理 |

## 解决常见问题

### 1. 字符编码问题

确保你的文件使用 UTF-8 编码，并且在 HTML 中添加：

```html
<meta charset="utf-8">
```

### 2. 样式不生效

检查 CSS 文件路径是否正确，并且确保文件被正确复制到 `_site` 目录。

### 3. 本地预览正常，但 GitHub Pages 不显示

- 检查 `_config.yml` 中的 `baseurl` 设置
- 确保 `Gemfile` 中包含了所有需要的插件
- 检查 GitHub Pages 的构建日志

### 4. 代码高亮不工作

确保在 `_config.yml` 中配置了语法高亮器：

```yaml
kramdown:
  syntax_highlighter: rouge
```

## 总结

Jekyll 是一个非常优秀的静态网站生成器，特别适合用来搭建博客。它简单易用，性能优秀，而且有丰富的插件生态。通过这篇教程，你应该已经掌握了 Jekyll 的基本使用方法。

接下来，你可以：

1. 进一步定制你的博客主题
2. 添加更多插件功能
3. 编写更多优质的博客文章
4. 优化 SEO，提升博客的访问量

祝你搭建博客愉快！

---

*最后更新：2024-01-16*
