import {SpriteConfig} from './utils/helper';

export type CharacterSpriteId =
  | 'sprite_lien_hoodie'
  | 'sprite_lien_nausong'
  | 'sprite_quan_gia_lam'
  | 'sprite_thiman';

export interface DialogueLine {
  id: number;
  speaker: string;
  spriteId: CharacterSpriteId;
  action: string;
  dialogue: string;
  dramaticShake?: boolean;
  screenShakeMs?: number;
  woodKnock?: boolean;
  candleBonus?: number;
}

/**
 * Rich thematic palette & typography for Later Lê Dynasty Vietnamese Visual Novel.
 */
export const THEME = {
  colors: {
    canvasFallbackBg: '#120d0a',
    menuFallbackTop: '#2c1e14',
    menuFallbackBottom: '#140e0a',
    sceneFallbackTop: '#161b22',
    sceneFallbackBottom: '#0d0b09',
    ebonyPanel: '#1a110d',
    ebonyPanelDeep: '#120b08',
    ebonyButtonBg: '#2b1c14',
    dangerButtonBg: '#381a16',
    rosewoodBorder: '#5c3a24',
    gildedBorder: '#b68945',
    gildedGold: '#e2b866',
    gildedGoldBright: '#f6d58e',
    gildedActionBg: '#d4a853',
    jadeAccent: '#8fa88e',
    stageActionText: '#e8c98f',
    dialogueText: '#f7f1e5',
    speakerLienBadge: '#3a4f3e',
    speakerQuanGiaBadge: '#2c2738',
    speakerThiManBadge: '#5c3824',
    darkRedBtnTop: '#6b1616',
    darkRedBtnBottom: '#3d0a0a',
    darkRedBtnBorder: '#d4a853',
    darkRedBtnText: '#fef3c7',
    badgeRed: '#8B1E1E',
    badgeGold: '#D4AF37',
    badgeBrown: '#4A2511',
    featheredModalCloseYellow: '#FFD700',
    dustMote: 'rgba(235, 214, 175, 0.28)',
    lightShaftTop: 'rgba(148, 178, 198, 0.12)',
    lightShaftBottom: 'rgba(148, 178, 198, 0.0)',
    lampGlowInner: 'rgba(255, 194, 88, 0.24)',
    lampGlowOuter: 'rgba(245, 138, 42, 0.0)',
  },
  fonts: {
    heading: "'Noto Serif', 'Playfair Display', Georgia, serif",
    body: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  },
  ui: {
    buttonRadius: '10px',
    panelRadius: '14px',
    borderStrokeWidth: 2,
  },
} as const;

/**
 * Exact linear script for Scene 1 (Cảnh 1) from the approved GDD.
 */
export const SCENE_1_SCRIPT: readonly DialogueLine[] = [
  {
    id: 1,
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Uể oải mở mắt, ngáp dài một tiếng, đưa tay xoa thái dương và bóp vai]',
    dialogue:
      '"Ưm... mệt rã rời cả người... Rõ ràng lúc nãy mình mệt quá nên ngủ thiếp đi ở nhà con Ly cơ mà... Ủa, sao cái đệm nhà nó hôm nay vừa cứng vừa ngứa ngáy thế này, đau hết cả lưng ngọc của tui rồi!"',
  },
  {
    id: 2,
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Mắt vẫn nhắm tịt, theo thói quen quờ tay sang bên cạnh sờ soạng tìm điện thoại]',
    dialogue:
      '"Đâu rồi... cái điện thoại của mình đâu rồi nhỉ? Phải check xem mấy giờ rồi với lướt tin nhắn một cái chứ... Ủa, sao sờ toàn thấy rơm khô với chiếu cói rách bươm trải thẳng xuống đất thế này?!"',
  },
  {
    id: 3,
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Mở choàng mắt, nhìn đống củi khô, chum vại xung quanh rồi bĩu môi cười khúc khích]',
    dialogue:
      '"À há! Lại là trò của thằng Phong, thằng Hùng với con Bảo, con Ly chứ gì! Chắc thấy mình ngủ say như chết nên cả lũ hùa nhau giấu điện thoại rồi khiêng ra xó kho phim trường cổ trang quay clip giấu camera ẩn troll mình đây mà. Hứ, bày đặt ghê!"',
  },
  {
    id: 4,
    speaker: 'Quản gia Lâm (Ngoài hành lang trực gác)',
    spriteId: 'sprite_quan_gia_lam',
    action: '[Gõ mạnh gậy gỗ xuống nền gạch, quát lạnh lẽo]',
    dialogue:
      '"Con Liên! Giờ Dần đã điểm, khách quý họ Trương sắp tới phủ đối chiếu văn tự với con Mận. Ngươi còn nằm vùi trong ổ rơm xó kho đó làm gì, muốn nếm đủ ba mươi trượng gia pháp trước mặt Quan lớn hay sao?!"',
    dramaticShake: true,
    woodKnock: true,
  },
  {
    id: 5,
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action: '[Chống nạnh, lè lưỡi trêu ngươi về phía cửa kho]',
    dialogue:
      '"Ối dồi ôi sợ quá cơ! Thuê hẳn diễn viên quần chúng đóng vai quản gia quát như thật, lại còn bắt mình nằm ổ rơm cho đúng chuẩn nô tì nữa chứ! Để chị đây đứng dậy tìm xem chúng mày giấu điện thoại với camera ở xó nào!"',
  },
];

export const START_SCREEN_SUBTITLE =
  'Tỉnh giấc giữa kinh thành Thăng Long năm 1484, nhập vai giải mã những ẩn khuất và chạm vào hào khí một thời vàng son.';

export const SCENE_1_CHOICE_LABEL =
  'Lồm cồm đứng dậy khỏi ổ rơm, phủi bụi trên vạt áo';

export type Scene2ChoiceId = 'A' | 'B' | 'C';

export interface Scene2InspectionItem {
  id: Scene2ChoiceId;
  buttonLabel: string;
  speaker: string;
  spriteId: 'sprite_lien_hoodie';
  action: string;
  dialogue: string;
}

/**
 * Scene 2 (Cảnh 2) - Step 1 investigative choices & exact Vietnamese lines.
 */
export const SCENE_2_INSPECTIONS: readonly Scene2InspectionItem[] = [
  {
    id: 'A',
    buttonLabel: '(A) Kiểm tra ngọn đèn dầu trên chum sành',
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Chớp chớp mắt, đưa ngón tay chọc thử vào gần ngọn lửa rồi rụt phắt lại, thổi phù phù]',
    dialogue:
      '"Ái! Nóng phỏng cả tay! Mùi dầu lạc cháy khét lẹt với bấc cỏ khô thật sự... Ủa, đạo cụ phim trường gì mà chơi hàng thật nguy hiểm vậy trời?"',
  },
  {
    id: 'B',
    buttonLabel: '(B) Kiểm tra khe cửa gỗ nhìn ra hành lang',
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action: '[Áp mắt vào khe vách, nụ cười tẻn tẻn tắt ngấm]',
    dialogue:
      '"Sân gạch rêu phong, lính gác cầm giáo đứng nghiêm dưới sương mù, xa xa là mái đình cong vút... Không cột điện, không ánh đèn đường, không một tiếng còi xe... Khoan đã, phim trường nào rộng lớn y như thật thế này?!"',
  },
  {
    id: 'C',
    buttonLabel: '(C) Kiểm tra đống chum vại, củi khô quanh kho',
    speaker: 'Liên (Bạn)',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Lật tung mấy bó rơm và ngó sau chum sành, lấm lem bụi đất, mếu máo]',
    dialogue:
      '"Không có dây điện, không có ống kính, đến một góc ổ cắm cũng chẳng thấy đâu! Mình vẫn mặc nguyên cái áo hoodie từ nhà con Ly tối qua... Rốt cuộc chỗ quái quỷ này là đâu thế này, chẳng lẽ... không phải trò đùa thật sao?!"',
  },
];

export const SCENE_2_BACK_LABEL = 'Quay lại';

/**
 * Scene 2 (Cảnh 2) - Step 2 shudder & dó paper discovery lines.
 */
export const SCENE_2_SHUDDER_LINE: DialogueLine = {
  id: 201,
  speaker: 'Liên (Bạn)',
  spriteId: 'sprite_lien_hoodie',
  action:
    '[Hoảng hốt rùng mình lùi lại dựa lưng vào vách đất, hai tay vô thức ôm chặt lấy ngực áo đang đập thình thịch thì bỗng khựng lại khi chạm phải một vật gì đó cồm cộm bên trong túi áo]',
  dialogue: '"Ơ... cái gì cồm cộm ở túi trước áo thế này?"',
};

export const SCENE_2_POCKET_BUTTON_LABEL = '(A) Kiểm tra túi trước áo hoodie';

