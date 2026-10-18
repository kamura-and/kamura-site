/* 公開する内容だけを記載してください。APIキーや非公開情報は入れないでください。 */
window.KAMURA_CONFIG = {
  links: { tiktok: "https://www.tiktok.com/@kamura_kaguragi", x: "https://x.com/K_M_R_a_0", booth: "https://kag1-by-kamura.booth.pm/", coconala: "https://coconala.com/users/6044787", skima: "https://skima.jp/profile?id=532762" },
  // 未接続時は準備中表示。Google Apps Script等で公開予定のみを返すJSON URLを指定。
  scheduleEndpoint: "https://script.google.com/macros/s/AKfycbwuMEV5jbd0NKv-xSbYGlNr6c3TdQqoXD4yVgxcTaLbeNNo14nJS0ATMvq3V4bw4Bt6/exec",
  // シート接続までの確定済み予定を追加できます。未確定のサンプル予定は公開しません。
  sampleSchedule: [],
  // type: image / video / link。videoはMP4等、linkはYouTube等の外部動画ページ。
  gallery: [
    { type: "image", src: "assets/2610-01.webp", title: "配信サムネ", caption: "キャラクタービジュアル", fit: "contain", background: "#d8edf1" },
    { type: "image", src: "assets/2610-02.webp", title: "基本ロゴ＆立ち絵", caption: "神楽鬼かむら ロゴ", fit: "contain", background: "#69b7cb" },
    { type: "image", src: "assets/2610-03.webp", title: "イラスト", caption: "神楽鬼かむら ロゴ", fit: "contain", background: "#69b7cb" },
    { type: "image", src: "assets/2610-04.webp", title: "イラスト", caption: "神楽鬼かむら ロゴ", fit: "contain", background: "#69b7cb" },
    { type: "link", src: "https://www.tiktok.com/@kamura_kaguragi/video/7695289088701730100?is_from_webapp=1&sender_device=pc&web_id=7634212001321928210", poster: "assets/2610-06.webp", fit: "contain", title: "リメイクT-シャツお洋服紹介動画", caption: "クリックして再生" }
  ],
  goods: [
    { title: "神楽鬼 かむら【誕生記念 2026】 メッセージ付きフルセット", image: "assets/お品書き-01.webp", url: "https://kag1-by-kamura.booth.pm/items/8738196" },
    { title: "神楽鬼 かむら【誕生記念 2026】ステッカー2種セット", image: "assets/お品書き-02.webp", url: "https://kag1-by-kamura.booth.pm/items/8748446" },
    { title: "神楽鬼 かむら【誕生記念 2026】 アクリルスタンド", image: "assets/お品書き-03.webp", url: "https://kag1-by-kamura.booth.pm/items/8748457" },
    { title: "神楽鬼 かむら【誕生記念 2026】 メッセージ付きイラストカード", image: "assets/お品書き-04.webp", url: "https://kag1-by-kamura.booth.pm/items/8748464" },
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" }
  ]
};
