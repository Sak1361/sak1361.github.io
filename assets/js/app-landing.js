/* ============================================
   app-landing.js — アプリLP共通テンプレート
   各 apps/{id}/index.html から呼び出す
   ============================================ */

/**
 * アプリLPを描画する
 * @param {Object} config - アプリ固有データ
 * @param {string} config.id - apps.json の id
 * @param {string} config.basePath - ルートへの相対パス (例: "../../")
 * @param {Object} config.ja - 日本語コンテンツ
 * @param {Object} config.en - 英語コンテンツ (省略時は日本語のみ)
 *
 * config.ja / config.en の構造:
 * {
 *   threadTitle: "【アプリ名】総合スレ",
 *   sections: [
 *     { title: "セクション名", content: "<ul>...</ul>" },
 *     ...
 *   ]
 * }
 */
function renderAppLanding(config) {
  const container = document.getElementById('app-landing-root');
  if (!container) return;

  const hasEn = !!config.en;

  function buildLang(langData, lang, app) {
    const sep = lang === 'ja' ? '：' : ':';
    const name = lang === 'ja' ? app.name_ja : app.name_en;
    const subtitle = lang === 'ja' ? app.description_ja : app.description_en;
    const backText = lang === 'ja' ? 'トップに戻る' : 'Back to Home';
    const dlText = lang === 'ja'
      ? '&gt;&gt;&gt; App Store でダウンロード &lt;&lt;&lt;'
      : '&gt;&gt;&gt; Download on the App Store &lt;&lt;&lt;';
    const ppText = lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy';
    const termsText = lang === 'ja' ? '利用規約' : 'Terms of Use';
    const supportText = lang === 'ja' ? 'サポート' : 'Support';
    const homeText = lang === 'ja' ? 'トップに戻る' : 'Home';

    const badgeHtml = app.app_store_url
      ? `<a href="${app.app_store_url}" class="app-landing__badge" target="_blank" rel="noopener">${dlText}</a>`
      : '';

    const iconUrl = app.icon_url
      ? `${config.basePath}${app.icon_url}`
      : '';

    const iconHtml = iconUrl
      ? `<div class="app-landing__icon-wrap"><img src="${iconUrl}" alt="${name}" class="app-landing__icon" width="80" height="80"></div>`
      : '';

    const sectionsHtml = langData.sections.map(s =>
      `<section>
        <h2>${s.title}</h2>
        ${s.content}
      </section>`
    ).join('\n');

    const ppLink = app.has_privacy_policy
      ? `<a href="${config.basePath}privacy-policy/${app.id}/">${ppText}</a>` : '';
    const termsLink = app.has_terms
      ? `<a href="${config.basePath}terms/${app.id}/">${termsText}</a>` : '';

    return `
<div ${hasEn ? `data-lang-${lang}` : ''}>

<div style="font-size:12px;color:#666;margin:8px 0;">[<a href="${config.basePath}">${backText}</a>]</div>

<div class="section__title">${langData.threadTitle}</div>

<div class="app-landing__hero">
  ${iconHtml}
  <div class="app-landing__hero-body">
    <div class="app-landing__res-header"><span class="app-landing__res-num">1</span> ${sep}<span class="app-landing__res-name">sak1361</span></div>
    <h1 class="app-landing__title">${name}</h1>
    <p class="app-landing__subtitle">${subtitle}</p>
    ${badgeHtml}
  </div>
</div>

<div class="app-landing__body">
  ${sectionsHtml}

  <div class="app-landing__links">
    ${ppLink}
    ${termsLink}
    <a href="${config.basePath}support/">${supportText}</a>
    <a href="${config.basePath}">${homeText}</a>
  </div>
</div>

</div>`;
  }

  // apps.json からアプリデータを取得して描画
  fetchApps(config.basePath).then(apps => {
    const app = apps.find(a => a.id === config.id);
    if (!app) {
      container.innerHTML = '<p>App not found.</p>';
      return;
    }

    let html = '';

    if (hasEn) {
      // 言語切替ボタン
      html += `<div class="lang-switch" style="margin-top:8px;">
        <button onclick="switchLang()">English / 日本語</button>
      </div>`;
      html += buildLang(config.ja, 'ja', app);
      html += buildLang(config.en, 'en', app);
    } else {
      html += buildLang(config.ja, 'ja', app);
    }

    container.innerHTML = html;

    if (hasEn) {
      setLang(detectLang());
    }
  }).catch(() => {
    container.innerHTML = '<p>Failed to load app data.</p>';
  });
}