export const SCENE_2_DO_PAPER_LINE: DialogueLine = {
  id: 202,
  speaker: 'Liên (Bạn)',
  spriteId: 'sprite_lien_hoodie',
  action:
    '[Luống cuống thọc tay vào túi áo, lôi ra một mảnh giấy dó vàng ố gấp tư, nhăn mặt ngơ ngác]',
  dialogue:
    '"Ủa cái gì đây?! sao trong túi áo mình lại lòi ra một tờ giấy cổ lỗ sĩ thế này?!"',
};

export const SCENE_2_READ_PAPER_LABEL = 'Đọc tờ giấy dó';

/**
 * Scene 3 (Cảnh 3) - Phase 1: Liên's 4-line thought sequence upon reading the Dó paper.
 */
export const SCENE_3_DIALOGUE_SCRIPT: readonly DialogueLine[] = [
  {
    id: 301,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Chết sững vài giây, hai tay siết chặt mép giấy, giọng run run hoảng hốt]',
    dialogue:
      '"Lìa dương... chưa tròn giấc mộng trên giường... Ý nó nói lúc nãy mình thức đêm cày game ở nhà con Ly... rồi đột quỵ chết luôn rồi sao?!"',
  },
  {
    id: 302,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action: '[Ngồi phịch xuống đống rơm, mũi cay xè tủi thân, mếu máo]',
    dialogue:
      '"Huhu... thật sự không phải trò đùa của lũ bạn rồi... Mình chết trẻ thế này, chưa kịp tiêu hết tiền lì xì, cũng chẳng còn đường về nhà méc mẹ nữa... tự dưng nhớ nhà , nhớ quê ghê á . Người ta có câu gì ta ....ừm , thôi quên rồi ,thôi khỏi nghĩ nữa ."',
  },
  {
    id: 303,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      "[Bỗng khựng lại, cúi xuống nhìn chằm chằm vào dòng chữ 'Vua Thánh Tông trị', đôi mắt đang ướt nhòe chợt sáng rực lên đầy phấn khích]",
    dialogue:
      '"Khoan đã... \'Thăng Long kinh kỳ... Vua Thánh Tông trị\'... Là vua Lê Thánh Tông sao?! Trời ơi, mình là học sinh giỏi Sử mà! Ngài chính là vị minh quân đỉnh nhất thời Hậu Lê, thần tượng số một của mình trong sách giáo khoa đây mà! Nếu đã xuyên về đây thật, biết đâu mình còn có cơ hội nhìn thấy idol bằng xương bằng thịt!"',
  },
  {
    id: 304,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Quệt vội nước mắt, nheo mắt nhìn kỹ bốn câu giữa của bài vè, giọng đầy nghi hoặc, mơ hồ]',
    dialogue:
      '"Nhưng mà... \'Niên hiệu thứ hai quang minh, mười lăm năm chẵn, sử xanh khắc bia...\' Vua Lê Thánh Tông có tận hai niên hiệu, vậy rốt cuộc mình đang đứng ở chính xác năm nào đây nhỉ?!"',
  },
];

/**
 * Scene 3 (Cảnh 3) - Exact 10-line poem on yellowed Dó paper (`giaydo_baive`) & passcode `1484`.
 */
export const SCENE_3_POEM_LINES: readonly string[] = [
  'Tham vui thức trắng thâu canh,',
  'Mê trò ảo mộng, thân đành lìa dương!',
  'Chưa tròn giấc mộng trên giường,',
  'Hồn theo gió cuốn, lạc đường ngàn năm.',
  'Thăng Long kinh kỳ xa xăm,',
  'Vua Thánh Tông trị, trăng rằm thái bình.',
  'Niên hiệu thứ hai quang minh,',
  'Mười lăm năm chẵn, sử xanh khắc bia.',
  'Kiếp này mang phận nô tì,',
  'Tìm ba Ấn Tín mới thì hồi hương!',
];

export const SCENE_3_PUZZLE_PROMPT =
  'Theo bài vè cổ, hiện tại đang là năm bao nhiêu? (Nhập 4 chữ số)';
export const SCENE_3_CORRECT_PASSCODE = '1484';
export const SCENE_3_PUT_AWAY_LABEL = 'Cất';
export const SCENE_3_REOPEN_PAPER_LABEL = 'Mở tờ giấy';
export const SCENE_3_CONFIRM_LABEL = 'Xác nhận';
export const SCENE_3_WRONG_PASSCODE_MSG =
  'Mật mã chưa chính xác, hãy suy ngẫm lại bài vè!';

export const SCENE_3_EXPLANATION_TITLE = 'Chính xác! Đáp án: 1484';
export const SCENE_3_EXPLANATION_BODY =
  'Giải thích: Vua Lê Thánh Tông có 2 niên hiệu: Quang Thuận từ 1460–1469 và Hồng Đức từ 1470–1497. Năm Hồng Đức thứ 15 là 1470 + 14 = 1484, cũng là năm dựng bia Tiến sĩ đầu tiên tại Văn Miếu.';
export const SCENE_3_CLAIM_REWARD_LABEL = 'Nhận phần thưởng';

/**
 * Scene 4 (Cảnh 4) - Part 1: Encounter with Thị Mận on `nencanh2` (Lines 1–5).
 */
export const SCENE_4_PART_1_SCRIPT: readonly DialogueLine[] = [
  {
    id: 401,
    speaker: 'Thị Mận',
    spriteId: 'sprite_thiman',
    action:
      '[Vừa nhìn thấy Liên đang đứng trong góc kho, mắt cô bé mở to đầy kinh hãi, suýt bật tiếng kêu rồi vội lấy tay bịt miệng lại]',
    dialogue:
      '"Trời đất ơi... Tỷ Liên! Tỷ... tỷ lấy đâu ra thứ y phục quái dị, tay áo phồng to như cái bao bố mà lại không có vạt chéo thế kia !? , sau gáy lại lùng bùng cái mũ trùm đầu chẳng khác nào thích khách ! Hôm qua t... tỷ ngủ say trong kho đâu…đ..âu có mặc thứ này!"',
    screenShakeMs: 600,
  },
  {
    id: 402,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Giật mình nhìn xuống chiếc áo hoodie trên người, luống cuống kéo mũ áo xuống che bớt]',
    dialogue:
      '"À... ừm...ờ cái… cái này là... á…áo chống rét ở quê chị mới gửi lên! Mà khoan, nhìn em mặt mày tái mét, mắt đỏ hoe thế kia, có chuyện gì xảy ra à?"',
    screenShakeMs: 380,
    candleBonus: 2,
  },
  {
    id: 403,
    speaker: 'Thị Mận',
    spriteId: 'sprite_thiman',
    action:
      '[Cúi gằm mặt, hai tay bấu chặt vạt áo nâu bạc màu, giọng run rẩy nức nở]',
    dialogue:
      '"Tỷ mau cởi thứ áo kỳ quặc đó ra đi, Quản gia Lâm mà nhìn thấy lại tưởng tỷ bị yêu ma nhập xác, lôi ra đình làng phạt vạ bây giờ! Sáng nay nhà họ Trương mang khế ước đến đòi siết mảnh ruộng hương hỏa của mẹ em. Thân phận nô tì thấp cổ bé họng như chị em mình, biết lấy gì mà cãi lại nhà giàu có thế lực..."',
  },
  {
    id: 404,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Nhìn đôi vai gầy run rẩy của Thị Mận, vẻ nhí nhảnh lúc nãy dịu hẳn xuống, ánh mắt trở nên nghiêm túc và đồng cảm]',
    dialogue:
      '"Ra là vậy... Ở thời phong kiến này, thân phận nô tì đúng là thấp hèn thật, nhưng không có nghĩa là mình chịu khoanh tay để kẻ khác bắt nạt đâu."',
  },
  {
    id: 405,
    speaker: 'Quản gia Lâm (Ngoài hành lang trực gác)',
    spriteId: 'sprite_quan_gia_lam',
    action:
      '[Gõ mạnh gậy gỗ xuống nền gạch, giọng khàn đặc, lạnh lẽo và đầy vẻ khinh miệt]',
    dialogue:
      '"Con Liên đâu! Lũ hạ tiện chúng bay chỉ biết ăn hại, còn rúc xó kho làm gì nữa?! Thân phận nô tì thấp hèn như cỏ rác, mau mở rương thay bộ vải thô sạch sẽ rồi bưng khay lễ vật ra thư phòng hầu hạ khách quý! Chớ có dại mà thò bàn tay dơ bẩn đụng vào đống lụa là của tiểu thư, kẻo tội phạm thượng chém đầu không tha!"',
    dramaticShake: true,
    screenShakeMs: 600,
    woodKnock: true,
  },
];

export const SCENE_4_RUN_TO_CHEST_LABEL = 'Chạy xuống chỗ chiếc rương';
export const SCENE_4_CANDLE_BONUS_PREFIX =
  'Che giấu thành công! Nhận được: Nến Tri Thức ';
export const SCENE_4_CANDLE_BONUS_VALUE = '+2';

