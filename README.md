# sak1361.github.io

個人開発iOSアプリの配布支援用GitHub Pagesサイト。

## URL

https://sak1361.github.io/

## 構成

| パス | 内容 |
|------|------|
| `/` | アプリ一覧ランディングページ |
| `/privacy-policy/` | プライバシーポリシー一覧 |
| `/privacy-policy/{app-id}/` | アプリ別プライバシーポリシー |
| `/terms/{app-id}/` | アプリ別利用規約 |
| `/app-ads.txt` | AdMob パブリッシャー認証 |

## アプリの追加・管理

`apps.json` でアプリ一覧とリリース状態を一元管理しています。

```json
{
  "id": "my-app",
  "name_ja": "マイアプリ",
  "name_en": "MyApp",
  "released": false,
  "has_privacy_policy": true,
  ...
}
```

- `released: true` — トップページとポリシー一覧に表示
- `released: false` — 一覧には非表示（直リンクはアクセス可能）

## 新しいアプリを追加する

1. `apps.json` にエントリを追加
2. `privacy-policy/{app-id}/index.html` を作成
3. 必要に応じて `terms/{app-id}/index.html` を作成
4. `git push` で反映

## デザイン

- 共通CSS: `assets/css/common.css`
- ダークモード対応
- 日英バイリンガル（ブラウザ言語自動検出）
- モバイルファーストレスポンシブ
