// 🌟 学マスデッキシミュレーター

const STORAGE_KEY = 'gakumasu_decks_v2';
let savedDecks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentDeck = [];
let currentEditingDeckId = null;

const cardData = [
    { id: "1000-001", name: "アピールの基本", type: "共通",img:"IMG_8391.png"}, 
    { id: "1000-002", name: "ポーズの基本", type: "共通", img:"IMG_8392.png" },
    { id: "1000-003", name: "表現の基本", type: "共通", img:"IMG_8393.png" },
    { id: "1000-004", name: "眠気", type: "共通", img:"IMG_8394.png" },
    { id: "1001-005", name: "気合十分！", type: "共通", img:"IMG_8395.png" },
    { id: "1001-006", name: "ファーストステップ", type: "共通", img:"IMG_8396.png" },
    { id: "1012-007", name: "前途洋々", type: "共通", img:"IMG_8397.png" },
    { id: "1002-008", name: "アイドル宣言", type: "共通", img:"IMG_8398.png" },
    { id: "1012-009", name: "ハイテンション", type: "共通", img:"IMG_8399.png" },
    { id: "1013-010", name: "テレビ出演", type: "共通", img:"IMG_8400.png" },
    { id: "1013-011", name: "叶えたい夢", type: "共通", img:"IMG_8401.png" },
    { id: "1013-012", name: "アイドル魂", type: "共通", img:"IMG_8402.png" },
    { id: "1003-013", name: "仕切り直し", type: "共通", img:"IMG_8403.png" },
    { id: "2200-001", name: "ステージングの基本", type: "センス", img:"IMG_8424.png" },
    { id: "2200-002", name: "ステップの基本", type: "センス", img:"IMG_8425.png" },
    { id: "2100-003", name: "パフォーマンスの基本", type: "センス", img:"IMG_8426.png" },
    { id: "2100-004", name: "リアクションの基本", type: "センス", img:"IMG_8427.png" }, 
    { id: "2200-005", name: "挑戦", type: "センス", img:"IMG_8428.png" },
    { id: "2000-006", name: "試行錯誤", type: "センス", img:"IMG_8429.png" },
    { id: "2210-007", name: "視線の基本", type: "センス", img:"IMG_8430.png" },
    { id: "2300-008", name: "思考の基本", type: "センス", img:"IMG_8431.png" },
    { id: "2110-009", name: "落ち着きの基本", type: "センス", img:"IMG_8432.png" },
    { id: "2210-010", name: "タイミングの基本", type: "センス", img:"IMG_8433.png" },
    { id: "2210-011", name: "振る舞いの基本", type: "センス", img:"IMG_8434.png" },
    { id: "2110-012", name: "表情の基本 ", type: "センス", img:"IMG_8435.png" },
    { id: "2201-013", name: "軽い足取り", type: "センス", img:"IMG_8436.png" },
    { id: "2001-015", name: "準備運動", type: "センス", img:"IMG_8437.png" },
    { id: "2001-014", name: "愛嬌", type: "センス", img:"IMG_8438.png" },
    { id: "2001-016", name: "ファンサ", type: "センス", img:"IMG_8439.png" },
    { id: "2101-017", name: "勢い任せ", type: "センス", img:"IMG_8440.png" },
    { id: "2001-018", name: "ハイタッチ", type: "センス", img:"IMG_8441.png" },
    { id: "2001-019", name: "トークタイム", type: "センス", img:"IMG_8442.png" },
    { id: "2101-020", name: "軌道修正", type: "センス", img:"IMG_8443.png" },
    { id: "2201-021", name: "パンプアップ", type: "センス", img:"IMG_8444.png" },
    { id: "2201-022", name: "エキサイト", type: "センス", img:"IMG_8445.png" },
    { id: "2301-023", name: "ペース配分", type: "センス", img:"IMG_8446.png" },
    { id: "2101-024", name: "バランス感覚", type: "センス", img:"IMG_8447.png" },
    { id: "2301-025", name: "楽観的", type: "センス", img:"IMG_8448.png" },
    { id: "2301-026", name: "深呼吸", type: "センス", img:"IMG_8449.png" },
    { id: "2301-027", name: "ひと呼吸", type: "センス", img:"IMG_8450.png" },
    { id: "2002-028", name: "決めポーズ", type: "センス", img:"IMG_8451.png" },
    { id: "2202-029", name: "アドリブ", type: "センス", img:"IMG_8452.png" },
    { id: "2102-030", name: "情熱ターン", type: "センス", img:"IMG_8453.png" },
    { id: "2102-031", name: "飛躍", type: "センス", img:"IMG_8454.png" },
    { id: "2202-032", name: "祝福", type: "センス", img:"IMG_8455.png" }, 
    { id: "2002-033", name: "スタートダッシュ", type: "センス", img:"IMG_8456.png"},
    { id: "2112-034", name: "スタンドプレー", type: "センス", img:"IMG_8457.png" },
    { id: "2202-035", name: "シュプレヒコール", type: "センス", img:"IMG_8458.png" },
    { id: "2212-036", name: "立ち位置チェック", type: "センス", img:"IMG_8459.png" },
    { id: "2102-037", name: "破竹の勢い", type: "センス", img:"IMG_8460.png" },
    { id: "2112-038", name: "眼力", type: "センス", img:"IMG_8461.png" },
    { id: "2212-039", name: "大声援", type: "センス", img:"IMG_8462.png" },
    { id: "2112-040", name: "演出計画", type: "センス", img:"IMG_8463.png" },
    { id: "2102-041", name: "願いの力", type: "センス", img:"IMG_8464.png" },
    { id: "2302-042", name: "静かな意志", type: "センス", img:"IMG_8465.png" },
    { id: "2202-043", name: "始まりの合図", type: "センス", img:"IMG_8466.png" },
    { id: "2112-044", name: "意地", type: "センス", img:"IMG_8467.png" },
    { id: "2102-045", name: "存在感", type: "センス", img:"IMG_8468.png" },
    { id: "2112-046", name: "成功への道筋", type: "センス", img:"IMG_8469.png" },
    { id: "2212-047", name: "スポットライト", type: "センス", img:"IMG_8470.png" },
    { id: "2102-048", name: "一発勝負", type: "センス", img:"IMG_8471.png" },
    { id: "2202-049", name: "スリリング", type: "センス", img:"IMG_8472.png" },
    { id: "2302-050", name: "大胆不敵", type: "センス", img:"IMG_8473.png" },
    { id: "2112-051", name: "精神統一", type: "センス", img:"IMG_8474.png" },
    { id: "2003-052", name: "コール＆レスポンス", type: "センス", img:"IMG_8475.png" },
    { id: "2003-053", name: "バズワード", type: "センス", img:"IMG_8476.png" },
    { id: "2203-054", name: "成就", type: "センス", img:"IMG_8477.png" },
    { id: "2203-055", name: "魅惑のパフォーマンス", type: "センス", img:"IMG_8478.png" },
    { id: "2103-056", name: "至高のエンタメ", type: "センス", img:"IMG_8479.png" },
    { id: "2103-057", name: "覚醒", type: "センス", img:"IMG_8480.png" },
    { id: "2103-058", name: "脚光", type: "センス", img:"IMG_8481.png" },
    { id: "2203-059", name: "話題沸騰", type: "センス", img:"IMG_8482.png" },
    { id: "2003-060", name: "国民的アイドル", type: "センス", img:"IMG_8483.png" },
    { id: "2203-061", name: "魅惑の視線", type: "センス", img:"IMG_8484.png" },
    { id: "2303-062", name: "鳴り止まない拍手", type: "センス", img:"IMG_8485.png" },
    { id: "2103-063", name: "天真爛漫", type: "センス", img:"IMG_8486.png" },
    { id: "2303-064", name: "天賦の才", type: "センス", img:"IMG_8487.png" },
    { id: "2104-065", name: "最高傑作", type: "センス", img:"IMG_8488.png" },
    { id: "2004-066", name: "舞台の支配者", type: "センス", img:"IMG_8489.png" },
    { id: "2304-067", name: "天下無双", type: "センス", img:"IMG_8490.png" },
    { id: "2204-068", name: "完全無欠", type: "センス", img:"IMG_8491.png" },
    { id: "2304-069", name: "王者の風格", type: "センス", img:"IMG_8492.png" },
    { id: "3100-001", name: "ファンサの基本", type: "ロジック", img:"IMG_8493.png"},
    { id: "3200-002", name: "アイコンタクトの基本", type: "ロジック", img:"IMG_8494.png"},
    { id: "3210-003", name: "仕草の基本", type: "ロジック", img:"IMG_8495.png" },
    { id: "3100-004", name: "可愛い仕草", type: "ロジック", img:"IMG_8496.png" },
    { id: "3200-005", name: "気分転換", type: "ロジック", img:"IMG_8497.png" },
    { id: "3100-006", name: "笑顔の基本", type: "ロジック", img:"IMG_8498.png" },
    { id: "3100-007", name: "盛り上げの基本", type: "ロジック", img:"IMG_8499.png" },
    { id: "3310-008", name: "セリフの基本", type: "ロジック", img:"IMG_8500.png" },
    { id: "3210-009", name: "距離感の基本", type: "ロジック", img:"IMG_8501.png" },
    { id: "3310-010", name: "セルフケアの基本", type: "ロジック", img:"IMG_8502.png" },
    { id: "3110-011", name: "目線の基本", type: "ロジック", img:"IMG_8503.png" },
    { id: "3210-012", name: "意識の基本", type: "ロジック", img:"IMG_8504.png" },
    { id: "3101-013", name: "今日もおはよう", type: "ロジック", img:"IMG_8505.png" },
    { id: "3201-014", name: "ゆるふわおしゃべり", type: "ロジック", img:"IMG_8506.png" },
    { id: "3201-015", name: "もう少しだけ", type: "ロジック", img:"IMG_8507.png" },
    { id: "3101-016", name: "手拍手", type: "ロジック", img:"IMG_8508.png" },
    { id: "3201-017", name: "元気な挨拶", type: "ロジック", img:"IMG_8509.png" },
    { id: "3101-018", name: "お守りミラクル", type: "ロジック", img:"IMG_8510.png" },
    { id: "3211-019", name: "がむしゃら", type: "ロジック", img:"IMG_8511.png" },
    { id: "3211-020", name: "デイドリーミング", type: "ロジック", img:"IMG_8512.png" },
    { id: "3111-021", name: "リスタート", type: "ロジック", img:"IMG_8513.png" },
    { id: "3211-022", name: "えいえいおー", type: "ロジック", img:"IMG_8514.png" },
    { id: "3011-023", name: "リズミカル", type: "ロジック", img:"IMG_8515.png" },
    { id: "3301-024", name: "思い出し笑い", type: "ロジック", img:"IMG_8516.png" },
    { id: "3111-025", name: "パステル気分", type: "ロジック", img:"IMG_8517.png" },
    { id: "3301-026", name: "励まし", type: "ロジック", img:"IMG_8518.png" },
    { id: "3101-027", name: "幸せのおまじない", type: "ロジック", img:"IMG_8519.png" },
    { id: "3102-028", name: "イメチェン", type: "ロジック", img:"IMG_8520.png" },
    { id: "3102-029", name: "ラブリーウィンク", type: "ロジック", img:"IMG_8521.png" },
    { id: "3212-030", name: "ありがとうの言葉", type: "ロジック", img:"IMG_8522.png" },
    { id: "3202-031", name: "ハートの合図", type: "ロジック", img:"IMG_8523.png" },
    { id: "3112-032", name: "キラメキ", type: "ロジック", img:"IMG_8524.png" },
    { id: "3102-033", name: "みんな大好き", type: "ロジック", img:"IMG_8525.png" },
    { id: "3202-034", name: "きらきら紙吹雪", type: "ロジック", img:"IMG_8526.png" },
    { id: "3212-035", name: "あふれる思いで", type: "ロジック", img:"IMG_8527.png" },
    { id: "3112-036", name: "ふれあい", type: "ロジック", img:"IMG_8528.png" },
    { id: "3102-037", name: "幸せな時間", type: "ロジック", img:"IMG_8529.png" },
    { id: "3102-038", name: "ファンシーチャーム", type: "ロジック", img:"IMG_8530.png" },
    { id: "3202-039", name: "ワクワクが止まらない", type: "ロジック", img:"IMG_8531.png" },
    { id: "3302-040", name: "本番前夜", type: "ロジック", img:"IMG_8532.png" },
    { id: "3212-041", name: "ひなたぼっこ", type: "ロジック", img:"IMG_8533.png" },
    { id: "3212-042", name: "イメトレ", type: "ロジック", img:"IMG_8534.png" },
    { id: "3112-043", name: "やる気は満点", type: "ロジック", img:"IMG_8535.png" },
    { id: "3202-044", name: "ゆめみごこち", type: "ロジック", img:"IMG_8536.png" },
    { id: "3302-045", name: "止められない想い", type: "ロジック", img:"IMG_8537.png" },
    { id: "3102-046", name: "オトメゴコロ", type: "ロジック", img:"IMG_8538.png" },
    { id: "3102-047", name: "冒険心", type: "ロジック", img:"IMG_8539.png" },
    { id: "3212-048", name: "気まぐれハート", type: "ロジック", img:"IMG_8540.png" },
    { id: "3312-049", name: "成長痛", type: "ロジック", img:"IMG_8541.png" },
    { id: "3103-050", name: "２００％スマイル", type: "ロジック", img:"IMG_8542.png" },
    { id: "3203-051", name: "開花", type: "ロジック", img:"IMG_8543.png" },
    { id: "3203-052", name: "届いて！", type: "ロジック", img:"IMG_8544.png" },
    { id: "3103-053", name: "輝くキミへ", type: "ロジック", img:"IMG_8545.png" },
    { id: "3213-054", name: "あのときの約束", type: "ロジック", img:"IMG_8546.png" },
    { id: "3103-055", name: "キセキの魔法", type: "ロジック", img:"IMG_8547.png" },
    { id: "3203-056", name: "せのびの魔法", type: "ロジック", img:"IMG_8548.png" },
    { id: "3103-057", name: "びしっとキメ顔", type: "ロジック", img:"IMG_8981.png" },
    { id: "3003-058", name: "私がスター", type: "ロジック", img:"IMG_8549.png" },
    { id: "3103-059", name: "星屑センセーション", type: "ロジック", img:"IMG_8550.png" },
    { id: "3303-060", name: "ノートの端の決意", type: "ロジック", img:"IMG_8551.png" },
    { id: "3213-061", name: "手書きのメッセージ", type: "ロジック", img:"IMG_8552.png" },
    { id: "3303-062", name: "トキメキ", type: "ロジック", img:"IMG_8553.png" },
    { id: "3103-063", name: "虹色ドリーマー", type: "ロジック", img:"IMG_8554.png" },
    { id: "3313-064", name: "夢色リップ", type: "ロジック", img:"IMG_8555.png" },
    { id: "3104-065", name: "私が最強！", type: "ロジック", img:"IMG_8556.png" },
    { id: "3204-066", name: "輝きの到達点", type: "ロジック", img:"IMG_8557.png" },
    { id: "3004-067", name: "エクセレント♪", type: "ロジック", img:"IMG_8558.png" },
    { id: "3104-068", name: "究極スマイル", type: "ロジック", img:"IMG_8559.png" },
    { id: "3204-069", name: "最強パフォーマー", type: "ロジック", img:"IMG_8560.png" },
    { id: "4200-001", name: "ブランディングの基本", type: "アノマリー", img:"IMG_8569.png" },
    { id: "4200-002", name: "魅せ方の基本", type: "アノマリー", img:"IMG_8570.png" },
    { id: "4100-003", name: "アドリブの基本", type: "アノマリー", img:"IMG_8571.png" },
    { id: "4500-004", name: "スピーチの基本", type: "アノマリー", img:"IMG_8572.png" },
    { id: "4200-005", name: "挨拶の基本", type: "アノマリー", img:"IMG_8573.png" },
    { id: "4200-006", name: "はげしく", type: "アノマリー", img:"IMG_8574.png" },
    { id: "4100-007", name: "スパート", type: "アノマリー", img:"IMG_8575.png" },
    { id: "4310-008", name: "立ち回りの基本", type: "アノマリー", img:"IMG_8576.png" },
    { id: "4600-009", name: "ウォームアップの基本", type: "アノマリー", img:"IMG_8577.png" },
    { id: "4600-010", name: "自己管理の基本", type: "アノマリー", img:"IMG_8578.png" },
    { id: "4110-011", name: "レスポンスの基本", type: "アノマリー", img:"IMG_8579.png" },
    { id: "4110-012", name: "メントレの基本", type: "アノマリー", img:"IMG_8580.png" },
    { id: "4110-013", name: "イメージの基本", type: "アノマリー", img:"IMG_8581.png" },
    { id: "4101-014", name: "ジャストアピール", type: "アノマリー", img:"IMG_8582.png" },
    { id: "4201-015", name: "スターライト", type: "アノマリー", img:"IMG_8583.png" },
    { id: "4001-016", name: "一歩", type: "アノマリー", img:"IMG_8584.png" },
    { id: "4101-017", name: "ラッキー♪", type: "アノマリー", img:"IMG_8585.png" },
    { id: "4101-018", name: "積み重ね", type: "アノマリー", img:"IMG_8586.png" },
    { id: "4201-019", name: "精一杯", type: "アノマリー", img:"IMG_8587.png" }, 
    { id: "4201-020", name: "形勢逆転", type: "アノマリー", img:"IMG_8588.png" },
    { id: "4101-021", name: "ノンストップ", type: "アノマリー", img:"IMG_8589.png" },
    { id: "4501-022", name: "ハッスル", type: "アノマリー", img:"IMG_8590.png" },
    { id: "4311-023", name: "ハッピー♪", type: "アノマリー", img:"IMG_8591.png" },
    { id: "4611-024", name: "嬉しい誤算", type: "アノマリー", img:"IMG_8592.png" },
    { id: "4611-025", name: "涙の思い出", type: "アノマリー", img:"IMG_8593.png" },
    { id: "4101-026", name: "セッティング", type: "アノマリー", img:"IMG_8594.png" },
    { id: "4301-027", name: "巻き返し", type: "アノマリー", img:"IMG_8595.png" },
    { id: "4202-028", name: "せーのっ！", type: "アノマリー", img:"IMG_8596.png" },
    { id: "4102-029", name: "アッチェレランド", type: "アノマリー", img:"IMG_8597.png" },
    { id: "4002-030", name: "はじけるパッション", type: "アノマリー", img:"IMG_8598.png" },
    { id: "4002-031", name: "汗と成長", type: "アノマリー", img:"IMG_8599.png" },
    { id: "4202-032", name: "第一印象", type: "アノマリー", img:"IMG_8600.png" },
    { id: "4502-033", name: "オープニングアウト", type: "アノマリー", img:"IMG_8601.png" },
    { id: "4202-034", name: "始まりの笑顔", type: "アノマリー", img:"IMG_8602.png" },
    { id: "4102-035", name: "トレンドリーダー", type: "アノマリー", img:"IMG_8603.png" },
    { id: "4002-036", name: "理想のテンポ", type: "アノマリー", img:"IMG_8604.png" },
    { id: "4102-037", name: "トレーニングの成果", type: "アノマリー", img:"IMG_8605.png" },
    { id: "4802-038", name: "オーバードライブ", type: "アノマリー", img:"IMG_8606.png" },
    { id: "4202-039", name: "アンダンテ", type: "アノマリー", img:"IMG_8607.png" },
    { id: "4112-040", name: "潜在能力", type: "アノマリー", img:"IMG_8608.png" },
    { id: "4312-041", name: "カウントダウン", type: "アノマリー", img:"IMG_8609.png" },
    { id: "4102-042", name: "モチベ", type: "アノマリー", img:"IMG_8610.png" },
    { id: "4312-043", name: "プライド", type: "アノマリー", img:"IMG_8611.png" },
    { id: "4002-044", name: "盛り上げ上手", type: "アノマリー", img:"IMG_8612.png" },
    { id: "4002-045", name: "インフルエンサー", type: "アノマリー", img:"IMG_8613.png" },
    { id: "4302-046", name: "忍耐力", type: "アノマリー", img:"IMG_8614.png" },
    { id: "4302-047", name: "切磋琢磨", type: "アノマリー", img:"IMG_8615.png" },
    { id: "4802-048", name: "フルスロットル", type: "アノマリー", img:"IMG_8616.png" },
    { id: "4102-049", name: "リスキーチャンス", type: "アノマリー", img:"IMG_8617.png" },
    { id: "4302-050", name: "タフネス", type: "アノマリー", img:"IMG_8618.png" },
    { id: "4302-051", name: "達成感", type: "アノマリー", img:"IMG_8619.png" },
    { id: "4103-052", name: "翔び立て！", type: "アノマリー", img:"IMG_8620.png" },
    { id: "4203-053", name: "総合芸術", type: "アノマリー", img:"IMG_8621.png" },
    { id: "4503-054", name: "心・技・体", type: "アノマリー", img:"IMG_8622.png" },
    { id: "4603-055", name: "輝け！", type: "アノマリー", img:"IMG_8623.png" },
    { id: "4903-056", name: "クライマックス", type: "アノマリー", img:"IMG_8624.png" },
    { id: "4203-057", name: "全身全霊", type: "アノマリー", img:"IMG_8625.png" },
    { id: "4203-058", name: "エンターテイナー", type: "アノマリー", img:"IMG_8626.png" },
    { id: "4103-059", name: "羽ばたけ！", type: "アノマリー", img:"IMG_8627.png" },
    { id: "4003-060", name: "アイドルになります", type: "アノマリー", img:"IMG_8628.png" },
    { id: "4903-061", name: "一心不乱", type: "アノマリー", img:"IMG_8629.png" },
    { id: "4003-062", name: "頂点へ", type: "アノマリー", img:"IMG_8992.png" },
    { id: "4113-063", name: "覚悟", type: "アノマリー", img:"IMG_8993.png" },
    { id: "4103-064", name: "本領発揮", type: "アノマリー", img:"IMG_8632.png" },
    { id: "4204-065", name: "スーパーノヴァ", type: "アノマリー", img:"IMG_8633.png" },
    { id: "4104-066", name: "グランドフィナーレ", type: "アノマリー", img:"IMG_8634.png" },
    { id: "4604-067", name: "エキスパート", type: "アノマリー", img:"IMG_8635.png" },
    { id: "4804-068", name: "レジェンドスター", type: "アノマリー", img:"IMG_8636.png" },
    { id: "4904-069", name: "トップクオリティ", type: "アノマリー", img:"IMG_8637.png" },
    { id: "5201-001", name: "新進気鋭", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se001.png" },
    { id: "5202-002", name: "一番は譲らない", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se002.png" },
    { id: "5203-003", name: "絶対負けない", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se003.png" },
    { id: "5203-004", name: "ちょちょいのちょい", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se004.png" },
    { id: "5203-005", name: "これまでもこれからも", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se005.png" },
    { id: "5203-006", name: "伝説への挑戦", idol: ["咲季","花海咲季"], type: "センス", img:"咲季_se006.png" },
    { id: "5101-006", name: "意地っ張り", idol: ["手毬","月村手毬"], type: "センス", img:"手毬_se001.png" },
    { id: "5102-007", name: "ローン・ウルフ", idol: ["手毬","月村手毬"], type: "センス", img:"手毬_se002.png" },
    { id: "5103-008", name: "それぞれの道", idol: ["手毬","月村手毬"], type: "センス", img:"手毬_se003.png" },
    { id: "5103-009", name: "嫌いな自分にバイバイ", idol: ["手毬","月村手毬"], type: "センス", img:"手毬_se004.png" },
    { id: "5203-010", name: "希望が届くまで", idol: ["手毬","月村手毬"], type: "センス", img:"手毬_se005.png" },
    { id: "5201-011", name: "初めてのご褒美", idol: ["ことね","藤田ことね"], type: "センス", img:"ことね_se001.png" },
    { id: "5203-012", name: "アドレナリン全開", idol: ["ことね","藤田ことね"], type: "センス", img:"ことね_se002.png" },
    { id: "5103-013", name: "自己肯定感爆上げ↑↑", idol: ["ことね","藤田ことね"], type: "センス", img:"ことね_se003.png" },
    { id: "5203-014", name: "かましちゃえ♪", idol: ["ことね","藤田ことね"], type: "センス", img:"ことね_se004.png" },
    { id: "5203-015", name: "ダークヒーローの誕生", idol: ["燕","雨夜燕"], type: "センス", img:"燕_se001.png" },
    { id: "5201-016", name: "リトル・プリンス", idol: ["麻","有村麻央"], type: "センス", img:"麻央_se001.png" },
    { id: "5102-017", name: "らしさ", idol: ["麻央","有村麻央"], type: "センス", img:"麻央_se002.png" },
    { id: "5203-018", name: "盛装の華形", idol: ["麻央","有村麻央"], type: "センス", img:"麻央_se003.png" },
    { id: "5103-019", name: "ひんやり一休み", idol: ["麻央","有村麻央"], type: "センス", img:"麻央_se004.png" },
    { id: "5103-020", name: "見つけた世界で", idol: ["麻央","有村麻央"], type: "センス", img:"麻央_se005.png" },
    { id: "5203-021", name: "奪われる心", idol: ["麻央","有村麻央"], type: "センス", img:"麻央_se006.png" },
    { id: "5201-021", name: "初めての地平", idol: ["リーリヤ","葛城リーリヤ"], type: "センス", img:"リーリヤ_se001.png" },
    { id: "5203-022", name: "はじめてのラムネ", idol: ["リーリヤ","葛城リーリヤ"], type: "センス", img:"リーリヤ_se002.png" },
    { id: "5103-023", name: "いつか見た景色", idol: ["リーリヤ","葛城リーリヤ"], type: "センス", img:"リーリヤ_se003.png" },
    { id: "5203-024", name: "いつかあなたの隣で", idol: ["リーリヤ","葛城リーリヤ"], type: "センス", img:"リーリヤ_se004.png" },
    { id: "5211-025", name: "初めての色", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se001.png" },
    { id: "5213-026", name: "お茶会へようこそ♪", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se002.png" },
    { id: "5103-027", name: "こくりひとくち", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se003.png" },
    { id: "5103-028", name: "悪戯しちゃいますわ！", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se004.png" },
    { id: "5203-029", name: "世界一の勇気", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se005.png" },
    { id: "5103-030", name: "どきどきはそのまま", idol: ["千奈","倉本千奈"], type: "センス", img:"千奈_se006.png" },
    { id: "5101-031", name: "フレンドリー", idol: ["清夏","紫雲清夏"], type: "センス", img:"清夏_se001.png" },
    { id: "5102-032", name: "勇気の一歩", idol: ["清夏","紫雲清夏"], type: "センス", img:"清夏_se002.png" },
    { id: "5103-033", name: "ワンモアステップ", idol: ["清夏","紫雲清夏"], type: "センス", img:"清夏_se003.png" },
    { id: "5203-034", name: "ヒーローとの出会い", idol: ["清夏","紫雲清夏"], type: "センス", img:"清夏_se004.png" },
    { id: "5103-035", name: "もうためらわない", idol: ["清夏","紫雲清夏"], type: "センス", img:"清夏_se005.png" },
    { id: "5111-036", name: "初めての楽しみ", idol: ["広","篠澤広"], type: "センス", img:"広_se001.png"},
    { id: "5113-037", name: "バスに揺られて", idol: ["広","篠澤広"], type: "センス", img:"広_se002.png" },
    { id: "5203-038", name: "正確無比な看板づくり", idol: ["広","篠澤広"], type: "センス", img:"広_se003.png" },
    { id: "5103-039", name: "わたしだけの思い出", idol: ["広","篠澤広"], type: "センス", img:"広_se004.png" },
    { id: "5103-040", name: "あなたがくれた夢", idol: ["広","篠澤広"], type: "センス", img:"広_se005.png" },
    { id: "5203-041", name: "夢はまだ続く", idol: ["星南","十王星南"], type: "センス", img:"星南_se001.png" },
    { id: "5103-042", name: "朝が満たすまで", idol: ["美鈴","秦谷美鈴"], type: "センス", img:"美鈴_se001.png" },
    { id: "5101-043", name: "初めての降臨", idol: ["佑芽","花海佑芽"], type: "センス", img:"佑芽_se001.png" },
    { id: "5203-044", name: "おすそわけですっ！", idol: ["佑芽","花海佑芽"], type: "センス", img:"佑芽_se002.png" },
    { id: "5103-045", name: "狂い咲け！", idol: ["佑芽","花海佑芽"], type: "センス", img:"佑芽_se003.png" },
    { id: "5111-046", name: "包容力", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se001.png" },
    { id: "5112-047", name: "寄り添う気持ち", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se002.png" },
    { id: "5103-048", name: "距離感", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se003.png" },
    { id: "5203-049", name: "入道雲と、きみ", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se004.png" },
    { id: "5103-050", name: "どんな世界でも", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se005.png" },
    { id: "5203-051", name: "お姉さんの感覚", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se006.png" },
    { id: "5203-052", name: "自然体の魅力", idol: ["莉波","姫崎莉波"], type: "センス", img:"莉波_se007.png" },
    { id: "5101-053", name: "初めての未来", idol: ["咲季","花海咲季"], type: "ロジック", img:"咲季_lo001.png" },
    { id: "5103-054", name: "POW！", idol: ["咲季","花海咲季"], type: "ロジック", img:"咲季_lo002.png" },
    { id: "5103-055", name: "金魚すくいで勝負", idol: ["咲季","花海咲季"], type: "ロジック", img:"咲季_lo003.png" },
    { id: "5203-056", name: "私らしい色", idol: ["咲季","花海咲季"], type: "ロジック", img:"咲季_lo004.png" },
    { id: "5103-057", name: "鮮やかに咲く花", idol: ["咲季","花海咲季"], type: "ロジック", img:"咲季_lo005.png" },
    { id: "5101-058", name: "初めての場所", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo001.png" },
    { id: "5103-059", name: "絡まる想い", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo002.png" },
    { id: "5103-060", name: "悪戦苦闘ハンドメイド", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo003.png" },
    { id: "5103-061", name: "空まで一直線", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo004.png" },
    { id: "5203-062", name: "クールすぎるアイドル", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo005.png" },
    { id: "5203-063", name: "燃え盛る青い炎", idol: ["手毬","月村手毬"], type: "ロジック", img:"手毬_lo006.png" },
    { id: "5101-064", name: "アルバイター", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo001.png" },
    { id: "5102-065", name: "Colorful Cute!", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo002.png" },
    { id: "5103-066", name: "よそ見はダメ♪", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo003.png" },
    { id: "5203-067", name: "夏の宵の線香花火", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo004.png" },
    { id: "5103-068", name: "メリクリで～す♪", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo005.png" },
    { id: "5103-069", name: "自慢のお姉ちゃんだぞ", idol: ["ことね","藤田ことね"], type: "ロジック", img:"ことね_lo006.png" },
    { id: "5102-070", name: "紫電一閃", idol: ["燕","雨夜燕"], type: "ロジック", img:"燕_lo001.png" },
    { id: "5303-071", name: "私は、決して", idol: ["燕","雨夜燕"], type: "ロジック", img:"燕_lo002.png" },
    { id: "5301-072", name: "初めての結晶", idol: ["麻央","有村麻央"], type: "ロジック", img:"麻央_lo001.png" },
    { id: "5303-073", name: "月夜のランウェイ", idol: ["麻央","有村麻央"], type: "ロジック", img:"麻央_lo002.png" },
    { id: "5213-074", name: "ドラマチックホリデー", idol: ["麻央","有村麻央"], type: "ロジック", img:"麻央_lo003.png" },
    { id: "5101-075", name: "内気系少女", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img: "リーリヤ_lo001.png" },
    { id: "5102-076", name: "純白の妖精", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo002.png" },
    { id: "5103-077", name: "もう怖くないから", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo003.png" },
    { id: "5213-078", name: "愛を込めて", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo004.png" },
    { id: "5113-079", name: "戦う理由", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo005.png" },
    { id: "5203-080", name: "わたしを支える言葉", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo006.png" },
    { id: "5203-081", name: "理想に手が届く日まで", idol: ["リーリヤ","葛城リーリヤ"], type: "ロジック", img:"リーリヤ_lo007.png" },
    { id: "5211-082", name: "元気いっぱい", idol: ["千奈","倉本千奈"], type: "ロジック", img:"千奈_lo001.png" },
    { id: "5212-083", name: "いっしょけんめい", idol: ["千奈","倉本千奈"], type: "ロジック", img:"千奈_lo002.png" },
    { id: "5213-084", name: "お嬢様の晴れ舞台", idol: ["千奈","倉本千奈"], type: "ロジック", img:"千奈_lo003.png" },
    { id: "5213-085", name: "広がり続ける世界", idol: ["千奈","倉本千奈"], type: "ロジック", img:"千奈_lo004.png" },
    { id: "5103-086", name: "ちいさなおひさま", idol: ["千奈","倉本千奈"], type: "ロジック", img:"千奈_lo005.png" },
    { id: "5201-087", name: "初めての想い", idol: ["清夏","紫雲清夏"], type: "ロジック", img:"清夏_lo001.png" },
    { id: "5203-088", name: "昼下がりのそよ風", idol: ["清夏","紫雲清夏"], type: "ロジック", img:"清夏_lo002.png" },
    { id: "5113-089", name: "また、飛べる", idol: ["清夏","紫雲清夏"], type: "ロジック", img:"清夏_lo003.png" },
    { id: "5113-090", name: "爆盛れ最強ルック♪", idol: ["清夏","紫雲清夏"], type: "ロジック", img:"清夏_lo004.png" },
    { id: "5211-091", name: "超高学歴アイドル", idol: ["広","篠澤広"], type: "ロジック", img:"広_lo001.png" },
    { id: "5212-092", name: "苦しいのが好き", idol: ["広","篠澤広"], type: "ロジック", img:"広_lo002.png" },
    { id: "5213-093", name: "本気の趣味", idol: ["広","篠澤広"], type: "ロジック", img:"広_lo003.png" },
    { id: "5213-094", name: "エウレカ！", idol: ["広","篠澤広"], type: "ロジック", img:"広_lo004.png" },
    { id: "5103-095", name: "心が跳ねるままに", idol: ["広","篠澤広"], type: "ロジック", img:"広_lo005.png" },
    { id: "5211-096", name: "初めての野望", idol: ["星南","十王星南"], type: "ロジック", img:"星南_lo001.png" },
    { id: "5213-097", name: "あなたにあげる", idol: ["星南","十王星南"], type: "ロジック", img:"星南_lo002.png" },
    { id: "5103-098", name: "湧き上がる気持ち", idol: ["星南","十王星南"], type: "ロジック", img:"星南_lo003.png" },
    { id: "5213-099", name: "私を超えて", idol: ["星南","十王星南"], type: "ロジック", img:"星南_lo004.png" },
    { id: "5211-100", name: "初めての息", idol: ["美鈴","秦谷美鈴"], type: "ロジック", img:"美鈴_lo001.png" },
    { id: "5213-101", name: "憧れのアイドル", idol: ["美鈴","秦谷美鈴"], type: "ロジック", img:"美鈴_lo002.png" },
    { id: "5103-102", name: "夢と現の境界線", idol: ["美鈴","秦谷美鈴"], type: "ロジック", img:"美鈴_lo003.png" },
    { id: "5103-103", name: "虜になあれ", idol: ["美鈴","秦谷美鈴"], type: "ロジック", img:"美鈴_lo004.png" },
    { id: "5211-104", name: "未完の大器", idol: ["佑芽","花海佑芽"], type: "ロジック", img:"佑芽_lo001.png" },
    { id: "5212-105", name: "打倒お姉ちゃん", idol: ["佑芽","花海佑芽"], type: "ロジック", img:"佑芽_lo002.png" },
    { id: "5213-106", name: "おっきなおにぎり", idol: ["佑芽","花海佑芽"], type: "ロジック", img:"佑芽_lo003.png" },
    { id: "5113-107", name: "つかみ取った未来", idol: ["佑芽","花海佑芽"], type: "ロジック", img:"佑芽_lo004.png" },
    { id: "5213-108", name: "あたしがいるよ", idol: ["佑芽","花海佑芽"], type: "ロジック", img:"佑芽_lo005.png" },
    { id: "5211-109", name: "初めてのお相手", idol: ["莉波","姫崎莉波"], type: "ロジック", img:"莉波_lo001.png" },
    { id: "5213-110", name: "さっぱりひといき", idol: ["莉波","姫崎莉波"], type: "ロジック", img:"莉波_lo002.png" },
    { id: "5113-111", name: "また、明日", idol: ["莉波","姫崎莉波"], type: "ロジック", img:"莉波_lo003.png" },
    { id: "5113-112", name: "微熱ノスタルジー", idol: ["莉波","姫崎莉波"], type: "ロジック", img:"莉波_lo004.png" },
    { id: "5103-113", name: "あの日、この場所で", idol: ["咲季","花海咲季"], type: "アノマリー", img:"咲季_an001.png" },
    { id: "5213-114", name: "泥臭くあれ！", idol: ["咲季","花海咲季"], type: "アノマリー", img:"咲季_an002.png" },
    { id: "5203-115", name: "おてつき注意！", idol: ["手毬","月村手毬"], type: "アノマリー", img:"手毬_an001.png" },
    { id: "5103-116", name: "置き去りな自分", idol: ["手毬","月村手毬"], type: "アノマリー", img:"手毬_an002.png" },
    { id: "5203-117", name: "あたらしい光", idol: ["ことね","藤田ことね"], type: "アノマリー", img:"ことね_an001.png" },
    { id: "5103-118", name: "弱気じゃいられない！", idol: ["ことね","藤田ことね"], type: "アノマリー", img:"ことね_an002.png" },
    { id: "5201-118", name: "プライドの塊", idol: ["燕","雨夜燕"], type: "アノマリー", img:"燕_an001.png" },
    { id: "5103-119", name: "頬張る3色", idol: ["麻央","有村麻央"], type: "アノマリー", img:"麻央_an001.png" },
    { id: "5203-120", name: "手にした答え", idol: ["麻央","有村麻央"], type: "アノマリー", img:"麻央_an002.png" },
    { id: "5103-121", name: "放課後おしゃべり", idol: ["リーリヤ","葛城リーリヤ"], type: "アノマリー", img:"リーリヤ_an001.png" },
    { id: "5103-122", name: "きらきらプリズム", idol: ["リーリヤ","葛城リーリヤ"], type: "アノマリー", img:"リーリヤ_an002.png" },
    { id: "5103-123", name: "あふれ出る想い", idol: ["リーリヤ","葛城リーリヤ"], type: "アノマリー", img:"リーリヤ_an003.png" },
    { id: "5203-124", name: "次こそは、必ず", idol: ["千奈","倉本千奈"], type: "アノマリー", img:"千奈_an001.png" },
    { id: "5103-125", name: "踏切の先に", idol: ["清夏","紫雲清夏"], type: "アノマリー", img:"清夏_an001.png" },
    { id: "5203-126", name: "いつもあなたの隣で", idol: ["清夏","紫雲清夏"], type: "アノマリー", img:"清夏_an002.png" },
    { id: "5103-127", name: "がんばった、よ", idol: ["広","篠澤広"], type: "アノマリー", img:"広_an001.png" },
    { id: "5113-128", name: "でこれーとまじっく", idol: ["広","篠澤広"], type: "アノマリー", img:"広_an002.png" },
    { id: "5213-129", name: "日が差す方へ", idol: ["広","篠澤広"], type: "アノマリー", img:"広_an003.png" },
    { id: "5201-130", name: "学園一のアイドル", idol: ["星南","十王星南"],type: "アノマリー", img:"星南_an001.png" },
    { id: "5102-131", name: "王者の御出まし", idol: ["星南","十王星南"], type: "アノマリー", img:"星南_an002.png" },
    { id: "5203-132", name: "一番高い星", idol: ["星南","十王星南"], type: "アノマリー", img:"星南_an003.png" },
    { id: "5103-133", name: "待ち望んだ瞬間", idol: ["星南","十王星南"], type: "アノマリー", img:"星南_an004.png" },
    { id: "5203-134", name: "踊り狂え！", idol: ["星南","十王星南"], type: "アノマリー", img:"星南_an005.png" },
    { id: "5301-135", name: "のんびり屋さん", idol: ["美鈴","秦谷美鈴"], type: "アノマリー", img:"美鈴_an001.png" },
    { id: "5302-136", name: "休み休み、前へ", idol: ["美鈴","北条美鈴"], type: "アノマリー", img:"美鈴_an002.png" },
    { id: "5303-137", name: "屋上からの景色", idol: ["美鈴","北条美鈴"], type: "アノマリー", img:"美鈴_an003.png" },
    { id: "5203-138", name: "教えてあげる", idol: ["美鈴","秦谷美鈴"], type: "アノマリー", img:"美鈴_an004.png" },
    { id: "5103-139", name: "新たなステージ", idol: ["佑芽","花海佑芽"], type: "アノマリー", img:"佑芽_an001.png" },
    { id: "5203-140", name: "グーチョキパーデポン", idol: ["佑芽","花海佑芽"], type: "アノマリー", img:"佑芽_an002.png" },
    { id: "5103-141", name: "アイドルにしてくれた", idol: ["莉波","姫崎莉波"], type: "アノマリー", img:"莉波_an001.png" },
    { id: "5203-142", name: "受け取ってくれる？", idol: ["莉波","姫崎莉波"], type: "アノマリー", img:"莉波_an002.png" },
    { id: "5903-143", name: "甘く溶ける心", idol: ["莉波","姫崎莉波"], type: "アノマリー", img:"莉波_an003.png" },
    { id: "6012-001", name: "お姉ちゃんだもの！", type: "共通", img:"spc_fr001.png" },
    { id: "6012-002", name: "おアツイ視線", type: "共通", img:"spc_fr002.png" },
    { id: "6012-003", name: "ご指導ご鞭撻", type: "共通", img:"spc_fr003.png" },
    { id: "6002-004", name: "ストレッチ談義", type: "共通", img:"spc_fr004.png" },
    { id: "6002-005", name: "全力サポート", type: "共通", img:"spc_fr005.png" },
    { id: "6002-006", name: "旬の味わい", type: "共通", img:"spc_fr006.png" },
    { id: "6003-007", name: "花萌ゆ季節", type: "共通", img:"spc_fr007.png" },
    { id: "6003-008", name: "陽だまりの生徒会室", type: "共通", img:"spc_fr008.png" },
    { id: "6013-009", name: "心のアルバム", type: "共通", img:"spc_fr009.png" },
    { id: "6003-010", name: "ティーパーティー", type: "共通", img:"spc_fr010.png" },
    { id: "6003-011", name: "光のステージ", type: "共通", img:"spc_fr011.png" },
    { id: "6003-012", name: "新生徒会爆誕！", type: "共通", img:"spc_fr012.png" },
    { id: "6013-013", name: "薄れゆく壁", type: "共通", img:"spc_fr013.png" },
    { id: "6013-014", name: "水たまりスキップ", type: "共通", img:"spc_fr014.png" },
    { id: "6003-015", name: "紅葉ランニング", type: "共通", img:"spc_fr015.png" },
    { id: "6013-016", name: "勝負はこれから！", type: "共通", img:"spc_fr016.png" },
    { id: "6003-017", name: "夏夜に咲く思い出", type: "共通", img:"spc_fr017.png" },
    { id: "6003-018", name: "月明かりに包まれて", type: "共通", img:"spc_fr018.png" },
    { id: "6003-019", name: "勝利をつかめ！", type: "共通", img:"spc_fr019.png" },
    { id: "6013-020", name: "執念キャッチャー", type: "共通", img:"spc_fr020.png" },
    { id: "6302-021", name: "キメ顔で自撮り", type: "センス", img:"spc_se001.png" },
    { id: "6202-022", name: "切れた鼻諸が結んだ絆", type: "センス", img:"spc_se002.png" },
    { id: "6102-023", name: "気になる........", type: "センス", img:"spc_se003.png" },
    { id: "6303-024", name: "喧嘩するほど仲がいい", type: "センス", img:"spc_se004.png" },
    { id: "6303-025", name: "はじける水しぶき", type: "センス", img:"spc_se005.png" },
    { id: "6103-026", name: "交わる感情", type: "センス", img:"spc_se006.png" },
    { id: "6203-027", name: "光の夜", type: "センス", img:"spc_se007.png" },
    { id: "6203-028", name: "練習再開！", type: "センス", img:"spc_se008.png" },
    { id: "6103-029", name: "ほぐれるひととき", type: "センス", img:"spc_se009.png" },
    { id: "6303-030", name: "奥義、受け流し！", type: "センス", img:"spc_se010.png" },
    { id: "6112-031", name: "なに聴いてるの？", type: "ロジック", img:"spc_lo001.png" },
    { id: "6102-032", name: "こうかい.......？", type: "ロジック", img:"spc_lo002.png" },
    { id: "6112-033", name: "ディティールが肝心", type: "ロジック", img:"spc_lo003.png" },
    { id: "6302-034", name: "草笛ハーモニー", type: "ロジック", img:"spc_lo006.png" },
    { id: "6302-035", name: "味見はいかが", type: "ロジック", img:"spc_lo007.png" },
    { id: "6303-036", name: "ダメダメクッキング", type: "ロジック", img:"spc_lo008.png" },
    { id: "6103-037", name: "お泊り猛勉強", type: "ロジック", img:"spc_lo009.png" },
    { id: "6303-038", name: "その本、おもしろい？", type: "ロジック", img:"spc_lo010.png" },
    { id: "6213-039", name: "ほかほか焼き芋", type: "ロジック", img:"spc_lo011.png" },
    { id: "6313-040", name: "対象、ロックオン", type: "ロジック", img:"spc_lo012.png" },
    { id: "6103-041", name: "あこがれ不良ムーブ", type: "ロジック", img:"spc_lo013.png" },
    { id: "6103-042", name: "ふれんどめもりーず", type: "ロジック", img:"spc_lo014.png" },
    { id: "6313-043", name: "お姉ちゃん、参戦！", type: "ロジック", img:"spc_lo015.png" },
    { id: "6203-044", name: "頭上に注意！", type: "ロジック", img:"spc_lo016.png" },
    { id: "6203-045", name: "お手並み拝見", type: "ロジック", img:"spc_lo017.png" },
    { id: "6102-046", name: "愛情レインボー", type: "アノマリー", img:"spc_an001.png"},
    { id: "6602-047", name: "小さなお客さん", type: "アノマリー", img:"spc_an002.png"},
    { id: "6603-048", name: "雨宿りのバス停", type: "アノマリー", img:"spc_an003.png"},
    { id: "6413-049", name: "バレンタイン大作戦！", type: "アノマリー", img:"spc_an004.png"},
    { id: "6103-050", name: "対戦お願いします！", type: "アノマリー", img:"spc_an005.png"},
    { id: "6303-051", name: "いたずらサンタさん", type: "アノマリー", img:"spc_an006.png"},
    { id: "6113-052", name: "寒空リサイタル", type: "アノマリー", img:"spc_an007.png"},
    { id: "6803-053", name: "せーのでぱくっ！", type: "アノマリー", img:"spc_an008.png"},
    { id: "6903-054", name: "ガタゴトすやすや", type: "アノマリー", img:"spc_an009.png" },
    { id: "6103-055", name: "あつあつはふはふ", type: "アノマリー", img:"spc_an010.png" },
];

// 画面要素の取得
const homeView = document.getElementById('home-view');
const editorView = document.getElementById('editor-view');

// エディターを開く
function openEditor(deckToLoad = null) {
    if (homeView) homeView.style.display = 'none';
    if (editorView) editorView.style.display = 'block';
    
    currentEditingDeckId = deckToLoad ? deckToLoad.id : null;
    currentDeck = deckToLoad ? [...deckToLoad.cards] : [];
    
    renderCurrentDeck();
    renderCardPool(cardData);
}

// ホームを開く
function openHome() {
    if (editorView) editorView.style.display = 'none';
    if (homeView) homeView.style.display = 'block';
    renderHomeDecks();
}

// カードプールを描画
function renderCardPool(cards) {
    const pool = document.getElementById('card-pool');
    if (!pool) return;
    pool.innerHTML = '';
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `<img src="${card.img}" alt="${card.name}"><p>${card.name}</p>`;
        div.onclick = () => {
            currentDeck.push(card);
            renderCurrentDeck();
        };
        pool.appendChild(div);
    });
}

// 現在の編成中デッキを描画
function renderCurrentDeck() {
    const list = document.getElementById('deck-list');
    if (!list) return;
    list.innerHTML = '';
    currentDeck.forEach((card, index) => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `<img src="${card.img}" alt="${card.name}"><p>${card.name}</p>`;
        div.onclick = () => {
            currentDeck.splice(index, 1);
            renderCurrentDeck();
        };
        list.appendChild(div);
    });
    
    const countEl = document.getElementById('deck-count');
    if (countEl) countEl.innerText = currentDeck.length;
}

// 絞り込み：プランチェックボックスの動的更新
function updatePlanCheckboxes() {
    const typeEl = document.getElementById('filter-type');
    const container = document.getElementById('plan-checkboxes-container');
    if (!typeEl || !container) return;

    const typeVal = typeEl.value;
    container.innerHTML = ''; // クリア

    let plans = [];
    if (typeVal === '2') { // センス
        plans = [{ label: '集中', value: 'focus' }, { label: '好調', value: 'positive' }];
    } else if (typeVal === '3') { // ロジック
        plans = [{ label: '好印象', value: 'impression' }, { label: 'やる気', value: 'motivation' }];
    } else if (typeVal === '4') { // アノマリー
        plans = [
            { label: '全力', value: 'full' }, { label: '強気', value: 'agg' },
            { label: '温存', value: 'pres' }, { label: 'のんびり', value: 'relax' }
        ];
    }

    plans.forEach(plan => {
        const label = document.createElement('label');
        label.style.marginRight = '15px';
        label.style.cursor = 'pointer';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'plan-checkbox';
        checkbox.value = plan.value;
        checkbox.onchange = filterCards;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + plan.label));
        container.appendChild(label);
    });
}

// 絞り込みのメイン処理
function filterCards() {
    const searchEl = document.getElementById('filter-search');
    const typeEl = document.getElementById('filter-type');
    const enhanceEl = document.getElementById('filter-enhance');
    const genkiEl = document.getElementById('filter-genki');
    const sortEl = document.getElementById('filter-sort');
    
    const searchTxt = searchEl ? searchEl.value.trim().toLowerCase() : '';
    const typeVal = typeEl ? typeEl.value : 'all'; 
    const enhanceVal = enhanceEl ? enhanceEl.value : 'all';
    const requireGenki = genkiEl ? genkiEl.checked : false;
    // 💡 ソート値が取得できない場合は 'standard'（表示）とする
    const sortVal = sortEl ? sortEl.value : 'standard';
    
    const checkedBoxes = document.querySelectorAll('.plan-checkbox:checked');
    const checkedPlans = Array.from(checkedBoxes).map(cb => cb.value);

    // --- 絞り込み処理 ---
    const filtered = cardData.filter(card => {
        const idPrefix = card.id.split('-')[0];
        const typeCode = idPrefix.charAt(0);
        const planCode = idPrefix.charAt(1);
        const genkiCode = idPrefix.charAt(2);

        const categoryMap = {
            '1': '共通', '2': 'センス', '3': 'ロジック',
            '4': 'アノマリー', '5': 'アイドル固有', '6': 'サポカ固有'
        };
        const cardCategory = categoryMap[typeCode] || '共通';
        const cardEffectiveType = card.type || cardCategory;

const hitName = card.name.toLowerCase().includes(searchTxt);

let hitIdol = false;

if (card.idol) {
    if (Array.isArray(card.idol)) {
        hitIdol = card.idol.some(name =>
            name.toLowerCase().includes(searchTxt)
        );
    } else {
        hitIdol = card.idol.toLowerCase().includes(searchTxt);
    }
}

if (searchTxt && !hitName && !hitIdol) {
    return false;
}

if (typeVal !== 'all') {
    const typeValMap = categoryMap[typeVal] || typeVal;

    if (typeValMap !== cardCategory && typeValMap !== cardEffectiveType) {
        return false;
    }
}

if (requireGenki && genkiCode !== '1') return false;

        if (checkedPlans.length > 0) {
            let cardAttributes = [];
            cardAttributes.push(cardCategory);
            
            if (cardEffectiveType === 'センス') {
                if (planCode === '1') cardAttributes.push('focus');
                if (planCode === '2') cardAttributes.push('positive');
                if (planCode === '3') cardAttributes.push('focus', 'positive');
            } else if (cardEffectiveType === 'ロジック') {
                if (planCode === '1') cardAttributes.push('impression');
                if (planCode === '2') cardAttributes.push('motivation');
                if (planCode === '3') cardAttributes.push('impression', 'motivation');
            } else if (cardEffectiveType === 'アノマリー') {
                if (planCode === '1') cardAttributes.push('full');
                if (planCode === '2') cardAttributes.push('agg');
                if (planCode === '3') cardAttributes.push('pres');
                if (planCode === '4') cardAttributes.push('relax');
                if (planCode === '5') cardAttributes.push('full', 'agg');
                if (planCode === '6') cardAttributes.push('full', 'pres');
                if (planCode === '7') cardAttributes.push('full', 'relax');
                if (planCode === '8') cardAttributes.push('full', 'agg', 'pres');
                if (planCode === '9') cardAttributes.push('agg', 'pres');
            }

            const isMatch = checkedPlans.every(plan => cardAttributes.includes(plan));
            if (!isMatch) return false;
        }
        
        return true; 
    });

    // 💡 === 選択されたソート順に応じた並び替え処理 === 💡
    filtered.sort((a, b) => {
        const prefixA = a.id.split('-')[0];
        const prefixB = b.id.split('-')[0];

        const rarityA = prefixA.length >= 4 ? prefixA.charAt(3) : '0';
        const rarityB = prefixB.length >= 4 ? prefixB.charAt(3) : '0';

        // 💡 'rarity-asc'（昇順: N→L）が選ばれている場合のみ、低い順にする
        if (sortVal === 'rarity-asc') {
            if (rarityA !== rarityB) {
                return Number(rarityA) - Number(rarityB);
            }
        } 
        // 💡 デフォルト（'standard'）や降順（'rarity-desc'）の場合は、すべて高い順（L→N）にする
        else {
            if (rarityA !== rarityB) {
                return Number(rarityB) - Number(rarityA);
            }
        }
        
        // レアリティが同じ場合は、ID順（タイプ → プラン）で綺麗に並べ替える
        return a.id.localeCompare(b.id);
    });
    // 💡 === ここまで === 💡

    renderCardPool(filtered);
}

// デッキ保存処理（新規・上書き共通）
function saveDeckAction() {
    if (currentDeck.length === 0) return alert('カードが編成されていません！');
    
    if (currentEditingDeckId) {
        const deck = savedDecks.find(d => d.id === currentEditingDeckId);
        if (deck) {
            const name = prompt('デッキ名を変更しますか？（そのままならOK）', deck.name);
            if (name === null) return; 
            if (name.trim() === '') return alert('デッキ名を入力してください。');
            
            deck.name = name;
            deck.cards = [...currentDeck];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDecks));
            
            alert(`デッキ「${name}」を上書き保存しました！`);
            return;
        }
    }

    const name = prompt('デッキ名を入力してください', 'マイデッキ');
    if (!name) return;
    if (name.trim() === '') return alert('デッキ名を入力してください。');

    const newDeck = { id: Date.now(), name: name, cards: [...currentDeck] };
    savedDecks.push(newDeck);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDecks));
    
    currentEditingDeckId = newDeck.id;
    alert(`デッキ「${name}」を保存しました！\n（続けて編集・再保存が可能です）`);
}

// ホーム画面の保存済みデッキ一覧を描画
function renderHomeDecks() {
    const grid = document.getElementById('home-deck-grid');
    const empty = document.getElementById('empty-state');
    if (!grid || !empty) return;
    grid.innerHTML = '';

    if (savedDecks.length === 0) {
        empty.style.display = 'block';
        grid.style.display = 'none';
    } else {
        empty.style.display = 'none';
        grid.style.display = 'grid';
        
        savedDecks.forEach(deck => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'home-deck-card';
            
            let imgs = deck.cards.length > 0 ? `<img src="${deck.cards[0].img}" class="single-thumb">` : `<div class="no-img">No Card</div>`;

            cardDiv.innerHTML = `
                <div class="deck-thumbnail-wrapper">${imgs}</div>
                <div class="deck-info-title">${deck.name}</div>
                <div class="deck-actions-row">
                    <button class="action-icon-btn btn-download" title="画像として保存">📷</button>
                    <button class="action-icon-btn btn-delete" title="デッキを削除">🗑️</button>
                </div>
            `;
            
            cardDiv.querySelector('.deck-thumbnail-wrapper').onclick = () => openEditor(deck);
            cardDiv.querySelector('.deck-info-title').onclick = () => openEditor(deck);
            
            cardDiv.querySelector('.btn-download').onclick = (e) => {
                e.stopPropagation(); 
                downloadDeckImage(deck);
            };
            
            cardDiv.querySelector('.btn-delete').onclick = (e) => {
                e.stopPropagation();
                deleteDeck(deck.id);
            };

            grid.appendChild(cardDiv);
        });
    }
}

// デッキ削除機能
function deleteDeck(id) {
    if (confirm('このデッキを削除してもよろしいですか？')) {
        savedDecks = savedDecks.filter(deck => deck.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDecks));
        renderHomeDecks(); 
    }
}

// デッキ画像保存機能（プレビュー＆保存）
function downloadDeckImage(deck) {
    if (deck.cards.length === 0) return alert('カードが編成されていません！');

    const modal = document.getElementById('save-preview-modal');
    const content = document.getElementById('preview-content');
    if (!modal || !content) return;
    
    content.innerHTML = '<div style="padding: 30px; text-align: center; color: #666; font-weight: bold;">画像を作成中...⏳</div>';
    modal.style.display = 'flex';

    const captureDiv = document.createElement('div');
    captureDiv.style.position = 'absolute';
    captureDiv.style.top = '-9999px';
    captureDiv.style.left = '-9999px';
    captureDiv.style.background = '#ffffff';
    captureDiv.style.padding = '30px';
    captureDiv.style.borderRadius = '16px';
    captureDiv.style.width = '600px';

    let title = document.createElement('h2');
    title.innerText = deck.name;
    title.style.color = '#333';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.fontFamily = 'sans-serif';
    captureDiv.appendChild(title);

    let cardGrid = document.createElement('div');
    cardGrid.style.display = 'flex';
    cardGrid.style.flexWrap = 'wrap';
    cardGrid.style.gap = '15px';
    cardGrid.style.justifyContent = 'center';
    captureDiv.appendChild(cardGrid);
    document.body.appendChild(captureDiv);

    let loadPromises = deck.cards.map(card => {
        return new Promise((resolve) => {
            let img = document.createElement('img');
            img.onload = resolve;
            img.onerror = resolve; 
            img.src = card.img;
            img.style.width = '110px';
            img.style.height = '110px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            cardGrid.appendChild(img);
        });
    });

    Promise.all(loadPromises).then(() => {
        html2canvas(captureDiv, { 
            backgroundColor: '#ffffff',
            scale: 2 
        }).then(canvas => {
            document.body.removeChild(captureDiv); 

            content.innerHTML = '';
            canvas.style.maxWidth = '100%';
            canvas.style.height = 'auto';
            canvas.style.borderRadius = '8px';
            canvas.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            content.appendChild(canvas);

            const btnDoSave = document.getElementById('btn-do-save');
            if (btnDoSave) {
                btnDoSave.onclick = () => {
                    try {
                        const link = document.createElement('a');
                        link.download = `${deck.name}.png`;
                        link.href = canvas.toDataURL('image/png'); 
                        link.click();
                        modal.style.display = 'none'; 
                    } catch (e) {
                        alert('【保存エラー】\nブラウザのセキュリティ制限により保存できませんでした。\n※PCのフォルダから直接ファイルを開いている場合（URLが file:///〜）に発生します。');
                        console.error(e);
                    }
                };
            }
        }).catch(err => {
            alert('画像の生成に失敗しました');
            console.error(err);
            if (document.body.contains(captureDiv)) document.body.removeChild(captureDiv);
            modal.style.display = 'none';
        });
    });
}


// ==========================================
// 🛠️ 安全なイベント紐付けシステム (HTMLにIDがなくてもクラッシュしない)
// ==========================================
function bindClick(id, callback) {
    const el = document.getElementById(id);
    if (el) el.onclick = callback;
}
function bindEvent(id, eventType, callback) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(eventType, callback);
}

// 画面遷移・基本ボタン
bindClick('btn-create-center', () => openEditor());
bindClick('btn-create-float', () => openEditor());
bindClick('btn-back', () => openHome());
bindClick('btn-clear', () => {
    currentDeck = [];
    renderCurrentDeck();
});

// 保存処理の紐付け
bindClick('btn-save', saveDeckAction);

// 絞り込み用イベント
bindEvent('filter-search', 'input', filterCards);
bindEvent('filter-enhance', 'change', filterCards);
bindEvent('filter-genki', 'change', filterCards); // 💡 追加：元気の切り替え時に絞り込みを実行
bindEvent('filter-type', 'change', () => {
    updatePlanCheckboxes(); 
    filterCards();          
});

// モーダルを閉じるボタン
bindClick('btn-close-preview', () => {
    const modal = document.getElementById('save-preview-modal');
    if (modal) modal.style.display = 'none';
});

// --- プレビュー画面の「閉じる」ボタンの動作を設定 ---
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('btn-close-preview');
    const modal = document.getElementById('save-preview-modal');

    if (closeBtn && modal) {
        closeBtn.onclick = function() {
            modal.style.display = 'none'; // プレビュー画面を非表示にする
        };
    }
});
// 初期起動
openHome();