/**
 * Scene 4 (Cảnh 4) - Part 2: Wooden Chest & Chinese Character Lock (`35241`) on `nencanh4_ruong` (Lines 6–7).
 */
export const SCENE_4_PART_2_SCRIPT: readonly DialogueLine[] = [
  {
    id: 406,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Vội vã chạy tới chiếc rương gỗ lớn đặt ở góc kho, đưa tay nhấc nắp nhưng chiếc rương khóa chặt không nhúc nhích]',
    dialogue:
      '"Ủa, khóa cứng ngắc rồi! Trên nắp rương có khắc một bảng chữ Hán bị xáo trộn vị trí kèm 5 ô trống nhập số... Quản gia gài mật mã để tránh người ngoài lục đồ đây mà!"',
  },
  {
    id: 407,
    speaker: 'Thị Mận',
    spriteId: 'sprite_thiman',
    action: '[Rón rén lại gần, thì thào lo lắng]',
    dialogue:
      '"Tỷ Liên ơi, hôm qua Quản gia có dặn quy luật mở khóa rương này để gia nhân tự lấy áo, nhưng em dốt chữ nên không nhớ nổi... Tỷ…tỷ mau giải đi không… Quản gia ập vào bây giờ!"',
  },
];

export const SCENE_4_PUZZLE_PROMPT =
  'Dưới triều đại độc tôn Nho giáo, kẻ làm người muốn giữ trọn đạo làm tôi phải sắp xếp Ngũ Thường theo đúng thứ tự chuẩn mực của thánh hiền. Hãy giải mã 5 con chữ Hán trên nắp rương và nhập dãy 5 con số tương ứng với thứ tự chuẩn của Ngũ Thường!';
export const SCENE_4_CLUE_BOARD_TEXT =
  '1. 信  —  2. 禮  —  3. 仁  —  4. 智  —  5. 義';
export const SCENE_4_DEDUCTION_NOTE =
  'Thời vua Lê Thánh Tông độc tôn Nho giáo, coi trọng kỷ cương phép tắc. Thứ tự chuẩn của Ngũ Thường trong đạo Nho là: Nhân – Nghĩa – Lễ – Trí – Tín! Giờ phải nhận mặt từng chữ Hán đánh số trên kia rồi...';
export const SCENE_4_CORRECT_PASSCODE = '35241';
export const SCENE_4_PUT_AWAY_LABEL = 'Cất';
export const SCENE_4_REOPEN_LOCK_LABEL = 'Mở bảng khóa';
export const SCENE_4_WRONG_PASSCODE_MSG =
  'Mật mã chưa chính xác, hãy đối chiếu lại thứ tự Ngũ Thường!';

export const SCENE_4_EXPLANATION_TITLE = 'Chính xác! Đáp án: 35241';
export const SCENE_4_EXPLANATION_BODY =
  'Giải thích: Năm chữ Hán khắc trên nắp rương lần lượt là: 1. Tín (信) – 2. Lễ (禮) – 3. Nhân (仁) – 4. Trí (智) – 5. Nghĩa (義). Sắp xếp theo đúng trật tự chuẩn của Ngũ Thường dưới thời Nho giáo độc tôn (Nhân – Nghĩa – Lễ – Trí – Tín) ta được dãy số 3 – 5 – 2 – 4 – 1.';

export const SCENE_4_OPEN_CHEST_BUTTON_LABEL = 'Mở nắp rương y phục ra';

/**
 * Scene 5 (Cảnh 5) - Opening Dialogue, 3 Giao Linh Robe Choices, Wrong Choice Game Overs, & Correct Choice Rewards.
 */
export const SCENE_5_OPENING_SCRIPT: readonly DialogueLine[] = [
  {
    id: 501,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action:
      '[Vội cởi phăng chiếc áo hoodie, cuộn tròn nhét tọt xuống đáy rương rồi thở phào]',
    dialogue:
      '"Phù... giấu kỹ cái áo này vào đáy rương đã, mặc ra ngoài chắc người ta tưởng mình bị điên mất!"',
  },
  {
    id: 502,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action: '[Nheo mắt nhìn 3 bộ áo cổ chéo trong rương, lẩm bẩm]',
    dialogue:
      '"Cái thời phong kiến này soi mói từng tí một từ đầu đến chân... Phận nô tì mà chọn nhầm màu áo của quý tộc là xác định ăn đòn ướt người, phải nhìn cho kỹ mới được!"',
  },
];

export const SCENE_5_ROBE_CHOICE_1_LABEL = 'Mặc áo lụa vàng nghệ, viền gấm';
export const SCENE_5_ROBE_CHOICE_2_LABEL = 'Mặc áo vải sa đỏ tía, ống tay rộng';
export const SCENE_5_ROBE_CHOICE_3_LABEL =
  'Mặc áo vải gai thô màu nâu sồng, ống tay hẹp';

export const SCENE_5_WRONG_1_SCRIPT: readonly DialogueLine[] = [
  {
    id: 511,
    speaker: 'Quản gia Lâm',
    spriteId: 'sprite_quan_gia_lam',
    action: '[Sầm mặt, trừng mắt khinh miệt chỉ thẳng tay vào bạn]',
    dialogue:
      '"Đồ hạ tiện chán sống rồi sao?! Thân phận nô tì thấp hèn như cỏ rác mà dám khoác lên người sắc vàng của bậc đế vương quý tộc! Người đâu, lôi con tiện tì này ra sân đánh đủ năm mươi trượng gia pháp, tống vào ngục tối!"',
    dramaticShake: true,
    screenShakeMs: 600,
    woodKnock: true,
  },
  {
    id: 512,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action: '[Quỳ sụp xuống, mặt cắt không còn giọt máu, lắp bắp hoảng loạn]',
    dialogue:
      '"Ơ... khoan đã lão gia ! Cháu... cháu chỉ mặc nhầm thôi mà... Á! Đau quá... Buông ra… Buông ra !"',
    screenShakeMs: 420,
  },
];

export const SCENE_5_WRONG_2_SCRIPT: readonly DialogueLine[] = [
  {
    id: 521,
    speaker: 'Quản gia Lâm',
    spriteId: 'sprite_quan_gia_lam',
    action: '[Nhếch mép cười lạnh lẽo, giọng đầy khinh bỉ]',
    dialogue:
      '"Hay cho lũ nô tì to gan! Vải sa đỏ tía vốn dành riêng cho bậc quan lại và tiểu thư khuê các, hạng hạ nhân thấp kém như ngươi cũng dám chạm vào ư? Lôi ra sân đánh ba mươi trượng răn đe, nhốt vào xó tối suốt đời!"',
    dramaticShake: true,
    screenShakeMs: 600,
    woodKnock: true,
  },
  {
    id: 522,
    speaker: 'Liên',
    spriteId: 'sprite_lien_hoodie',
    action: '[Gục xuống nền đất lạnh ngắt, mếu máo tuyệt vọng, bị áp giải đi]',
    dialogue:
      '"Huhu... chỉ tại cái màu đỏ này thôi mà... Cháu biết lỗi rồi mà, đừng đánh nữa... Xong đời thật rồi...á… aaaa."',
    screenShakeMs: 420,
  },
];

export const SCENE_5_WHIP_FLASH_TEXT = 'Tiếng roi vút lên trong gió';

export const SCENE_5_GAMEOVER_1_HEADER =
  'Bạn chịu phạt trượng vì vi phạm điều cấm kỵ tối cao của hoàng gia !';
export const SCENE_5_GAMEOVER_1_BULLETS: readonly string[] = [
  '• Dưới thời Lê Sơ (đặc biệt là triều vua Lê Thánh Tông), triều đình áp dụng chế độ lễ nghi Nho giáo và phân hóa đẳng cấp vô cùng nghiêm ngặt qua trang phục.',
  '• Màu vàng (Hoàng bào) và các họa tiết rồng phượng thêu chỉ kim tuyến là đặc quyền tuyệt đối chỉ dành riêng cho Nhà vua và Hoàng tộc. Bất kỳ ai (từ quan lại đến thường dân, nô tì) tự ý sử dụng sắc vàng hoặc hàng gấm vóc cung đình đều bị khép vào tội khi quân phạm thượng, xử phạt cực kỳ nặng nề.',
];

export const SCENE_5_GAMEOVER_2_HEADER =
  'Bạn bị trừng phạt vì tự ý mặc trang phục của tầng lớp trên';
export const SCENE_5_GAMEOVER_2_BULLETS: readonly string[] = [
  '• Theo quy chế phục sắc dưới thời vua Lê Thánh Tông (năm 1466), màu đỏ, màu tía và các chất liệu cao cấp như lụa, gấm, vải sa chỉ dành cho quan lại triều đình (nhất phẩm đến tam phẩm mặc áo đỏ) và giới quý tộc, tiểu thư đài các.',
  '• Đối với tầng lớp bình dân và nô tì, luật pháp quy định chỉ được mặc vải bông thô, vải gai với các gam màu trầm tối giản dị (như nâu sồng, đen, chàm) và ống tay gọn gàng để lao động. Việc nô tì mặc lụa là, màu sắc sặc sỡ bị coi là hành vi phá vỡ trật tự tôn ti của xã hội phong kiến.',
];

