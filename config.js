/* 公開する内容だけを記載してください。APIキーや非公開情報は入れないでください。 */
window.KAMURA_CONFIG = {
  links: { tiktok: "https://www.tiktok.com/@kamura_kaguragi", x: "https://x.com/K_M_R_a_0", booth: "https://kag1-by-kamura.booth.pm/", coconala: "https://coconala.com/users/6044787", skima: "https://skima.jp/profile?id=532762" },
  // 未接続時は準備中表示。Google Apps Script等で公開予定のみを返すJSON URLを指定。
  scheduleEndpoint: "",
  // シート接続までの確定済み予定を追加できます。未確定のサンプル予定は公開しません。
  sampleSchedule: [],
  // type: image / video / link。videoはMP4等、linkはYouTube等の外部動画ページ。
  gallery: [
    { type: "image", src: "assets/character.webp", title: "神楽鬼かむら", caption: "キャラクタービジュアル", fit: "contain", background: "#d8edf1" },
    { type: "image", src: "assets/logo.webp", title: "ネームロゴ", caption: "神楽鬼かむら ロゴ", fit: "contain", background: "#69b7cb" },
    { type: "placeholder", title: "Illustration", caption: "イラスト掲載準備中" },
    { type: "placeholder", title: "Movie", caption: "動画掲載準備中", icon: "▷" }
  ],
  goods: [
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" },
    { title: "Coming soon", image: "", url: "" }
  ]
};
