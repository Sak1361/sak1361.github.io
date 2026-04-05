# sak1361.github.io — Claude Instructions

## リポジトリ概要

個人開発iOSアプリの配布支援用GitHub Pagesサイト。
URL: `https://sak1361.github.io/`

### 主な役割

- アプリのランディングページ（トップ）
- プライバシーポリシーのホスト（App Store Connect から参照）
- 利用規約のホスト
- AdMob認証（app-ads.txt）
- サポートページ

## ディレクトリ構成

```
/
├── index.html                    # ランディングページ（静的HTML+JS動的上書き）
├── apps.json                     # アプリ一覧・リリース状態の一元管理
├── app-ads.txt                   # AdMob パブリッシャー認証
├── robots.txt                    # クローラー制御
├── sitemap.xml                   # サイトマップ（Google Search Console用）
├── assets/
│   ├── css/
│   │   └── common.css            # 全ページ共通スタイルシート
│   ├── icons/                    # アプリアイコン画像
│   └── js/
│       └── common.js             # 共通JS（言語切替、iconMap、fetchApps）
├── apps/                         # アプリ個別ランディングページ（SEO用）
│   ├── my-3d-eye-training/
│   │   └── index.html            # 自由に立体視トレーニング LP
│   ├── namiyomi/
│   │   └── index.html            # 波読くん LP
│   └── photosorter/
│       └── index.html            # 写真整理くん LP
├── privacy-policy/
│   ├── index.html                # プライバシーポリシー一覧（apps.json から動的生成）
│   ├── my-3d-eye-training/
│   │   ├── index.html            # 自由に立体視トレーニング
│   │   └── support.html          # サポートページ
│   ├── namiyomi/
│   │   └── index.html            # 波読くん
│   └── photosorter/
│       └── index.html            # 写真整理くん
├── terms/
│   ├── my-3d-eye-training/
│   │   └── index.html            # 自由に立体視トレーニング 利用規約
│   ├── namiyomi/
│   │   └── index.html            # 波読くん 利用規約
│   └── photosorter/
│       └── index.html            # 写真整理くん 利用規約
├── support/
│   └── index.html                # 共通サポートページ（FAQ・連絡先）
└── CLAUDE.md
```

## apps.json — アプリ管理

全アプリのメタデータと表示フラグを一元管理するJSONファイル。

### フィールド

| フィールド | 型 | 説明 |
|-----------|------|------|
| `id` | string | URLスラッグ（ディレクトリ名に使用） |
| `name_ja` / `name_en` | string | 日本語/英語アプリ名 |
| `description_ja` / `description_en` | string | 日本語/英語説明 |
| `icon` | string | SF Symbols 名（JSでemoji変換） |
| `color` | string | テーマカラー（hex） |
| `released` | boolean | **リリースフラグ**（`true` でトップ・一覧に表示） |
| `has_privacy_policy` | boolean | プライバシーポリシーページの有無 |
| `has_terms` | boolean | 利用規約ページの有無 |
| `app_store_url` | string | App Store リンク（空文字なら非表示） |

### アプリ追加手順

1. `apps.json` にエントリ追加（`released: false` で開始）
2. `privacy-policy/{id}/index.html` を作成（既存テンプレートをコピー）
3. 必要なら `terms/{id}/index.html` も作成
4. `apps.json` の `has_privacy_policy` / `has_terms` を `true` に
5. App Store リリース後に `released: true`、`app_store_url` を設定

## デザイン規約

### 共通CSS（assets/css/common.css）

- **デザインテーマ**: 2ch/VIP風（レトロ掲示板スタイル）
- **フォント**: `"MS PGothic"`, `"Hiragino Kaku Gothic Pro"`, `"Meiryo"` ベース
- **ダークモード**: なし（常にライト、2ch準拠: 背景 `#efefef`、テキスト `black`、リンク `blue`）
- **レスポンシブ**: モバイル対応あり（600px以下でAA縮小・カード最適化）
- **カラー変数**: CSS Custom Properties で一元管理（2ch read.cgi実ソース準拠）
- **角丸・影**: なし（全て直角、フラット）

### 共通JS（assets/js/common.js）

- `APP_ICON_MAP` — SF Symbols名→emoji変換マップ（一元管理）
- `switchLang()` / `setLang(lang)` / `detectLang()` — 言語切替ロジック
- `fetchApps(basePath)` — apps.json取得ユーティリティ

### 全ページ共通ルール

- `<link rel="stylesheet" href="(相対パス)/assets/css/common.css">` で共通CSS読込
- `<script src="(相対パス)/assets/js/common.js"></script>` で共通JS読込
- **日英バイリンガル**: `data-lang-ja` / `data-lang-en` 属性で切替（クラスではなくdata属性）。ブラウザ言語自動検出。FOUC防止のためCSSで初期非表示。
- **言語切替ボタン**: `.lang-switch` クラスの pill ボタン
- 法的ページは `.legal-page` クラスでラップ
- フッターに `&copy; 2026 sak1361. All rights reserved.`
- グリッドのステータスメッセージ（loading, error, empty）は `.app-grid__status` クラスで `grid-column: 1 / -1`

### プライバシーポリシーテンプレート構造

```html
<div class="legal-page">
  <div class="lang-switch">...</div>
  <a href="../" class="legal-page__back">&larr; <span data-lang-ja>...</span><span data-lang-en>...</span></a>
  <div data-lang-ja>...</div>
  <div data-lang-en>...</div>
</div>
<footer class="site-footer">...</footer>
<script src="(相対パス)/assets/js/common.js"></script>
<script>setLang(detectLang());</script>
```

## 連携先

- **ios_apps リポジトリ**: `/Users/fuchigami/repository/ios_apps/` — アプリソースコード
- **App Store Connect**: プライバシーポリシーURL → `https://sak1361.github.io/privacy-policy/{app-id}/`
- **サポートURL**: `https://sak1361.github.io/` または個別サポートページ
- **AdMob**: `app-ads.txt` でパブリッシャーID認証

## 注意事項

- GitHub Pages は静的サイト。動的フィルタリングは全てクライアントサイドJS
- `apps.json` の `released` フラグが `false` でもプライバシーポリシーの直リンクはアクセス可能（App Store審査で必要なため）
- ページ内容の変更は `git push` で自動反映