export const SCENE_5_REWIND_BUTTON_LABEL = 'Quay ngược thời gian';
export const SCENE_5_REWIND_HUMOR_TEXT =
  'Đau mông chưa bạn ơi? Sách giáo khoa Lịch sử chắc bạn dùng để úp mì tôm đúng không? :))';
export const SCENE_5_RETRY_BUTTON_LABEL = 'Thử lại Cảnh 5';

export const SCENE_5_CORRECT_LINE: DialogueLine = {
  id: 531,
  speaker: 'Liên',
  spriteId: 'sprite_lien_nausong',
  action:
    '[Khoác bộ áo vải thô lên người, loay hoay buộc dây đai bên hông rồi phủi phủi vạt áo]',
  dialogue:
    '"Ui da, vải gì mà thô ráp cọ vào da ngứa hết cả người... Nhưng mà màu nâu sồng quê mùa với tay áo gọn thế này thì chuẩn rồi. Trông mình giờ y hệt người thời xưa luôn!"',
};

export const SCENE_5_FINISH_BUTTON_LABEL =
  'Khép nắp rương lại, bước ra bàn chuẩn bị lễ vật cùng Thị Mận';

export const SAVE_STORAGE_KEY = 'hlplk_save_v2';

/**
 * Hint System ("Gợi ý" & "Ngọn Nến Tri Thức") Constants.
 * Scene 3: max 3 hints, cost 1 each.
 * Scene 5: max 6 hints, flat cost 2 candles for ALL hints (1st through 6th).
 * Scene 4 & 6–8: max 6 hints, escalating cost (hints 1–3 cost 1 candle; hints 4–6 cost 2 candles).
 */
export const INITIAL_KNOWLEDGE_CANDLES = 1;
export const SCENE_3_MAX_HINTS = 3;
export const SCENE_4_TO_8_MAX_HINTS = 6;

export function getMaxHintsForScene(sceneNumber: number): number {
  return sceneNumber >= 4 ? SCENE_4_TO_8_MAX_HINTS : SCENE_3_MAX_HINTS;
}

export function getHintCost(sceneNumber: number, hintsUsedCount: number): number {
  if (sceneNumber === 5) {
    return 2;
  }
  if (sceneNumber >= 4 && hintsUsedCount >= 3) {
    return 2;
  }
  return 1;
}

export function getHintExhaustedMessage(sceneNumber: number): string {
  const max = getMaxHintsForScene(sceneNumber);
  return `Bạn đã dùng hết ${max} lượt gợi ý cho cảnh này`;
}

export function getHintConfirmPrompt(cost: number): string {
  return `Bạn có muốn tiêu hao ${cost} Nến Tri Thức để nhận gợi ý không?`;
}

export const SCENE_HINTS_BY_SCENE: Record<number, readonly string[]> = {
  3: [
    'Thời gian không nằm ở những lời than vãn đầu bài vè. Hãy chú ý đến hai câu nhắc về sự hưng thịnh của triều đại và một công trình lưu danh người đỗ đạt tại kinh thành.',
    "Vị minh quân trị vì 38 năm này từng dùng hai niên hiệu. Hãy xác định niên hiệu thứ hai của ngài bắt đầu khi nào, và sự kiện 'sử xanh khắc bia' đầu tiên diễn ra vào năm thứ bao nhiêu của niên hiệu đó.",
    'Năm đầu tiên của một niên hiệu luôn được tính là năm thứ nhất (nguyên niên), không phải năm thứ không. Hãy lấy mốc năm bắt đầu niên hiệu thứ hai cộng thêm khoảng cách chênh lệch thực tế đến năm thứ mười lăm.',
  ],
  4: [
    'Năm con chữ Hán trên rương vốn là chuẩn mực đạo đức cốt lõi của Nho gia. Tuy nhiên, có kẻ nói khóa phủ quan xếp theo thứ tự quân tử đối nhân xử thế từ trong ra ngoài, cũng có kẻ đồn phải xếp ngược từ chữ giữ lời hứa để răn đe đám gia nhân.',
    'Bỏ qua lời đồn xếp ngược dành cho gia nhân — triều đại này độc tôn Nho học chính thống nên luôn lấy lòng trắc ẩn thương người làm gốc rễ đầu tiên, sau đó mới xét đến lẽ phải và phép tắc lễ nghi.',
    'Để đọc được mặt chữ Hán trên khóa, hãy nhớ mặt chữ có bộ Nhân đứng (亻) ở vị trí số 3 mang nghĩa là lòng thương người; chữ có bộ Ngôn (言) ở vị trí số 1 mang nghĩa là chữ Tín; còn chữ số 2 mang nghĩa là Lễ nghi.',
    'Năm mặt chữ Hán khắc sẵn theo thứ tự từ 1 đến 5 trên rương lần lượt là: 1. Tín (信) — 2. Lễ (禮) — 3. Nhân (仁) — 4. Trí (智) — 5. Nghĩa (義). Giờ bạn chỉ cần sắp xếp lại chúng theo đúng trình tự chuẩn của Ngũ Thường.',
    'Trình tự chuẩn của Ngũ Thường trong đạo Nho bắt đầu bằng: Nhân → Nghĩa → Lễ, và hai đức tính cuối cùng là Trí → Tín. Hãy tự đối chiếu từng chữ với con số gắn sẵn từ 1 đến 5 ở gợi ý trước để nhập mật mã!',
    'Hãy ghép lần lượt số thứ tự trên nắp rương theo đúng trình tự Ngũ Thường: Nhân (mang số 3) → Nghĩa (mang số 5) → Lễ (mang số 2) → Trí (mang số 4) → Tín (mang số 1). Hãy nhập liền 5 con số này vào ô khóa!',
  ],
  5: [
    'Phục sắc triều Lê phân định sang hèn rất rõ: sắc vàng là vùng cấm của bậc đế vương. Riêng những ngày phủ quan đón khách quý, có người bảo gia nhân được phép mặc vải sa đỏ tía cho đẹp mặt chủ, kẻ lại khuyên chỉ nên mặc vải thô trầm màu như thường ngày.',
    'Kỷ cương thời Lê Sơ không có bất kỳ ngoại lệ nào cho kẻ dưới vượt qua ranh giới đẳng cấp. Mọi chất liệu lụa là, gấm vóc hay sắc đỏ, sắc tía đều là đặc quyền của tầng lớp trên; kẻ hạ nhân chạm vào sẽ mang tội khi quân phạm thượng.',
    'Hãy chọn bộ y phục mang đúng tính chất lao động của tầng lớp thấp nhất: chất liệu dệt từ sợi cây thô mộc, thiết kế tay áo gọn gàng không vướng víu và mang màu sắc giản dị của bùn đất quê nhà.',
    'Hãy nhìn vào thiết kế ống tay của ba bộ y phục: kẻ ngồi không hưởng lộc hay vung tay ngâm thơ mới may tay áo thụng rộng thướt tha. Người phải bưng bê, quét dọn suốt ngày nếu mặc tay rộng sẽ vướng víu, chỉ có một kiểu dáng duy nhất giữ được sự gọn gàng.',
    'Thuốc nhuộm sặc sỡ thời phong kiến vô cùng đắt đỏ và bị triều đình kiểm soát gắt gao theo phẩm hàm. Tầng lớp dưới đáy xã hội chỉ dùng những loại củ, vỏ cây rẻ tiền nhất trong tự nhiên để nhuộm vải, tạo nên sắc độ trầm mặc gắn liền với bùn đất.',
    'Hãy tự ghép 3 mảnh dữ kiện bạn vừa suy luận được từ ba gợi ý trước để đối chiếu với 3 lựa chọn trong rương: (1) Sợi cây thô mộc + (2) Ống tay gọn gàng không vướng víu + (3) Màu trầm của đất quê. Bộ áo duy nhất hội tụ đủ cả ba yếu tố này chính là đường sống của bạn!',
  ],
};

/**
 * Knowledge Candle Quiz Mini-Game ("Tích lũy Nến Tri Thức").
 */
export type QuizQuestionType = 'SHORT_ANSWER' | 'TRUE_FALSE' | 'MULTIPLE_CHOICE';

export interface QuizQuestion {
  id: number;
  type: QuizQuestionType;
  question: string;
  options?: readonly string[];
  correct: string;
  weight: number;
}

export const SCENE_3_QUIZ_BANK: readonly QuizQuestion[] = [
  {
    id: 1,
    type: 'SHORT_ANSWER',
    question:
      'Sau khi đánh thắng quân Minh, Lê Lợi chính thức lên ngôi hoàng đế tại Đông Kinh, lập ra triều đại nhà Hậu Lê vào năm nào?',
    correct: '1428',
    weight: 1,
  },
  {
    id: 2,
    type: 'SHORT_ANSWER',
    question:
      'Bộ luật thành văn tiêu biểu nhất của nhà Lê Sơ là Quốc triều hình luật (thường gọi là Luật Hồng Đức) được ban hành chính thức vào năm nào?',
    correct: '1483',
    weight: 1,
  },
  {
    id: 3,
    type: 'SHORT_ANSWER',
    question:
      'Giai đoạn Lê Sơ chấm dứt khi Mạc Đăng Dung ép vua Lê Cung Hoàng nhường ngôi, lập ra triều Mạc vào năm nào?',
    correct: '1527',
    weight: 1,
  },
  {
    id: 4,
    type: 'SHORT_ANSWER',
    question:
      'Tính từ khi vua Lê Thái Tổ lên ngôi (1428) đến khi triều đại này chấm dứt hoàn toàn sau chiến thắng Ngọc Hồi – Đống Đa (1789), vương triều Hậu Lê đã tồn tại tổng cộng bao nhiêu năm?',
    correct: '361',
    weight: 1,
  },
  {
    id: 5,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Thời Lê Thánh Tông, Lục bộ là sáu cơ quan chuyên môn cao nhất phụ trách các lĩnh vực trọng yếu của triều đình trung ương.',
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 6,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Thời Lê Thánh Tông, Lục khoa có chức năng trực tiếp điều hành quân đội và thu thuế thay cho Lục bộ ở các địa phương.',
    correct: 'Sai',
    weight: 1,
  },
  {
    id: 7,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Việc thiết lập ba ty ngang quyền (Đô ty, Thừa ty, Hiến ty) ở mỗi đạo thừa tuyên nhằm tạo thế kiềm chế lẫn nhau, hạn chế sự tập trung quyền lực vào tay một viên quan địa phương.',
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 8,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Quốc triều hình luật (Luật Hồng Đức) hoàn toàn sao chép nguyên văn bộ luật của nhà Minh (Trung Quốc) mà không có sự điều chỉnh cho phù hợp với thực tiễn Đại Việt.',
    correct: 'Sai',
    weight: 1,
  },
  {
    id: 9,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Mọi thần dân thời Lê Sơ, kể cả con nhà phường chèo, nô tì hay người đang có tang cha mẹ, đều được tự do đăng ký dự thi nếu có học vấn.',
    correct: 'Sai',
    weight: 1,
  },
  {
    id: 10,
    type: 'MULTIPLE_CHOICE',
    question:
      'Việc vua Lê Thánh Tông bãi bỏ chức Tể tướng và các chức Đại hành khiển, đồng thời trực tiếp nắm quyền chỉ huy tối cao quân đội phản ánh mục tiêu cốt lõi nào?',
    options: [
      'A. Phân chia quyền lực đồng đều giữa hoàng đế và đại thần.',
      'B. Tập trung tối đa quyền lực vào tay nhà vua, hạn chế lộng quyền.',
      'C. Chuyển đổi sang quân chủ lập hiến.',
      'D. Tăng cường tính tự trị cho các địa phương.',
    ],
    correct: 'B',
    weight: 1,
  },
];

export const SCENE_4_QUIZ_BANK: readonly QuizQuestion[] = [
  {
    id: 401,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Nhiều điều khoản trong Quốc triều hình luật thể hiện sự quan tâm bảo vệ sản xuất nông nghiệp, sức kéo (trâu bò), đê điều và quyền lợi của người phụ nữ, trẻ em.',
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 402,
    type: 'TRUE_FALSE',
    question:
      "Nhận định sau Đúng hay Sai: Việc pháp điển hóa các quy tắc đạo đức Nho giáo thành điều luật cụ thể trong Quốc triều hình luật cho thấy sự kết hợp chặt chẽ giữa 'đức trị' và 'pháp trị' của nhà Lê Sơ.",
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 403,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Việc dựng bia Tiến sĩ tại Văn Miếu không chỉ nhằm vinh danh người đỗ đạt mà còn là biện pháp răn đe, nhắc nhở kẻ sĩ giữ gìn thanh danh và trung thành với triều đình.',
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 404,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Cơ chế tuyển dụng quan lại chủ yếu qua thi cử Nho học thời Lê Sơ giúp mở rộng cơ hội tham chính cho tầng lớp bình dân có học, làm thay đổi cơ cấu tầng lớp thống trị từ quý tộc sang quan liêu nho sĩ.',
    correct: 'Đúng',
    weight: 1,
  },
  {
    id: 405,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Trong quan hệ với phương Bắc thời Lê Thánh Tông, nhà Lê Sơ chủ trương dùng vũ lực tấn công phủ đầu thay vì đấu tranh ngoại giao và giữ gìn biên cương.',
    correct: 'Sai',
    weight: 1,
  },
  {
    id: 406,
    type: 'TRUE_FALSE',
    question:
      'Nhận định sau Đúng hay Sai: Văn hóa thời Hậu Lê thể hiện sự vận động từ tính chuẩn mực, quy phạm của văn hóa cung đình Nho giáo thế kỷ XV sang tính đa dạng, phóng khoáng và đậm chất dân gian ở thế kỷ XVII – XVIII.',
    correct: 'Đúng',
    weight: 1,
  },
];

export const SCENE_5_QUIZ_BANK: readonly QuizQuestion[] = [
  {
    id: 501,
    type: 'SHORT_ANSWER',
    question:
      'Vua Lê Thánh Tông khởi xướng việc dựng tấm bia Tiến sĩ đầu tiên tại Văn Miếu – Quốc Tử Giám (ghi danh khoa thi năm 1442) vào năm dương lịch nào?',
    correct: '1484',
    weight: 1,
  },
  {
    id: 502,
    type: 'SHORT_ANSWER',
    question:
      'Giữa thời điểm nhà Lê Sơ bị nhà Mạc cướp ngôi (1527) và thời điểm Nguyễn Kim tôn lập Lê Duy Ninh lên ngôi mở đầu giai đoạn Lê Trung hưng (1533), ngai vàng nhà Hậu Lê bị gián đoạn trong bao nhiêu năm?',
    correct: '6',
    weight: 1,
  },
  {
    id: 503,
    type: 'MULTIPLE_CHOICE',
    question:
      'Vì sao trong cuộc cải cách hành chính thời Lê Sơ, các cơ quan thanh tra – giám sát như Ngự sử đài và Lục khoa lại được trao quyền độc lập tương đối để giám sát hoạt động của Lục bộ?',
    options: [
      'A. Nhằm tạo cơ chế kiểm soát quyền lực nội bộ, ngăn ngừa quan lại tham nhũng, lạm quyền.',
      'B. Nhằm thay thế hoàn toàn chức năng xét xử hình sự của Bộ Hình và Tam pháp ty.',
      'C. Nhằm chuyển giao quyền điều hành hành chính sang cho đội ngũ nho sĩ mới đỗ đạt.',
      'D. Nhằm hạn chế sự can thiệp của triều đình trung ương vào công việc của các đạo thừa tuyên.',
    ],
    correct: 'A',
    weight: 1,
  },
  {
    id: 504,
    type: 'MULTIPLE_CHOICE',
    question:
      'Chính sách quân điền thời Lê Sơ tác động trực tiếp như thế nào đến mối quan hệ giữa nhà nước phong kiến với kinh tế nông nghiệp và làng xã?',
    options: [
      'A. Xóa bỏ hoàn toàn quyền sở hữu ruộng đất tư nhân của địa chủ trên toàn quốc.',
      'B. Khôi phục mô hình điền trang, thái ấp lớn của tầng lớp vương hầu quý tộc như thời Trần.',
      'C. Khẳng định quyền sở hữu tối cao của nhà nước đối với ruộng đất công làng xã, ràng buộc nông dân vào ruộng đất để thu tô thuế.',
      'D. Chuyển toàn bộ ruộng công làng xã thành đồn điền do quân đội trực tiếp canh tác.',
    ],
    correct: 'C',
    weight: 1,
  },
  {
    id: 505,
    type: 'MULTIPLE_CHOICE',
    question:
      'Cơ chế tổ chức ở cấp đạo thừa tuyên thời Lê Thánh Tông với ba cơ quan ngang quyền là Đô ty (quân sự), Thừa ty (hành chính – tài chính) và Hiến ty (thanh tra – tư pháp) có tác dụng gì?',
    options: [
      'A. Tạo điều kiện cho các quan đứng đầu đạo thâu tóm cả binh quyền lẫn tài chính.',
      'B. Phân tán quyền lực ở cấp địa phương, ngăn chặn nguy cơ hình thành các thế lực quân phiệt cát cứ.',
      'C. Rút gọn bộ máy hành chính địa phương xuống chỉ còn một đầu mối duy nhất.',
      'D. Xóa bỏ hoàn toàn cấp hành chính phủ, huyện và xã bên dưới đạo thừa tuyên.',
    ],
    correct: 'B',
    weight: 1,
  },
  {
    id: 506,
    type: 'MULTIPLE_CHOICE',
    question:
      'Bài học kinh nghiệm nào từ cuộc cải cách hành chính của vua Lê Thánh Tông có giá trị tham khảo sâu sắc nhất đối với công cuộc xây dựng nền hành chính nhà nước pháp quyền hiện nay?',
    options: [
      'A. Tập trung toàn bộ quyền lập pháp, hành pháp và tư pháp vào một cá nhân đứng đầu.',
      'B. Phân định rành mạch chức năng, thẩm quyền giữa các cơ quan chuyên môn gắn với cơ chế thanh tra, giám sát chéo và tuyển chọn cán bộ dựa trên thực tài.',
      'C. Áp dụng nguyên tắc độc tôn một hệ tư tưởng duy nhất để loại bỏ phản biện.',
      'D. Chia nhỏ đơn vị hành chính đến mức tối đa để triệt tiêu tính chủ động của địa phương.',
    ],
    correct: 'B',
    weight: 1,
  },
];

export const QUIZ_WIN_MSG = 'Chúc mừng! Bạn đã nhận được 1 Ngọn Nến Tri Thức';
export const QUIZ_FAIL_MSG = 'Chưa chính xác! Hãy thử lại lượt câu hỏi mới nhé.';

/**
 * Historical Badge & Item Collection System ("Bộ sưu tập") + Achievement System ("Danh hiệu").
 */
export interface BadgeDefinition {
  id: string;
  assetKey: string;
  title: string;
  detailText: string;
  aspectRatio: number;
  kind?: 'badge' | 'item';
  hiddenUntilUnlocked?: boolean;
}

export const BIA_TIEN_SI_BADGE: BadgeDefinition = {
  id: 'huyhieu_biatiensi',
  assetKey: 'huyhieu_biatiensi',
  title: 'Bia Tiến Sĩ Khoa Nhâm Tuất',
  detailText:
    'Bạn có biết? Thời vua Lê Thánh Tông, đỗ Tiến sĩ không chỉ được khắc tên lên bia đá mà còn được triều đình "bao trọn gói" lễ Vinh quy bái tổ: vua ban mũ áo, mở tiệc yến tại vườn Thượng Uyển và cấp quân lính rước võng lọng linh đình về tận quê nhà.',
  aspectRatio: 598 / 852,
  kind: 'badge',
};

export const GIA_HUAN_CA_BADGE: BadgeDefinition = {
  id: 'huyhieu_giahuanca',
  assetKey: 'huyhieu_giahuanca',
  title: 'Gia Huấn Ca Của Bậc Nho Sĩ',
  detailText:
    'Bạn có biết? Dưới thời Lê Thánh Tông, Nho giáo trở thành hệ tư tưởng độc tôn chi phối từ triều chính đến nếp nhà. Các chuẩn mực Tam Cương, Ngũ Thường (Nhân – Nghĩa – Lễ – Trí – Tín) và những khúc ca giáo huấn gia phong được truyền dạy rộng rãi để rèn giũa đạo làm người, giữ gìn trật tự kỷ cương Đại Việt.',
  aspectRatio: 1024 / 1024,
  kind: 'badge',
};

export const CAM_NANG_PHUC_SAC_BADGE: BadgeDefinition = {
  id: 'huyhieu_phucsac',
  assetKey: 'huyhieu_phucsac',
  title: 'Cẩm Nang Phục Sắc Đại Việt',
  detailText:
    'Bạn có biết? Quốc triều hình luật (Luật Hồng Đức) quy định khắt khe màu áo theo phẩm trật: Hoàng đế mặc sắc vàng, quan nhất phẩm mặc tía, quan nhị - tam phẩm mặc đỏ, thường dân chỉ được mặc nâu, đen, trắng. Mặc sai màu quy định bị khép tội phạm thượng.',
  aspectRatio: 683 / 485,
  kind: 'badge',
};

export const THE_BAI_GIA_NHAN_ITEM: BadgeDefinition = {
  id: 'item_thebai',
  assetKey: 'item_thebai',
  title: 'Thẻ Bài Gia Nhân Phủ Quan',
  detailText:
    'Giấy thông hành hợp pháp để bước ra hành lang chính và vào Thư phòng',
  aspectRatio: 241 / 761,
  kind: 'item',
};

export const TRAM_CAI_NGOC_BICH_ITEM: BadgeDefinition = {
  id: 'item_tramngocbich',
  assetKey: 'item_tramngocbich',
  title: 'Chiếc Trâm Cài Ngọc Bích',
  detailText:
    'Bảo vật ẩn giấu: Tự động hóa giải và chặn đứng 1 lần bị trừ điểm Tín nhiệm tiếp theo trong hành trình.',
  aspectRatio: 484 / 748,
  kind: 'item',
  hiddenUntilUnlocked: true,
};

export const COLLECTION_BADGES: readonly BadgeDefinition[] = [
  BIA_TIEN_SI_BADGE,
  GIA_HUAN_CA_BADGE,
  CAM_NANG_PHUC_SAC_BADGE,
];

export const COLLECTION_ITEMS: readonly BadgeDefinition[] = [
  THE_BAI_GIA_NHAN_ITEM,
  TRAM_CAI_NGOC_BICH_ITEM,
];

export type AchievementVariant = 'honor' | 'clown';

export interface AchievementTitleDefinition {
  id: string;
  variant: AchievementVariant;
  categoryLabel: string;
  subTab: 'honor' | 'clown';
  title: string;
  description: string;
}

export const TITLE_BAC_THAY_NHAP_THE: AchievementTitleDefinition = {
  id: 'bac_thay_nhap_the',
  variant: 'honor',
  categoryLabel: 'Danh hiệu Vinh Dự',
  subTab: 'honor',
  title: 'Bậc Thầy Nhập Thế',
  description:
    'Không cần nến soi đường, không một lần vấp ngã. Trí tuệ và sự cẩn trọng của ngươi đã vượt xa một kẻ mới lạc bước vào chốn phủ quan!',
};

export const TITLE_PHA_GIA_CHI_TU: AchievementTitleDefinition = {
  id: 'pha_gia_chi_tu',
  variant: 'clown',
  categoryLabel: 'Danh hiệu Chúa Hề',
  subTab: 'clown',
  title: 'Phá gia chi tử',
  description: 'Đã nhờ đến tổ tiên mà vẫn ko qua được, chán nhỉ ?',
};

export const TITLE_VUA_LI_DON: AchievementTitleDefinition = {
  id: 'vua_li_don',
  variant: 'clown',
  categoryLabel: 'Danh hiệu Chúa Hề',
  subTab: 'clown',
  title: 'Vua Lì Đòn Đất Thăng Long',
  description: 'Bái phục ! Xin hãy nhận 1 lạy từ đệ tử .',
};

export const ACHIEVEMENT_TITLES: readonly AchievementTitleDefinition[] = [
  TITLE_BAC_THAY_NHAP_THE,
  TITLE_PHA_GIA_CHI_TU,
  TITLE_VUA_LI_DON,
];

export const COLLECTION_EMPTY_TITLES_MSG =
  'Hành trình vừa mới bắt đầu... Hiện chưa ghi nhận dấu ấn nào.';

export interface SceneBackgroundSlot {
  sceneNumber: number;
  key: string;
  alias: string;
  defaultPath: string;
  aspectRatio: number;
  width: number;
  height: number;
  preloadByDefault: boolean;
}

/**
 * Extensible Scene Background Mapping Dictionary (Scene 1 -> Scene 7+, plus sub-backgrounds).
 */
export const SCENE_BACKGROUND_REGISTRY: Record<string, SceneBackgroundSlot> = {
  1: {
    sceneNumber: 1,
    key: 'scene1_background',
    alias: 'Scene1_Background',
    defaultPath: 'assets/images/scene1_background.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  2: {
    sceneNumber: 2,
    key: 'nencanh2',
    alias: 'Scene2_Background',
    defaultPath: 'assets/images/nencanh2.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  3: {
    sceneNumber: 3,
    key: 'nencanh2',
    alias: 'Scene3_Background',
    defaultPath: 'assets/images/nencanh2.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  4: {
    sceneNumber: 4,
    key: 'nencanh2',
    alias: 'Scene4_Background',
    defaultPath: 'assets/images/nencanh2.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  '4_ruong': {
    sceneNumber: 4,
    key: 'nencanh4_ruong',
    alias: 'Scene4_Ruong_Background',
    defaultPath: 'assets/images/nencanh4_ruong.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  5: {
    sceneNumber: 5,
    key: 'nencanh5_ruongao',
    alias: 'Scene5_RuongAo_Background',
    defaultPath: 'assets/images/nencanh5_ruongao.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  6: {
    sceneNumber: 6,
    key: 'nencanh5_ruongao',
    alias: 'Scene6_Prep_Background',
    defaultPath: 'assets/images/nencanh5_ruongao.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: true,
  },
  7: {
    sceneNumber: 7,
    key: 'nencanh7',
    alias: 'Scene7_Background',
    defaultPath: 'assets/images/nencanh7.png',
    aspectRatio: 1376 / 768,
    width: 1376,
    height: 768,
    preloadByDefault: false,
  },
};

/**
 * Configuration for the game.
 */
export const CONFIG = {
  title: {
    value: 'Hậu Lê Phiêu Lưu Ký',
    type: 'string',
    label: 'Game Title',
    group: 'GAME',
  },
  baseCanvasWidth: {
    value: 1376,
    type: 'number',
    label: 'Base Canvas Width',
    group: 'GAME',
  },
  baseCanvasHeight: {
    value: 768,
    type: 'number',
    label: 'Base Canvas Height',
    group: 'GAME',
  },
  playerSprite: {
    value: undefined as SpriteConfig | undefined,
    type: 'sprite',
    label: 'Player Sprite',
    group: 'Visuals',
  },
  targetFPS: {
    value: 60,
    type: 'number',
    label: 'Target FPS',
    group: 'SYSTEM',
  },
  stepMs: {
    value: 1000 / 60,
    type: 'number',
    label: 'Step MS',
    group: 'SYSTEM',
  },
  maxSubSteps: {
    value: 5,
    type: 'number',
    label: 'Max Sub Steps',
    group: 'SYSTEM',
  },
  backgroundColor: {
    value: '#120d0a',
    type: 'color',
    label: 'Background Color',
    group: 'THEME',
  },
  primaryColor: {
    value: '#e2b866',
    type: 'color',
    label: 'Primary Color',
    group: 'THEME',
  },
  fontFamily: {
    value: "'Be Vietnam Pro', sans-serif",
    type: 'string',
    label: 'Font Family',
    group: 'THEME',
  },
  defaultMusicVolume: {
    value: 0.18,
    type: 'number',
    label: 'Default Music Volume',
    group: 'AUDIO',
  },
  defaultSfxVolume: {
    value: 0.6,
    type: 'number',
    label: 'Default SFX Volume',
    group: 'AUDIO',
  },
  enableTypewriter: {
    value: true,
    type: 'boolean',
    label: 'Hiệu ứng chạy chữ (Typewriter)',
    group: 'Rules',
  },
  typewriterCharsPerSec: {
    value: 55,
    type: 'number',
    label: 'Tốc độ chạy chữ (ký tự/giây)',
    group: 'Rules',
  },
  enableDialogueShake: {
    value: true,
    type: 'boolean',
    label: 'Rung khung thoại kịch tính',
    group: 'Visuals',
  },
  dialogueShakeIntensity: {
    value: 6,
    type: 'number',
    label: 'Cường độ rung khung thoại',
    group: 'Visuals',
  },
  dialogueShakeDuration: {
    value: 0.42,
    type: 'number',
    label: 'Thời lượng rung khung thoại (giây)',
    group: 'Visuals',
  },
  inactivePortraitBrightness: {
    value: 0.32,
    type: 'number',
    label: 'Độ sáng nhân vật không thoại',
    group: 'Visuals',
  },
  portraitTransitionSpeed: {
    value: 8,
    type: 'number',
    label: 'Tốc độ chuyển chân dung',
    group: 'Visuals',
  },
  ambientDustCount: {
    value: 26,
    type: 'number',
    label: 'Số hạt bụi ánh sáng kho cổ',
    group: 'Visuals',
  },
  completionScore: {
    value: 100,
    type: 'number',
    label: 'Completion Score',
    group: 'Rules',
  },

  // Layout coordinates on 1376x768 canvas
  lienTargetX: {
    value: 170,
    type: 'number',
    label: 'Liên Portrait X',
    group: 'Layout',
  },
  lienTargetY: {
    value: 84,
    type: 'number',
    label: 'Liên Portrait Y',
    group: 'Layout',
  },
  lienNauSongTargetX: {
    value: 220,
    type: 'number',
    label: 'Liên Nâu Sồng Portrait X',
    group: 'Layout',
  },
  lienNauSongTargetY: {
    value: 86,
    type: 'number',
    label: 'Liên Nâu Sồng Portrait Y',
    group: 'Layout',
  },
  quanGiaTargetX: {
    value: 760,
    type: 'number',
    label: 'Quản Gia Lâm Portrait X',
    group: 'Layout',
  },
  quanGiaTargetY: {
    value: 74,
    type: 'number',
    label: 'Quản Gia Lâm Portrait Y',
    group: 'Layout',
  },
  thiManTargetX: {
    value: 850,
    type: 'number',
    label: 'Thị Mận Portrait X',
    group: 'Layout',
  },
  thiManTargetY: {
    value: 86,
    type: 'number',
    label: 'Thị Mận Portrait Y',
    group: 'Layout',
  },
  dialogueBoxBottomMargin: {
    value: 14,
    type: 'number',
    label: 'Dialogue Box Bottom Margin',
    group: 'Layout',
  },

  // Exact Asset Dimensions & Aspect Ratios from read_assets_metadata
  assetMenuBgAspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Menu Background Aspect Ratio',
    group: 'ASSETS',
  },
  assetMenuBgWidth: {
    value: 1376,
    type: 'number',
    label: 'Menu Background Width',
    group: 'ASSETS',
  },
  assetMenuBgHeight: {
    value: 768,
    type: 'number',
    label: 'Menu Background Height',
    group: 'ASSETS',
  },

  assetScene1BgAspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Scene 1 Background Aspect Ratio',
    group: 'ASSETS',
  },
  assetScene1BgWidth: {
    value: 1376,
    type: 'number',
    label: 'Scene 1 Background Width',
    group: 'ASSETS',
  },
  assetScene1BgHeight: {
    value: 768,
    type: 'number',
    label: 'Scene 1 Background Height',
    group: 'ASSETS',
  },

  assetNenCanh2AspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Scene 2 Background (nencanh2) Aspect Ratio',
    group: 'ASSETS',
  },
  assetNenCanh2Width: {
    value: 1376,
    type: 'number',
    label: 'Scene 2 Background (nencanh2) Width',
    group: 'ASSETS',
  },
  assetNenCanh2Height: {
    value: 768,
    type: 'number',
    label: 'Scene 2 Background (nencanh2) Height',
    group: 'ASSETS',
  },

  // nencanh4_ruong: 1376x768
  assetNenCanh4RuongAspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Scene 4 Chest Background (nencanh4_ruong) Aspect Ratio',
    group: 'ASSETS',
  },
  assetNenCanh4RuongWidth: {
    value: 1376,
    type: 'number',
    label: 'Scene 4 Chest Background Width',
    group: 'ASSETS',
  },
  assetNenCanh4RuongHeight: {
    value: 768,
    type: 'number',
    label: 'Scene 4 Chest Background Height',
    group: 'ASSETS',
  },

  // nencanh5_ruongao: 1376x768
  assetNenCanh5RuongAoAspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Scene 5 Open Chest Background (nencanh5_ruongao) Aspect Ratio',
    group: 'ASSETS',
  },
  assetNenCanh5RuongAoWidth: {
    value: 1376,
    type: 'number',
    label: 'Scene 5 Open Chest Background Width',
    group: 'ASSETS',
  },
  assetNenCanh5RuongAoHeight: {
    value: 768,
    type: 'number',
    label: 'Scene 5 Open Chest Background Height',
    group: 'ASSETS',
  },

  // sprite_lien_hoodie: 879x1024
  assetLienAspectRatio: {
    value: 879 / 1024,
    type: 'number',
    label: 'Sprite Liên Aspect Ratio',
    group: 'ASSETS',
  },
  assetLienHeight: {
    value: 636,
    type: 'number',
    label: 'Sprite Liên Height',
    group: 'ASSETS',
  },
  assetLienWidth: {
    value: Math.round(636 * (879 / 1024)),
    type: 'number',
    label: 'Sprite Liên Width',
    group: 'ASSETS',
  },

  // sprite_lien_nausong: 349x953
  assetLienNauSongAspectRatio: {
    value: 349 / 953,
    type: 'number',
    label: 'Sprite Liên Nâu Sồng Aspect Ratio',
    group: 'ASSETS',
  },
  assetLienNauSongHeight: {
    value: 632,
    type: 'number',
    label: 'Sprite Liên Nâu Sồng Height',
    group: 'ASSETS',
  },
  assetLienNauSongWidth: {
    value: Math.round(632 * (349 / 953)),
    type: 'number',
    label: 'Sprite Liên Nâu Sồng Width',
    group: 'ASSETS',
  },

  // sprite_quan_gia_lam: 991x1009
  assetQuanGiaAspectRatio: {
    value: 991 / 1009,
    type: 'number',
    label: 'Sprite Quản Gia Lâm Aspect Ratio',
    group: 'ASSETS',
  },
  assetQuanGiaHeight: {
    value: 656,
    type: 'number',
    label: 'Sprite Quản Gia Lâm Height',
    group: 'ASSETS',
  },
  assetQuanGiaWidth: {
    value: Math.round(656 * (991 / 1009)),
    type: 'number',
    label: 'Sprite Quản Gia Lâm Width',
    group: 'ASSETS',
  },

  // sprite_thiman: 920x1024
  assetThiManAspectRatio: {
    value: 920 / 1024,
    type: 'number',
    label: 'Sprite Thị Mận Aspect Ratio',
    group: 'ASSETS',
  },
  assetThiManHeight: {
    value: 628,
    type: 'number',
    label: 'Sprite Thị Mận Height',
    group: 'ASSETS',
  },
  assetThiManWidth: {
    value: Math.round(628 * (920 / 1024)),
    type: 'number',
    label: 'Sprite Thị Mận Width',
    group: 'ASSETS',
  },

  // dialogue_box_frame: 888x277
  assetDialogueBoxAspectRatio: {
    value: 888 / 277,
    type: 'number',
    label: 'Dialogue Box Frame Aspect Ratio',
    group: 'ASSETS',
  },
  assetDialogueBoxWidth: {
    value: 1088,
    type: 'number',
    label: 'Dialogue Box Frame Width',
    group: 'ASSETS',
  },
  assetDialogueBoxHeight: {
    value: Math.round(1088 / (888 / 277)),
    type: 'number',
    label: 'Dialogue Box Frame Height',
    group: 'ASSETS',
  },

  // menu_button_sprite: 814x229
  assetMenuButtonAspectRatio: {
    value: 814 / 229,
    type: 'number',
    label: 'Menu Button Sprite Aspect Ratio',
    group: 'ASSETS',
  },
  assetMenuButtonWidth: {
    value: 300,
    type: 'number',
    label: 'Menu Button Sprite Width',
    group: 'ASSETS',
  },
  assetMenuButtonHeight: {
    value: Math.round(300 / (814 / 229)),
    type: 'number',
    label: 'Menu Button Sprite Height',
    group: 'ASSETS',
  },

  // giaydo_baive: 596x844
  assetGiayDoAspectRatio: {
    value: 596 / 844,
    type: 'number',
    label: 'Dó Paper (giaydo_baive) Aspect Ratio',
    group: 'ASSETS',
  },
  assetGiayDoWidth: {
    value: 596,
    type: 'number',
    label: 'Dó Paper Width',
    group: 'ASSETS',
  },
  assetGiayDoHeight: {
    value: 844,
    type: 'number',
    label: 'Dó Paper Height',
    group: 'ASSETS',
  },

  // icon_goiy: 540x613
  assetIconGoiYAspectRatio: {
    value: 540 / 613,
    type: 'number',
    label: 'Hint Icon (icon_goiy) Aspect Ratio',
    group: 'ASSETS',
  },
  assetIconGoiYWidth: {
    value: 540,
    type: 'number',
    label: 'Hint Icon Width',
    group: 'ASSETS',
  },
  assetIconGoiYHeight: {
    value: 613,
    type: 'number',
    label: 'Hint Icon Height',
    group: 'ASSETS',
  },

  // icon_bosuutap: 794x466
  assetIconBoSuuTapAspectRatio: {
    value: 794 / 466,
    type: 'number',
    label: 'Collection Icon (icon_bosuutap) Aspect Ratio',
    group: 'ASSETS',
  },
  assetIconBoSuuTapWidth: {
    value: 794,
    type: 'number',
    label: 'Collection Icon Width',
    group: 'ASSETS',
  },
  assetIconBoSuuTapHeight: {
    value: 466,
    type: 'number',
    label: 'Collection Icon Height',
    group: 'ASSETS',
  },

  // icon_tramcai: 556x818
  assetIconTramCaiAspectRatio: {
    value: 556 / 818,
    type: 'number',
    label: 'Hairpin Icon (icon_tramcai) Aspect Ratio',
    group: 'ASSETS',
  },
  assetIconTramCaiWidth: {
    value: 556,
    type: 'number',
    label: 'Hairpin Icon Width',
    group: 'ASSETS',
  },
  assetIconTramCaiHeight: {
    value: 818,
    type: 'number',
    label: 'Hairpin Icon Height',
    group: 'ASSETS',
  },

  // nen_popup: 1376x768
  assetNenPopupAspectRatio: {
    value: 1376 / 768,
    type: 'number',
    label: 'Popup Background (nen_popup) Aspect Ratio',
    group: 'ASSETS',
  },
  assetNenPopupWidth: {
    value: 1376,
    type: 'number',
    label: 'Popup Background Width',
    group: 'ASSETS',
  },
  assetNenPopupHeight: {
    value: 768,
    type: 'number',
    label: 'Popup Background Height',
    group: 'ASSETS',
  },

  // huyhieu_biatiensi: 598x852
  assetHuyHieuBiaTienSiAspectRatio: {
    value: 598 / 852,
    type: 'number',
    label: 'Badge Bia Tiến Sĩ (huyhieu_biatiensi) Aspect Ratio',
    group: 'ASSETS',
  },
  assetHuyHieuBiaTienSiWidth: {
    value: 598,
    type: 'number',
    label: 'Badge Bia Tiến Sĩ Width',
    group: 'ASSETS',
  },
  assetHuyHieuBiaTienSiHeight: {
    value: 852,
    type: 'number',
    label: 'Badge Bia Tiến Sĩ Height',
    group: 'ASSETS',
  },

  // huyhieu_giahuanca: 1024x1024
  assetHuyHieuGiaHuanCaAspectRatio: {
    value: 1024 / 1024,
    type: 'number',
    label: 'Badge Gia Huấn Ca (huyhieu_giahuanca) Aspect Ratio',
    group: 'ASSETS',
  },
  assetHuyHieuGiaHuanCaWidth: {
    value: 1024,
    type: 'number',
    label: 'Badge Gia Huấn Ca Width',
    group: 'ASSETS',
  },
  assetHuyHieuGiaHuanCaHeight: {
    value: 1024,
    type: 'number',
    label: 'Badge Gia Huấn Ca Height',
    group: 'ASSETS',
  },

  // huyhieu_phucsac: 683x485
  assetHuyHieuPhucSacAspectRatio: {
    value: 683 / 485,
    type: 'number',
    label: 'Badge Cẩm Nang Phục Sắc (huyhieu_phucsac) Aspect Ratio',
    group: 'ASSETS',
  },
  assetHuyHieuPhucSacWidth: {
    value: 683,
    type: 'number',
    label: 'Badge Cẩm Nang Phục Sắc Width',
    group: 'ASSETS',
  },
  assetHuyHieuPhucSacHeight: {
    value: 485,
    type: 'number',
    label: 'Badge Cẩm Nang Phục Sắc Height',
    group: 'ASSETS',
  },

  // item_thebai: 241x761
  assetItemTheBaiAspectRatio: {
    value: 241 / 761,
    type: 'number',
    label: 'Item Thẻ Bài Gia Nhân (item_thebai) Aspect Ratio',
    group: 'ASSETS',
  },
  assetItemTheBaiWidth: {
    value: 241,
    type: 'number',
    label: 'Item Thẻ Bài Gia Nhân Width',
    group: 'ASSETS',
  },
  assetItemTheBaiHeight: {
    value: 761,
    type: 'number',
    label: 'Item Thẻ Bài Gia Nhân Height',
    group: 'ASSETS',
  },

  // item_tramngocbich: 484x748
  assetItemTramNgocBichAspectRatio: {
    value: 484 / 748,
    type: 'number',
    label: 'Item Trâm Cài Ngọc Bích (item_tramngocbich) Aspect Ratio',
    group: 'ASSETS',
  },
  assetItemTramNgocBichWidth: {
    value: 484,
    type: 'number',
    label: 'Item Trâm Cài Ngọc Bích Width',
    group: 'ASSETS',
  },
  assetItemTramNgocBichHeight: {
    value: 748,
    type: 'number',
    label: 'Item Trâm Cài Ngọc Bích Height',
    group: 'ASSETS',
  },
};

const {GAME_CONFIG} = globalThis as {
  GAME_CONFIG?: Record<string, unknown>;
};
if (GAME_CONFIG) {
  for (const [key, value] of Object.entries(GAME_CONFIG)) {
    if (key in CONFIG) {
      Object.assign(CONFIG[key as keyof typeof CONFIG], {value});
    }
  }
}

export type ConfigKey = keyof typeof CONFIG;

export function getConfig<K extends ConfigKey>(
  key: K,
): (typeof CONFIG)[K]['value'] {
  return CONFIG[key].value;
}

export const PRESETS = {};
