// tslint:disable
/* eslint-disable */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ACHIEVEMENT_TITLES,
  AchievementTitleDefinition,
  BadgeDefinition,
  BIA_TIEN_SI_BADGE,
  CAM_NANG_PHUC_SAC_BADGE,
  CharacterSpriteId,
  COLLECTION_BADGES,
  COLLECTION_EMPTY_TITLES_MSG,
  COLLECTION_ITEMS,
  DialogueLine,
  getConfig,
  getHintConfirmPrompt,
  getHintCost,
  getHintExhaustedMessage,
  getMaxHintsForScene,
  GIA_HUAN_CA_BADGE,
  INITIAL_KNOWLEDGE_CANDLES,
  QUIZ_FAIL_MSG,
  QUIZ_WIN_MSG,
  QuizQuestion,
  SAVE_STORAGE_KEY,
  SCENE_1_CHOICE_LABEL,
  SCENE_1_SCRIPT,
  SCENE_2_BACK_LABEL,
  SCENE_2_DO_PAPER_LINE,
  SCENE_2_INSPECTIONS,
  SCENE_2_POCKET_BUTTON_LABEL,
  SCENE_2_READ_PAPER_LABEL,
  SCENE_2_SHUDDER_LINE,
  SCENE_3_CLAIM_REWARD_LABEL,
  SCENE_3_CONFIRM_LABEL,
  SCENE_3_CORRECT_PASSCODE,
  SCENE_3_DIALOGUE_SCRIPT,
  SCENE_3_EXPLANATION_BODY,
  SCENE_3_EXPLANATION_TITLE,
  SCENE_3_POEM_LINES,
  SCENE_3_PUT_AWAY_LABEL,
  SCENE_3_PUZZLE_PROMPT,
  SCENE_3_QUIZ_BANK,
  SCENE_3_REOPEN_PAPER_LABEL,
  SCENE_3_WRONG_PASSCODE_MSG,
  SCENE_4_CANDLE_BONUS_PREFIX,
  SCENE_4_CANDLE_BONUS_VALUE,
  SCENE_4_CLUE_BOARD_TEXT,
  SCENE_4_CORRECT_PASSCODE,
  SCENE_4_DEDUCTION_NOTE,
  SCENE_4_EXPLANATION_BODY,
  SCENE_4_EXPLANATION_TITLE,
  SCENE_4_OPEN_CHEST_BUTTON_LABEL,
  SCENE_4_PART_1_SCRIPT,
  SCENE_4_PART_2_SCRIPT,
  SCENE_4_PUT_AWAY_LABEL,
  SCENE_4_PUZZLE_PROMPT,
  SCENE_4_QUIZ_BANK,
  SCENE_4_REOPEN_LOCK_LABEL,
  SCENE_4_RUN_TO_CHEST_LABEL,
  SCENE_4_WRONG_PASSCODE_MSG,
  SCENE_5_CORRECT_LINE,
  SCENE_5_FINISH_BUTTON_LABEL,
  SCENE_5_GAMEOVER_1_BULLETS,
  SCENE_5_GAMEOVER_1_HEADER,
  SCENE_5_GAMEOVER_2_BULLETS,
  SCENE_5_GAMEOVER_2_HEADER,
  SCENE_5_OPENING_SCRIPT,
  SCENE_5_QUIZ_BANK,
  SCENE_5_RETRY_BUTTON_LABEL,
  SCENE_5_REWIND_BUTTON_LABEL,
  SCENE_5_REWIND_HUMOR_TEXT,
  SCENE_5_ROBE_CHOICE_1_LABEL,
  SCENE_5_ROBE_CHOICE_2_LABEL,
  SCENE_5_ROBE_CHOICE_3_LABEL,
  SCENE_5_WHIP_FLASH_TEXT,
  SCENE_5_WRONG_1_SCRIPT,
  SCENE_5_WRONG_2_SCRIPT,
  SCENE_BACKGROUND_REGISTRY,
  SCENE_HINTS_BY_SCENE,
  Scene2ChoiceId,
  START_SCREEN_SUBTITLE,
  THE_BAI_GIA_NHAN_ITEM,
  THEME,
  TITLE_BAC_THAY_NHAP_THE,
  TITLE_PHA_GIA_CHI_TU,
  TITLE_VUA_LI_DON,
  TRAM_CAI_NGOC_BICH_ITEM,
} from './constants';
import BackgroundMusic from './utils/BackgroundMusic';
import {
  clamp,
  createFixedStepper,
  drawAsset,
  drawBackground,
  gameAudio,
  GameState,
  MenuOverlay,
  Overlay,
  prepareCanvas,
  useAssets,
  useInput,
  useIsMobile,
  useOverlayFocusNavigation,
} from './utils/helper';

/**
 * Extensible Asset Manifest Builder.
 * Binds Scene 1, Scene 2 (`nencanh2`), and Scene 3+ assets (`giaydo_baive`,
 * `icon_goiy`, `icon_bosuutap`, `nen_popup`, `huyhieu_biatiensi`) while
 * supporting `window.CUSTOM_ASSETS` overrides.
 */
function buildAssetsManifest(): Record<string, string> {
  const custom =
    typeof window !== 'undefined' && window.CUSTOM_ASSETS
      ? window.CUSTOM_ASSETS
      : {};

  const manifest: Record<string, string> = {
    menu_background:
      custom.menu_background ||
      custom.Menu_Background ||
      'assets/images/menu_background.png',
    menu_button_sprite:
      custom.menu_button_sprite ||
      custom.Menu_Button_Sprite ||
      'assets/images/menu_button_sprite.png',
    sprite_lien_hoodie:
      custom.sprite_lien_hoodie ||
      custom.Sprite_Lien_Hoodie ||
      'assets/images/sprite_lien_hoodie.png',
    sprite_quan_gia_lam:
      custom.sprite_quan_gia_lam ||
      custom.Sprite_QuanGiaLam ||
      'assets/images/sprite_quan_gia_lam.png',
    sprite_thiman:
      custom.sprite_thiman ||
      custom.Sprite_ThiMan ||
      'assets/images/sprite_thiman.png',
    dialogue_box_frame:
      custom.dialogue_box_frame ||
      custom.Dialogue_Box_Frame ||
      'assets/images/dialogue_box_frame.png',
    giaydo_baive:
      custom.giaydo_baive ||
      custom.GiayDo_BaiVe ||
      'assets/images/giaydo_baive.png',
    icon_goiy:
      custom.icon_goiy || custom.Icon_GoiY || 'assets/images/icon_goiy.png',
    icon_bosuutap:
      custom.icon_bosuutap ||
      custom.Icon_BoSuuTap ||
      'assets/images/icon_bosuutap.png',
    icon_tramcai:
      custom.icon_tramcai ||
      custom.Icon_TramCai ||
      'assets/images/icon_tramcai.png',
    nen_popup:
      custom.nen_popup || custom.Nen_Popup || 'assets/images/nen_popup.png',
    huyhieu_biatiensi:
      custom.huyhieu_biatiensi ||
      custom.HuyHieu_BiaTienSi ||
      'assets/images/huyhieu_biatiensi.png',
    huyhieu_giahuanca:
      custom.huyhieu_giahuanca ||
      custom.HuyHieu_GiaHuanCa ||
      'assets/images/huyhieu_giahuanca.png',
    nencanh5_ruongao:
      custom.nencanh5_ruongao ||
      custom.Scene5_RuongAo_Background ||
      'assets/images/nencanh5_ruongao.png',
    sprite_lien_nausong:
      custom.sprite_lien_nausong ||
      custom.Sprite_Lien_NauSong ||
      'assets/images/sprite_lien_nausong.png',
    huyhieu_phucsac:
      custom.huyhieu_phucsac ||
      custom.HuyHieu_PhucSac ||
      'assets/images/huyhieu_phucsac.png',
    item_thebai:
      custom.item_thebai ||
      custom.Item_TheBai ||
      'assets/images/item_thebai.png',
    item_tramngocbich:
      custom.item_tramngocbich ||
      custom.Item_TramNgocBich ||
      'assets/images/item_tramngocbich.png',
  };

  for (const slot of Object.values(SCENE_BACKGROUND_REGISTRY)) {
    const customOverride = custom[slot.key] || custom[slot.alias];
    if (slot.preloadByDefault || customOverride) {
      manifest[slot.key] = customOverride || slot.defaultPath;
    }
  }

  return manifest;
}

/**
 * Draws 2 distinct random quiz questions using weighted random sampling without replacement.
 * Q1–Q9 (Short Answer & True/False) hold 90% of the total weight pool while Q10 remains eligible.
 */
function pickTwoQuizQuestionsForScene(sceneNumber: number): QuizQuestion[] {
  const bank =
    sceneNumber >= 5
      ? SCENE_5_QUIZ_BANK
      : sceneNumber === 4
        ? SCENE_4_QUIZ_BANK
        : SCENE_3_QUIZ_BANK;
  const pool = [...bank];
  const picked: QuizQuestion[] = [];

  for (let drawIdx = 0; drawIdx < 2 && pool.length > 0; drawIdx++) {
    const totalWeight = pool.reduce((sum, q) => sum + q.weight, 0);
    let r = Math.random() * totalWeight;
    let chosenIdx = pool.length - 1;
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i]?.weight ?? 1;
      if (r <= 0) {
        chosenIdx = i;
        break;
      }
    }
    const [chosen] = pool.splice(chosenIdx, 1);
    if (chosen) picked.push(chosen);
  }

  return picked;
}

const ASSETS_MANIFEST: Record<string, string> = buildAssetsManifest();
const LEGACY_STORAGE_KEY = 'hlplk_standalone_state';

type ActiveSceneNumber = 1 | 2 | 3 | 4 | 5 | 6;

type Scene2Phase =
  | 'STEP1_MENU'
  | 'STEP1_INSPECT'
  | 'STEP2_SHUDDER'
  | 'STEP2_PAPER';

type Scene3Phase = 'dialogue' | 'puzzle' | 'explanation' | 'reward';

type Scene4Phase =
  | 'part1_dialogue'
  | 'part2_dialogue'
  | 'puzzle'
  | 'explanation'
  | 'reward';

type Scene5Phase =
  | 'opening_dialogue'
  | 'robe_choice'
  | 'wrong1_dialogue'
  | 'wrong2_dialogue'
  | 'whip_flash'
  | 'gameover_1'
  | 'gameover_2'
  | 'rewind_black'
  | 'correct_dialogue'
  | 'reward';

type HintOverlayView = 'MAIN' | 'CONFIRM';
type QuizRoundStatus = 'ANSWERING' | 'WON' | 'FAILED';
type CollectionMainTab = 'items' | 'titles';
type CollectionTitleSubTab = 'honor' | 'clown';

interface TrustDeltaFloating {
  id: number;
  text: string;
  tone: 'negative' | 'positive' | 'shield';
}

interface ActiveAchievementToast {
  key: number;
  item: AchievementTitleDefinition;
  exiting: boolean;
}

interface SavedGameProgress {
  version: 2;
  scene?: string;
  activeScene: ActiveSceneNumber;
  scene1LineIndex: number;
  scene1ChoiceVisible: boolean;
  scene2Phase: Scene2Phase;
  checkedChoices: Scene2ChoiceId[];
  activeInspectionId: Scene2ChoiceId | null;
  scene3Phase: Scene3Phase;
  scene3DialogueIndex: number;
  paperHidden: boolean;
  scene4Phase: Scene4Phase;
  scene4DialogueIndex: number;
  scene4ChoiceVisible: boolean;
  chestLockHidden: boolean;
  scene4CandleBonusClaimed: boolean;
  scene5Phase: Scene5Phase;
  scene5DialogueIndex: number;
  scene5WrongCount: number;
  scene5RewardClaimed: boolean;
  jadeHairpinShieldActive: boolean;
  hudUnlocked: boolean;
  trustUnlocked: boolean;
  trustPoints: number;
  scene4TrustClaimed: boolean;
  candles: number;
  hintsUsedByScene: Record<number, number>;
  unlockedBadges: string[];
  unlockedItems: string[];
  unlockedTitles: string[];
}

function readSavedProgress(): SavedGameProgress | null {
  try {
    let raw = window.localStorage?.getItem(SAVE_STORAGE_KEY);
    if (!raw) {
      raw = window.localStorage?.getItem(LEGACY_STORAGE_KEY);
    }
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedGameProgress> & {
      scene?: string;
    };
    if (!parsed || typeof parsed !== 'object') return null;

    // Migrate legacy Scene 4 / Scene 5 placeholder saves directly to active scenes
    const isLegacyS4Placeholder =
      parsed.scene === 'scene4_placeholder' ||
      (parsed.activeScene === 4 && !parsed.scene4Phase);
    const isLegacyS5Placeholder =
      parsed.scene === 'scene5_placeholder' ||
      (parsed.activeScene === 5 && !parsed.scene5Phase);

    let sc: ActiveSceneNumber = 1;
    if (parsed.scene === 'scene6_placeholder' || parsed.activeScene === 6) {
      sc = 6;
    } else if (isLegacyS5Placeholder || parsed.scene === 'scene5') {
      sc = 5;
    } else if (isLegacyS4Placeholder || parsed.scene === 'scene4') {
      sc = 4;
    } else if (
      parsed.activeScene === 1 ||
      parsed.activeScene === 2 ||
      parsed.activeScene === 3 ||
      parsed.activeScene === 4 ||
      parsed.activeScene === 5
    ) {
      sc = parsed.activeScene;
    } else {
      return null;
    }

    const validChecked = Array.isArray(parsed.checkedChoices)
      ? parsed.checkedChoices.filter(
          (c): c is Scene2ChoiceId => c === 'A' || c === 'B' || c === 'C',
        )
      : [];

    const validS2Phase: Scene2Phase =
      parsed.scene2Phase === 'STEP1_INSPECT' ||
      parsed.scene2Phase === 'STEP2_SHUDDER' ||
      parsed.scene2Phase === 'STEP2_PAPER'
        ? parsed.scene2Phase
        : 'STEP1_MENU';

    const validInspectId: Scene2ChoiceId | null =
      parsed.activeInspectionId === 'A' ||
      parsed.activeInspectionId === 'B' ||
      parsed.activeInspectionId === 'C'
        ? parsed.activeInspectionId
        : null;

    const validS3Phase: Scene3Phase =
      parsed.scene3Phase === 'puzzle' ||
      parsed.scene3Phase === 'explanation' ||
      parsed.scene3Phase === 'reward'
        ? parsed.scene3Phase
        : 'dialogue';

    const validS4Phase: Scene4Phase = isLegacyS4Placeholder
      ? 'part1_dialogue'
      : parsed.scene4Phase === 'part2_dialogue' ||
          parsed.scene4Phase === 'puzzle' ||
          parsed.scene4Phase === 'explanation' ||
          parsed.scene4Phase === 'reward'
        ? parsed.scene4Phase
        : 'part1_dialogue';

    const validS5Phase: Scene5Phase = isLegacyS5Placeholder
      ? 'opening_dialogue'
      : parsed.scene5Phase === 'robe_choice' ||
          parsed.scene5Phase === 'wrong1_dialogue' ||
          parsed.scene5Phase === 'wrong2_dialogue' ||
          parsed.scene5Phase === 'gameover_1' ||
          parsed.scene5Phase === 'gameover_2' ||
          parsed.scene5Phase === 'rewind_black' ||
          parsed.scene5Phase === 'correct_dialogue' ||
          parsed.scene5Phase === 'reward'
        ? parsed.scene5Phase
        : parsed.scene5Phase === 'whip_flash'
          ? 'gameover_1'
          : 'opening_dialogue';

    const maxS4Idx =
      validS4Phase === 'part2_dialogue'
        ? SCENE_4_PART_2_SCRIPT.length - 1
        : SCENE_4_PART_1_SCRIPT.length - 1;

    const rawHints =
      parsed.hintsUsedByScene && typeof parsed.hintsUsedByScene === 'object'
        ? parsed.hintsUsedByScene
        : {};
    const cleanHints: Record<number, number> = {};
    for (const [k, v] of Object.entries(rawHints)) {
      const nk = Number(k);
      if (Number.isFinite(nk) && typeof v === 'number') {
        cleanHints[nk] = clamp(Math.floor(v), 0, getMaxHintsForScene(nk));
      }
    }

    if (sc >= 5 && cleanHints[5] === undefined) {
      cleanHints[5] = 0;
    }

    return {
      version: 2,
      scene: sc === 6 ? 'scene6_placeholder' : `scene${sc}`,
      activeScene: sc,
      scene1LineIndex: clamp(
        typeof parsed.scene1LineIndex === 'number'
          ? Math.floor(parsed.scene1LineIndex)
          : 0,
        0,
        SCENE_1_SCRIPT.length - 1,
      ),
      scene1ChoiceVisible: Boolean(parsed.scene1ChoiceVisible),
      scene2Phase: validS2Phase,
      checkedChoices: validChecked,
      activeInspectionId: validInspectId,
      scene3Phase: validS3Phase,
      scene3DialogueIndex: clamp(
        typeof parsed.scene3DialogueIndex === 'number'
          ? Math.floor(parsed.scene3DialogueIndex)
          : 0,
        0,
        SCENE_3_DIALOGUE_SCRIPT.length - 1,
      ),
      paperHidden: Boolean(parsed.paperHidden),
      scene4Phase: validS4Phase,
      scene4DialogueIndex: isLegacyS4Placeholder
        ? 0
        : clamp(
            typeof parsed.scene4DialogueIndex === 'number'
              ? Math.floor(parsed.scene4DialogueIndex)
              : 0,
            0,
            maxS4Idx,
          ),
      scene4ChoiceVisible: isLegacyS4Placeholder
        ? false
        : Boolean(parsed.scene4ChoiceVisible),
      chestLockHidden: Boolean(parsed.chestLockHidden),
      scene4CandleBonusClaimed: Boolean(parsed.scene4CandleBonusClaimed),
      scene5Phase: validS5Phase,
      scene5DialogueIndex: isLegacyS5Placeholder
        ? 0
        : clamp(
            typeof parsed.scene5DialogueIndex === 'number'
              ? Math.floor(parsed.scene5DialogueIndex)
              : 0,
            0,
            1,
          ),
      scene5WrongCount:
        typeof parsed.scene5WrongCount === 'number' &&
        Number.isFinite(parsed.scene5WrongCount)
          ? Math.max(0, Math.floor(parsed.scene5WrongCount))
          : 0,
      scene5RewardClaimed: Boolean(parsed.scene5RewardClaimed || sc >= 6),
      jadeHairpinShieldActive: Boolean(parsed.jadeHairpinShieldActive),
      hudUnlocked: Boolean(parsed.hudUnlocked || sc >= 3),
      trustUnlocked: Boolean(parsed.trustUnlocked || sc >= 5),
      trustPoints:
        typeof parsed.trustPoints === 'number' &&
        Number.isFinite(parsed.trustPoints)
          ? Math.floor(parsed.trustPoints)
          : parsed.trustUnlocked || sc >= 5
            ? 1
            : 0,
      scene4TrustClaimed: Boolean(
        parsed.scene4TrustClaimed || parsed.trustUnlocked || sc >= 5,
      ),
      candles:
        typeof parsed.candles === 'number' && Number.isFinite(parsed.candles)
          ? Math.max(0, Math.floor(parsed.candles))
          : INITIAL_KNOWLEDGE_CANDLES,
      hintsUsedByScene: cleanHints,
      unlockedBadges: Array.isArray(parsed.unlockedBadges)
        ? parsed.unlockedBadges.filter((b): b is string => typeof b === 'string')
        : [],
      unlockedItems: Array.isArray(parsed.unlockedItems)
        ? parsed.unlockedItems.filter((b): b is string => typeof b === 'string')
        : [],
      unlockedTitles: Array.isArray(parsed.unlockedTitles)
        ? parsed.unlockedTitles.filter((b): b is string => typeof b === 'string')
        : [],
    };
  } catch {
    return null;
  }
}

function writeSavedProgress(snapshot: SavedGameProgress): void {
  try {
    window.localStorage?.setItem(SAVE_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore restricted localStorage environments
  }
}

function clearSavedProgress(): void {
  try {
    window.localStorage?.removeItem(SAVE_STORAGE_KEY);
    window.localStorage?.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore restricted localStorage environments
  }
}

interface CustomWindow extends Window {
  canHandleBackKey?: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
}

interface SceneRenderState {
  shakeTimer: number;
  shakeOffsetX: number;
  shakeOffsetY: number;
  elapsedTime: number;
  dust: DustParticle[];
}

interface TouchSafeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  disabled?: boolean;
  testId?: string;
  ariaLabel?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * Reusable interactive button enforcing full pointer lifecycle handlers
 * (onPointerDown, onPointerUp, onPointerLeave, onPointerCancel) + touch-none
 * and pointer-events-auto directly on the <button> element.
 */
function TouchSafeButton({
  onClick,
  children,
  className = '',
  style,
  autoFocus,
  disabled = false,
  testId,
  ariaLabel,
  buttonRef,
}: TouchSafeButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      autoFocus={autoFocus}
      data-testid={testId}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (!disabled) gameAudio.playHoverMicroTone();
      }}
      onPointerDown={() => {
        if (!disabled) setPressed(true);
      }}
      onPointerUp={() => {
        setPressed(false);
      }}
      onPointerLeave={() => {
        setPressed(false);
      }}
      onPointerCancel={() => {
        setPressed(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPressed(false);
        if (!disabled) onClick();
      }}
      style={style}
      className={`touch-none pointer-events-auto select-none min-w-[48px] min-h-[48px] transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : pressed
            ? 'scale-[0.97] brightness-95'
            : 'hover:scale-[1.02] hover:brightness-110'
      } ${className}`}>
      {children}
    </button>
  );
}

/**
 * Historical Badge Card styled with rich red-gold-brown borders (#8B1E1E, #D4AF37, #4A2511).
 * Shared between the Collection Overlay and the Scene 3 Celebratory Reward Popup.
 */
function HistoricalBadgeCard({
  badge,
  imgLoaded,
  imgSrc,
  onClick,
  compact = false,
}: {
  badge: BadgeDefinition;
  imgLoaded: boolean;
  imgSrc: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <TouchSafeButton
      onClick={onClick}
      testId={`badge-card-${badge.id}`}
      ariaLabel={`Xem chi tiết huy hiệu ${badge.title}`}
      style={{
        background: `linear-gradient(180deg, ${THEME.colors.badgeRed} 0%, ${THEME.colors.badgeBrown} 100%)`,
        borderColor: THEME.colors.badgeGold,
        boxShadow: `0 0 0 3px ${THEME.colors.badgeBrown}, 0 12px 28px rgba(0, 0, 0, 0.85), inset 0 0 14px rgba(212, 175, 55, 0.28)`,
      }}
      className={`flex flex-col items-center justify-between rounded-xl border-2 p-2.5 sm:p-3 text-center ${
        compact ? 'w-[152px] sm:w-[176px]' : 'w-[164px] sm:w-[192px]'
      }`}>
      <div
        style={{
          backgroundColor: 'rgba(26, 12, 7, 0.72)',
          borderColor: 'rgba(212, 175, 55, 0.55)',
          height: compact ? '156px' : '176px',
        }}
        className="w-full rounded-lg border p-2 flex items-center justify-center overflow-hidden mb-2">
        {imgLoaded ? (
          <img
            src={imgSrc}
            alt={badge.title}
            style={{aspectRatio: `${badge.aspectRatio}`}}
            className="max-w-full max-h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] rounded"
          />
        ) : badge.id === GIA_HUAN_CA_BADGE.id ? (
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full object-contain"
            aria-hidden="true">
            <rect
              x="16"
              y="26"
              width="88"
              height="68"
              rx="6"
              fill="#d9b87c"
              stroke="#6e4720"
              strokeWidth="4"
            />
            <rect x="10" y="20" width="12" height="80" rx="5" fill="#8b5a2b" />
            <rect x="98" y="20" width="12" height="80" rx="5" fill="#8b5a2b" />
          </svg>
        ) : badge.id === CAM_NANG_PHUC_SAC_BADGE.id ? (
          <svg
            viewBox="0 0 140 100"
            className="w-full h-full object-contain"
            aria-hidden="true">
            <rect
              x="12"
              y="14"
              width="116"
              height="72"
              rx="6"
              fill="#ebd6ad"
              stroke="#6e4720"
              strokeWidth="4"
            />
            <line
              x1="70"
              y1="14"
              x2="70"
              y2="86"
              stroke="#8b5a2b"
              strokeWidth="3"
            />
            <circle cx="104" cy="68" r="14" fill="#a61b1b" stroke="#ffd700" strokeWidth="2.5" />
          </svg>
        ) : badge.id === THE_BAI_GIA_NHAN_ITEM.id ? (
          <svg
            viewBox="0 0 80 180"
            className="w-full h-full object-contain"
            aria-hidden="true">
            <rect
              x="20"
              y="26"
              width="40"
              height="132"
              rx="8"
              fill="#332018"
              stroke="#c9a24d"
              strokeWidth="3.5"
            />
            <circle cx="40" cy="40" r="5" fill="#1a110d" stroke="#c9a24d" strokeWidth="2" />
          </svg>
        ) : badge.id === TRAM_CAI_NGOC_BICH_ITEM.id ? (
          <svg
            viewBox="0 0 100 150"
            className="w-full h-full object-contain"
            aria-hidden="true">
            <line
              x1="22"
              y1="132"
              x2="68"
              y2="46"
              stroke="#2dd4bf"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="72" cy="36" r="18" fill="#34d399" stroke="#d4af37" strokeWidth="3" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 120 170"
            className="w-full h-full object-contain"
            aria-hidden="true">
            <rect
              x="30"
              y="18"
              width="60"
              height="96"
              rx="24"
              fill="#7c9099"
              stroke="#45565e"
              strokeWidth="4"
            />
            <rect
              x="38"
              y="40"
              width="44"
              height="66"
              fill="#95a7b0"
              stroke="#52656e"
              strokeWidth="2.5"
            />
            <ellipse
              cx="62"
              cy="132"
              rx="38"
              ry="20"
              fill="#647982"
              stroke="#3b4b52"
              strokeWidth="3.5"
            />
            <circle
              cx="22"
              cy="126"
              r="11"
              fill="#738891"
              stroke="#3b4b52"
              strokeWidth="3"
            />
          </svg>
        )}
      </div>

      <span
        style={{
          fontFamily: THEME.fonts.heading,
          color: '#FFF6D6',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.95)',
        }}
        className="text-xs sm:text-sm font-bold leading-snug px-1">
        {badge.title}
      </span>
    </TouchSafeButton>
  );
}

/**
 * Crisp Dó Paper (`giaydo_baive`) with solid pure `#000000` 10-line poem (zero glow/blur).
 */
function forcePureBlackPoemStyle(el: HTMLElement | null) {
  if (!el) return;
  el.style.setProperty('color', '#000000', 'important');
  el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
  el.style.setProperty('text-shadow', 'none', 'important');
  el.style.setProperty('filter', 'none', 'important');
  el.style.setProperty('-webkit-filter', 'none', 'important');
  el.style.setProperty('mix-blend-mode', 'normal', 'important');
  el.style.setProperty('opacity', '1', 'important');
}

function DoPaperPoemCard({
  giayDoLoaded,
  imgSrc,
  compactForDialogue = false,
}: {
  giayDoLoaded: boolean;
  imgSrc: string;
  compactForDialogue?: boolean;
}) {
  return (
    <div
      style={{
        aspectRatio: `${getConfig('assetGiayDoAspectRatio')}`,
        width: compactForDialogue
          ? undefined
          : 'clamp(180px, min(90vw, calc((100vh - 152px) * 0.73)), 560px)',
        height: compactForDialogue ? '100%' : undefined,
      }}
      className="relative flex items-center justify-center select-none shrink-0">
      {giayDoLoaded ? (
        <img
          src={imgSrc}
          alt="Mảnh giấy dó cổ"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_18px_36px_rgba(0,0,0,0.9)]"
        />
      ) : (
        <div
          style={{
            background:
              'linear-gradient(135deg, #ebd6ad 0%, #dfc18d 48%, #d2ae74 100%)',
            boxShadow:
              '0 18px 36px rgba(0,0,0,0.9), inset 0 0 28px rgba(112, 74, 28, 0.38)',
          }}
          className="absolute inset-0 rounded-sm border-2 border-amber-900/50 pointer-events-none">
          <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-amber-950/20" />
          <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-amber-950/20" />
        </div>
      )}

      {/* Exact 10-line Poem forced strictly to pure solid black (#000000) with zero shadow/glow */}
      <div
        ref={forcePureBlackPoemStyle}
        style={{
          fontFamily: THEME.fonts.heading,
          color: '#000000',
          WebkitTextFillColor: '#000000',
          textShadow: 'none',
          filter: 'none',
          mixBlendMode: 'normal',
        }}
        className={`vn-poem-container ${
          compactForDialogue ? 'is-phase1-compact' : ''
        } absolute inset-0 z-10 w-full h-full px-[2.8%] py-[4.5%] flex flex-col items-center justify-center text-center overflow-hidden`}>
        {SCENE_3_POEM_LINES.map((poemLine, idx) => (
          <p
            key={idx}
            ref={forcePureBlackPoemStyle}
            style={{
              color: '#000000',
              WebkitTextFillColor: '#000000',
              textShadow: 'none',
              filter: 'none',
              mixBlendMode: 'normal',
            }}
            className="vn-poem-line font-bold italic whitespace-nowrap m-0">
            {poemLine}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * Rich procedural fallback renderer for `nencanh2` (Scene 2 & Scene 3 Background)
 * so offline mode continues working seamlessly if `nencanh2.png` is unavailable.
 */
function drawProceduralScene2Background(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  elapsed: number,
) {
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
  wallGrad.addColorStop(0, '#1b1510');
  wallGrad.addColorStop(0.58, '#2b2118');
  wallGrad.addColorStop(1, '#19130e');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#140f0b';
  ctx.fillRect(0, 0, w, h * 0.08);
  ctx.fillRect(w * 0.44, 0, 26, h * 0.68);
  ctx.fillRect(w * 0.86, 0, 28, h * 0.7);

  const doorX = w * 0.58;
  const doorY = h * 0.16;
  const doorW = w * 0.21;
  const doorH = h * 0.54;

  const mistGrad = ctx.createLinearGradient(
    doorX + doorW * 0.48,
    doorY,
    doorX + doorW,
    doorY + doorH,
  );
  mistGrad.addColorStop(0, '#8ba3a8');
  mistGrad.addColorStop(0.55, '#5a7276');
  mistGrad.addColorStop(1, '#3d4d47');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(doorX, doorY, doorW, doorH);

  ctx.fillStyle = 'rgba(42, 54, 52, 0.72)';
  ctx.beginPath();
  ctx.moveTo(doorX + doorW * 0.52, doorY + doorH * 0.28);
  ctx.quadraticCurveTo(
    doorX + doorW * 0.78,
    doorY + doorH * 0.18,
    doorX + doorW,
    doorY + doorH * 0.22,
  );
  ctx.lineTo(doorX + doorW, doorY + doorH * 0.34);
  ctx.lineTo(doorX + doorW * 0.52, doorY + doorH * 0.34);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#2d2016';
  ctx.fillRect(doorX - 10, doorY - 12, doorW + 20, 14);
  ctx.fillRect(doorX, doorY, doorW * 0.52, doorH);
  ctx.fillStyle = '#6f878d';
  for (let s = 0; s < 5; s++) {
    const sx = doorX + 12 + s * ((doorW * 0.44) / 5);
    ctx.fillRect(sx, doorY + 18, 6, doorH * 0.36);
    ctx.fillRect(sx, doorY + doorH * 0.56, 6, doorH * 0.34);
  }

  ctx.fillStyle = '#241b14';
  ctx.fillRect(0, h * 0.7, w, h * 0.3);

  ctx.fillStyle = '#4e3c24';
  ctx.beginPath();
  ctx.ellipse(
    w * 0.34,
    h * 0.58,
    Math.max(10, w * 0.12),
    Math.max(10, h * 0.08),
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.fillStyle = '#3c2a1b';
  ctx.fillRect(w * 0.8, h * 0.58, w * 0.16, h * 0.14);

  const jars = [
    {cx: w * 0.1, cy: h * 0.66, rx: 68, ry: 98},
    {cx: w * 0.39, cy: h * 0.66, rx: 56, ry: 78},
    {cx: w * 0.505, cy: h * 0.62, rx: 64, ry: 92},
  ];
  for (const jar of jars) {
    ctx.fillStyle = '#4a2e1b';
    ctx.beginPath();
    ctx.ellipse(
      jar.cx,
      jar.cy,
      Math.max(8, jar.rx),
      Math.max(8, jar.ry),
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  const lampX = w * 0.512;
  const lampY = h * 0.495;
  const flicker = 1 + Math.sin(elapsed * 9.5) * 0.08;
  const glowRadius = Math.max(12, 135 * flicker);
  const lampGlow = ctx.createRadialGradient(
    lampX,
    lampY,
    4,
    lampX,
    lampY,
    glowRadius,
  );
  lampGlow.addColorStop(0, 'rgba(255, 224, 140, 0.92)');
  lampGlow.addColorStop(0.35, 'rgba(245, 158, 56, 0.38)');
  lampGlow.addColorStop(1, 'rgba(245, 158, 56, 0)');
  ctx.fillStyle = lampGlow;
  ctx.beginPath();
  ctx.arc(lampX, lampY, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2d1c12';
  ctx.beginPath();
  ctx.ellipse(lampX, lampY + 12, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffd56b';
  ctx.beginPath();
  ctx.ellipse(
    lampX,
    lampY,
    Math.max(3, 5 * flicker),
    Math.max(6, 11 * flicker),
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

function drawProceduralScene4ChestBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  elapsed: number,
) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#18110c');
  bg.addColorStop(0.6, '#261a12');
  bg.addColorStop(1, '#160f0a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#231710';
  ctx.fillRect(0, h * 0.66, w, h * 0.34);

  const chestX = w * 0.14;
  const chestY = h * 0.42;
  const chestW = w * 0.42;
  const chestH = h * 0.38;
  ctx.fillStyle = '#3b1d12';
  ctx.fillRect(chestX, chestY, chestW, chestH);
  ctx.strokeStyle = '#9c7838';
  ctx.lineWidth = 5;
  ctx.strokeRect(chestX, chestY, chestW, chestH);

  const lampX = w * 0.483;
  const lampY = h * 0.352;
  const flicker = 1 + Math.sin(elapsed * 9.2) * 0.08;
  const glowR = Math.max(14, 150 * flicker);
  const glow = ctx.createRadialGradient(lampX, lampY, 4, lampX, lampY, glowR);
  glow.addColorStop(0, 'rgba(255, 224, 140, 0.9)');
  glow.addColorStop(0.4, 'rgba(245, 158, 56, 0.35)');
  glow.addColorStop(1, 'rgba(245, 158, 56, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
  ctx.fill();
}

function drawProceduralScene5ChestBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  elapsed: number,
) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#16110d');
  bg.addColorStop(0.55, '#251a12');
  bg.addColorStop(1, '#140e09');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Open wooden chest lid & body
  ctx.fillStyle = '#3d2417';
  ctx.fillRect(w * 0.22, h * 0.12, w * 0.52, h * 0.32);
  ctx.strokeStyle = '#8b6534';
  ctx.lineWidth = 4;
  ctx.strokeRect(w * 0.22, h * 0.12, w * 0.52, h * 0.32);

  ctx.fillStyle = '#29170f';
  ctx.fillRect(w * 0.21, h * 0.44, w * 0.56, h * 0.38);
  ctx.strokeStyle = '#9c7838';
  ctx.strokeRect(w * 0.21, h * 0.44, w * 0.56, h * 0.38);

  // Three folded Giao Linh robes inside chest: Yellow, Crimson-Purple, Rustic Brown
  ctx.fillStyle = '#d49b1a';
  ctx.fillRect(w * 0.29, h * 0.46, w * 0.11, h * 0.2);
  ctx.fillStyle = '#882448';
  ctx.fillRect(w * 0.44, h * 0.46, w * 0.12, h * 0.2);
  ctx.fillStyle = '#4a3525';
  ctx.fillRect(w * 0.6, h * 0.46, w * 0.1, h * 0.2);

  const lampX = w * 0.7;
  const lampY = h * 0.36;
  const flicker = 1 + Math.sin(elapsed * 9.0) * 0.08;
  const glowR = Math.max(14, 155 * flicker);
  const glow = ctx.createRadialGradient(lampX, lampY, 4, lampX, lampY, glowR);
  glow.addColorStop(0, 'rgba(255, 224, 140, 0.9)');
  glow.addColorStop(0.4, 'rgba(245, 158, 56, 0.35)');
  glow.addColorStop(1, 'rgba(245, 158, 56, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
  ctx.fill();
}

function AchievementEmblemIcon({variant}: {variant: 'honor' | 'clown'}) {
  if (variant === 'honor') {
    return (
      <svg
        viewBox="0 0 64 64"
        className="w-8 h-8 sm:w-9 sm:h-9"
        aria-hidden="true">
        <rect
          x="14"
          y="24"
          width="36"
          height="26"
          rx="4"
          fill="#ffd700"
          stroke="#926214"
          strokeWidth="2.5"
        />
        <path
          d="M23 24 C23 14, 41 14, 41 24"
          fill="none"
          stroke="#ffd700"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="14" r="4.5" fill="#fff3b0" />
        <path
          d="M20 33 H44 M20 40 H44 M32 28 V45"
          stroke="#8b4513"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-8 h-8 sm:w-9 sm:h-9"
      aria-hidden="true">
      <path
        d="M14 18 C14 10, 50 10, 50 18 L48 38 C48 50, 16 50, 16 38 Z"
        fill="#f8fafc"
        stroke="#b82929"
        strokeWidth="3"
      />
      <path
        d="M20 25 Q25 20 29 25 M35 25 Q39 20 44 25"
        fill="none"
        stroke="#1c1917"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="23" cy="31" r="2.5" fill="#dc2626" />
      <circle cx="41" cy="31" r="2.5" fill="#dc2626" />
      <path
        d="M21 37 Q32 48 43 37"
        fill="none"
        stroke="#b82929"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeSoCloudCorners({color}: {color: string}) {
  const cornerSvg = (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path
        d="M2 14 V4 Q2 2 4 2 H14 M6 10 Q6 6 10 6"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  return (
    <>
      <span className="absolute top-1 left-1 pointer-events-none">
        {cornerSvg}
      </span>
      <span className="absolute top-1 right-1 scale-x-[-1] pointer-events-none">
        {cornerSvg}
      </span>
      <span className="absolute bottom-1 left-1 scale-y-[-1] pointer-events-none">
        {cornerSvg}
      </span>
      <span className="absolute bottom-1 right-1 scale-[-1] pointer-events-none">
        {cornerSvg}
      </span>
    </>
  );
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startScreenRef = useRef<HTMLDivElement>(null);
  const step1MenuRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const bottomActionBtnRef = useRef<HTMLButtonElement>(null);
  const passcodeInputRef = useRef<HTMLInputElement>(null);
  const scene4PasscodeInputRef = useRef<HTMLInputElement>(null);
  const quizInputRef = useRef<HTMLInputElement>(null);
  const stepperRef = useRef<ReturnType<typeof createFixedStepper>>();

  // --- GLOBAL PAUSE / CANCEL EDGE STATE ---
  const lastCancelRef = useRef(false);
  const lastConfirmRef = useRef(false);
  const staffKnockTimeoutRef = useRef<number | null>(null);
  const sceneShakeTimeoutRef = useRef<number | null>(null);
  const passcodeShakeTimeoutRef = useRef<number | null>(null);
  const bonusToastTimeoutRef = useRef<number | null>(null);
  const whipFlashTimeoutRef = useRef<number | null>(null);
  const trustDeltaTimeoutRef = useRef<number | null>(null);
  const achievementHoldTimeoutRef = useRef<number | null>(null);
  const achievementExitTimeoutRef = useRef<number | null>(null);
  const scene5ChoiceMenuRef = useRef<HTMLDivElement>(null);

  // --- MOBILE DETECTION ---
  const isMobile = useIsMobile();

  // --- ASSETS ---
  const {assets, isReady: assetsReady} = useAssets(ASSETS_MANIFEST);

  const canvasWidth = getConfig('baseCanvasWidth');
  const canvasHeight = getConfig('baseCanvasHeight');

  if (!stepperRef.current) {
    const stepMs = getConfig('stepMs');
    const maxSubSteps = getConfig('maxSubSteps');
    stepperRef.current = createFixedStepper(stepMs, maxSubSteps);
  }

  // --- AUDIO & OVERLAY UI STATES ---
  const [isMusicMuted, setIsMusicMuted] = useState(() => {
    try {
      return window.localStorage?.getItem('hlplk_music_muted') === '1';
    } catch {
      return false;
    }
  });
  const [isSfxMuted, setIsSfxMuted] = useState(() => {
    try {
      const muted = window.localStorage?.getItem('hlplk_sfx_muted') === '1';
      gameAudio.setMuted(muted);
      return muted;
    } catch {
      return gameAudio.getMuteState();
    }
  });
  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // --- SCENE & VISUAL NOVEL DIALOGUE STATES ---
  const [activeScene, setActiveScene] = useState<ActiveSceneNumber>(1);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [revealedChars, setRevealedChars] = useState(0);
  const [isLineComplete, setIsLineComplete] = useState(false);
  const [isChoiceVisible, setIsChoiceVisible] = useState(false);

  // Scene 2 specific states
  const [scene2Phase, setScene2Phase] = useState<Scene2Phase>('STEP1_MENU');
  const [checkedChoices, setCheckedChoices] = useState<Scene2ChoiceId[]>([]);
  const [activeInspectionId, setActiveInspectionId] =
    useState<Scene2ChoiceId | null>(null);
  const [sceneShakeDurationMs, setSceneShakeDurationMs] = useState<number>(0);

  // Scene 3 specific states ('dialogue' -> 'puzzle' -> 'explanation' -> 'reward')
  const [scene3Phase, setScene3Phase] = useState<Scene3Phase>('dialogue');
  const [scene3DialogueIndex, setScene3DialogueIndex] = useState(0);
  const [hudUnlocked, setHudUnlocked] = useState(false);
  const [isDoPaperOpen, setIsDoPaperOpen] = useState(true);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isPasscodeShaking, setIsPasscodeShaking] = useState(false);

  // Scene 4 specific states ('part1_dialogue' -> 'part2_dialogue' -> 'puzzle' -> 'explanation' -> 'reward')
  const [scene4Phase, setScene4Phase] =
    useState<Scene4Phase>('part1_dialogue');
  const [scene4DialogueIndex, setScene4DialogueIndex] = useState(0);
  const [isScene4ChoiceVisible, setIsScene4ChoiceVisible] = useState(false);
  const [isChestLockOpen, setIsChestLockOpen] = useState(true);
  const [scene4PasscodeInput, setScene4PasscodeInput] = useState('');
  const [scene4PasscodeError, setScene4PasscodeError] = useState('');
  const [scene4CandleBonusClaimed, setScene4CandleBonusClaimed] =
    useState(false);
  const [isCandleBonusToastVisible, setIsCandleBonusToastVisible] =
    useState(false);

  // Celebratory Reward Popup (shared by Scene 3 & Scene 4)
  const [isRewardPopupOpen, setIsRewardPopupOpen] = useState(false);
  const [rewardPopupBadge, setRewardPopupBadge] =
    useState<BadgeDefinition>(BIA_TIEN_SI_BADGE);

  // Scene 5 specific states
  const [scene5Phase, setScene5Phase] =
    useState<Scene5Phase>('opening_dialogue');
  const [scene5DialogueIndex, setScene5DialogueIndex] = useState(0);
  const [scene5WrongCount, setScene5WrongCount] = useState(0);
  const [scene5RewardClaimed, setScene5RewardClaimed] = useState(false);
  const [jadeHairpinShieldActive, setJadeHairpinShieldActive] = useState(false);
  const [pendingGameOverBranch, setPendingGameOverBranch] = useState<1 | 2>(1);

  // Trust Points ("Điểm Tín Nhiệm" / "Chiếc trâm cài") HUD states
  const [trustUnlocked, setTrustUnlocked] = useState(false);
  const [trustPoints, setTrustPoints] = useState(0);
  const [scene4TrustClaimed, setScene4TrustClaimed] = useState(false);
  const [trustDeltaAnim, setTrustDeltaAnim] =
    useState<TrustDeltaFloating | null>(null);

  // Knowledge Candle Hint & Quiz System states
  const [candleCount, setCandleCount] = useState<number>(
    INITIAL_KNOWLEDGE_CANDLES,
  );
  const [hintsUsedByScene, setHintsUsedByScene] = useState<
    Record<number, number>
  >({});
  const [isHintOverlayOpen, setIsHintOverlayOpen] = useState(false);
  const [hintOverlayView, setHintOverlayView] =
    useState<HintOverlayView>('MAIN');
  const [activeHintModalText, setActiveHintModalText] = useState<
    string | null
  >(null);

  // Quiz Mini-Game states
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizStepIndex, setQuizStepIndex] = useState(0);
  const [quizAnswerInput, setQuizAnswerInput] = useState('');
  const [quizRoundStatus, setQuizRoundStatus] =
    useState<QuizRoundStatus>('ANSWERING');

  // Historical Badge, Item & Achievement ("Danh hiệu") Collection states
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [unlockedTitles, setUnlockedTitles] = useState<string[]>([]);
  const [isCollectionOverlayOpen, setIsCollectionOverlayOpen] = useState(false);
  const [collectionMainTab, setCollectionMainTab] =
    useState<CollectionMainTab>('items');
  const [collectionTitleSubTab, setCollectionTitleSubTab] =
    useState<CollectionTitleSubTab>('honor');
  const [activeBadgeDetail, setActiveBadgeDetail] =
    useState<BadgeDefinition | null>(null);
  const [activeAchievementToast, setActiveAchievementToast] =
    useState<ActiveAchievementToast | null>(null);

  const [dialogueShakeOffset, setDialogueShakeOffset] = useState<{
    x: number;
    y: number;
  }>({x: 0, y: 0});

  const activeSceneRef = useRef<ActiveSceneNumber>(1);
  activeSceneRef.current = activeScene;

  const scene2PhaseRef = useRef<Scene2Phase>('STEP1_MENU');
  scene2PhaseRef.current = scene2Phase;

  const scene3PhaseRef = useRef<Scene3Phase>('dialogue');
  scene3PhaseRef.current = scene3Phase;

  const scene3DialogueIndexRef = useRef<number>(0);
  scene3DialogueIndexRef.current = scene3DialogueIndex;

  const scene4PhaseRef = useRef<Scene4Phase>('part1_dialogue');
  scene4PhaseRef.current = scene4Phase;

  const scene4DialogueIndexRef = useRef<number>(0);
  scene4DialogueIndexRef.current = scene4DialogueIndex;

  const isScene4ChoiceVisibleRef = useRef(false);
  isScene4ChoiceVisibleRef.current = isScene4ChoiceVisible;

  const scene4CandleBonusClaimedRef = useRef(false);
  scene4CandleBonusClaimedRef.current = scene4CandleBonusClaimed;

  const scene4TrustClaimedRef = useRef(false);
  scene4TrustClaimedRef.current = scene4TrustClaimed;

  const scene5PhaseRef = useRef<Scene5Phase>('opening_dialogue');
  scene5PhaseRef.current = scene5Phase;

  const scene5DialogueIndexRef = useRef<number>(0);
  scene5DialogueIndexRef.current = scene5DialogueIndex;

  const scene5WrongCountRef = useRef<number>(0);
  scene5WrongCountRef.current = scene5WrongCount;

  const scene5RewardClaimedRef = useRef<boolean>(false);
  scene5RewardClaimedRef.current = scene5RewardClaimed;

  const jadeHairpinShieldActiveRef = useRef<boolean>(false);
  jadeHairpinShieldActiveRef.current = jadeHairpinShieldActive;

  const hintsUsedBySceneRef = useRef<Record<number, number>>({});
  hintsUsedBySceneRef.current = hintsUsedByScene;

  const unlockedTitlesRef = useRef<string[]>([]);
  unlockedTitlesRef.current = unlockedTitles;

  const achievementQueueRef = useRef<AchievementTitleDefinition[]>([]);
  const achievementToastActiveRef = useRef<boolean>(false);

  const checkedChoicesRef = useRef<Scene2ChoiceId[]>([]);
  checkedChoicesRef.current = checkedChoices;

  const activeInspectionIdRef = useRef<Scene2ChoiceId | null>(null);
  activeInspectionIdRef.current = activeInspectionId;

  const activeDialogueLineRef = useRef<DialogueLine>(SCENE_1_SCRIPT[0]);
  const currentLineIndexRef = useRef(0);
  const revealedFloatRef = useRef(0);
  const lastRevealedIntRef = useRef(0);
  const isLineCompleteRef = useRef(false);
  const isChoiceVisibleRef = useRef(false);

  const isExplanationModalOpen =
    (activeScene === 3 && scene3Phase === 'explanation') ||
    (activeScene === 4 && scene4Phase === 'explanation');

  const hasAnyModalOpen =
    isGameMenuOpen ||
    isHowToPlayOpen ||
    isExplanationModalOpen ||
    isRewardPopupOpen ||
    isHintOverlayOpen ||
    isCollectionOverlayOpen ||
    activeHintModalText !== null ||
    isQuizModalOpen ||
    activeBadgeDetail !== null;

  const isPausedOverlayRef = useRef(false);
  isPausedOverlayRef.current = hasAnyModalOpen;

  const createInitialDust = useCallback((): DustParticle[] => {
    const count = getConfig('ambientDustCount');
    const list: DustParticle[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight * 0.78,
        vx: (Math.random() - 0.35) * 14,
        vy: -4 - Math.random() * 10,
        radius: 1.2 + Math.random() * 2.2,
        alpha: 0.12 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, [canvasWidth, canvasHeight]);

  const sceneRenderRef = useRef<SceneRenderState>({
    shakeTimer: 0,
    shakeOffsetX: 0,
    shakeOffsetY: 0,
    elapsedTime: 0,
    dust: [],
  });

  useEffect(() => {
    gameAudio.setVolume(getConfig('defaultSfxVolume'));
    return () => {
      if (staffKnockTimeoutRef.current !== null) {
        window.clearTimeout(staffKnockTimeoutRef.current);
        staffKnockTimeoutRef.current = null;
      }
      if (sceneShakeTimeoutRef.current !== null) {
        window.clearTimeout(sceneShakeTimeoutRef.current);
        sceneShakeTimeoutRef.current = null;
      }
      if (passcodeShakeTimeoutRef.current !== null) {
        window.clearTimeout(passcodeShakeTimeoutRef.current);
        passcodeShakeTimeoutRef.current = null;
      }
      if (bonusToastTimeoutRef.current !== null) {
        window.clearTimeout(bonusToastTimeoutRef.current);
        bonusToastTimeoutRef.current = null;
      }
      if (whipFlashTimeoutRef.current !== null) {
        window.clearTimeout(whipFlashTimeoutRef.current);
        whipFlashTimeoutRef.current = null;
      }
      if (trustDeltaTimeoutRef.current !== null) {
        window.clearTimeout(trustDeltaTimeoutRef.current);
        trustDeltaTimeoutRef.current = null;
      }
      if (achievementHoldTimeoutRef.current !== null) {
        window.clearTimeout(achievementHoldTimeoutRef.current);
        achievementHoldTimeoutRef.current = null;
      }
      if (achievementExitTimeoutRef.current !== null) {
        window.clearTimeout(achievementExitTimeoutRef.current);
        achievementExitTimeoutRef.current = null;
      }
    };
  }, []);

  const [gameState, setGameState] = useState<GameState>({
    status: 'START',
    score: 0,
    level: 1,
  });

  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  // --- AUTO-SAVE GAMEPLAY PROGRESS TO LOCALSTORAGE ---
  // Strictly guarded so visiting Start Screen (`status === 'START'`) NEVER overwrites a valid save!
  useEffect(() => {
    if (gameState.status !== 'PLAYING') return;
    writeSavedProgress({
      version: 2,
      scene: activeScene === 6 ? 'scene6_placeholder' : `scene${activeScene}`,
      activeScene,
      scene1LineIndex: currentLineIndex,
      scene1ChoiceVisible: isChoiceVisible,
      scene2Phase,
      checkedChoices,
      activeInspectionId,
      scene3Phase,
      scene3DialogueIndex,
      paperHidden: !isDoPaperOpen,
      scene4Phase,
      scene4DialogueIndex,
      scene4ChoiceVisible: isScene4ChoiceVisible,
      chestLockHidden: !isChestLockOpen,
      scene4CandleBonusClaimed,
      scene5Phase:
        scene5Phase === 'whip_flash'
          ? pendingGameOverBranch === 2
            ? 'gameover_2'
            : 'gameover_1'
          : scene5Phase,
      scene5DialogueIndex,
      scene5WrongCount,
      scene5RewardClaimed,
      jadeHairpinShieldActive,
      hudUnlocked,
      trustUnlocked,
      trustPoints,
      scene4TrustClaimed,
      candles: candleCount,
      hintsUsedByScene,
      unlockedBadges,
      unlockedItems,
      unlockedTitles,
    });
  }, [
    gameState.status,
    activeScene,
    currentLineIndex,
    isChoiceVisible,
    scene2Phase,
    checkedChoices,
    activeInspectionId,
    scene3Phase,
    scene3DialogueIndex,
    isDoPaperOpen,
    scene4Phase,
    scene4DialogueIndex,
    isScene4ChoiceVisible,
    isChestLockOpen,
    scene4CandleBonusClaimed,
    scene5Phase,
    pendingGameOverBranch,
    scene5DialogueIndex,
    scene5WrongCount,
    scene5RewardClaimed,
    jadeHairpinShieldActive,
    hudUnlocked,
    trustUnlocked,
    trustPoints,
    scene4TrustClaimed,
    candleCount,
    hintsUsedByScene,
    unlockedBadges,
    unlockedItems,
    unlockedTitles,
  ]);

  useEffect(() => {
    const canHandleBackKey = gameState.status !== 'START' || hasAnyModalOpen;
    (window as CustomWindow).canHandleBackKey = canHandleBackKey;
  }, [gameState.status, hasAnyModalOpen]);

  // Focus & D-pad navigation on Start screen
  useOverlayFocusNavigation(
    startScreenRef,
    gameState.status === 'START' && assetsReady,
  );

  // Focus & D-pad navigation on Top-Left Menu Dropdown
  useOverlayFocusNavigation(
    menuDropdownRef,
    gameState.status === 'PLAYING' && isGameMenuOpen && !isHowToPlayOpen,
  );

  // Focus & D-pad navigation on Scene 2 Step 1 centered dark red choice buttons
  useOverlayFocusNavigation(
    step1MenuRef,
    gameState.status === 'PLAYING' &&
      activeScene === 2 &&
      scene2Phase === 'STEP1_MENU' &&
      !hasAnyModalOpen,
  );

  useOverlayFocusNavigation(
    scene5ChoiceMenuRef,
    gameState.status === 'PLAYING' &&
      activeScene === 5 &&
      scene5Phase === 'robe_choice' &&
      !hasAnyModalOpen,
  );

  useEffect(() => {
    if (gameState.status !== 'PLAYING' || hasAnyModalOpen || !isLineComplete) {
      return;
    }
    if (activeScene === 1 && isChoiceVisible) {
      bottomActionBtnRef.current?.focus();
    } else if (activeScene === 2 && scene2Phase !== 'STEP1_MENU') {
      bottomActionBtnRef.current?.focus();
    } else if (
      activeScene === 4 &&
      scene4Phase === 'part1_dialogue' &&
      isScene4ChoiceVisible
    ) {
      bottomActionBtnRef.current?.focus();
    }
  }, [
    activeScene,
    scene2Phase,
    scene4Phase,
    isChoiceVisible,
    isScene4ChoiceVisible,
    isLineComplete,
    gameState.status,
    hasAnyModalOpen,
  ]);

  const inputRef = useInput(canvasRef, true, {
    width: canvasWidth,
    height: canvasHeight,
  });

  const closeAllSubModals = useCallback(() => {
    setIsGameMenuOpen(false);
    setIsHowToPlayOpen(false);
    setIsHintOverlayOpen(false);
    setHintOverlayView('MAIN');
    setActiveHintModalText(null);
    setIsQuizModalOpen(false);
    setIsCollectionOverlayOpen(false);
    setActiveBadgeDetail(null);
  }, []);

  const triggerSceneShudderShake = useCallback((durationMs = 600) => {
    if (sceneShakeTimeoutRef.current !== null) {
      window.clearTimeout(sceneShakeTimeoutRef.current);
      sceneShakeTimeoutRef.current = null;
    }
    setSceneShakeDurationMs(0);
    window.requestAnimationFrame(() => {
      setSceneShakeDurationMs(durationMs);
      sceneShakeTimeoutRef.current = window.setTimeout(() => {
        sceneShakeTimeoutRef.current = null;
        setSceneShakeDurationMs(0);
      }, durationMs + 30);
    });
  }, []);

  const triggerLineEffects = useCallback(
    (line: DialogueLine, suppressEffects = false) => {
      if (staffKnockTimeoutRef.current !== null) {
        window.clearTimeout(staffKnockTimeoutRef.current);
        staffKnockTimeoutRef.current = null;
      }

      if (suppressEffects) {
        sceneRenderRef.current.shakeTimer = 0;
        sceneRenderRef.current.shakeOffsetX = 0;
        sceneRenderRef.current.shakeOffsetY = 0;
        setDialogueShakeOffset({x: 0, y: 0});
        return;
      }

      if (line.woodKnock) {
        gameAudio.playFootstepWood();
        const expectedId = line.id;
        staffKnockTimeoutRef.current = window.setTimeout(() => {
          staffKnockTimeoutRef.current = null;
          if (
            gameStateRef.current.status === 'PLAYING' &&
            activeDialogueLineRef.current.id === expectedId
          ) {
            gameAudio.playFootstepWood();
          }
        }, 140);
      }

      if (line.screenShakeMs && line.screenShakeMs > 0) {
        triggerSceneShudderShake(line.screenShakeMs);
      }

      if (line.dramaticShake && getConfig('enableDialogueShake')) {
        sceneRenderRef.current.shakeTimer = getConfig('dialogueShakeDuration');
      } else {
        sceneRenderRef.current.shakeTimer = 0;
        sceneRenderRef.current.shakeOffsetX = 0;
        sceneRenderRef.current.shakeOffsetY = 0;
        setDialogueShakeOffset({x: 0, y: 0});
      }

      if (
        line.candleBonus &&
        line.candleBonus > 0 &&
        !scene4CandleBonusClaimedRef.current
      ) {
        scene4CandleBonusClaimedRef.current = true;
        setScene4CandleBonusClaimed(true);
        setCandleCount((prev) => prev + (line.candleBonus ?? 0));
        gameAudio.playPowerupChime();

        if (bonusToastTimeoutRef.current !== null) {
          window.clearTimeout(bonusToastTimeoutRef.current);
        }
        setIsCandleBonusToastVisible(true);
        bonusToastTimeoutRef.current = window.setTimeout(() => {
          bonusToastTimeoutRef.current = null;
          setIsCandleBonusToastVisible(false);
        }, 4400);
      }
    },
    [triggerSceneShudderShake],
  );

  const startTypewriterForLine = useCallback(
    (
      line: DialogueLine,
      showScene1EndChoiceOnImmediate = false,
      forceInstant = false,
      showScene4EndChoiceOnImmediate = false,
    ) => {
      activeDialogueLineRef.current = line;
      const totalLen = line.action.length + 1 + line.dialogue.length;
      const useTypewriter = getConfig('enableTypewriter') && !forceInstant;

      if (useTypewriter) {
        revealedFloatRef.current = 0;
        lastRevealedIntRef.current = 0;
        isLineCompleteRef.current = false;
        setRevealedChars(0);
        setIsLineComplete(false);
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
        isScene4ChoiceVisibleRef.current = false;
        setIsScene4ChoiceVisible(false);
      } else {
        revealedFloatRef.current = totalLen;
        lastRevealedIntRef.current = totalLen;
        isLineCompleteRef.current = true;
        setRevealedChars(totalLen);
        setIsLineComplete(true);
        isChoiceVisibleRef.current = showScene1EndChoiceOnImmediate;
        setIsChoiceVisible(showScene1EndChoiceOnImmediate);
        isScene4ChoiceVisibleRef.current = showScene4EndChoiceOnImmediate;
        setIsScene4ChoiceVisible(showScene4EndChoiceOnImmediate);
      }
    },
    [],
  );

  const activateScene1Line = useCallback(
    (index: number, forceCompleteChoice = false) => {
      const clampedIndex = clamp(index, 0, SCENE_1_SCRIPT.length - 1);
      const line = SCENE_1_SCRIPT[clampedIndex] ?? SCENE_1_SCRIPT[0];
      currentLineIndexRef.current = clampedIndex;
      setCurrentLineIndex(clampedIndex);

      const isLastLine = clampedIndex === SCENE_1_SCRIPT.length - 1;
      startTypewriterForLine(
        line,
        isLastLine,
        forceCompleteChoice && isLastLine,
        false,
      );
      triggerLineEffects(line, forceCompleteChoice);
    },
    [startTypewriterForLine, triggerLineEffects],
  );

  const activateScene3DialogueLine = useCallback(
    (index: number) => {
      const clampedIndex = clamp(index, 0, SCENE_3_DIALOGUE_SCRIPT.length - 1);
      const line =
        SCENE_3_DIALOGUE_SCRIPT[clampedIndex] ?? SCENE_3_DIALOGUE_SCRIPT[0];
      scene3DialogueIndexRef.current = clampedIndex;
      setScene3DialogueIndex(clampedIndex);
      startTypewriterForLine(line, false);
      triggerLineEffects(line, true);
    },
    [startTypewriterForLine, triggerLineEffects],
  );

  const activateScene4Part1Line = useCallback(
    (index: number, forceCompleteChoice = false, suppressEffects = false) => {
      const clampedIndex = clamp(index, 0, SCENE_4_PART_1_SCRIPT.length - 1);
      const line =
        SCENE_4_PART_1_SCRIPT[clampedIndex] ?? SCENE_4_PART_1_SCRIPT[0];
      scene4DialogueIndexRef.current = clampedIndex;
      setScene4DialogueIndex(clampedIndex);
      const isLast = clampedIndex === SCENE_4_PART_1_SCRIPT.length - 1;
      startTypewriterForLine(
        line,
        false,
        forceCompleteChoice && isLast,
        isLast,
      );
      triggerLineEffects(line, suppressEffects);
    },
    [startTypewriterForLine, triggerLineEffects],
  );

  const activateScene4Part2Line = useCallback(
    (index: number) => {
      const clampedIndex = clamp(index, 0, SCENE_4_PART_2_SCRIPT.length - 1);
      const line =
        SCENE_4_PART_2_SCRIPT[clampedIndex] ?? SCENE_4_PART_2_SCRIPT[0];
      scene4DialogueIndexRef.current = clampedIndex;
      setScene4DialogueIndex(clampedIndex);
      startTypewriterForLine(line, false);
      triggerLineEffects(line, true);
    },
    [startTypewriterForLine, triggerLineEffects],
  );

  const activateScene5ScriptLine = useCallback(
    (
      script: readonly DialogueLine[],
      index: number,
      suppressEffects = false,
    ) => {
      const clampedIndex = clamp(index, 0, script.length - 1);
      const line = script[clampedIndex] ?? script[0];
      scene5DialogueIndexRef.current = clampedIndex;
      setScene5DialogueIndex(clampedIndex);
      startTypewriterForLine(line, false, false, false);
      triggerLineEffects(line, suppressEffects);
    },
    [startTypewriterForLine, triggerLineEffects],
  );

  const showNextAchievementToastFromQueue = useCallback(() => {
    const nextItem = achievementQueueRef.current.shift();
    if (!nextItem) {
      achievementToastActiveRef.current = false;
      setActiveAchievementToast(null);
      return;
    }

    achievementToastActiveRef.current = true;
    const toastKey = Date.now() + Math.floor(Math.random() * 1000);
    setActiveAchievementToast({
      key: toastKey,
      item: nextItem,
      exiting: false,
    });

    if (nextItem.variant === 'honor') {
      gameAudio.playHonorBellChime();
    } else {
      gameAudio.playClownWoodenGong();
    }

    if (achievementHoldTimeoutRef.current !== null) {
      window.clearTimeout(achievementHoldTimeoutRef.current);
    }
    if (achievementExitTimeoutRef.current !== null) {
      window.clearTimeout(achievementExitTimeoutRef.current);
    }

    achievementHoldTimeoutRef.current = window.setTimeout(() => {
      achievementHoldTimeoutRef.current = null;
      setActiveAchievementToast((prev) =>
        prev ? {...prev, exiting: true} : null,
      );
      achievementExitTimeoutRef.current = window.setTimeout(() => {
        achievementExitTimeoutRef.current = null;
        showNextAchievementToastFromQueue();
      }, 460);
    }, 4500);
  }, []);

  const unlockAchievementTitle = useCallback(
    (titleDef: AchievementTitleDefinition) => {
      if (unlockedTitlesRef.current.includes(titleDef.id)) {
        return;
      }
      const nextUnlocked = [...unlockedTitlesRef.current, titleDef.id];
      unlockedTitlesRef.current = nextUnlocked;
      setUnlockedTitles(nextUnlocked);
      achievementQueueRef.current.push(titleDef);
      if (!achievementToastActiveRef.current) {
        showNextAchievementToastFromQueue();
      }
    },
    [showNextAchievementToastFromQueue],
  );

  const triggerTrustFloatingText = useCallback(
    (text: string, tone: 'negative' | 'positive' | 'shield') => {
      if (trustDeltaTimeoutRef.current !== null) {
        window.clearTimeout(trustDeltaTimeoutRef.current);
      }
      setTrustDeltaAnim({
        id: Date.now() + Math.floor(Math.random() * 1000),
        text,
        tone,
      });
      trustDeltaTimeoutRef.current = window.setTimeout(() => {
        trustDeltaTimeoutRef.current = null;
        setTrustDeltaAnim(null);
      }, 2400);
    },
    [],
  );

  const adjustTrust = useCallback(
    (delta: number) => {
      setTrustUnlocked(true);
      if (delta < 0 && jadeHairpinShieldActiveRef.current) {
        jadeHairpinShieldActiveRef.current = false;
        setJadeHairpinShieldActive(false);
        gameAudio.playShieldBlock();
        triggerTrustFloatingText(
          'Trâm Ngọc Bích chặn trừ Tín nhiệm!',
          'shield',
        );
        return;
      }

      setTrustPoints((prev) => prev + delta);
      if (delta < 0) {
        gameAudio.playErrorBuzz();
        triggerTrustFloatingText(`${delta} Tín nhiệm`, 'negative');
      } else if (delta > 0) {
        gameAudio.playCoinPickup();
        triggerTrustFloatingText(`+${delta} Tín nhiệm`, 'positive');
      }
    },
    [triggerTrustFloatingText],
  );

  const triggerPasscodeShake = useCallback(() => {
    if (passcodeShakeTimeoutRef.current !== null) {
      window.clearTimeout(passcodeShakeTimeoutRef.current);
      passcodeShakeTimeoutRef.current = null;
    }
    setIsPasscodeShaking(false);
    window.requestAnimationFrame(() => {
      setIsPasscodeShaking(true);
      passcodeShakeTimeoutRef.current = window.setTimeout(() => {
        passcodeShakeTimeoutRef.current = null;
        setIsPasscodeShaking(false);
      }, 460);
    });
  }, []);

  const enterScene2Clean = useCallback(() => {
    if (staffKnockTimeoutRef.current !== null) {
      window.clearTimeout(staffKnockTimeoutRef.current);
      staffKnockTimeoutRef.current = null;
    }
    if (sceneShakeTimeoutRef.current !== null) {
      window.clearTimeout(sceneShakeTimeoutRef.current);
      sceneShakeTimeoutRef.current = null;
    }

    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setSceneShakeDurationMs(0);
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 2;
    setActiveScene(2);
    scene2PhaseRef.current = 'STEP1_MENU';
    setScene2Phase('STEP1_MENU');
    checkedChoicesRef.current = [];
    setCheckedChoices([]);
    activeInspectionIdRef.current = null;
    setActiveInspectionId(null);
    isChoiceVisibleRef.current = false;
    setIsChoiceVisible(false);

    sceneRenderRef.current.shakeTimer = 0;
    sceneRenderRef.current.shakeOffsetX = 0;
    sceneRenderRef.current.shakeOffsetY = 0;

    setGameState((prev) => ({
      ...prev,
      status: 'PLAYING',
      level: 2,
    }));
  }, [closeAllSubModals]);

  const enterScene3Clean = useCallback(() => {
    if (staffKnockTimeoutRef.current !== null) {
      window.clearTimeout(staffKnockTimeoutRef.current);
      staffKnockTimeoutRef.current = null;
    }
    if (sceneShakeTimeoutRef.current !== null) {
      window.clearTimeout(sceneShakeTimeoutRef.current);
      sceneShakeTimeoutRef.current = null;
    }

    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setSceneShakeDurationMs(0);
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 3;
    setActiveScene(3);
    scene3PhaseRef.current = 'dialogue';
    setScene3Phase('dialogue');
    scene3DialogueIndexRef.current = 0;
    setScene3DialogueIndex(0);
    setHudUnlocked(true);
    setIsDoPaperOpen(true);
    setPasscodeInput('');
    setPasscodeError('');
    setIsPasscodeShaking(false);
    isChoiceVisibleRef.current = false;
    setIsChoiceVisible(false);

    sceneRenderRef.current.shakeTimer = 0;
    sceneRenderRef.current.shakeOffsetX = 0;
    sceneRenderRef.current.shakeOffsetY = 0;

    activateScene3DialogueLine(0);

    setGameState((prev) => ({
      ...prev,
      status: 'PLAYING',
      level: 3,
    }));
  }, [activateScene3DialogueLine, closeAllSubModals]);

  const enterScene4Part1Clean = useCallback(() => {
    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 4;
    setActiveScene(4);
    scene4PhaseRef.current = 'part1_dialogue';
    setScene4Phase('part1_dialogue');
    scene4DialogueIndexRef.current = 0;
    setScene4DialogueIndex(0);
    isScene4ChoiceVisibleRef.current = false;
    setIsScene4ChoiceVisible(false);
    setIsChestLockOpen(true);
    setScene4PasscodeInput('');
    setScene4PasscodeError('');
    setIsPasscodeShaking(false);
    setHudUnlocked(true);

    setHintsUsedByScene((prev) =>
      prev[4] === undefined ? {...prev, 4: 0} : prev,
    );

    activateScene4Part1Line(0, false, false);

    setGameState((prev) => ({
      ...prev,
      status: 'PLAYING',
      level: 4,
      score: Math.max(prev.score, 50),
    }));
  }, [activateScene4Part1Line, closeAllSubModals]);

  const enterScene5Clean = useCallback(() => {
    if (whipFlashTimeoutRef.current !== null) {
      window.clearTimeout(whipFlashTimeoutRef.current);
      whipFlashTimeoutRef.current = null;
    }
    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 5;
    setActiveScene(5);
    scene5PhaseRef.current = 'opening_dialogue';
    setScene5Phase('opening_dialogue');
    scene5DialogueIndexRef.current = 0;
    setScene5DialogueIndex(0);
    setHudUnlocked(true);
    setTrustUnlocked(true);

    // Reset hintsUsedByScene.scene5 = 0 when first entering Scene 5
    const nextHints = {...hintsUsedBySceneRef.current, 5: 0};
    hintsUsedBySceneRef.current = nextHints;
    setHintsUsedByScene(nextHints);

    activateScene5ScriptLine(SCENE_5_OPENING_SCRIPT, 0, true);

    setGameState((prev) => ({
      ...prev,
      status: 'PLAYING',
      level: 5,
      score: Math.max(prev.score, 75),
    }));
  }, [activateScene5ScriptLine, closeAllSubModals]);

  const startFreshRun = useCallback(() => {
    if (whipFlashTimeoutRef.current !== null) {
      window.clearTimeout(whipFlashTimeoutRef.current);
      whipFlashTimeoutRef.current = null;
    }
    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setSceneShakeDurationMs(0);
    setIsCandleBonusToastVisible(false);
    setTrustDeltaAnim(null);

    setHudUnlocked(false);
    setTrustUnlocked(false);
    setTrustPoints(0);
    scene4TrustClaimedRef.current = false;
    setScene4TrustClaimed(false);
    scene4CandleBonusClaimedRef.current = false;
    setScene4CandleBonusClaimed(false);
    scene5WrongCountRef.current = 0;
    setScene5WrongCount(0);
    scene5RewardClaimedRef.current = false;
    setScene5RewardClaimed(false);
    jadeHairpinShieldActiveRef.current = false;
    setJadeHairpinShieldActive(false);
    setCandleCount(INITIAL_KNOWLEDGE_CANDLES);
    hintsUsedBySceneRef.current = {};
    setHintsUsedByScene({});
    setUnlockedBadges([]);
    setUnlockedItems([]);
    unlockedTitlesRef.current = [];
    setUnlockedTitles([]);
    achievementQueueRef.current = [];
    achievementToastActiveRef.current = false;
    setActiveAchievementToast(null);

    checkedChoicesRef.current = [];
    setCheckedChoices([]);
    activeInspectionIdRef.current = null;
    setActiveInspectionId(null);
    scene2PhaseRef.current = 'STEP1_MENU';
    setScene2Phase('STEP1_MENU');
    scene3PhaseRef.current = 'dialogue';
    setScene3Phase('dialogue');
    scene3DialogueIndexRef.current = 0;
    setScene3DialogueIndex(0);
    setIsDoPaperOpen(true);
    setPasscodeInput('');
    setPasscodeError('');

    scene4PhaseRef.current = 'part1_dialogue';
    setScene4Phase('part1_dialogue');
    scene4DialogueIndexRef.current = 0;
    setScene4DialogueIndex(0);
    isScene4ChoiceVisibleRef.current = false;
    setIsScene4ChoiceVisible(false);
    setIsChestLockOpen(true);
    setScene4PasscodeInput('');
    setScene4PasscodeError('');

    scene5PhaseRef.current = 'opening_dialogue';
    setScene5Phase('opening_dialogue');
    scene5DialogueIndexRef.current = 0;
    setScene5DialogueIndex(0);

    sceneRenderRef.current = {
      shakeTimer: 0,
      shakeOffsetX: 0,
      shakeOffsetY: 0,
      elapsedTime: 0,
      dust: createInitialDust(),
    };
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 1;
    setActiveScene(1);

    setGameState({
      status: 'PLAYING',
      level: 1,
      score: 0,
    });

    activateScene1Line(0);
  }, [activateScene1Line, closeAllSubModals, createInitialDust]);

  const resumeSavedRun = useCallback(
    (saved: SavedGameProgress) => {
      closeAllSubModals();
      setSceneShakeDurationMs(0);
      setPasscodeInput('');
      setPasscodeError('');
      setScene4PasscodeInput('');
      setScene4PasscodeError('');
      setIsPasscodeShaking(false);
      setIsCandleBonusToastVisible(false);

      setHudUnlocked(saved.hudUnlocked || saved.activeScene >= 3);
      setTrustUnlocked(saved.trustUnlocked);
      setTrustPoints(saved.trustPoints);
      scene4TrustClaimedRef.current = saved.scene4TrustClaimed;
      setScene4TrustClaimed(saved.scene4TrustClaimed);
      scene4CandleBonusClaimedRef.current = saved.scene4CandleBonusClaimed;
      setScene4CandleBonusClaimed(saved.scene4CandleBonusClaimed);

      setCandleCount(saved.candles);
      hintsUsedBySceneRef.current = saved.hintsUsedByScene;
      setHintsUsedByScene(saved.hintsUsedByScene);
      setUnlockedBadges(saved.unlockedBadges);
      setUnlockedItems(saved.unlockedItems);
      unlockedTitlesRef.current = saved.unlockedTitles;
      setUnlockedTitles(saved.unlockedTitles);
      scene5PhaseRef.current = saved.scene5Phase;
      setScene5Phase(saved.scene5Phase);
      scene5DialogueIndexRef.current = saved.scene5DialogueIndex;
      setScene5DialogueIndex(saved.scene5DialogueIndex);
      scene5WrongCountRef.current = saved.scene5WrongCount;
      setScene5WrongCount(saved.scene5WrongCount);
      scene5RewardClaimedRef.current = saved.scene5RewardClaimed;
      setScene5RewardClaimed(saved.scene5RewardClaimed);
      jadeHairpinShieldActiveRef.current = saved.jadeHairpinShieldActive;
      setJadeHairpinShieldActive(saved.jadeHairpinShieldActive);

      checkedChoicesRef.current = saved.checkedChoices;
      setCheckedChoices(saved.checkedChoices);
      activeInspectionIdRef.current = saved.activeInspectionId;
      setActiveInspectionId(saved.activeInspectionId);
      scene2PhaseRef.current = saved.scene2Phase;
      setScene2Phase(saved.scene2Phase);
      scene3PhaseRef.current = saved.scene3Phase;
      setScene3Phase(saved.scene3Phase);
      scene3DialogueIndexRef.current = saved.scene3DialogueIndex;
      setScene3DialogueIndex(saved.scene3DialogueIndex);
      setIsDoPaperOpen(!saved.paperHidden);

      scene4PhaseRef.current = saved.scene4Phase;
      setScene4Phase(saved.scene4Phase);
      scene4DialogueIndexRef.current = saved.scene4DialogueIndex;
      setScene4DialogueIndex(saved.scene4DialogueIndex);
      isScene4ChoiceVisibleRef.current = saved.scene4ChoiceVisible;
      setIsScene4ChoiceVisible(saved.scene4ChoiceVisible);
      setIsChestLockOpen(!saved.chestLockHidden);

      const isS3Reward =
        saved.activeScene === 3 && saved.scene3Phase === 'reward';
      const isS4Reward =
        saved.activeScene === 4 && saved.scene4Phase === 'reward';
      setRewardPopupBadge(isS4Reward ? GIA_HUAN_CA_BADGE : BIA_TIEN_SI_BADGE);
      setIsRewardPopupOpen(isS3Reward || isS4Reward);

      sceneRenderRef.current = {
        shakeTimer: 0,
        shakeOffsetX: 0,
        shakeOffsetY: 0,
        elapsedTime: 0,
        dust: createInitialDust(),
      };
      setDialogueShakeOffset({x: 0, y: 0});

      activeSceneRef.current = saved.activeScene;
      setActiveScene(saved.activeScene);

      if (saved.activeScene === 1) {
        activateScene1Line(saved.scene1LineIndex, saved.scene1ChoiceVisible);
      } else if (saved.activeScene === 2) {
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
        if (saved.scene2Phase === 'STEP1_INSPECT' && saved.activeInspectionId) {
          const item = SCENE_2_INSPECTIONS.find(
            (entry) => entry.id === saved.activeInspectionId,
          );
          if (item) {
            startTypewriterForLine(
              {
                id: 100,
                speaker: item.speaker,
                spriteId: 'sprite_lien_hoodie',
                action: item.action,
                dialogue: item.dialogue,
              },
              false,
            );
          } else {
            scene2PhaseRef.current = 'STEP1_MENU';
            setScene2Phase('STEP1_MENU');
          }
        } else if (saved.scene2Phase === 'STEP2_SHUDDER') {
          startTypewriterForLine(SCENE_2_SHUDDER_LINE, false);
        } else if (saved.scene2Phase === 'STEP2_PAPER') {
          startTypewriterForLine(SCENE_2_DO_PAPER_LINE, false);
        }
      } else if (saved.activeScene === 3) {
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
        if (saved.scene3Phase === 'dialogue') {
          activateScene3DialogueLine(saved.scene3DialogueIndex);
        } else if (saved.scene3Phase === 'reward') {
          setUnlockedBadges((prev) =>
            prev.includes(BIA_TIEN_SI_BADGE.id)
              ? prev
              : [...prev, BIA_TIEN_SI_BADGE.id],
          );
        }
      } else if (saved.activeScene === 4) {
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
        if (saved.scene4Phase === 'part1_dialogue') {
          activateScene4Part1Line(
            saved.scene4DialogueIndex,
            saved.scene4ChoiceVisible,
            false,
          );
        } else if (saved.scene4Phase === 'part2_dialogue') {
          activateScene4Part2Line(saved.scene4DialogueIndex);
        } else if (saved.scene4Phase === 'reward') {
          setUnlockedBadges((prev) =>
            prev.includes(GIA_HUAN_CA_BADGE.id)
              ? prev
              : [...prev, GIA_HUAN_CA_BADGE.id],
          );
        }
      } else if (saved.activeScene === 5) {
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
        if (saved.scene5Phase === 'opening_dialogue') {
          activateScene5ScriptLine(
            SCENE_5_OPENING_SCRIPT,
            saved.scene5DialogueIndex,
            true,
          );
        } else if (saved.scene5Phase === 'wrong1_dialogue') {
          activateScene5ScriptLine(
            SCENE_5_WRONG_1_SCRIPT,
            saved.scene5DialogueIndex,
            true,
          );
        } else if (saved.scene5Phase === 'wrong2_dialogue') {
          activateScene5ScriptLine(
            SCENE_5_WRONG_2_SCRIPT,
            saved.scene5DialogueIndex,
            true,
          );
        } else if (saved.scene5Phase === 'correct_dialogue') {
          activateScene5ScriptLine([SCENE_5_CORRECT_LINE], 0, true);
        }
      } else {
        isChoiceVisibleRef.current = false;
        setIsChoiceVisible(false);
      }

      setGameState({
        status: 'PLAYING',
        level: saved.activeScene,
        score: saved.activeScene >= 6 ? getConfig('completionScore') : 0,
      });
    },
    [
      activateScene1Line,
      activateScene3DialogueLine,
      activateScene4Part1Line,
      activateScene4Part2Line,
      activateScene5ScriptLine,
      closeAllSubModals,
      createInitialDust,
      startTypewriterForLine,
    ],
  );

  // Start Screen "Chơi" button: resumes from localStorage if saved progress exists, else starts fresh
  const initGame = useCallback(() => {
    gameAudio.playConfirmSelect();
    const saved = readSavedProgress();
    if (saved) {
      resumeSavedRun(saved);
    } else {
      startFreshRun();
    }
  }, [resumeSavedRun, startFreshRun]);

  const resetGame = useCallback(() => {
    gameAudio.playConfirmSelect();
    startFreshRun();
  }, [startFreshRun]);

  // Top-Left Menu "Xóa tiến trình": clears localStorage, resets ALL game states to defaults, returns to Start Screen
  const handleClearProgressAndReturnStart = useCallback(() => {
    gameAudio.playConfirmSelect();
    if (staffKnockTimeoutRef.current !== null) {
      window.clearTimeout(staffKnockTimeoutRef.current);
      staffKnockTimeoutRef.current = null;
    }
    if (sceneShakeTimeoutRef.current !== null) {
      window.clearTimeout(sceneShakeTimeoutRef.current);
      sceneShakeTimeoutRef.current = null;
    }
    if (passcodeShakeTimeoutRef.current !== null) {
      window.clearTimeout(passcodeShakeTimeoutRef.current);
      passcodeShakeTimeoutRef.current = null;
    }
    if (bonusToastTimeoutRef.current !== null) {
      window.clearTimeout(bonusToastTimeoutRef.current);
      bonusToastTimeoutRef.current = null;
    }
    if (whipFlashTimeoutRef.current !== null) {
      window.clearTimeout(whipFlashTimeoutRef.current);
      whipFlashTimeoutRef.current = null;
    }
    if (trustDeltaTimeoutRef.current !== null) {
      window.clearTimeout(trustDeltaTimeoutRef.current);
      trustDeltaTimeoutRef.current = null;
    }
    if (achievementHoldTimeoutRef.current !== null) {
      window.clearTimeout(achievementHoldTimeoutRef.current);
      achievementHoldTimeoutRef.current = null;
    }
    if (achievementExitTimeoutRef.current !== null) {
      window.clearTimeout(achievementExitTimeoutRef.current);
      achievementExitTimeoutRef.current = null;
    }

    clearSavedProgress();
    closeAllSubModals();
    setIsRewardPopupOpen(false);
    setSceneShakeDurationMs(0);
    setIsPasscodeShaking(false);
    setIsCandleBonusToastVisible(false);
    setTrustDeltaAnim(null);
    setDialogueShakeOffset({x: 0, y: 0});

    activeSceneRef.current = 1;
    setActiveScene(1);
    currentLineIndexRef.current = 0;
    setCurrentLineIndex(0);
    isChoiceVisibleRef.current = false;
    setIsChoiceVisible(false);

    scene2PhaseRef.current = 'STEP1_MENU';
    setScene2Phase('STEP1_MENU');
    checkedChoicesRef.current = [];
    setCheckedChoices([]);
    activeInspectionIdRef.current = null;
    setActiveInspectionId(null);

    scene3PhaseRef.current = 'dialogue';
    setScene3Phase('dialogue');
    scene3DialogueIndexRef.current = 0;
    setScene3DialogueIndex(0);
    setIsDoPaperOpen(true);
    setPasscodeInput('');
    setPasscodeError('');

    scene4PhaseRef.current = 'part1_dialogue';
    setScene4Phase('part1_dialogue');
    scene4DialogueIndexRef.current = 0;
    setScene4DialogueIndex(0);
    isScene4ChoiceVisibleRef.current = false;
    setIsScene4ChoiceVisible(false);
    setIsChestLockOpen(true);
    setScene4PasscodeInput('');
    setScene4PasscodeError('');

    scene5PhaseRef.current = 'opening_dialogue';
    setScene5Phase('opening_dialogue');
    scene5DialogueIndexRef.current = 0;
    setScene5DialogueIndex(0);
    scene5WrongCountRef.current = 0;
    setScene5WrongCount(0);
    scene5RewardClaimedRef.current = false;
    setScene5RewardClaimed(false);
    jadeHairpinShieldActiveRef.current = false;
    setJadeHairpinShieldActive(false);

    setHudUnlocked(false);
    setTrustUnlocked(false);
    setTrustPoints(0);
    scene4TrustClaimedRef.current = false;
    setScene4TrustClaimed(false);
    scene4CandleBonusClaimedRef.current = false;
    setScene4CandleBonusClaimed(false);
    setCandleCount(INITIAL_KNOWLEDGE_CANDLES);
    hintsUsedBySceneRef.current = {};
    setHintsUsedByScene({});
    setUnlockedBadges([]);
    setUnlockedItems([]);
    unlockedTitlesRef.current = [];
    setUnlockedTitles([]);
    achievementQueueRef.current = [];
    achievementToastActiveRef.current = false;
    setActiveAchievementToast(null);

    setGameState({
      status: 'START',
      score: 0,
      level: 1,
    });
  }, [closeAllSubModals]);

  const completeCurrentTypewriterImmediately = useCallback(() => {
    const line = activeDialogueLineRef.current;
    const totalLen = line.action.length + 1 + line.dialogue.length;
    revealedFloatRef.current = totalLen;
    lastRevealedIntRef.current = totalLen;
    isLineCompleteRef.current = true;
    setRevealedChars(totalLen);
    setIsLineComplete(true);

    if (
      activeSceneRef.current === 1 &&
      currentLineIndexRef.current === SCENE_1_SCRIPT.length - 1
    ) {
      isChoiceVisibleRef.current = true;
      setIsChoiceVisible(true);
    } else if (
      activeSceneRef.current === 4 &&
      scene4PhaseRef.current === 'part1_dialogue' &&
      scene4DialogueIndexRef.current === SCENE_4_PART_1_SCRIPT.length - 1
    ) {
      isScene4ChoiceVisibleRef.current = true;
      setIsScene4ChoiceVisible(true);
    }
  }, []);

  const handleAdvanceDialogue = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      isPausedOverlayRef.current
    ) {
      return;
    }

    // Scene 4 Dialogue Progression (Part 1 & Part 2)
    if (activeSceneRef.current === 4) {
      const s4Phase = scene4PhaseRef.current;
      if (s4Phase !== 'part1_dialogue' && s4Phase !== 'part2_dialogue') {
        return;
      }
      if (!isLineCompleteRef.current) {
        gameAudio.playCrispClick();
        completeCurrentTypewriterImmediately();
        return;
      }

      const s4Idx = scene4DialogueIndexRef.current;
      if (s4Phase === 'part1_dialogue') {
        if (s4Idx < SCENE_4_PART_1_SCRIPT.length - 1) {
          gameAudio.playCrispClick();
          activateScene4Part1Line(s4Idx + 1, false, false);
          return;
        }
        if (!isScene4ChoiceVisibleRef.current) {
          gameAudio.playCrispClick();
          isScene4ChoiceVisibleRef.current = true;
          setIsScene4ChoiceVisible(true);
        } else {
          bottomActionBtnRef.current?.focus();
        }
        return;
      }

      if (s4Idx < SCENE_4_PART_2_SCRIPT.length - 1) {
        gameAudio.playCrispClick();
        activateScene4Part2Line(s4Idx + 1);
        return;
      }

      gameAudio.playConfirmSelect();
      scene4PhaseRef.current = 'puzzle';
      setScene4Phase('puzzle');
      setIsChestLockOpen(true);
      window.requestAnimationFrame(() => {
        scene4PasscodeInputRef.current?.focus();
      });
      return;
    }

    // Scene 3 Phase 1 ('dialogue'): advance through Liên's 4 thought lines -> transition to Phase 2 ('puzzle')
    if (activeSceneRef.current === 3) {
      if (scene3PhaseRef.current !== 'dialogue') return;
      if (!isLineCompleteRef.current) {
        gameAudio.playCrispClick();
        completeCurrentTypewriterImmediately();
        return;
      }
      const s3Idx = scene3DialogueIndexRef.current;
      if (s3Idx < SCENE_3_DIALOGUE_SCRIPT.length - 1) {
        gameAudio.playCrispClick();
        activateScene3DialogueLine(s3Idx + 1);
        return;
      }
      gameAudio.playConfirmSelect();
      scene3PhaseRef.current = 'puzzle';
      setScene3Phase('puzzle');
      setIsDoPaperOpen(true);
      window.requestAnimationFrame(() => {
        passcodeInputRef.current?.focus();
      });
      return;
    }

    if (activeSceneRef.current === 5) {
      const s5Phase = scene5PhaseRef.current;
      if (
        s5Phase !== 'opening_dialogue' &&
        s5Phase !== 'wrong1_dialogue' &&
        s5Phase !== 'wrong2_dialogue' &&
        s5Phase !== 'correct_dialogue'
      ) {
        return;
      }

      if (!isLineCompleteRef.current) {
        gameAudio.playCrispClick();
        completeCurrentTypewriterImmediately();
        return;
      }

      const s5Idx = scene5DialogueIndexRef.current;
      if (s5Phase === 'opening_dialogue') {
        if (s5Idx < SCENE_5_OPENING_SCRIPT.length - 1) {
          gameAudio.playCrispClick();
          activateScene5ScriptLine(SCENE_5_OPENING_SCRIPT, s5Idx + 1, false);
          return;
        }
        gameAudio.playConfirmSelect();
        scene5PhaseRef.current = 'robe_choice';
        setScene5Phase('robe_choice');
        return;
      }

      if (s5Phase === 'wrong1_dialogue' || s5Phase === 'wrong2_dialogue') {
        const script =
          s5Phase === 'wrong1_dialogue'
            ? SCENE_5_WRONG_1_SCRIPT
            : SCENE_5_WRONG_2_SCRIPT;
        if (s5Idx < script.length - 1) {
          gameAudio.playCrispClick();
          activateScene5ScriptLine(script, s5Idx + 1, false);
          return;
        }
        const branch: 1 | 2 = s5Phase === 'wrong1_dialogue' ? 1 : 2;
        setPendingGameOverBranch(branch);
        gameAudio.playMeleePunch();
        scene5PhaseRef.current = 'whip_flash';
        setScene5Phase('whip_flash');
        if (whipFlashTimeoutRef.current !== null) {
          window.clearTimeout(whipFlashTimeoutRef.current);
        }
        whipFlashTimeoutRef.current = window.setTimeout(() => {
          whipFlashTimeoutRef.current = null;
          const nextPhase: Scene5Phase =
            branch === 1 ? 'gameover_1' : 'gameover_2';
          gameAudio.playDefeatMotif();
          scene5PhaseRef.current = nextPhase;
          setScene5Phase(nextPhase);
        }, 1300);
        return;
      }

      if (s5Phase === 'correct_dialogue') {
        gameAudio.playVictoryFanfare();
        if (!scene5RewardClaimedRef.current) {
          scene5RewardClaimedRef.current = true;
          setScene5RewardClaimed(true);
          adjustTrust(5);
          setUnlockedItems((prev) =>
            prev.includes(THE_BAI_GIA_NHAN_ITEM.id)
              ? prev
              : [...prev, THE_BAI_GIA_NHAN_ITEM.id],
          );
          setUnlockedBadges((prev) =>
            prev.includes(CAM_NANG_PHUC_SAC_BADGE.id)
              ? prev
              : [...prev, CAM_NANG_PHUC_SAC_BADGE.id],
          );

          const hintsUsedS5 = hintsUsedBySceneRef.current[5] ?? 0;
          if (hintsUsedS5 === 0) {
            setUnlockedItems((prev) =>
              prev.includes(TRAM_CAI_NGOC_BICH_ITEM.id)
                ? prev
                : [...prev, TRAM_CAI_NGOC_BICH_ITEM.id],
            );
            jadeHairpinShieldActiveRef.current = true;
            setJadeHairpinShieldActive(true);
            unlockAchievementTitle(TITLE_BAC_THAY_NHAP_THE);
          }

          if (scene5WrongCountRef.current >= 5) {
            unlockAchievementTitle(TITLE_VUA_LI_DON);
          }
        }
        scene5PhaseRef.current = 'reward';
        setScene5Phase('reward');
        return;
      }
      return;
    }

    if (activeSceneRef.current >= 6) {
      return;
    }

    if (activeSceneRef.current === 2) {
      if (scene2PhaseRef.current === 'STEP1_MENU') return;
      if (!isLineCompleteRef.current) {
        gameAudio.playCrispClick();
        completeCurrentTypewriterImmediately();
      } else {
        bottomActionBtnRef.current?.focus();
      }
      return;
    }

    const idx = currentLineIndexRef.current;
    if (!isLineCompleteRef.current) {
      gameAudio.playCrispClick();
      completeCurrentTypewriterImmediately();
      return;
    }

    if (idx < SCENE_1_SCRIPT.length - 1) {
      gameAudio.playCrispClick();
      activateScene1Line(idx + 1);
      return;
    }

    if (!isChoiceVisibleRef.current) {
      gameAudio.playCrispClick();
      isChoiceVisibleRef.current = true;
      setIsChoiceVisible(true);
    } else {
      bottomActionBtnRef.current?.focus();
    }
  }, [
    completeCurrentTypewriterImmediately,
    activateScene1Line,
    activateScene3DialogueLine,
    activateScene4Part1Line,
    activateScene4Part2Line,
    activateScene5ScriptLine,
    adjustTrust,
    unlockAchievementTitle,
  ]);

  // Scene 1 -> Scene 2 Direct Transition
  const handleSelectScene1Choice = useCallback(() => {
    if (gameStateRef.current.status !== 'PLAYING') return;
    gameAudio.playConfirmSelect();
    enterScene2Clean();
  }, [enterScene2Clean]);

  // Scene 2 Step 1: Click (A), (B), or (C)
  const handleSelectScene2Inspection = useCallback(
    (choiceId: Scene2ChoiceId) => {
      if (
        gameStateRef.current.status !== 'PLAYING' ||
        activeSceneRef.current !== 2
      ) {
        return;
      }
      const item = SCENE_2_INSPECTIONS.find((entry) => entry.id === choiceId);
      if (!item) return;

      gameAudio.playConfirmSelect();
      activeInspectionIdRef.current = choiceId;
      setActiveInspectionId(choiceId);
      scene2PhaseRef.current = 'STEP1_INSPECT';
      setScene2Phase('STEP1_INSPECT');

      const lineObj: DialogueLine = {
        id: choiceId === 'A' ? 101 : choiceId === 'B' ? 102 : 103,
        speaker: item.speaker,
        spriteId: 'sprite_lien_hoodie',
        action: item.action,
        dialogue: item.dialogue,
      };
      startTypewriterForLine(lineObj, false);
    },
    [startTypewriterForLine],
  );

  const handleScene2Back = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 2 ||
      scene2PhaseRef.current !== 'STEP1_INSPECT'
    ) {
      return;
    }

    const justInspected = activeInspectionIdRef.current;
    const nextChecked =
      justInspected && !checkedChoicesRef.current.includes(justInspected)
        ? [...checkedChoicesRef.current, justInspected]
        : [...checkedChoicesRef.current];

    checkedChoicesRef.current = nextChecked;
    setCheckedChoices(nextChecked);
    activeInspectionIdRef.current = null;
    setActiveInspectionId(null);

    if (nextChecked.length >= SCENE_2_INSPECTIONS.length) {
      gameAudio.playFootstepWood();
      triggerSceneShudderShake(600);

      scene2PhaseRef.current = 'STEP2_SHUDDER';
      setScene2Phase('STEP2_SHUDDER');
      startTypewriterForLine(SCENE_2_SHUDDER_LINE, false);
      return;
    }

    gameAudio.playCrispClick();
    scene2PhaseRef.current = 'STEP1_MENU';
    setScene2Phase('STEP1_MENU');
  }, [startTypewriterForLine, triggerSceneShudderShake]);

  const handleCheckHoodiePocket = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 2 ||
      scene2PhaseRef.current !== 'STEP2_SHUDDER'
    ) {
      return;
    }
    gameAudio.playConfirmSelect();
    scene2PhaseRef.current = 'STEP2_PAPER';
    setScene2Phase('STEP2_PAPER');
    startTypewriterForLine(SCENE_2_DO_PAPER_LINE, false);
  }, [startTypewriterForLine]);

  // Scene 2 Step 2: Click "Đọc tờ giấy dó" -> Direct Transition to Scene 3
  const handleReadDoPaper = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 2
    ) {
      return;
    }
    gameAudio.playConfirmSelect();
    enterScene3Clean();
  }, [enterScene3Clean]);

  // Scene 3 Phase 2 -> Phase 3 ('explanation'): Submit 4-digit Passcode
  const handleSubmitScene3Passcode = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 3 ||
      scene3PhaseRef.current !== 'puzzle'
    ) {
      return;
    }
    const trimmed = passcodeInput.trim();
    if (trimmed === SCENE_3_CORRECT_PASSCODE) {
      gameAudio.playVictoryFanfare();
      setPasscodeError('');
      scene3PhaseRef.current = 'explanation';
      setScene3Phase('explanation');
      return;
    }

    gameAudio.playErrorBuzz();
    setPasscodeError(SCENE_3_WRONG_PASSCODE_MSG);
    triggerPasscodeShake();
  }, [passcodeInput, triggerPasscodeShake]);

  // Scene 3 Phase 3 ('explanation') -> Claim Reward ('reward'): Unlocks badge + opens Reward Popup
  const handleClaimScene3Reward = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 3
    ) {
      return;
    }
    gameAudio.playPowerupChime();
    setUnlockedBadges((prev) =>
      prev.includes(BIA_TIEN_SI_BADGE.id)
        ? prev
        : [...prev, BIA_TIEN_SI_BADGE.id],
    );
    setRewardPopupBadge(BIA_TIEN_SI_BADGE);
    scene3PhaseRef.current = 'reward';
    setScene3Phase('reward');
    setIsRewardPopupOpen(true);
  }, []);

  const handleRunToChestScene4 = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 4
    ) {
      return;
    }
    gameAudio.playConfirmSelect();
    isScene4ChoiceVisibleRef.current = false;
    setIsScene4ChoiceVisible(false);
    scene4PhaseRef.current = 'part2_dialogue';
    setScene4Phase('part2_dialogue');
    activateScene4Part2Line(0);
  }, [activateScene4Part2Line]);

  const handleSubmitScene4Passcode = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 4 ||
      scene4PhaseRef.current !== 'puzzle'
    ) {
      return;
    }
    const trimmed = scene4PasscodeInput.trim();
    if (trimmed === SCENE_4_CORRECT_PASSCODE) {
      gameAudio.playVictoryFanfare();
      setScene4PasscodeError('');
      scene4PhaseRef.current = 'explanation';
      setScene4Phase('explanation');
      return;
    }

    gameAudio.playErrorBuzz();
    setScene4PasscodeError(SCENE_4_WRONG_PASSCODE_MSG);
    triggerPasscodeShake();
  }, [scene4PasscodeInput, triggerPasscodeShake]);

  const handleClaimScene4Reward = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 4
    ) {
      return;
    }
    gameAudio.playPowerupChime();
    setUnlockedBadges((prev) =>
      prev.includes(GIA_HUAN_CA_BADGE.id)
        ? prev
        : [...prev, GIA_HUAN_CA_BADGE.id],
    );
    setTrustUnlocked(true);
    if (!scene4TrustClaimedRef.current) {
      scene4TrustClaimedRef.current = true;
      setScene4TrustClaimed(true);
      setTrustPoints((prev) => Math.max(1, prev + 1));
    }
    setRewardPopupBadge(GIA_HUAN_CA_BADGE);
    scene4PhaseRef.current = 'reward';
    setScene4Phase('reward');
    setIsRewardPopupOpen(true);
  }, []);

  // Scene 3 Reward Popup -> transitions DIRECTLY into Scene 4 Part 1 Line 1!
  // Scene 4 Reward Popup ("Mở nắp rương y phục ra") -> transitions DIRECTLY into Scene 5!
  const handleContinueFromRewardPopup = useCallback(() => {
    gameAudio.playConfirmSelect();
    setIsRewardPopupOpen(false);
    setActiveBadgeDetail(null);

    if (activeSceneRef.current === 3) {
      enterScene4Part1Clean();
      return;
    }

    enterScene5Clean();
  }, [enterScene4Part1Clean, enterScene5Clean]);

  const handleScene5SelectRobe = useCallback(
    (choiceNumber: 1 | 2 | 3) => {
      if (
        gameStateRef.current.status !== 'PLAYING' ||
        activeSceneRef.current !== 5 ||
        scene5PhaseRef.current !== 'robe_choice'
      ) {
        return;
      }

      if (choiceNumber === 1 || choiceNumber === 2) {
        const nextWrongs = scene5WrongCountRef.current + 1;
        scene5WrongCountRef.current = nextWrongs;
        setScene5WrongCount(nextWrongs);

        const hintsUsedS5 = hintsUsedBySceneRef.current[5] ?? 0;
        if (hintsUsedS5 >= 3) {
          unlockAchievementTitle(TITLE_PHA_GIA_CHI_TU);
        }

        const nextPhase: Scene5Phase =
          choiceNumber === 1 ? 'wrong1_dialogue' : 'wrong2_dialogue';
        const script =
          choiceNumber === 1 ? SCENE_5_WRONG_1_SCRIPT : SCENE_5_WRONG_2_SCRIPT;

        scene5PhaseRef.current = nextPhase;
        setScene5Phase(nextPhase);
        activateScene5ScriptLine(script, 0, false);
        return;
      }

      gameAudio.playConfirmSelect();
      scene5PhaseRef.current = 'correct_dialogue';
      setScene5Phase('correct_dialogue');
      activateScene5ScriptLine([SCENE_5_CORRECT_LINE], 0, false);
    },
    [activateScene5ScriptLine, unlockAchievementTitle],
  );

  const handleScene5RewindTime = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 5
    ) {
      return;
    }
    adjustTrust(-5);
    scene5PhaseRef.current = 'rewind_black';
    setScene5Phase('rewind_black');
  }, [adjustTrust]);

  const handleScene5RetryChoices = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 5
    ) {
      return;
    }
    gameAudio.playConfirmSelect();
    scene5PhaseRef.current = 'robe_choice';
    setScene5Phase('robe_choice');
  }, []);

  const handleFinishScene5ToScene6 = useCallback(() => {
    if (
      gameStateRef.current.status !== 'PLAYING' ||
      activeSceneRef.current !== 5
    ) {
      return;
    }
    gameAudio.playConfirmSelect();
    closeAllSubModals();
    activeSceneRef.current = 6;
    setActiveScene(6);
    setGameState((prev) => ({
      ...prev,
      status: 'PLAYING',
      level: 6,
      score: Math.max(prev.score, getConfig('completionScore')),
    }));
  }, [closeAllSubModals]);

  // --- ESCALATING / FLAT HINT SYSTEM HANDLERS ---
  const hintSceneKey = activeScene >= 5 ? 5 : activeScene === 4 ? 4 : 3;
  const maxHintsForCurrentScene = getMaxHintsForScene(hintSceneKey);
  const currentSceneHintsUsed = hintsUsedByScene[hintSceneKey] ?? 0;
  const currentSceneHintPool =
    SCENE_HINTS_BY_SCENE[hintSceneKey] ?? SCENE_HINTS_BY_SCENE[4] ?? [];
  const isSceneHintsExhausted =
    currentSceneHintsUsed >= maxHintsForCurrentScene;
  const requiredHintCost = getHintCost(hintSceneKey, currentSceneHintsUsed);

  const handleOpenHintOverlay = useCallback(() => {
    gameAudio.playCrispClick();
    setIsCollectionOverlayOpen(false);
    setIsGameMenuOpen(false);
    setIsHowToPlayOpen(false);
    setHintOverlayView('MAIN');
    setIsHintOverlayOpen(true);
  }, []);

  const handleOpenCollectionOverlay = useCallback(() => {
    gameAudio.playCrispClick();
    setIsHintOverlayOpen(false);
    setIsGameMenuOpen(false);
    setIsHowToPlayOpen(false);
    setIsCollectionOverlayOpen(true);
  }, []);

  const handleRequestHintClick = useCallback(() => {
    if (isSceneHintsExhausted) {
      gameAudio.playErrorBuzz();
      return;
    }
    gameAudio.playCrispClick();
    setHintOverlayView('CONFIRM');
  }, [isSceneHintsExhausted]);

  const handleConfirmSpendCandleForHint = useCallback(() => {
    if (isSceneHintsExhausted || candleCount < requiredHintCost) {
      gameAudio.playErrorBuzz();
      return;
    }

    const nextHintIndex = currentSceneHintsUsed;
    const hintText =
      currentSceneHintPool[nextHintIndex] ?? currentSceneHintPool[0] ?? '';

    gameAudio.playPowerupChime();
    setCandleCount((prev) => Math.max(0, prev - requiredHintCost));
    const updatedHints = {
      ...hintsUsedBySceneRef.current,
      [hintSceneKey]: nextHintIndex + 1,
    };
    hintsUsedBySceneRef.current = updatedHints;
    setHintsUsedByScene(updatedHints);
    setHintOverlayView('MAIN');
    setActiveHintModalText(hintText);
  }, [
    candleCount,
    currentSceneHintPool,
    currentSceneHintsUsed,
    hintSceneKey,
    isSceneHintsExhausted,
    requiredHintCost,
  ]);

  const handleReviewUnlockedHints = useCallback(() => {
    if (currentSceneHintsUsed <= 0) return;
    gameAudio.playCrispClick();
    const unlockedTexts = currentSceneHintPool
      .slice(0, currentSceneHintsUsed)
      .join('\n\n• ');
    setActiveHintModalText(
      currentSceneHintsUsed > 1 ? `• ${unlockedTexts}` : unlockedTexts,
    );
  }, [currentSceneHintPool, currentSceneHintsUsed]);

  // --- QUIZ MINI-GAME HANDLERS ---
  const startNewQuizRound = useCallback(() => {
    const picked = pickTwoQuizQuestionsForScene(activeSceneRef.current);
    setQuizQuestions(picked);
    setQuizStepIndex(0);
    setQuizAnswerInput('');
    setQuizRoundStatus('ANSWERING');
    setIsQuizModalOpen(true);
    window.requestAnimationFrame(() => {
      quizInputRef.current?.focus();
    });
  }, []);

  const handleOpenQuizFromHint = useCallback(() => {
    gameAudio.playConfirmSelect();
    startNewQuizRound();
  }, [startNewQuizRound]);

  const handleSubmitQuizAnswer = useCallback(
    (submittedAnswer: string) => {
      if (quizRoundStatus !== 'ANSWERING') return;
      const currentQ = quizQuestions[quizStepIndex];
      if (!currentQ) return;

      const normalizedUser = submittedAnswer.trim().toUpperCase();
      const normalizedCorrect = currentQ.correct.trim().toUpperCase();

      if (normalizedUser === normalizedCorrect) {
        if (quizStepIndex + 1 >= quizQuestions.length) {
          // Both 2 random questions answered correctly -> +1 Knowledge Candle
          gameAudio.playPowerupChime();
          setCandleCount((prev) => prev + 1);
          setQuizRoundStatus('WON');
        } else {
          gameAudio.playConfirmSelect();
          setQuizStepIndex((prev) => prev + 1);
          setQuizAnswerInput('');
          window.requestAnimationFrame(() => {
            quizInputRef.current?.focus();
          });
        }
      } else {
        gameAudio.playErrorBuzz();
        setQuizRoundStatus('FAILED');
      }
    },
    [quizQuestions, quizRoundStatus, quizStepIndex],
  );

  // Optional A / B / C hotkey support in Scene 2 choice steps
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (
        gameStateRef.current.status !== 'PLAYING' ||
        isPausedOverlayRef.current ||
        activeSceneRef.current !== 2
      ) {
        return;
      }
      const upper = e.key.toUpperCase();
      if (scene2PhaseRef.current === 'STEP1_MENU') {
        if (
          (upper === 'A' || upper === 'B' || upper === 'C') &&
          !checkedChoicesRef.current.includes(upper as Scene2ChoiceId)
        ) {
          e.preventDefault();
          handleSelectScene2Inspection(upper as Scene2ChoiceId);
        }
      } else if (
        scene2PhaseRef.current === 'STEP2_SHUDDER' &&
        upper === 'A'
      ) {
        e.preventDefault();
        handleCheckHoodiePocket();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSelectScene2Inspection, handleCheckHoodiePocket]);

  // Auto-start when ?autoplay is in the URL
  const hasAutoplayed = useRef(false);
  useEffect(() => {
    if (
      !hasAutoplayed.current &&
      new URLSearchParams(window.location.search).has('autoplay')
    ) {
      hasAutoplayed.current = true;
      initGame();
    }
  }, [initGame]);

  useEffect(() => {
    if (sceneRenderRef.current.dust.length === 0) {
      sceneRenderRef.current.dust = createInitialDust();
    }
  }, [createInitialDust]);

  // --- PER-FRAME UPDATE ---
  const update = (deltaTime: number) => {
    const renderState = sceneRenderRef.current;
    renderState.elapsedTime += deltaTime;

    for (let i = 0; i < renderState.dust.length; i++) {
      const p = renderState.dust[i];
      if (!p) continue;
      p.x +=
        p.vx * deltaTime + Math.sin(renderState.elapsedTime + p.phase) * 0.25;
      p.y += p.vy * deltaTime;
      if (p.y < -10) {
        p.y = canvasHeight * 0.78;
        p.x = Math.random() * canvasWidth;
      }
      if (p.x < -10) p.x = canvasWidth + 10;
      if (p.x > canvasWidth + 10) p.x = -10;
    }

    if (
      gameStateRef.current.status !== 'PLAYING' ||
      isPausedOverlayRef.current
    ) {
      lastConfirmRef.current = Boolean(inputRef.current?.actions.confirm);
      return;
    }

    const curScene = activeSceneRef.current;
    const s2Phase = scene2PhaseRef.current;
    const s3Phase = scene3PhaseRef.current;
    const s4Phase = scene4PhaseRef.current;
    const s5Phase = scene5PhaseRef.current;
    const isDialogueVisible =
      curScene === 1 ||
      (curScene === 2 && s2Phase !== 'STEP1_MENU') ||
      (curScene === 3 && s3Phase === 'dialogue') ||
      (curScene === 4 &&
        (s4Phase === 'part1_dialogue' || s4Phase === 'part2_dialogue')) ||
      (curScene === 5 &&
        (s5Phase === 'opening_dialogue' ||
          s5Phase === 'wrong1_dialogue' ||
          s5Phase === 'wrong2_dialogue' ||
          s5Phase === 'correct_dialogue'));

    const confirmPressed = Boolean(inputRef.current?.actions.confirm);
    if (confirmPressed && !lastConfirmRef.current && isDialogueVisible) {
      const activeEl = document.activeElement;
      const isFocusedOnControl =
        (activeEl instanceof HTMLButtonElement && !activeEl.disabled) ||
        activeEl instanceof HTMLInputElement;
      if (!isFocusedOnControl) {
        handleAdvanceDialogue();
      }
    }
    lastConfirmRef.current = confirmPressed;

    if (isDialogueVisible && !isLineCompleteRef.current) {
      const line = activeDialogueLineRef.current;
      const totalLen = line.action.length + 1 + line.dialogue.length;
      const speed = getConfig('typewriterCharsPerSec');
      revealedFloatRef.current = Math.min(
        totalLen,
        revealedFloatRef.current + speed * deltaTime,
      );
      const nextInt = Math.floor(revealedFloatRef.current);
      if (nextInt !== lastRevealedIntRef.current) {
        lastRevealedIntRef.current = nextInt;
        setRevealedChars(nextInt);
      }
      if (nextInt >= totalLen) {
        isLineCompleteRef.current = true;
        setIsLineComplete(true);
        if (
          curScene === 1 &&
          currentLineIndexRef.current === SCENE_1_SCRIPT.length - 1
        ) {
          isChoiceVisibleRef.current = true;
          setIsChoiceVisible(true);
        } else if (
          curScene === 4 &&
          s4Phase === 'part1_dialogue' &&
          scene4DialogueIndexRef.current === SCENE_4_PART_1_SCRIPT.length - 1
        ) {
          isScene4ChoiceVisibleRef.current = true;
          setIsScene4ChoiceVisible(true);
        }
      }
    }

    if (renderState.shakeTimer > 0) {
      renderState.shakeTimer = Math.max(0, renderState.shakeTimer - deltaTime);
      const maxDur = Math.max(0.01, getConfig('dialogueShakeDuration'));
      const ratio = renderState.shakeTimer / maxDur;
      const amp = getConfig('dialogueShakeIntensity') * ratio;
      const sx = Math.sin(renderState.elapsedTime * 68) * amp;
      const sy = Math.cos(renderState.elapsedTime * 54) * amp * 0.55;
      renderState.shakeOffsetX = sx;
      renderState.shakeOffsetY = sy;
      setDialogueShakeOffset({x: sx, y: sy});
    } else if (
      renderState.shakeOffsetX !== 0 ||
      renderState.shakeOffsetY !== 0
    ) {
      renderState.shakeOffsetX = 0;
      renderState.shakeOffsetY = 0;
      setDialogueShakeOffset({x: 0, y: 0});
    }
  };

  // --- PER-FRAME CANVAS RENDER ---
  const draw = (ctx: CanvasRenderingContext2D) => {
    prepareCanvas(ctx, canvasWidth, canvasHeight);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const status = gameStateRef.current.status;
    const renderState = sceneRenderRef.current;

    if (status === 'START') {
      drawBackground(
        ctx,
        assets['menu_background'],
        canvasWidth,
        canvasHeight,
        THEME.colors.menuFallbackBottom,
      );
      if (
        !assets['menu_background'] ||
        !assets['menu_background']?.complete ||
        assets['menu_background']?.naturalWidth === 0
      ) {
        const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        grad.addColorStop(0, THEME.colors.menuFallbackTop);
        grad.addColorStop(1, THEME.colors.menuFallbackBottom);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
      return;
    }

    const curScene = activeSceneRef.current;
    const s2Phase = scene2PhaseRef.current;
    const s3Phase = scene3PhaseRef.current;
    const s4Phase = scene4PhaseRef.current;
    const s5Phase = scene5PhaseRef.current;

    const isScene4ChestBg = curScene === 4 && s4Phase !== 'part1_dialogue';
    const isScene5OpenChestBg = curScene >= 5;
    const bgKey = isScene5OpenChestBg
      ? '5'
      : isScene4ChestBg
        ? '4_ruong'
        : String(curScene);
    const bgSlot =
      SCENE_BACKGROUND_REGISTRY[bgKey] ??
      SCENE_BACKGROUND_REGISTRY['4'] ??
      SCENE_BACKGROUND_REGISTRY['1'];
    const sceneBg = assets[bgSlot.key];

    drawBackground(
      ctx,
      sceneBg,
      canvasWidth,
      canvasHeight,
      THEME.colors.sceneFallbackBottom,
    );

    if (!sceneBg || !sceneBg.complete || sceneBg.naturalWidth === 0) {
      if (isScene5OpenChestBg) {
        drawProceduralScene5ChestBackground(
          ctx,
          canvasWidth,
          canvasHeight,
          renderState.elapsedTime,
        );
      } else if (isScene4ChestBg) {
        drawProceduralScene4ChestBackground(
          ctx,
          canvasWidth,
          canvasHeight,
          renderState.elapsedTime,
        );
      } else if (curScene >= 2) {
        drawProceduralScene2Background(
          ctx,
          canvasWidth,
          canvasHeight,
          renderState.elapsedTime,
        );
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        bgGrad.addColorStop(0, THEME.colors.sceneFallbackTop);
        bgGrad.addColorStop(1, THEME.colors.sceneFallbackBottom);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
    }

    // Atmospheric lighting & dust motes
    ctx.save();
    if (isScene5OpenChestBg) {
      const lampX = canvasWidth * 0.703;
      const lampY = canvasHeight * 0.365;
      const pulse = 1 + Math.sin(renderState.elapsedTime * 8.5) * 0.07;
      const glowR = Math.max(10, 145 * pulse);
      const lampGlow = ctx.createRadialGradient(
        lampX,
        lampY,
        4,
        lampX,
        lampY,
        glowR,
      );
      lampGlow.addColorStop(0, THEME.colors.lampGlowInner);
      lampGlow.addColorStop(1, THEME.colors.lampGlowOuter);
      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
      ctx.fill();
    } else if (isScene4ChestBg) {
      const lampX = canvasWidth * 0.483;
      const lampY = canvasHeight * 0.352;
      const pulse = 1 + Math.sin(renderState.elapsedTime * 8.5) * 0.07;
      const glowR = Math.max(10, 145 * pulse);
      const lampGlow = ctx.createRadialGradient(
        lampX,
        lampY,
        4,
        lampX,
        lampY,
        glowR,
      );
      lampGlow.addColorStop(0, THEME.colors.lampGlowInner);
      lampGlow.addColorStop(1, THEME.colors.lampGlowOuter);
      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
      ctx.fill();
    } else if (curScene >= 2) {
      const lampX = canvasWidth * 0.516;
      const lampY = canvasHeight * 0.495;
      const pulse = 1 + Math.sin(renderState.elapsedTime * 8.5) * 0.07;
      const glowR = Math.max(10, 155 * pulse);
      const lampGlow = ctx.createRadialGradient(
        lampX,
        lampY,
        4,
        lampX,
        lampY,
        glowR,
      );
      lampGlow.addColorStop(0, THEME.colors.lampGlowInner);
      lampGlow.addColorStop(1, THEME.colors.lampGlowOuter);
      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const shaftGrad = ctx.createLinearGradient(
        canvasWidth * 0.76,
        canvasHeight * 0.18,
        canvasWidth * 0.42,
        canvasHeight * 0.78,
      );
      shaftGrad.addColorStop(0, THEME.colors.lightShaftTop);
      shaftGrad.addColorStop(1, THEME.colors.lightShaftBottom);
      ctx.fillStyle = shaftGrad;
      ctx.beginPath();
      ctx.moveTo(canvasWidth * 0.68, canvasHeight * 0.24);
      ctx.lineTo(canvasWidth * 0.8, canvasHeight * 0.24);
      ctx.lineTo(canvasWidth * 0.62, canvasHeight * 0.8);
      ctx.lineTo(canvasWidth * 0.36, canvasHeight * 0.8);
      ctx.closePath();
      ctx.fill();
    }

    for (let i = 0; i < renderState.dust.length; i++) {
      const p = renderState.dust[i];
      if (!p) continue;
      ctx.globalAlpha = clamp(p.alpha, 0, 1);
      ctx.fillStyle = THEME.colors.dustMote;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (curScene === 3 && s3Phase === 'dialogue') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.restore();
    }

    const shouldShowDialogueLayers =
      curScene === 1 ||
      (curScene === 2 && s2Phase !== 'STEP1_MENU') ||
      (curScene === 3 && s3Phase === 'dialogue') ||
      (curScene === 4 &&
        (s4Phase === 'part1_dialogue' || s4Phase === 'part2_dialogue')) ||
      (curScene === 5 &&
        (s5Phase === 'opening_dialogue' ||
          s5Phase === 'wrong1_dialogue' ||
          s5Phase === 'wrong2_dialogue' ||
          s5Phase === 'correct_dialogue'));

    if (!shouldShowDialogueLayers) {
      return;
    }

    // STRICT CHARACTER VISIBILITY RULE:
    // Render ONLY the currently speaking character (`sprite_lien_hoodie`, `sprite_lien_nausong`, `sprite_thiman`, or `sprite_quan_gia_lam`).
    const activeSpeakerSprite: CharacterSpriteId =
      activeDialogueLineRef.current.spriteId;
    const breathOffset = Math.sin(renderState.elapsedTime * 1.8) * 2.5;

    if (activeSpeakerSprite === 'sprite_lien_nausong') {
      const lienNsImg = assets['sprite_lien_nausong'];
      const lienNsTargetH = getConfig('assetLienNauSongHeight');
      const lienNsRatio =
        lienNsImg && lienNsImg.complete && lienNsImg.naturalHeight > 0
          ? lienNsImg.naturalWidth / lienNsImg.naturalHeight
          : getConfig('assetLienNauSongAspectRatio');
      const lienNsW = lienNsTargetH * lienNsRatio;
      const lienNsX = getConfig('lienNauSongTargetX');
      const lienNsY = getConfig('lienNauSongTargetY') + breathOffset;

      ctx.save();
      drawAsset(
        ctx,
        lienNsImg,
        lienNsX,
        lienNsY,
        lienNsW,
        lienNsTargetH,
        (fallbackCtx) => {
          fallbackCtx.fillStyle = '#5c402c';
          fallbackCtx.beginPath();
          fallbackCtx.arc(
            lienNsX + lienNsW * 0.5,
            lienNsY + lienNsTargetH * 0.24,
            Math.max(10, lienNsW * 0.28),
            0,
            Math.PI * 2,
          );
          fallbackCtx.fill();
          fallbackCtx.fillRect(
            lienNsX + lienNsW * 0.2,
            lienNsY + lienNsTargetH * 0.44,
            lienNsW * 0.6,
            lienNsTargetH * 0.52,
          );
        },
      );
      ctx.restore();
    } else if (activeSpeakerSprite === 'sprite_lien_hoodie') {
      const lienImg = assets['sprite_lien_hoodie'];
      const lienTargetH = getConfig('assetLienHeight');
      const lienRatio =
        lienImg && lienImg.complete && lienImg.naturalHeight > 0
          ? lienImg.naturalWidth / lienImg.naturalHeight
          : getConfig('assetLienAspectRatio');
      const lienW = lienTargetH * lienRatio;
      const lienX = getConfig('lienTargetX');
      const lienY = getConfig('lienTargetY') + breathOffset;

      ctx.save();
      drawAsset(
        ctx,
        lienImg,
        lienX,
        lienY,
        lienW,
        lienTargetH,
        (fallbackCtx) => {
          fallbackCtx.fillStyle = THEME.colors.jadeAccent;
          fallbackCtx.beginPath();
          fallbackCtx.arc(
            lienX + lienW * 0.5,
            lienY + lienTargetH * 0.28,
            Math.max(10, lienW * 0.22),
            0,
            Math.PI * 2,
          );
          fallbackCtx.fill();
          fallbackCtx.fillRect(
            lienX + lienW * 0.22,
            lienY + lienTargetH * 0.48,
            lienW * 0.56,
            lienTargetH * 0.48,
          );
        },
      );
      ctx.restore();
    } else if (activeSpeakerSprite === 'sprite_thiman') {
      const thiManImg = assets['sprite_thiman'];
      const thiManTargetH = getConfig('assetThiManHeight');
      const thiManRatio =
        thiManImg && thiManImg.complete && thiManImg.naturalHeight > 0
          ? thiManImg.naturalWidth / thiManImg.naturalHeight
          : getConfig('assetThiManAspectRatio');
      const thiManW = thiManTargetH * thiManRatio;
      const thiManX = getConfig('thiManTargetX');
      const thiManY = getConfig('thiManTargetY') + breathOffset;

      ctx.save();
      ctx.translate(thiManX + thiManW / 2, thiManY);
      ctx.scale(-1, 1);
      drawAsset(
        ctx,
        thiManImg,
        -thiManW / 2,
        0,
        thiManW,
        thiManTargetH,
        (fallbackCtx) => {
          fallbackCtx.fillStyle = '#8b5a3c';
          fallbackCtx.beginPath();
          fallbackCtx.arc(
            0,
            thiManTargetH * 0.24,
            Math.max(10, thiManW * 0.26),
            0,
            Math.PI * 2,
          );
          fallbackCtx.fill();
          fallbackCtx.fillRect(
            -thiManW * 0.34,
            thiManTargetH * 0.44,
            thiManW * 0.68,
            thiManTargetH * 0.52,
          );
        },
      );
      ctx.restore();
    } else if (activeSpeakerSprite === 'sprite_quan_gia_lam') {
      const quanGiaImg = assets['sprite_quan_gia_lam'];
      const quanGiaTargetH = getConfig('assetQuanGiaHeight');
      const quanGiaRatio =
        quanGiaImg && quanGiaImg.complete && quanGiaImg.naturalHeight > 0
          ? quanGiaImg.naturalWidth / quanGiaImg.naturalHeight
          : getConfig('assetQuanGiaAspectRatio');
      const quanGiaW = quanGiaTargetH * quanGiaRatio;
      const quanGiaX = getConfig('quanGiaTargetX');
      const quanGiaY = getConfig('quanGiaTargetY');

      ctx.save();
      ctx.translate(quanGiaX + quanGiaW / 2, quanGiaY);
      ctx.scale(-1, 1);
      drawAsset(
        ctx,
        quanGiaImg,
        -quanGiaW / 2,
        0,
        quanGiaW,
        quanGiaTargetH,
        (fallbackCtx) => {
          fallbackCtx.fillStyle = THEME.colors.speakerQuanGiaBadge;
          fallbackCtx.beginPath();
          fallbackCtx.arc(
            0,
            quanGiaTargetH * 0.25,
            Math.max(10, quanGiaW * 0.22),
            0,
            Math.PI * 2,
          );
          fallbackCtx.fill();
          fallbackCtx.fillRect(
            -quanGiaW * 0.28,
            quanGiaTargetH * 0.45,
            quanGiaW * 0.56,
            quanGiaTargetH * 0.52,
          );
        },
      );
      ctx.restore();
    }

    // LAYER 3 (Front UI - Khung Thoại)
    const boxImg = assets['dialogue_box_frame'];
    const boxW = getConfig('assetDialogueBoxWidth');
    const boxH = getConfig('assetDialogueBoxHeight');
    const boxX = (canvasWidth - boxW) / 2 + renderState.shakeOffsetX;
    const boxY =
      canvasHeight -
      boxH -
      getConfig('dialogueBoxBottomMargin') +
      renderState.shakeOffsetY;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.48)';
    ctx.fillRect(boxX + 6, boxY + 8, boxW - 12, boxH - 6);

    drawAsset(ctx, boxImg, boxX, boxY, boxW, boxH, (fallbackCtx) => {
      fallbackCtx.fillStyle = THEME.colors.ebonyPanel;
      fallbackCtx.strokeStyle = THEME.colors.gildedGold;
      fallbackCtx.lineWidth = 3;
      fallbackCtx.fillRect(boxX, boxY, boxW, boxH);
      fallbackCtx.strokeRect(boxX + 4, boxY + 4, boxW - 8, boxH - 8);
    });
    ctx.restore();
  };

  // --- Ref-Cached Game Loop ---
  const updateRef = useRef(update);
  const drawRef = useRef(draw);
  updateRef.current = update;
  drawRef.current = draw;

  const activeBadgeDetailRef = useRef(activeBadgeDetail);
  activeBadgeDetailRef.current = activeBadgeDetail;
  const activeHintModalTextRef = useRef(activeHintModalText);
  activeHintModalTextRef.current = activeHintModalText;
  const isQuizModalOpenRef = useRef(isQuizModalOpen);
  isQuizModalOpenRef.current = isQuizModalOpen;
  const isHintOverlayOpenRef = useRef(isHintOverlayOpen);
  isHintOverlayOpenRef.current = isHintOverlayOpen;
  const isCollectionOverlayOpenRef = useRef(isCollectionOverlayOpen);
  isCollectionOverlayOpenRef.current = isCollectionOverlayOpen;
  const isGameMenuOpenRef = useRef(isGameMenuOpen);
  isGameMenuOpenRef.current = isGameMenuOpen;
  const isHowToPlayOpenRef = useRef(isHowToPlayOpen);
  isHowToPlayOpenRef.current = isHowToPlayOpen;
  const isRewardPopupOpenRef = useRef(isRewardPopupOpen);
  isRewardPopupOpenRef.current = isRewardPopupOpen;

  useEffect(() => {
    let raf = 0;
    const loop = (time: number) => {
      if (inputRef.current) {
        const cancelPressed = inputRef.current.actions.cancel;
        if (cancelPressed && !lastCancelRef.current) {
          const currentStatus = gameStateRef.current.status;
          // Close topmost modal respecting Z-Index Hierarchy (70 -> 60 -> 50 -> 45)
          if (activeBadgeDetailRef.current) {
            setActiveBadgeDetail(null);
          } else if (activeHintModalTextRef.current !== null) {
            setActiveHintModalText(null);
          } else if (isQuizModalOpenRef.current) {
            setIsQuizModalOpen(false);
          } else if (isHowToPlayOpenRef.current) {
            setIsHowToPlayOpen(false);
          } else if (isHintOverlayOpenRef.current) {
            setIsHintOverlayOpen(false);
            setHintOverlayView('MAIN');
          } else if (isCollectionOverlayOpenRef.current) {
            setIsCollectionOverlayOpen(false);
          } else if (isGameMenuOpenRef.current) {
            setIsGameMenuOpen(false);
          } else if (
            currentStatus === 'PLAYING' &&
            !isRewardPopupOpenRef.current &&
            !(
              activeSceneRef.current === 3 &&
              scene3PhaseRef.current === 'explanation'
            ) &&
            !(
              activeSceneRef.current === 4 &&
              scene4PhaseRef.current === 'explanation'
            )
          ) {
            setIsGameMenuOpen(true);
          } else if (currentStatus === 'PAUSED') {
            setGameState((prev) => ({...prev, status: 'PLAYING'}));
          } else if (
            ['GAME_OVER', 'VICTORY', 'LEVEL_COMPLETE'].includes(currentStatus)
          ) {
            setGameState((prev) => ({...prev, status: 'START'}));
          }
        }
        lastCancelRef.current = cancelPressed;
      }

      stepperRef.current?.(time, (dt) => updateRef.current(dt));

      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) drawRef.current(ctx);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const isMusicPlaying =
    gameState.status === 'PLAYING' && !isGameMenuOpen && !isHowToPlayOpen;

  // Offline procedural ambient courtyard notes via gameAudio.playTone
  useEffect(() => {
    if (!isMusicPlaying || isMusicMuted) return;
    const scale = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33];
    const pattern = [0, 2, 3, 4, 3, 1, 2, 5];
    let step = 0;
    const id = window.setInterval(() => {
      const idx = pattern[step % pattern.length] ?? 0;
      step += 1;
      const freq = scale[idx] ?? 293.66;
      gameAudio.playTone({
        type: 'sine',
        freq,
        dur: 0.9,
        gain: 0.025,
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [isMusicPlaying, isMusicMuted]);

  const activeInspectionObj = activeInspectionId
    ? SCENE_2_INSPECTIONS.find((item) => item.id === activeInspectionId)
    : undefined;

  const currentRenderedLine: DialogueLine =
    activeScene === 1
      ? SCENE_1_SCRIPT[currentLineIndex] ?? SCENE_1_SCRIPT[0]
      : activeScene === 3
        ? SCENE_3_DIALOGUE_SCRIPT[scene3DialogueIndex] ??
          SCENE_3_DIALOGUE_SCRIPT[0]
        : activeScene === 4
          ? scene4Phase === 'part2_dialogue'
            ? SCENE_4_PART_2_SCRIPT[scene4DialogueIndex] ??
              SCENE_4_PART_2_SCRIPT[0]
            : SCENE_4_PART_1_SCRIPT[scene4DialogueIndex] ??
              SCENE_4_PART_1_SCRIPT[0]
          : activeScene === 5
            ? scene5Phase === 'wrong1_dialogue'
              ? SCENE_5_WRONG_1_SCRIPT[scene5DialogueIndex] ??
                SCENE_5_WRONG_1_SCRIPT[0]
              : scene5Phase === 'wrong2_dialogue'
                ? SCENE_5_WRONG_2_SCRIPT[scene5DialogueIndex] ??
                  SCENE_5_WRONG_2_SCRIPT[0]
                : scene5Phase === 'correct_dialogue'
                  ? SCENE_5_CORRECT_LINE
                  : SCENE_5_OPENING_SCRIPT[scene5DialogueIndex] ??
                    SCENE_5_OPENING_SCRIPT[0]
            : scene2Phase === 'STEP1_INSPECT' && activeInspectionObj
              ? {
                  id: 100,
                  speaker: activeInspectionObj.speaker,
                  spriteId: 'sprite_lien_hoodie',
                  action: activeInspectionObj.action,
                  dialogue: activeInspectionObj.dialogue,
                }
              : scene2Phase === 'STEP2_SHUDDER'
                ? SCENE_2_SHUDDER_LINE
                : SCENE_2_DO_PAPER_LINE;

  const isDialogueBoxOpen =
    gameState.status === 'PLAYING' &&
    (activeScene === 1 ||
      (activeScene === 2 && scene2Phase !== 'STEP1_MENU') ||
      (activeScene === 3 && scene3Phase === 'dialogue') ||
      (activeScene === 4 &&
        (scene4Phase === 'part1_dialogue' ||
          scene4Phase === 'part2_dialogue')) ||
      (activeScene === 5 &&
        (scene5Phase === 'opening_dialogue' ||
          scene5Phase === 'wrong1_dialogue' ||
          scene5Phase === 'wrong2_dialogue' ||
          scene5Phase === 'correct_dialogue')));

  const visibleCharacterSprite: CharacterSpriteId | null = isDialogueBoxOpen
    ? currentRenderedLine.spriteId
    : null;

  const actionStr = currentRenderedLine.action;
  const dialogueStr = currentRenderedLine.dialogue;
  const shownAction = actionStr.slice(
    0,
    Math.min(revealedChars, actionStr.length),
  );
  const shownDialogue =
    revealedChars > actionStr.length
      ? dialogueStr.slice(0, Math.max(0, revealedChars - actionStr.length - 1))
      : '';

  const boxWidthPct = (getConfig('assetDialogueBoxWidth') / canvasWidth) * 100;
  const boxHeightPct =
    (getConfig('assetDialogueBoxHeight') / canvasHeight) * 100;
  const boxLeftPct = (100 - boxWidthPct) / 2;
  const boxBottomPct =
    (getConfig('dialogueBoxBottomMargin') / canvasHeight) * 100;

  const isAssetLoaded = (key: string): boolean =>
    Boolean(
      assets[key] &&
        assets[key]?.complete &&
        (assets[key]?.naturalWidth ?? 0) > 0,
    );

  const menuBgLoaded = isAssetLoaded('menu_background');
  const menuBtnLoaded = isAssetLoaded('menu_button_sprite');
  const giayDoLoaded = isAssetLoaded('giaydo_baive');
  const iconGoiYLoaded = isAssetLoaded('icon_goiy');
  const iconBoSuuTapLoaded = isAssetLoaded('icon_bosuutap');
  const iconTramCaiLoaded = isAssetLoaded('icon_tramcai');
  const nenPopupLoaded = isAssetLoaded('nen_popup');

  const menuButtonAspectRatio = getConfig('assetMenuButtonAspectRatio');

  const remainingScene2Choices = SCENE_2_INSPECTIONS.filter(
    (item) => !checkedChoices.includes(item.id),
  );

  const darkRedButtonStyle: React.CSSProperties = {
    background: `linear-gradient(180deg, ${THEME.colors.darkRedBtnTop} 0%, ${THEME.colors.darkRedBtnBottom} 100%)`,
    borderColor: THEME.colors.darkRedBtnBorder,
    color: THEME.colors.darkRedBtnText,
    boxShadow:
      '0 10px 28px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 218, 158, 0.25)',
  };

  const currentQuizQuestion = quizQuestions[quizStepIndex];

  const isScene3PuzzleOverlayVisible =
    gameState.status === 'PLAYING' &&
    activeScene === 3 &&
    scene3Phase === 'puzzle' &&
    isDoPaperOpen;

  const isScene4PuzzleOverlayVisible =
    gameState.status === 'PLAYING' &&
    activeScene === 4 &&
    scene4Phase === 'puzzle' &&
    isChestLockOpen;

  const isAnyPuzzleBoardOverlayVisible =
    isScene3PuzzleOverlayVisible || isScene4PuzzleOverlayVisible;

  const activeTopPuzzlePrompt =
    gameState.status === 'PLAYING' &&
    activeScene === 3 &&
    scene3Phase === 'puzzle'
      ? SCENE_3_PUZZLE_PROMPT
      : gameState.status === 'PLAYING' &&
          activeScene === 4 &&
          scene4Phase === 'puzzle'
        ? SCENE_4_PUZZLE_PROMPT
        : null;

  const canAdvanceCurrentDialogueLine =
    (activeScene === 1 && currentLineIndex < SCENE_1_SCRIPT.length - 1) ||
    (activeScene === 3 && scene3Phase === 'dialogue') ||
    (activeScene === 4 &&
      ((scene4Phase === 'part1_dialogue' &&
        scene4DialogueIndex < SCENE_4_PART_1_SCRIPT.length - 1) ||
        scene4Phase === 'part2_dialogue')) ||
    (activeScene === 5 &&
      (scene5Phase === 'opening_dialogue' ||
        scene5Phase === 'wrong1_dialogue' ||
        scene5Phase === 'wrong2_dialogue' ||
        scene5Phase === 'correct_dialogue'));

  const isLinearDialogueWithoutChoice =
    (activeScene === 1 && !isChoiceVisible) ||
    (activeScene === 3 && scene3Phase === 'dialogue') ||
    (activeScene === 4 &&
      ((scene4Phase === 'part1_dialogue' && !isScene4ChoiceVisible) ||
        scene4Phase === 'part2_dialogue')) ||
    (activeScene === 5 &&
      (scene5Phase === 'opening_dialogue' ||
        scene5Phase === 'wrong1_dialogue' ||
        scene5Phase === 'wrong2_dialogue' ||
        scene5Phase === 'correct_dialogue'));

  const speakerBadgeBg =
    currentRenderedLine.spriteId === 'sprite_quan_gia_lam'
      ? THEME.colors.speakerQuanGiaBadge
      : currentRenderedLine.spriteId === 'sprite_thiman'
        ? THEME.colors.speakerThiManBadge
        : THEME.colors.speakerLienBadge;

  const explanationTitle =
    activeScene === 4 ? SCENE_4_EXPLANATION_TITLE : SCENE_3_EXPLANATION_TITLE;
  const explanationBody =
    activeScene === 4 ? SCENE_4_EXPLANATION_BODY : SCENE_3_EXPLANATION_BODY;

  return (
    <div
      style={{
        backgroundColor: getConfig('backgroundColor'),
        fontFamily: THEME.fonts.body,
      }}
      className="fixed inset-0 w-screen h-screen overflow-hidden touch-none flex flex-col items-center justify-center text-stone-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif:ital,wght@0,600;0,700;0,900;1,400;1,600;1,700&display=swap');
        .vn-poem-container {
          container-type: inline-size;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          text-shadow: none !important;
          filter: none !important;
          -webkit-filter: none !important;
          mix-blend-mode: normal !important;
          opacity: 1 !important;
        }
        .vn-poem-container p,
        .vn-poem-container .vn-poem-line,
        .vn-poem-container * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          text-shadow: none !important;
          filter: none !important;
          -webkit-filter: none !important;
          mix-blend-mode: normal !important;
          opacity: 1 !important;
          font-family: 'Noto Serif', 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-style: italic;
          letter-spacing: -0.012em;
          line-height: 1.58;
          font-size: clamp(14px, 2.45vh, 25px);
          font-size: 4.6cqi;
        }
        .vn-poem-container.is-phase1-compact p,
        .vn-poem-container.is-phase1-compact .vn-poem-line {
          font-size: clamp(11.5px, 1.85vh, 18.5px);
          font-size: 4.6cqi;
        }
        @keyframes vnBlinkArrow {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(4px); opacity: 0.45; }
        }
        .vn-arrow-blink {
          animation: vnBlinkArrow 1.15s ease-in-out infinite;
        }
        @keyframes vnSceneShudderShake {
          0%, 100% { transform: translate3d(0, 0, 0); }
          10% { transform: translate3d(-9px, -4px, 0); }
          20% { transform: translate3d(9px, 4px, 0); }
          30% { transform: translate3d(-8px, 3px, 0); }
          40% { transform: translate3d(8px, -3px, 0); }
          50% { transform: translate3d(-6px, 2px, 0); }
          65% { transform: translate3d(6px, -2px, 0); }
          80% { transform: translate3d(-3px, 1px, 0); }
          92% { transform: translate3d(2px, -1px, 0); }
        }
        .vn-scene-shudder {
          animation-name: vnSceneShudderShake;
          animation-timing-function: cubic-bezier(0.36, 0.07, 0.19, 0.97);
          animation-fill-mode: both;
        }
        @keyframes vnPasscodeErrorShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .vn-passcode-shake {
          animation: vnPasscodeErrorShake 0.44s ease-in-out both;
        }
        @keyframes vnToastPop {
          0% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
          12% { opacity: 1; transform: translate(-50%, 0px) scale(1); }
          85% { opacity: 1; transform: translate(-50%, 0px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -6px) scale(0.98); }
        }
        .vn-bonus-toast {
          animation: vnToastPop 4.4s ease-out forwards;
        }
        @keyframes vnTrustDeltaFloat {
          0% { opacity: 0; transform: translateY(6px) scale(0.92); }
          15% { opacity: 1; transform: translateY(0px) scale(1); }
          80% { opacity: 1; transform: translateY(-8px) scale(1); }
          100% { opacity: 0; transform: translateY(-14px) scale(0.96); }
        }
        .vn-trust-delta-anim {
          animation: vnTrustDeltaFloat 2.35s ease-out forwards;
        }
        @keyframes vnAchievementSlideIn {
          0% { opacity: 0; transform: translate(-50%, -130%); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes vnAchievementFadeOut {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -18px); }
        }
        @keyframes vnClownToastEntry {
          0% { opacity: 0; transform: translate(-50%, -130%); }
          45% { opacity: 1; transform: translate(-50%, 0); }
          57% { transform: translate(calc(-50% - 9px), 0); }
          69% { transform: translate(calc(-50% + 9px), 0); }
          81% { transform: translate(calc(-50% - 6px), 0); }
          91% { transform: translate(calc(-50% + 5px), 0); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .vn-ach-honor-enter {
          animation: vnAchievementSlideIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .vn-ach-clown-enter {
          animation: vnClownToastEntry 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .vn-ach-exit {
          animation: vnAchievementFadeOut 0.44s ease-in forwards;
        }
        @keyframes vnGoldenSparkFloat {
          0%, 100% { opacity: 0.25; transform: translateY(2px) scale(0.85); }
          50% { opacity: 0.95; transform: translateY(-6px) scale(1.15); }
        }
        .vn-gold-spark-1 { animation: vnGoldenSparkFloat 2.1s ease-in-out infinite; }
        .vn-gold-spark-2 { animation: vnGoldenSparkFloat 2.6s ease-in-out 0.6s infinite; }
        .vn-gold-spark-3 { animation: vnGoldenSparkFloat 2.3s ease-in-out 1.1s infinite; }
        @keyframes vnWhipFlashPulse {
          0% { opacity: 0; transform: scale(0.92); }
          18% { opacity: 1; transform: scale(1.04); }
          82% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.02); }
        }
        .vn-whip-flash-text {
          animation: vnWhipFlashPulse 1.3s ease-out forwards;
        }
      `}</style>

      {/* TOP-SLIDING ACHIEVEMENT TOAST BANNER (z-index: 95, Queue-backed) */}
      {activeAchievementToast !== null && (
        <div
          key={activeAchievementToast.key}
          role="status"
          aria-live="polite"
          data-testid="achievement-toast-banner"
          style={{
            zIndex: 95,
            top: '20px',
            left: '50%',
            backgroundColor:
              activeAchievementToast.item.variant === 'honor'
                ? 'rgba(28, 20, 16, 0.96)'
                : '#2a1010',
            borderColor:
              activeAchievementToast.item.variant === 'honor'
                ? '#d4af37'
                : '#b82929',
            boxShadow:
              activeAchievementToast.item.variant === 'honor'
                ? '0 0 0 3px #23160f, 0 0 0 5px rgba(212, 175, 55, 0.72), 0 14px 36px rgba(0, 0, 0, 0.9), 0 0 28px rgba(212, 175, 55, 0.42)'
                : '0 0 0 3px #1c0909, 0 0 0 5px rgba(184, 41, 41, 0.78), 0 14px 36px rgba(0, 0, 0, 0.92), 0 0 24px rgba(184, 41, 41, 0.42)',
          }}
          className={`fixed w-[min(92vw,520px)] rounded-xl border-2 px-4 py-3.5 flex items-center gap-3.5 pointer-events-none select-none overflow-hidden ${
            activeAchievementToast.exiting
              ? 'vn-ach-exit'
              : activeAchievementToast.item.variant === 'honor'
                ? 'vn-ach-honor-enter'
                : 'vn-ach-clown-enter'
          }`}>
          <LeSoCloudCorners
            color={
              activeAchievementToast.item.variant === 'honor'
                ? '#d4af37'
                : '#ef4444'
            }
          />

          {activeAchievementToast.item.variant === 'honor' && (
            <>
              <span className="vn-gold-spark-1 absolute top-2.5 right-10 w-1.5 h-1.5 rounded-full bg-amber-300 pointer-events-none" />
              <span className="vn-gold-spark-2 absolute bottom-3 right-20 w-1.5 h-1.5 rounded-full bg-yellow-200 pointer-events-none" />
              <span className="vn-gold-spark-3 absolute top-4 left-20 w-1 h-1 rounded-full bg-amber-200 pointer-events-none" />
            </>
          )}

          <div
            style={{
              background:
                activeAchievementToast.item.variant === 'honor'
                  ? 'radial-gradient(circle, #5c3f1c 0%, #2a1a0c 100%)'
                  : 'radial-gradient(circle, #4c1717 0%, #220909 100%)',
              borderColor:
                activeAchievementToast.item.variant === 'honor'
                  ? '#d4af37'
                  : '#dc2626',
            }}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 shadow-inner">
            <AchievementEmblemIcon
              variant={activeAchievementToast.item.variant}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col items-start text-left">
            <span
              style={{
                color:
                  activeAchievementToast.item.variant === 'honor'
                    ? '#fbbf24'
                    : '#f87171',
              }}
              className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest leading-tight">
              {activeAchievementToast.item.categoryLabel}
            </span>
            <h3
              style={{
                fontFamily: THEME.fonts.heading,
                color:
                  activeAchievementToast.item.variant === 'honor'
                    ? '#FFF6D6'
                    : '#FFE4E6',
              }}
              className="text-sm sm:text-base md:text-lg font-bold leading-snug mt-0.5">
              {activeAchievementToast.item.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-stone-200/95 leading-snug mt-0.5 line-clamp-2">
              {activeAchievementToast.item.description}
            </p>
          </div>
        </div>
      )}

      {!assetsReady && (
        <div
          style={{backgroundColor: THEME.colors.canvasFallbackBg}}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-amber-200">
          <div
            style={{fontFamily: THEME.fonts.heading}}
            className="text-2xl font-bold tracking-wide mb-2">
            {'Hậu Lê Phiêu Lưu Ký '}
          </div>
          <div className="text-sm text-stone-400">Đang tải tài nguyên...</div>
        </div>
      )}

      <BackgroundMusic
        url=""
        isPlaying={isMusicPlaying}
        isMuted={isMusicMuted}
        volume={getConfig('defaultMusicVolume')}
      />

      {/* Dedicated Top HUD Bar during Gameplay (z-index: 44 & overflow-visible so Trust HUD + floating deltas stay visible) */}
      {assetsReady && gameState.status === 'PLAYING' && (
        <div
          style={{backgroundColor: THEME.colors.canvasFallbackBg, zIndex: 44}}
          className="relative w-full min-h-[62px] flex flex-wrap items-center justify-between px-8 py-1.5 border-b border-amber-900/30 shrink-0 gap-2.5 overflow-visible">
          {/* Left: Top-Left Menu Button + Trust Badge (with floating delta) + Scene Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 overflow-visible">
            <TouchSafeButton
              testId="top-left-menu-button"
              onClick={() => {
                gameAudio.playCrispClick();
                setIsGameMenuOpen((prev) => !prev);
              }}
              ariaLabel="Mở Menu Trò Chơi"
              style={{backgroundColor: THEME.colors.ebonyButtonBg}}
              className="px-4 py-2 rounded-lg border border-amber-700/60 text-amber-200 text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
              <span>Menu</span>
            </TouchSafeButton>

            {trustUnlocked && (
              <div
                data-testid="hud-trust-bar"
                title={
                  jadeHairpinShieldActive
                    ? 'Điểm Tín Nhiệm (Đang có Trâm Cài Ngọc Bích bảo hộ 1 lần)'
                    : 'Điểm Tín Nhiệm (Chiếc trâm cài)'
                }
                style={{
                  backgroundColor: 'rgba(43, 28, 20, 0.94)',
                  borderColor:
                    trustPoints < 0
                      ? 'rgba(248, 113, 113, 0.8)'
                      : jadeHairpinShieldActive
                        ? 'rgba(52, 211, 153, 0.92)'
                        : 'rgba(143, 168, 142, 0.78)',
                }}
                className="relative h-[50px] px-2.5 sm:px-3 py-1 rounded-xl border flex items-center gap-2 shadow-lg select-none overflow-visible">
                <div
                  style={{
                    aspectRatio: `${getConfig('assetIconTramCaiAspectRatio')}`,
                  }}
                  className="h-7 flex items-center justify-center overflow-hidden shrink-0">
                  {iconTramCaiLoaded ? (
                    <img
                      src={ASSETS_MANIFEST.icon_tramcai}
                      alt="Chiếc trâm cài"
                      className="w-full h-full object-contain drop-shadow"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 48 42"
                      className="w-full h-full object-contain"
                      aria-hidden="true">
                      <line
                        x1="6"
                        y1="36"
                        x2="36"
                        y2="12"
                        stroke="#6e472b"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <circle cx="38" cy="10" r="7" fill="#a7e3c5" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-200/95 whitespace-nowrap">
                      Tín nhiệm
                    </span>
                    {jadeHairpinShieldActive && (
                      <span
                        title="Trâm Ngọc Bích đang kích hoạt"
                        className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-10 sm:w-14 h-2 rounded-full bg-stone-900/90 border border-emerald-400/40 overflow-hidden">
                      <div
                        style={{
                          width:
                            trustPoints < 0
                              ? '100%'
                              : `${clamp(trustPoints * 12, 12, 100)}%`,
                        }}
                        className={`h-full rounded-full ${
                          trustPoints < 0
                            ? 'bg-red-600/80'
                            : 'bg-gradient-to-r from-emerald-400 to-amber-300'
                        }`}
                      />
                    </div>
                    <span
                      data-testid="hud-trust-value"
                      className={`text-xs sm:text-sm font-extrabold ${
                        trustPoints < 0 ? 'text-red-400' : 'text-white'
                      }`}>
                      {trustPoints}
                    </span>
                  </div>
                </div>

                {trustDeltaAnim !== null && (
                  <div
                    key={trustDeltaAnim.id}
                    data-testid="trust-floating-delta"
                    style={{
                      zIndex: 80,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.98)',
                    }}
                    className={`vn-trust-delta-anim absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg border font-extrabold text-xs sm:text-sm whitespace-nowrap pointer-events-none ${
                      trustDeltaAnim.tone === 'negative'
                        ? 'bg-red-950/95 border-red-500 text-red-300'
                        : trustDeltaAnim.tone === 'shield'
                          ? 'bg-emerald-950/95 border-emerald-400 text-emerald-200'
                          : 'bg-cyan-950/95 border-amber-300 text-cyan-200'
                    }`}>
                    {trustDeltaAnim.text}
                  </div>
                )}
              </div>
            )}

            {activeTopPuzzlePrompt === null && (
              <div className="hidden md:flex items-center gap-2 text-xs text-amber-200/85 pointer-events-none select-none">
                <span className="font-semibold text-amber-300">
                  {`Cảnh ${Math.min(activeScene, 6)}`}
                </span>
                <span className="text-stone-500">•</span>
                <span>
                  {activeScene === 1
                    ? `Thoại ${currentLineIndex + 1}/${SCENE_1_SCRIPT.length}`
                    : activeScene === 2
                      ? scene2Phase === 'STEP1_MENU' ||
                        scene2Phase === 'STEP1_INSPECT'
                        ? `Khám phá kho (${checkedChoices.length}/${SCENE_2_INSPECTIONS.length})`
                        : 'Phát hiện vật lạ'
                      : activeScene === 3
                        ? scene3Phase === 'dialogue'
                          ? `Đọc tờ giấy dó (${scene3DialogueIndex + 1}/${SCENE_3_DIALOGUE_SCRIPT.length})`
                          : 'Giải mã bài vè cổ'
                        : activeScene === 4
                          ? scene4Phase === 'part1_dialogue'
                            ? `Gặp Thị Mận (${scene4DialogueIndex + 1}/${SCENE_4_PART_1_SCRIPT.length})`
                            : scene4Phase === 'part2_dialogue'
                              ? `Bên chiếc rương gỗ (${scene4DialogueIndex + 1}/${SCENE_4_PART_2_SCRIPT.length})`
                              : 'Giải khóa Ngũ Thường'
                          : activeScene === 5
                            ? scene5Phase === 'robe_choice'
                              ? 'Chọn y phục Giao Lĩnh'
                              : 'Phục sắc triều Lê'
                            : 'Chuẩn bị lễ vật Cảnh 6'}
                </span>
              </div>
            )}
          </div>

          {/* VERY TOP-CENTER RED PUZZLE PROMPT (Scene 3 & Scene 4 Puzzle Phases) */}
          {activeTopPuzzlePrompt !== null && (
            <div
              data-testid="scene3-top-puzzle-prompt"
              className="order-3 lg:order-none w-full lg:w-auto lg:flex-1 min-w-0 flex items-center justify-center px-1">
              <div
                style={{
                  backgroundColor: 'rgba(10, 6, 4, 0.9)',
                  borderColor: 'rgba(255, 59, 59, 0.55)',
                  color: '#FF3B3B',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.85)',
                }}
                className="max-w-3xl px-4 py-1.5 rounded-2xl border font-bold text-[11px] sm:text-xs md:text-[13.5px] text-center leading-snug">
                {activeTopPuzzlePrompt}
              </div>
            </div>
          )}

          {/* TOP-RIGHT HUD BAR ("Gợi ý" + "Bộ sưu tập") */}
          {hudUnlocked && activeScene >= 3 && (
            <div
              data-testid="scene3-topright-hud"
              className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Button 1: icon_goiy + "Gợi ý" */}
              <TouchSafeButton
                testId="hud-hint-button"
                ariaLabel="Gợi ý"
                onClick={handleOpenHintOverlay}
                style={{backgroundColor: 'rgba(43, 28, 20, 0.9)'}}
                className="w-[74px] h-[54px] px-2 py-1 rounded-xl border border-amber-600/65 flex flex-col items-center justify-center gap-0.5 shadow-lg">
                <div className="w-7 h-7 flex items-center justify-center overflow-hidden shrink-0">
                  {iconGoiYLoaded ? (
                    <img
                      src={ASSETS_MANIFEST.icon_goiy}
                      alt="Gợi ý"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 48 48"
                      className="w-full h-full object-contain"
                      aria-hidden="true">
                      <path
                        d="M24 6 C29 14 29 20 24 24 C19 20 19 14 24 6 Z"
                        fill="#ffd56b"
                      />
                      <ellipse cx="24" cy="34" rx="16" ry="7" fill="#c89b4f" />
                    </svg>
                  )}
                </div>
                <span className="text-[11px] leading-none font-bold text-amber-100 whitespace-nowrap">
                  Gợi ý
                </span>
              </TouchSafeButton>

              {/* Button 2: icon_bosuutap + "Bộ sưu tập" */}
              <TouchSafeButton
                testId="hud-collection-button"
                ariaLabel="Bộ sưu tập"
                onClick={handleOpenCollectionOverlay}
                style={{backgroundColor: 'rgba(43, 28, 20, 0.9)'}}
                className="w-[74px] h-[54px] px-1.5 py-1 rounded-xl border border-amber-600/65 flex flex-col items-center justify-center gap-0.5 shadow-lg">
                <div className="w-8 h-7 flex items-center justify-center overflow-hidden shrink-0">
                  {iconBoSuuTapLoaded ? (
                    <img
                      src={ASSETS_MANIFEST.icon_bosuutap}
                      alt="Bộ sưu tập"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 56 40"
                      className="w-full h-full object-contain"
                      aria-hidden="true">
                      <rect
                        x="6"
                        y="10"
                        width="34"
                        height="22"
                        rx="3"
                        fill="#8B1E1E"
                        stroke="#D4AF37"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="34"
                        y="22"
                        width="16"
                        height="8"
                        rx="3"
                        fill="#e2b866"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[11px] leading-none font-bold text-amber-100 whitespace-nowrap">
                  Bộ sưu tập
                </span>
              </TouchSafeButton>
            </div>
          )}
        </div>
      )}

      {/* Main 16:9 Stage Area */}
      {assetsReady && (
        <div
          style={{
            backgroundColor: THEME.colors.canvasFallbackBg,
            animationDuration:
              sceneShakeDurationMs > 0
                ? `${sceneShakeDurationMs}ms`
                : undefined,
          }}
          className={`flex-1 w-full min-h-0 flex items-center justify-center relative ${
            sceneShakeDurationMs > 0 ? 'vn-scene-shudder' : ''
          }`}>
          {/* Non-blocking +2 Knowledge Candles Bonus Toast (Scene 4 Line 2) */}
          {isCandleBonusToastVisible && (
            <div
              role="status"
              data-testid="scene4-candle-bonus-toast"
              style={{
                zIndex: 35,
                backgroundColor: 'rgba(20, 12, 8, 0.94)',
                borderColor: THEME.colors.gildedGold,
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.85)',
              }}
              className="vn-bonus-toast absolute top-3 left-1/2 px-5 py-2.5 rounded-full border-2 text-xs sm:text-sm md:text-base font-semibold text-amber-200 pointer-events-none select-none whitespace-nowrap">
              <span>{SCENE_4_CANDLE_BONUS_PREFIX}</span>
              <strong
                style={{color: '#FFFFFF'}}
                className="font-extrabold text-white">
                {SCENE_4_CANDLE_BONUS_VALUE}
              </strong>
            </div>
          )}

          <div
            style={{
              aspectRatio: `${canvasWidth} / ${canvasHeight}`,
              width:
                gameState.status === 'PLAYING'
                  ? `min(100%, calc((100vh - ${
                      isAnyPuzzleBoardOverlayVisible ? 74 : 128
                    }px) * ${canvasWidth} / ${canvasHeight}))`
                  : `min(100%, calc(100vh * ${canvasWidth} / ${canvasHeight}))`,
            }}
            className="relative h-auto max-w-full max-h-full flex items-center justify-center overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              style={{
                aspectRatio: `${canvasWidth} / ${canvasHeight}`,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              className="block w-full h-full"
            />

            {/* Explicit character DOM markers strictly enforcing `display: none` for all non-speaking characters & puzzle phases */}
            <div
              data-character="sprite_lien_hoodie"
              style={{
                display:
                  visibleCharacterSprite === 'sprite_lien_hoodie' &&
                  !hasAnyModalOpen
                    ? 'block'
                    : 'none',
              }}
              className="pointer-events-none"
            />
            <div
              data-character="sprite_thiman"
              style={{
                display:
                  visibleCharacterSprite === 'sprite_thiman' && !hasAnyModalOpen
                    ? 'block'
                    : 'none',
              }}
              className="pointer-events-none"
            />
            <div
              data-character="sprite_lien_nausong"
              style={{
                display:
                  visibleCharacterSprite === 'sprite_lien_nausong' &&
                  !hasAnyModalOpen
                    ? 'block'
                    : 'none',
              }}
              className="pointer-events-none"
            />
            <div
              data-character="sprite_quan_gia_lam"
              style={{
                display:
                  visibleCharacterSprite === 'sprite_quan_gia_lam' &&
                  !hasAnyModalOpen
                    ? 'block'
                    : 'none',
              }}
              className="pointer-events-none"
            />

            {/* SCENE 3 PHASE 1 ('dialogue'): Center Dó Paper positioned cleanly above bottom Dialogue Box */}
            {gameState.status === 'PLAYING' &&
              activeScene === 3 &&
              scene3Phase === 'dialogue' && (
                <div
                  data-testid="scene3-phase1-paper"
                  style={{
                    position: 'absolute',
                    top: '0.5%',
                    height: '58.5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 8,
                  }}
                  className="flex items-center justify-center pointer-events-none select-none">
                  <DoPaperPoemCard
                    giayDoLoaded={giayDoLoaded}
                    imgSrc={ASSETS_MANIFEST.giaydo_baive}
                    compactForDialogue
                  />
                </div>
              )}

            {/* LAYER 4 VIETNAMESE DIALOGUE TEXT OVERLAY (Scene 1, Scene 2 Dialogue States, & Scene 3 Phase 1) */}
            {isDialogueBoxOpen && (
              <div
                onPointerUp={(e) => {
                  if (e.button !== undefined && e.button !== 0) return;
                  handleAdvanceDialogue();
                }}
                className="absolute inset-0 z-10 pointer-events-auto touch-none select-none">
                <div
                  style={{
                    position: 'absolute',
                    left: `${boxLeftPct}%`,
                    width: `${boxWidthPct}%`,
                    bottom: `${boxBottomPct}%`,
                    height: `${boxHeightPct}%`,
                    transform: `translate(${dialogueShakeOffset.x * 0.35}px, ${dialogueShakeOffset.y * 0.35}px)`,
                  }}
                  className="px-[7.5%] py-[4.2%] sm:py-[4.6%] flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between gap-2 shrink-0 mb-1">
                    <div
                      style={{
                        backgroundColor: speakerBadgeBg,
                        borderColor: THEME.colors.gildedGold,
                        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                      }}
                      className="inline-flex items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-md border text-[11px] sm:text-xs md:text-sm font-bold text-amber-200 tracking-wide shadow">
                      {currentRenderedLine.speaker}
                    </div>

                    {!isMobile && !isLineComplete && (
                      <span className="text-[10px] sm:text-xs text-stone-400/80 hidden sm:inline">
                        Nhấp chuột / Space để hiện hết
                      </span>
                    )}
                    {!isMobile &&
                      isLineComplete &&
                      canAdvanceCurrentDialogueLine && (
                        <span className="text-[10px] sm:text-xs text-stone-400/80 hidden sm:inline">
                          Nhấp chuột / Space để tiếp tục
                        </span>
                      )}
                  </div>

                  <div
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      handleAdvanceDialogue();
                    }}
                    className="flex-1 min-h-0 overflow-y-auto touch-auto pointer-events-auto pr-1 flex flex-col justify-center">
                    <p
                      style={{
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)',
                      }}
                      className="text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] leading-relaxed font-normal">
                      <span
                        style={{color: THEME.colors.stageActionText}}
                        className="italic font-medium mr-1.5">
                        {shownAction}
                      </span>
                      {shownDialogue && (
                        <span
                          style={{color: THEME.colors.dialogueText}}
                          className="font-medium">
                          {shownDialogue}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-end shrink-0 mt-0.5 min-h-[18px]">
                    {!isMobile &&
                      isLineComplete &&
                      canAdvanceCurrentDialogueLine && (
                        <div
                          aria-hidden="true"
                          className="vn-arrow-blink flex items-center gap-1 text-amber-300 text-xs sm:text-sm font-bold px-2">
                          <span>▼</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SCENE 2 - STEP 1: VERTICALLY CENTERED DARK RED CHOICE MENU */}
          {gameState.status === 'PLAYING' &&
            activeScene === 2 &&
            scene2Phase === 'STEP1_MENU' && (
              <div
                ref={step1MenuRef}
                data-overlay-container=""
                className="absolute inset-0 z-20 overflow-y-auto touch-auto">
                <div className="min-h-full w-full flex flex-col items-center px-8 py-4">
                  <div className="m-auto w-full max-w-xl flex flex-col items-center gap-3.5">
                    {remainingScene2Choices.map((item, idx) => (
                      <TouchSafeButton
                        key={item.id}
                        autoFocus={idx === 0}
                        testId={`scene2-choice-${item.id}`}
                        onClick={() => handleSelectScene2Inspection(item.id)}
                        style={darkRedButtonStyle}
                        className="w-full py-3.5 px-6 rounded-xl border-2 text-left sm:text-center font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-2xl">
                        <span
                          style={{textShadow: '0 2px 5px rgba(0, 0, 0, 0.92)'}}
                          className="leading-snug">
                          {item.buttonLabel}
                        </span>
                      </TouchSafeButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {/* SCENE 3 PHASE 2 ('puzzle'): DARK VIGNETTE + ANTIQUE DÓ PAPER (#000000 POEM) + 4-DIGIT INPUT */}
          {isScene3PuzzleOverlayVisible && (
            <div
              data-testid="scene3-paper-overlay"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.78)', zIndex: 20}}
              className="absolute inset-0 overflow-y-auto touch-auto">
              <div className="min-h-full w-full flex flex-col items-center px-6 py-1.5 sm:py-2">
                <div className="m-auto w-full max-w-2xl flex flex-col items-center gap-2">
                  <DoPaperPoemCard
                    giayDoLoaded={giayDoLoaded}
                    imgSrc={ASSETS_MANIFEST.giaydo_baive}
                  />

                  {/* Passcode Input + "Xác nhận" + "Cất" Controls */}
                  <div
                    className={`w-full flex flex-wrap items-center justify-center gap-2.5 ${
                      isPasscodeShaking ? 'vn-passcode-shake' : ''
                    }`}>
                    <input
                      ref={passcodeInputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      value={passcodeInput}
                      placeholder="Nhập 4 số"
                      aria-label="Mật mã 4 chữ số"
                      data-testid="scene3-passcode-input"
                      onChange={(e) => {
                        const digitsOnly = e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 4);
                        setPasscodeInput(digitsOnly);
                        if (passcodeError) setPasscodeError('');
                      }}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmitScene3Passcode();
                        }
                      }}
                      style={{
                        backgroundColor: '#1a110d',
                        borderColor: THEME.colors.gildedGold,
                        userSelect: 'text',
                        WebkitUserSelect: 'text',
                      }}
                      className="w-[144px] min-h-[48px] px-4 py-2 rounded-xl border-2 text-center text-lg font-bold tracking-[0.25em] text-amber-100 placeholder:text-stone-500 placeholder:text-xs placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-amber-300 pointer-events-auto touch-auto shadow-xl"
                    />

                    <TouchSafeButton
                      testId="scene3-confirm-passcode"
                      onClick={handleSubmitScene3Passcode}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="px-5 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>{SCENE_3_CONFIRM_LABEL}</span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      testId="scene3-put-away-button"
                      onClick={() => {
                        gameAudio.playCrispClick();
                        setIsDoPaperOpen(false);
                      }}
                      style={{
                        backgroundColor: THEME.colors.ebonyButtonBg,
                        borderColor: THEME.colors.gildedBorder,
                      }}
                      className="px-5 py-2.5 rounded-xl border-2 text-amber-100 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>{SCENE_3_PUT_AWAY_LABEL}</span>
                    </TouchSafeButton>
                  </div>

                  {passcodeError && (
                    <p
                      role="alert"
                      className="text-xs sm:text-sm font-semibold text-red-300 bg-black/75 px-3.5 py-1 rounded-lg border border-red-800/60 text-center">
                      {passcodeError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SCENE 4 PART 2 ('puzzle'): ENGRAVED CHINESE CHARACTER CLUE BOARD + DEDUCTION NOTE + 5-DIGIT INPUT */}
          {isScene4PuzzleOverlayVisible && (
            <div
              data-testid="scene4-lock-overlay"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.74)', zIndex: 20}}
              className="absolute inset-0 overflow-y-auto touch-auto">
              <div className="min-h-full w-full flex flex-col items-center px-6 sm:px-8 py-2 sm:py-3">
                <div className="m-auto w-full max-w-2xl flex flex-col items-center gap-3">
                  <div
                    data-testid="scene4-clue-board"
                    style={{
                      background:
                        'linear-gradient(180deg, #351d11 0%, #1c0e07 100%)',
                      borderColor: '#d4a853',
                      boxShadow:
                        '0 0 0 4px #4a2511, 0 18px 40px rgba(0, 0, 0, 0.9), inset 0 0 24px rgba(212, 168, 83, 0.22)',
                    }}
                    className="w-full rounded-2xl border-2 px-4 sm:px-7 py-4 sm:py-6 flex flex-col items-center text-center">
                    <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90 mb-2">
                      Bảng Khắc Chữ Hán Trên Nắp Rương
                    </div>
                    <div
                      style={{
                        fontFamily: THEME.fonts.heading,
                        color: '#FFE49E',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)',
                      }}
                      className="text-lg sm:text-2xl md:text-3xl font-black tracking-wide py-1.5 select-none">
                      {SCENE_4_CLUE_BOARD_TEXT}
                    </div>
                  </div>

                  <div
                    data-testid="scene4-deduction-note"
                    style={{
                      backgroundColor: 'rgba(22, 14, 10, 0.92)',
                      borderColor: 'rgba(226, 184, 102, 0.55)',
                    }}
                    className="w-full rounded-xl border px-4 sm:px-6 py-3 text-center shadow-lg">
                    <p className="text-xs sm:text-sm md:text-base text-amber-100 leading-relaxed font-medium italic">
                      {SCENE_4_DEDUCTION_NOTE}
                    </p>
                  </div>

                  <div
                    className={`w-full flex flex-wrap items-center justify-center gap-2.5 pt-0.5 ${
                      isPasscodeShaking ? 'vn-passcode-shake' : ''
                    }`}>
                    <input
                      ref={scene4PasscodeInputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      value={scene4PasscodeInput}
                      placeholder="_ _ _ _ _"
                      aria-label="Mật mã 5 chữ số Ngũ Thường"
                      data-testid="scene4-passcode-input"
                      onChange={(e) => {
                        const digitsOnly = e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 5);
                        setScene4PasscodeInput(digitsOnly);
                        if (scene4PasscodeError) setScene4PasscodeError('');
                      }}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmitScene4Passcode();
                        }
                      }}
                      style={{
                        backgroundColor: '#1a110d',
                        borderColor: THEME.colors.gildedGold,
                        userSelect: 'text',
                        WebkitUserSelect: 'text',
                      }}
                      className="w-[164px] min-h-[48px] px-4 py-2 rounded-xl border-2 text-center text-lg font-bold tracking-[0.28em] text-amber-100 placeholder:text-stone-500 placeholder:text-sm placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-300 pointer-events-auto touch-auto shadow-xl"
                    />

                    <TouchSafeButton
                      testId="scene4-confirm-passcode"
                      onClick={handleSubmitScene4Passcode}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="px-5 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>{SCENE_3_CONFIRM_LABEL}</span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      testId="scene4-put-away-button"
                      onClick={() => {
                        gameAudio.playCrispClick();
                        setIsChestLockOpen(false);
                      }}
                      style={{
                        backgroundColor: THEME.colors.ebonyButtonBg,
                        borderColor: THEME.colors.gildedBorder,
                      }}
                      className="px-5 py-2.5 rounded-xl border-2 text-amber-100 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>{SCENE_4_PUT_AWAY_LABEL}</span>
                    </TouchSafeButton>
                  </div>

                  {scene4PasscodeError && (
                    <p
                      role="alert"
                      className="text-xs sm:text-sm font-semibold text-red-300 bg-black/75 px-3.5 py-1 rounded-lg border border-red-800/60 text-center">
                      {scene4PasscodeError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SCENE 5: 3 GIAO LINH ROBE CHOICE BUTTONS ON `nencanh5_ruongao` */}
          {gameState.status === 'PLAYING' &&
            activeScene === 5 &&
            scene5Phase === 'robe_choice' && (
              <div
                ref={scene5ChoiceMenuRef}
                data-overlay-container=""
                data-testid="scene5-robe-choices"
                className="absolute inset-0 z-20 overflow-y-auto touch-auto">
                <div className="min-h-full w-full flex flex-col items-center px-8 py-4">
                  <div className="mt-auto mb-3 sm:mb-6 w-full max-w-xl flex flex-col items-center gap-3">
                    <TouchSafeButton
                      autoFocus
                      testId="scene5-robe-btn-1"
                      onClick={() => handleScene5SelectRobe(1)}
                      style={darkRedButtonStyle}
                      className="w-full py-3.5 px-6 rounded-xl border-2 text-center font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-2xl">
                      <span
                        style={{textShadow: '0 2px 5px rgba(0, 0, 0, 0.92)'}}>
                        {SCENE_5_ROBE_CHOICE_1_LABEL}
                      </span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      testId="scene5-robe-btn-2"
                      onClick={() => handleScene5SelectRobe(2)}
                      style={darkRedButtonStyle}
                      className="w-full py-3.5 px-6 rounded-xl border-2 text-center font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-2xl">
                      <span
                        style={{textShadow: '0 2px 5px rgba(0, 0, 0, 0.92)'}}>
                        {SCENE_5_ROBE_CHOICE_2_LABEL}
                      </span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      testId="scene5-robe-btn-3"
                      onClick={() => handleScene5SelectRobe(3)}
                      style={darkRedButtonStyle}
                      className="w-full py-3.5 px-6 rounded-xl border-2 text-center font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-2xl">
                      <span
                        style={{textShadow: '0 2px 5px rgba(0, 0, 0, 0.92)'}}>
                        {SCENE_5_ROBE_CHOICE_3_LABEL}
                      </span>
                    </TouchSafeButton>
                  </div>
                </div>
              </div>
            )}

          {/* SCENE 5: WHIP FLASH SCREEN (~1.3s) */}
          {gameState.status === 'PLAYING' &&
            activeScene === 5 &&
            scene5Phase === 'whip_flash' && (
              <div
                data-testid="scene5-whip-flash"
                style={{backgroundColor: '#000000', zIndex: 38}}
                className="absolute inset-0 flex items-center justify-center px-8 text-center select-none">
                <h2
                  style={{
                    fontFamily: THEME.fonts.heading,
                    color: '#FF2A2A',
                    textShadow: '0 0 24px rgba(255, 36, 36, 0.85)',
                  }}
                  className="vn-whip-flash-text text-2xl sm:text-4xl md:text-5xl font-black tracking-wide">
                  {SCENE_5_WHIP_FLASH_TEXT}
                </h2>
              </div>
            )}

          {/* SCENE 5: PURE BLACK GAME OVER EXPLANATION SCREENS (Button 1 & Button 2) */}
          {gameState.status === 'PLAYING' &&
            activeScene === 5 &&
            (scene5Phase === 'gameover_1' || scene5Phase === 'gameover_2') && (
              <div
                role="dialog"
                aria-modal="true"
                data-overlay-container=""
                data-testid="scene5-gameover-screen"
                style={{backgroundColor: '#000000', zIndex: 38}}
                className="absolute inset-0 overflow-y-auto touch-auto">
                <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
                  <div className="m-auto w-full max-w-2xl flex flex-col items-center text-center gap-5">
                    <h2
                      style={{
                        fontFamily: THEME.fonts.heading,
                        color: '#FF3B3B',
                      }}
                      className="text-xl sm:text-2xl md:text-3xl font-black leading-snug">
                      {scene5Phase === 'gameover_1'
                        ? SCENE_5_GAMEOVER_1_HEADER
                        : SCENE_5_GAMEOVER_2_HEADER}
                    </h2>

                    <div className="w-full flex flex-col gap-3 text-left text-white text-sm sm:text-base md:text-lg leading-relaxed">
                      {(scene5Phase === 'gameover_1'
                        ? SCENE_5_GAMEOVER_1_BULLETS
                        : SCENE_5_GAMEOVER_2_BULLETS
                      ).map((bullet, idx) => (
                        <p key={idx}>{bullet}</p>
                      ))}
                    </div>

                    <TouchSafeButton
                      autoFocus
                      testId="scene5-rewind-button"
                      onClick={handleScene5RewindTime}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="mt-2 px-8 py-3 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                      <span>{SCENE_5_REWIND_BUTTON_LABEL}</span>
                    </TouchSafeButton>
                  </div>
                </div>
              </div>
            )}

          {/* SCENE 5: SECOND PURE BLACK HUMOROUS REWIND SCREEN (-5 TRUST) */}
          {gameState.status === 'PLAYING' &&
            activeScene === 5 &&
            scene5Phase === 'rewind_black' && (
              <div
                role="dialog"
                aria-modal="true"
                data-overlay-container=""
                data-testid="scene5-rewind-humor-screen"
                style={{backgroundColor: '#000000', zIndex: 38}}
                className="absolute inset-0 overflow-y-auto touch-auto">
                <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
                  <div className="m-auto w-full max-w-xl flex flex-col items-center text-center gap-6">
                    <p className="text-white text-base sm:text-xl md:text-2xl font-bold leading-relaxed">
                      {SCENE_5_REWIND_HUMOR_TEXT}
                    </p>

                    <TouchSafeButton
                      autoFocus
                      testId="scene5-retry-button"
                      onClick={handleScene5RetryChoices}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="px-8 py-3 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                      <span>{SCENE_5_RETRY_BUTTON_LABEL}</span>
                    </TouchSafeButton>
                  </div>
                </div>
              </div>
            )}

          {/* SCENE 5: CELEBRATORY REWARD VIEW (Badge + Items + +5 Trust + Transition to Scene 6) */}
          {gameState.status === 'PLAYING' &&
            activeScene === 5 &&
            scene5Phase === 'reward' && (
              <div
                role="dialog"
                aria-modal="true"
                data-overlay-container=""
                data-testid="scene5-reward-screen"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.84)', zIndex: 38}}
                className="absolute inset-0 overflow-y-auto touch-auto">
                <div className="min-h-full w-full flex flex-col items-center px-8 py-5">
                  <div
                    style={{
                      backgroundColor: THEME.colors.ebonyPanel,
                      borderColor: THEME.colors.badgeGold,
                    }}
                    className="m-auto w-full max-w-2xl rounded-2xl border-2 p-5 sm:p-7 flex flex-col items-center text-center shadow-2xl">
                    <div className="flex flex-wrap items-stretch justify-center gap-3.5 sm:gap-4">
                      <HistoricalBadgeCard
                        compact
                        badge={CAM_NANG_PHUC_SAC_BADGE}
                        imgLoaded={isAssetLoaded(
                          CAM_NANG_PHUC_SAC_BADGE.assetKey,
                        )}
                        imgSrc={ASSETS_MANIFEST.huyhieu_phucsac}
                        onClick={() => {
                          gameAudio.playCrispClick();
                          setActiveBadgeDetail(CAM_NANG_PHUC_SAC_BADGE);
                        }}
                      />

                      <HistoricalBadgeCard
                        compact
                        badge={THE_BAI_GIA_NHAN_ITEM}
                        imgLoaded={isAssetLoaded(
                          THE_BAI_GIA_NHAN_ITEM.assetKey,
                        )}
                        imgSrc={ASSETS_MANIFEST.item_thebai}
                        onClick={() => {
                          gameAudio.playCrispClick();
                          setActiveBadgeDetail(THE_BAI_GIA_NHAN_ITEM);
                        }}
                      />

                      {unlockedItems.includes(TRAM_CAI_NGOC_BICH_ITEM.id) && (
                        <HistoricalBadgeCard
                          compact
                          badge={TRAM_CAI_NGOC_BICH_ITEM}
                          imgLoaded={isAssetLoaded(
                            TRAM_CAI_NGOC_BICH_ITEM.assetKey,
                          )}
                          imgSrc={ASSETS_MANIFEST.item_tramngocbich}
                          onClick={() => {
                            gameAudio.playCrispClick();
                            setActiveBadgeDetail(TRAM_CAI_NGOC_BICH_ITEM);
                          }}
                        />
                      )}
                    </div>

                    <p className="mt-4 text-base sm:text-lg font-bold text-white">
                      Đã được đặt trong Bộ sưu tập
                    </p>

                    <TouchSafeButton
                      testId="scene5-reward-detail-link"
                      onClick={() => {
                        gameAudio.playCrispClick();
                        setActiveBadgeDetail(CAM_NANG_PHUC_SAC_BADGE);
                      }}
                      className="mt-0.5 px-4 py-1.5 rounded-lg text-sm sm:text-base font-bold text-red-400 hover:text-red-300 underline underline-offset-4">
                      <span>Ấn vào để xem chi tiết</span>
                    </TouchSafeButton>

                    <div
                      style={{
                        backgroundColor: 'rgba(22, 36, 28, 0.85)',
                        borderColor: 'rgba(143, 168, 142, 0.7)',
                      }}
                      className="mt-2 w-full max-w-lg rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-100">
                      <span>
                        Nhận +5 Tín nhiệm &amp; Thẻ Bài Gia Nhân Phủ Quan
                      </span>
                      {unlockedItems.includes(TRAM_CAI_NGOC_BICH_ITEM.id) && (
                        <span className="block text-amber-200 mt-0.5">
                          Mở khóa bảo vật ẩn: Chiếc Trâm Cài Ngọc Bích (Chặn 1
                          lần trừ Tín nhiệm)
                        </span>
                      )}
                    </div>

                    <TouchSafeButton
                      autoFocus
                      testId="scene5-finish-button"
                      onClick={handleFinishScene5ToScene6}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="mt-4 w-full py-3 px-6 rounded-xl border-2 font-bold text-sm sm:text-base md:text-lg flex items-center justify-center shadow-xl">
                      <span>{SCENE_5_FINISH_BUTTON_LABEL}</span>
                    </TouchSafeButton>
                  </div>
                </div>
              </div>
            )}

          {/* SCENE 6 PREPARATION STATE (After completing Scene 5) */}
          {gameState.status === 'PLAYING' && activeScene === 6 && (
            <div
              data-testid="scene6-prep-screen"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.78)', zIndex: 25}}
              className="absolute inset-0 overflow-y-auto touch-auto">
              <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
                <div
                  style={{
                    backgroundColor: THEME.colors.ebonyPanel,
                    borderColor: THEME.colors.gildedActionBg,
                  }}
                  className="m-auto w-full max-w-md flex flex-col items-center border-2 rounded-xl p-6 sm:p-8 shadow-2xl text-center">
                  <div className="px-3 py-1 rounded-full bg-amber-900/50 border border-amber-500/50 text-amber-300 text-xs font-semibold mb-3">
                    Hoàn thành Cảnh 5
                  </div>

                  <h1
                    style={{
                      fontFamily: THEME.fonts.heading,
                      color: THEME.colors.gildedGoldBright,
                    }}
                    className="text-2xl sm:text-3xl font-black mb-3">
                    Sẵn sàng tiến vào Cảnh 6
                  </h1>

                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-6">
                    Liên đã khoác lên bộ áo Giao Lĩnh nâu sồng đúng chuẩn gia
                    nhân, cất giữ <strong>Thẻ Bài Gia Nhân Phủ Quan</strong> và{' '}
                    <strong>Cẩm Nang Phục Sắc Đại Việt</strong>. Hãy đón chờ
                    màn chuẩn bị lễ vật cùng Thị Mận ở Cảnh 6!
                  </p>

                  <div className="w-full flex flex-col gap-3">
                    <TouchSafeButton
                      autoFocus
                      testId="scene6-return-start"
                      onClick={() => {
                        gameAudio.playCrispClick();
                        closeAllSubModals();
                        setGameState((prev) => ({...prev, status: 'START'}));
                      }}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="w-full py-3 px-6 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center shadow-lg">
                      <span>Quay về Màn hình Bắt đầu</span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      onClick={resetGame}
                      style={{backgroundColor: THEME.colors.ebonyButtonBg}}
                      className="w-full py-3 px-6 rounded-lg border border-amber-700/60 text-amber-100 font-semibold text-base flex items-center justify-center">
                      <span>Chơi lại từ Cảnh 1</span>
                    </TouchSafeButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DEDICATED BOTTOM ACTION BAR */}
      {assetsReady &&
        gameState.status === 'PLAYING' &&
        !isAnyPuzzleBoardOverlayVisible &&
        !(
          activeScene === 3 &&
          (scene3Phase === 'explanation' || scene3Phase === 'reward')
        ) &&
        !(
          activeScene === 4 &&
          (scene4Phase === 'explanation' || scene4Phase === 'reward')
        ) &&
        !(
          activeScene === 5 &&
          scene5Phase !== 'opening_dialogue' &&
          scene5Phase !== 'wrong1_dialogue' &&
          scene5Phase !== 'wrong2_dialogue' &&
          scene5Phase !== 'correct_dialogue'
        ) &&
        activeScene !== 6 && (
          <div
            style={{backgroundColor: THEME.colors.canvasFallbackBg}}
            className="w-full min-h-[64px] px-8 py-2 border-t border-amber-900/30 z-20 shrink-0 flex items-center justify-center gap-3">
            {/* Scene 1: Final Choice Button (Plain text, NO sparkles) */}
            {activeScene === 1 && isChoiceVisible && (
              <TouchSafeButton
                buttonRef={bottomActionBtnRef}
                autoFocus
                testId="scene1-end-choice"
                onClick={handleSelectScene1Choice}
                style={{
                  backgroundColor: menuBtnLoaded
                    ? undefined
                    : THEME.colors.ebonyPanel,
                  borderColor: menuBtnLoaded
                    ? undefined
                    : THEME.colors.gildedGold,
                  backgroundImage: menuBtnLoaded
                    ? `url(${ASSETS_MANIFEST.menu_button_sprite})`
                    : undefined,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
                className={`max-w-xl w-full sm:w-auto px-6 sm:px-10 py-2.5 rounded-xl flex items-center justify-center text-center shadow-xl ${
                  menuBtnLoaded ? 'bg-transparent' : 'border-2'
                }`}>
                <span
                  style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)'}}
                  className="text-xs sm:text-sm md:text-base font-bold text-amber-100 leading-snug">
                  {SCENE_1_CHOICE_LABEL}
                </span>
              </TouchSafeButton>
            )}

            {/* Scene 4 Part 1 End Button: "Chạy xuống chỗ chiếc rương" (Plain text, NO sparkles) */}
            {activeScene === 4 &&
              scene4Phase === 'part1_dialogue' &&
              isScene4ChoiceVisible && (
                <TouchSafeButton
                  buttonRef={bottomActionBtnRef}
                  autoFocus
                  testId="scene4-run-to-chest-button"
                  onClick={handleRunToChestScene4}
                  style={{
                    backgroundColor: THEME.colors.gildedActionBg,
                    borderColor: THEME.colors.gildedGoldBright,
                    color: THEME.colors.ebonyPanel,
                  }}
                  className="max-w-md w-full sm:w-auto px-8 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                  <span>{SCENE_4_RUN_TO_CHEST_LABEL}</span>
                </TouchSafeButton>
              )}

            {/* Linear Dialogue Mobile Continue / Reveal Button (Plain text) */}
            {isLinearDialogueWithoutChoice && isMobile && (
              <TouchSafeButton
                onClick={handleAdvanceDialogue}
                ariaLabel="Tiếp tục thoại"
                className="px-6 py-2.5 rounded-xl bg-amber-900/80 border border-amber-400/75 text-amber-100 text-xs sm:text-sm font-bold flex items-center justify-center shadow-lg">
                <span>{isLineComplete ? 'Tiếp tục' : 'Hiện hết'}</span>
              </TouchSafeButton>
            )}

            {/* Linear Dialogue Subtle Desktop Prompt */}
            {isLinearDialogueWithoutChoice && !isMobile && (
              <span className="text-xs text-stone-400/75 select-none pointer-events-none">
                {isLineComplete
                  ? 'Nhấn chuột trái hoặc phím Space / Enter để qua câu tiếp theo'
                  : 'Nhấn chuột trái hoặc phím Space / Enter để hiện toàn bộ câu thoại'}
              </span>
            )}

            {/* Scene 2 Step 1 Menu Hint */}
            {activeScene === 2 && scene2Phase === 'STEP1_MENU' && (
              <span className="text-xs text-amber-200/80 select-none pointer-events-none text-center">
                Chọn một điểm khả nghi trong kho để kiểm tra (
                {checkedChoices.length}/{SCENE_2_INSPECTIONS.length})
              </span>
            )}

            {/* Scene 2 Step 1 Inspection: "Quay lại" Button (Plain text) */}
            {activeScene === 2 && scene2Phase === 'STEP1_INSPECT' && (
              <TouchSafeButton
                buttonRef={bottomActionBtnRef}
                testId="scene2-back-button"
                onClick={handleScene2Back}
                style={{
                  backgroundColor: THEME.colors.ebonyButtonBg,
                  borderColor: THEME.colors.gildedGold,
                }}
                className="px-7 py-2.5 rounded-xl border-2 text-amber-100 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                <span>{SCENE_2_BACK_LABEL}</span>
              </TouchSafeButton>
            )}

            {/* Scene 2 Step 2 Shudder: Dark Red "(A) Kiểm tra túi trước áo hoodie" Button */}
            {activeScene === 2 && scene2Phase === 'STEP2_SHUDDER' && (
              <TouchSafeButton
                buttonRef={bottomActionBtnRef}
                testId="scene2-pocket-button"
                onClick={handleCheckHoodiePocket}
                style={darkRedButtonStyle}
                className="max-w-lg w-full sm:w-auto px-7 py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-xl">
                <span style={{textShadow: '0 2px 5px rgba(0, 0, 0, 0.92)'}}>
                  {SCENE_2_POCKET_BUTTON_LABEL}
                </span>
              </TouchSafeButton>
            )}

            {/* Scene 2 Step 2 Dó Paper: Final Transition Button "Đọc tờ giấy dó" (Plain text, NO sparkles) */}
            {activeScene === 2 && scene2Phase === 'STEP2_PAPER' && (
              <TouchSafeButton
                buttonRef={bottomActionBtnRef}
                testId="scene2-read-paper-button"
                onClick={handleReadDoPaper}
                style={{
                  backgroundColor: THEME.colors.gildedActionBg,
                  borderColor: THEME.colors.gildedGoldBright,
                  color: THEME.colors.ebonyPanel,
                }}
                className="max-w-md w-full sm:w-auto px-8 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                <span>{SCENE_2_READ_PAPER_LABEL}</span>
              </TouchSafeButton>
            )}

            {/* Scene 3 Phase 2 Put-Away Mode: Clean `nencanh2` + "Mở tờ giấy" Button (Plain text, NO sparkles) */}
            {activeScene === 3 &&
              scene3Phase === 'puzzle' &&
              !isDoPaperOpen && (
                <TouchSafeButton
                  autoFocus
                  testId="scene3-reopen-paper-button"
                  onClick={() => {
                    gameAudio.playConfirmSelect();
                    setIsDoPaperOpen(true);
                  }}
                  style={{
                    backgroundColor: THEME.colors.gildedActionBg,
                    borderColor: THEME.colors.gildedGoldBright,
                    color: THEME.colors.ebonyPanel,
                  }}
                  className="px-8 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                  <span>{SCENE_3_REOPEN_PAPER_LABEL}</span>
                </TouchSafeButton>
              )}

            {/* Scene 4 Part 2 Put-Away Mode: Clean `nencanh4_ruong` + "Mở bảng khóa" Button */}
            {activeScene === 4 &&
              scene4Phase === 'puzzle' &&
              !isChestLockOpen && (
                <TouchSafeButton
                  autoFocus
                  testId="scene4-reopen-lock-button"
                  onClick={() => {
                    gameAudio.playConfirmSelect();
                    setIsChestLockOpen(true);
                  }}
                  style={{
                    backgroundColor: THEME.colors.gildedActionBg,
                    borderColor: THEME.colors.gildedGoldBright,
                    color: THEME.colors.ebonyPanel,
                  }}
                  className="px-8 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                  <span>{SCENE_4_REOPEN_LOCK_LABEL}</span>
                </TouchSafeButton>
              )}
          </div>
        )}

      {/* =====================================================================
       * HISTORICAL EXPLANATION MODAL (Scene 3 `1484` & Scene 4 `35241`, z-index: 40)
       * ===================================================================== */}
      {gameState.status === 'PLAYING' && isExplanationModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={explanationTitle}
          data-overlay-container=""
          data-testid="scene3-explanation-modal"
          style={{zIndex: 40, backgroundColor: 'rgba(0, 0, 0, 0.84)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
            <div
              style={{
                backgroundColor: '#050404',
                borderColor: THEME.colors.badgeGold,
                boxShadow:
                  '0 0 36px 14px rgba(0, 0, 0, 0.92), inset 0 0 18px rgba(212, 175, 55, 0.14)',
              }}
              className="m-auto w-full max-w-lg rounded-2xl border-2 p-6 sm:p-8 flex flex-col items-center text-center">
              <h2
                style={{
                  fontFamily: THEME.fonts.heading,
                  color: '#FFD700',
                }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                {explanationTitle}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed mb-6">
                {explanationBody}
              </p>

              <TouchSafeButton
                autoFocus
                testId="scene3-claim-reward-button"
                onClick={
                  activeScene === 4
                    ? handleClaimScene4Reward
                    : handleClaimScene3Reward
                }
                style={{
                  backgroundColor: THEME.colors.gildedActionBg,
                  borderColor: THEME.colors.gildedGoldBright,
                  color: THEME.colors.ebonyPanel,
                }}
                className="w-full py-3 px-6 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                <span>{SCENE_3_CLAIM_REWARD_LABEL}</span>
              </TouchSafeButton>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * CELEBRATORY REWARD POPUP (Scene 3 & Scene 4 Badges, z-index: 40)
       * ===================================================================== */}
      {isRewardPopupOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Phần thưởng huy hiệu lịch sử"
          data-overlay-container=""
          data-testid="scene3-reward-popup"
          style={{zIndex: 40, backgroundColor: 'rgba(0, 0, 0, 0.84)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
            <div
              style={{
                backgroundColor: THEME.colors.ebonyPanel,
                borderColor: THEME.colors.badgeGold,
              }}
              className="m-auto w-full max-w-md rounded-2xl border-2 p-6 sm:p-7 flex flex-col items-center text-center shadow-2xl">
              <HistoricalBadgeCard
                badge={rewardPopupBadge}
                imgLoaded={isAssetLoaded(rewardPopupBadge.assetKey)}
                imgSrc={
                  ASSETS_MANIFEST[rewardPopupBadge.assetKey] ??
                  ASSETS_MANIFEST.huyhieu_biatiensi
                }
                onClick={() => {
                  gameAudio.playCrispClick();
                  setActiveBadgeDetail(rewardPopupBadge);
                }}
              />

              <p className="mt-4 text-base sm:text-lg font-bold text-white">
                Đã được đặt trong Bộ sưu tập
              </p>

              <TouchSafeButton
                testId="reward-open-detail-link"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setActiveBadgeDetail(rewardPopupBadge);
                }}
                className="mt-1 px-4 py-2 rounded-lg text-sm sm:text-base font-bold text-red-400 hover:text-red-300 underline underline-offset-4">
                <span>Ấn vào để xem chi tiết</span>
              </TouchSafeButton>

              {rewardPopupBadge.id === GIA_HUAN_CA_BADGE.id && (
                <div
                  data-testid="reward-trust-unlock-banner"
                  style={{
                    backgroundColor: 'rgba(22, 36, 28, 0.85)',
                    borderColor: 'rgba(143, 168, 142, 0.7)',
                  }}
                  className="mt-2 w-full rounded-xl border px-3.5 py-2.5 flex items-center justify-center gap-2.5">
                  <div
                    style={{
                      aspectRatio: `${getConfig('assetIconTramCaiAspectRatio')}`,
                    }}
                    className="h-7 flex items-center justify-center shrink-0">
                    {iconTramCaiLoaded ? (
                      <img
                        src={ASSETS_MANIFEST.icon_tramcai}
                        alt="Chiếc trâm cài"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-emerald-300 font-bold">+1</span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-100">
                    Đã mở khóa thanh Điểm Tín Nhiệm (Chiếc trâm cài) +1
                  </span>
                </div>
              )}

              <TouchSafeButton
                autoFocus
                testId="reward-continue-button"
                onClick={handleContinueFromRewardPopup}
                style={{
                  backgroundColor: THEME.colors.gildedActionBg,
                  borderColor: THEME.colors.gildedGoldBright,
                  color: THEME.colors.ebonyPanel,
                }}
                className="mt-4 w-full py-3 px-6 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                <span>
                  {rewardPopupBadge.id === GIA_HUAN_CA_BADGE.id
                    ? SCENE_4_OPEN_CHEST_BUTTON_LABEL
                    : 'Tiếp tục'}
                </span>
              </TouchSafeButton>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * HINT OVERLAY ("Gợi ý" on `nen_popup`, z-index: 50)
       * ===================================================================== */}
      {isHintOverlayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Giao diện Gợi ý"
          data-overlay-container=""
          data-testid="hint-overlay"
          style={{zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.78)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-4">
            <div
              style={{
                background: nenPopupLoaded
                  ? undefined
                  : 'linear-gradient(180deg, #3a1d12 0%, #221009 100%)',
                borderColor: THEME.colors.gildedBorder,
              }}
              className="m-auto relative w-full max-w-2xl min-h-[340px] sm:min-h-[390px] rounded-2xl border-2 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 sm:p-10">
              {nenPopupLoaded && (
                <img
                  src={ASSETS_MANIFEST.nen_popup}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
              <div
                style={{backgroundColor: 'rgba(18, 10, 7, 0.56)'}}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Close "X" Button */}
              <TouchSafeButton
                testId="hint-overlay-close"
                ariaLabel="Đóng Gợi ý"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setIsHintOverlayOpen(false);
                  setHintOverlayView('MAIN');
                }}
                style={{
                  backgroundColor: 'rgba(26, 14, 9, 0.9)',
                  borderColor: THEME.colors.gildedGold,
                }}
                className="absolute top-3 right-3 z-20 w-12 h-12 rounded-xl border-2 text-amber-200 font-black text-lg flex items-center justify-center shadow-lg">
                <span>X</span>
              </TouchSafeButton>

              {hintOverlayView === 'MAIN' ? (
                <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center gap-4 py-4">
                  <h2
                    style={{
                      fontFamily: THEME.fonts.heading,
                      color: THEME.colors.gildedGoldBright,
                      textShadow: '0 2px 8px rgba(0,0,0,0.95)',
                    }}
                    className="text-2xl sm:text-3xl font-bold">
                    Gợi ý
                  </h2>

                  <p
                    data-testid="hint-candle-count"
                    style={{textShadow: '0 2px 6px rgba(0,0,0,0.95)'}}
                    className="text-base sm:text-lg font-bold text-amber-100">
                    {`Ngọn Nến Tri Thức hiện có: ${candleCount}`}
                  </p>

                  {isSceneHintsExhausted && (
                    <p
                      data-testid="hint-exhausted-msg"
                      className="text-sm sm:text-base font-semibold text-red-300 bg-black/65 px-4 py-2 rounded-lg border border-red-800/60">
                      {getHintExhaustedMessage(hintSceneKey)}
                    </p>
                  )}

                  <div className="w-full flex flex-col gap-3 mt-1">
                    <TouchSafeButton
                      testId="btn-xin-goi-y"
                      disabled={isSceneHintsExhausted}
                      onClick={handleRequestHintClick}
                      style={darkRedButtonStyle}
                      className="w-full py-3 px-6 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                      <span>Xin Gợi Ý</span>
                    </TouchSafeButton>

                    {currentSceneHintsUsed > 0 && (
                      <TouchSafeButton
                        testId="btn-review-unlocked-hints"
                        onClick={handleReviewUnlockedHints}
                        style={{
                          backgroundColor: THEME.colors.ebonyButtonBg,
                          borderColor: THEME.colors.gildedBorder,
                        }}
                        className="w-full py-2.5 px-5 rounded-xl border text-amber-200 font-semibold text-sm sm:text-base flex items-center justify-center shadow-md">
                        <span>Xem lại gợi ý đã mở</span>
                      </TouchSafeButton>
                    )}

                    <TouchSafeButton
                      testId="btn-tich-luy-nen"
                      onClick={handleOpenQuizFromHint}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="w-full py-3 px-6 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center shadow-xl">
                      <span>Tích lũy Nến Tri Thức</span>
                    </TouchSafeButton>
                  </div>
                </div>
              ) : (
                /* CONFIRMATION VIEW on `nen_popup`:
                 * Line 1: Non-clickable plain white text
                 * Line 2: Red text showing owned candles
                 * Line 3: Two side-by-side buttons ("Có" & "Quay lại")
                 */
                <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center gap-4 py-4">
                  <p
                    data-testid="confirm-hint-prompt-text"
                    style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)'}}
                    className="text-white font-bold text-base sm:text-xl leading-relaxed px-4 select-none">
                    {getHintConfirmPrompt(requiredHintCost)}
                  </p>

                  <p
                    data-testid="confirm-candle-owned"
                    style={{textShadow: '0 2px 6px rgba(0,0,0,0.95)'}}
                    className="text-sm sm:text-base font-bold text-red-400">
                    {`Số Nến Tri Thức đang sở hữu: ${candleCount}`}
                  </p>

                  {candleCount < requiredHintCost && (
                    <p
                      data-testid="confirm-zero-candle-inline"
                      className="text-xs sm:text-sm font-semibold text-amber-200 bg-black/75 px-4 py-2 rounded-lg border border-amber-700/60">
                      {candleCount === 0
                        ? 'Bạn hiện có 0 Nến Tri Thức. Hãy chọn "Quay lại" rồi nhấn "Tích lũy Nến Tri Thức" để nhận thêm nến!'
                        : `Gợi ý này cần ${requiredHintCost} Nến Tri Thức (bạn đang có ${candleCount}). Hãy chọn "Quay lại" rồi nhấn "Tích lũy Nến Tri Thức" để nhận thêm nến!`}
                    </p>
                  )}

                  <div className="flex flex-row items-center justify-center gap-4 mt-2">
                    <TouchSafeButton
                      testId="btn-confirm-yes"
                      disabled={
                        candleCount < requiredHintCost || isSceneHintsExhausted
                      }
                      onClick={handleConfirmSpendCandleForHint}
                      style={{
                        backgroundColor: THEME.colors.gildedActionBg,
                        borderColor: THEME.colors.gildedGoldBright,
                        color: THEME.colors.ebonyPanel,
                      }}
                      className="min-w-[128px] px-6 py-2.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>Có</span>
                    </TouchSafeButton>

                    <TouchSafeButton
                      testId="btn-confirm-back"
                      onClick={() => {
                        gameAudio.playCrispClick();
                        setHintOverlayView('MAIN');
                      }}
                      style={{
                        backgroundColor: THEME.colors.ebonyButtonBg,
                        borderColor: THEME.colors.gildedBorder,
                      }}
                      className="min-w-[128px] px-6 py-2.5 rounded-xl border-2 text-amber-100 font-bold text-sm sm:text-base flex items-center justify-center shadow-xl">
                      <span>Quay lại</span>
                    </TouchSafeButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * COLLECTION OVERLAY ("Bộ sưu tập" on `nen_popup` -> "Huy hiệu & Vật phẩm" + "Danh hiệu", z-index: 50)
       * ===================================================================== */}
      {isCollectionOverlayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bộ sưu tập huy hiệu, vật phẩm và danh hiệu"
          data-overlay-container=""
          data-testid="collection-overlay"
          style={{zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
          className="fixed inset-0 backdrop-blur-xs overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-4">
            <div
              style={{
                background: nenPopupLoaded
                  ? undefined
                  : 'linear-gradient(180deg, #3a1d12 0%, #221009 100%)',
                borderColor: THEME.colors.gildedBorder,
              }}
              className="m-auto relative w-full max-w-3xl min-h-[410px] sm:min-h-[460px] rounded-2xl border-2 overflow-hidden shadow-2xl flex flex-col items-center justify-start p-5 sm:p-8">
              {nenPopupLoaded && (
                <img
                  src={ASSETS_MANIFEST.nen_popup}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
              <div
                style={{backgroundColor: 'rgba(18, 10, 7, 0.68)'}}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Close "X" Button */}
              <TouchSafeButton
                testId="collection-overlay-close"
                ariaLabel="Đóng Bộ sưu tập"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setIsCollectionOverlayOpen(false);
                }}
                style={{
                  backgroundColor: 'rgba(26, 14, 9, 0.9)',
                  borderColor: THEME.colors.gildedGold,
                }}
                className="absolute top-3 right-3 z-20 w-12 h-12 rounded-xl border-2 text-amber-200 font-black text-lg flex items-center justify-center shadow-lg">
                <span>X</span>
              </TouchSafeButton>

              <div className="relative z-10 w-full flex flex-col items-center text-center gap-3.5 pt-1">
                <h2
                  style={{
                    fontFamily: THEME.fonts.heading,
                    color: THEME.colors.gildedGoldBright,
                    textShadow: '0 2px 8px rgba(0,0,0,0.95)',
                  }}
                  className="text-2xl sm:text-3xl font-bold pr-8 sm:pr-0">
                  Bộ sưu tập
                </h2>

                {/* Top Main Tab Switcher */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <TouchSafeButton
                    testId="collection-tab-items"
                    onClick={() => {
                      gameAudio.playCrispClick();
                      setCollectionMainTab('items');
                    }}
                    style={{
                      backgroundColor:
                        collectionMainTab === 'items'
                          ? THEME.colors.gildedActionBg
                          : 'rgba(28, 16, 11, 0.9)',
                      borderColor:
                        collectionMainTab === 'items'
                          ? THEME.colors.gildedGoldBright
                          : THEME.colors.gildedBorder,
                      color:
                        collectionMainTab === 'items'
                          ? THEME.colors.ebonyPanel
                          : '#fde68a',
                    }}
                    className="px-4 sm:px-5 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-md">
                    <span>Huy hiệu &amp; Vật phẩm</span>
                  </TouchSafeButton>

                  <TouchSafeButton
                    testId="collection-tab-titles"
                    onClick={() => {
                      gameAudio.playCrispClick();
                      setCollectionMainTab('titles');
                    }}
                    style={{
                      backgroundColor:
                        collectionMainTab === 'titles'
                          ? THEME.colors.gildedActionBg
                          : 'rgba(28, 16, 11, 0.9)',
                      borderColor:
                        collectionMainTab === 'titles'
                          ? THEME.colors.gildedGoldBright
                          : THEME.colors.gildedBorder,
                      color:
                        collectionMainTab === 'titles'
                          ? THEME.colors.ebonyPanel
                          : '#fde68a',
                    }}
                    className="px-4 sm:px-5 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm md:text-base flex items-center justify-center shadow-md">
                    <span>Danh hiệu</span>
                  </TouchSafeButton>
                </div>

                {collectionMainTab === 'items' ? (
                  unlockedBadges.length === 0 && unlockedItems.length === 0 ? (
                    <div className="mt-4 py-8 px-5 rounded-xl bg-black/60 border border-amber-800/45 max-w-md">
                      <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                        Chưa có huy hiệu hay vật phẩm nào được mở khóa. Hãy giải
                        mã các manh mối trong hành trình để thu thập!
                      </p>
                    </div>
                  ) : (
                    <div className="w-full flex flex-wrap items-stretch justify-center gap-3.5 sm:gap-4 pt-2">
                      {COLLECTION_BADGES.filter((b) =>
                        unlockedBadges.includes(b.id),
                      ).map((badge) => (
                        <HistoricalBadgeCard
                          key={badge.id}
                          compact
                          badge={badge}
                          imgLoaded={isAssetLoaded(badge.assetKey)}
                          imgSrc={
                            ASSETS_MANIFEST[badge.assetKey] ??
                            ASSETS_MANIFEST.huyhieu_biatiensi
                          }
                          onClick={() => {
                            gameAudio.playCrispClick();
                            setActiveBadgeDetail(badge);
                          }}
                        />
                      ))}

                      {COLLECTION_ITEMS.filter((item) =>
                        unlockedItems.includes(item.id),
                      ).map((item) => (
                        <HistoricalBadgeCard
                          key={item.id}
                          compact
                          badge={item}
                          imgLoaded={isAssetLoaded(item.assetKey)}
                          imgSrc={
                            ASSETS_MANIFEST[item.assetKey] ??
                            ASSETS_MANIFEST.item_thebai
                          }
                          onClick={() => {
                            gameAudio.playCrispClick();
                            setActiveBadgeDetail(item);
                          }}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  /* TAB 2: "Danh hiệu" — Ancient Wooden-Trimmed Royal Decree Book */
                  <div
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(32, 20, 14, 0.94) 0%, rgba(19, 11, 8, 0.96) 100%)',
                      borderColor: '#b68945',
                      boxShadow:
                        'inset 0 0 24px rgba(212, 175, 55, 0.14), 0 12px 30px rgba(0, 0, 0, 0.75)',
                    }}
                    className="w-full rounded-xl border-2 p-4 sm:p-5 flex flex-col items-center gap-4">
                    {/* Sub-tab switcher: Bảng Vàng Công Trạng vs Góc Tấu Hài Phủ Quan */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      <TouchSafeButton
                        testId="titles-subtab-honor"
                        onClick={() => {
                          gameAudio.playCrispClick();
                          setCollectionTitleSubTab('honor');
                        }}
                        style={{
                          backgroundColor:
                            collectionTitleSubTab === 'honor'
                              ? '#5c3d14'
                              : 'rgba(22, 14, 10, 0.85)',
                          borderColor:
                            collectionTitleSubTab === 'honor'
                              ? '#ffd700'
                              : 'rgba(182, 137, 69, 0.45)',
                        }}
                        className="px-4 py-2 rounded-lg border text-xs sm:text-sm font-bold text-amber-200 flex items-center justify-center">
                        <span>Bảng Vàng Công Trạng</span>
                      </TouchSafeButton>

                      <TouchSafeButton
                        testId="titles-subtab-clown"
                        onClick={() => {
                          gameAudio.playCrispClick();
                          setCollectionTitleSubTab('clown');
                        }}
                        style={{
                          backgroundColor:
                            collectionTitleSubTab === 'clown'
                              ? '#5c1616'
                              : 'rgba(22, 14, 10, 0.85)',
                          borderColor:
                            collectionTitleSubTab === 'clown'
                              ? '#ef4444'
                              : 'rgba(182, 137, 69, 0.45)',
                        }}
                        className="px-4 py-2 rounded-lg border text-xs sm:text-sm font-bold text-red-200 flex items-center justify-center">
                        <span>Góc Tấu Hài Phủ Quan</span>
                      </TouchSafeButton>
                    </div>

                    {(() => {
                      const earnedInSubTab = ACHIEVEMENT_TITLES.filter(
                        (t) =>
                          t.subTab === collectionTitleSubTab &&
                          unlockedTitles.includes(t.id),
                      );
                      if (earnedInSubTab.length === 0) {
                        return (
                          <div
                            data-testid="titles-empty-state"
                            className="w-full py-10 px-4 flex items-center justify-center text-center">
                            <p
                              style={{color: '#E8D399'}}
                              className="text-sm sm:text-base italic font-medium leading-relaxed">
                              {COLLECTION_EMPTY_TITLES_MSG}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div
                          data-testid="titles-plaque-grid"
                          className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 text-left">
                          {earnedInSubTab.map((titleItem) => (
                            <div
                              key={titleItem.id}
                              data-testid={`title-plaque-${titleItem.id}`}
                              style={{
                                background:
                                  titleItem.variant === 'honor'
                                    ? 'linear-gradient(180deg, #2d1d12 0%, #1b110b 100%)'
                                    : 'linear-gradient(180deg, #2f1212 0%, #1b0a0a 100%)',
                                borderColor:
                                  titleItem.variant === 'honor'
                                    ? '#d4af37'
                                    : '#b82929',
                              }}
                              className="relative rounded-xl border-2 p-3.5 pb-8 flex items-start gap-3 shadow-lg">
                              <div
                                style={{
                                  borderColor:
                                    titleItem.variant === 'honor'
                                      ? '#d4af37'
                                      : '#dc2626',
                                  backgroundColor: 'rgba(18, 10, 7, 0.85)',
                                }}
                                className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0">
                                <AchievementEmblemIcon
                                  variant={titleItem.variant}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4
                                  style={{
                                    fontFamily: THEME.fonts.heading,
                                    color: '#FFF6D6',
                                  }}
                                  className="text-sm sm:text-base font-bold leading-snug">
                                  {titleItem.title}
                                </h4>
                                <p className="text-xs sm:text-[13px] text-stone-200/95 leading-relaxed mt-1">
                                  {titleItem.description}
                                </p>
                              </div>

                              {/* Square Vermilion Red Seal Stamp: "ĐÃ ĐẠT" */}
                              <div
                                style={{
                                  borderColor: '#ef4444',
                                  color: '#fecaca',
                                  backgroundColor: 'rgba(153, 27, 27, 0.32)',
                                }}
                                className="absolute bottom-2 right-2.5 px-1.5 py-0.5 border-2 rounded-xs text-[10px] font-black tracking-wider uppercase rotate-[-4deg] select-none">
                                ĐÃ ĐẠT
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * FEATHERED BLACK HINT DISPLAY MODAL (z-index: 70)
       * Strictly plain header `"Gợi ý"` — ZERO hint numbers!
       * ===================================================================== */}
      {activeHintModalText !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nội dung Gợi ý"
          data-overlay-container=""
          data-testid="feathered-hint-modal"
          style={{zIndex: 70, backgroundColor: 'rgba(0, 0, 0, 0.72)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
            <div
              style={{
                backgroundColor: '#000000',
                boxShadow: '0 0 35px 20px rgba(0, 0, 0, 0.92)',
              }}
              className="m-auto relative w-full max-w-lg rounded-lg p-6 sm:p-8 text-white">
              <TouchSafeButton
                testId="feathered-hint-close"
                ariaLabel="Đóng nội dung gợi ý"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setActiveHintModalText(null);
                }}
                style={{color: THEME.colors.featheredModalCloseYellow}}
                className="absolute top-2 right-2 w-12 h-12 rounded-lg font-black text-xl flex items-center justify-center">
                <span>X</span>
              </TouchSafeButton>

              <h3
                style={{fontFamily: THEME.fonts.heading}}
                className="text-xl sm:text-2xl font-bold text-white mb-4 pr-10">
                Gợi ý
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed whitespace-pre-line">
                {activeHintModalText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * FEATHERED BLACK KNOWLEDGE CANDLE QUIZ MODAL (z-index: 70)
       * ===================================================================== */}
      {isQuizModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tích lũy Nến Tri Thức"
          data-overlay-container=""
          data-testid="feathered-quiz-modal"
          style={{zIndex: 70, backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
            <div
              style={{
                backgroundColor: '#000000',
                boxShadow: '0 0 35px 20px rgba(0, 0, 0, 0.92)',
              }}
              className="m-auto relative w-full max-w-xl rounded-lg p-6 sm:p-8 text-white">
              <TouchSafeButton
                testId="feathered-quiz-close"
                ariaLabel="Đóng thử thách tri thức"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setIsQuizModalOpen(false);
                }}
                style={{color: THEME.colors.featheredModalCloseYellow}}
                className="absolute top-2 right-2 w-12 h-12 rounded-lg font-black text-xl flex items-center justify-center">
                <span>X</span>
              </TouchSafeButton>

              {quizRoundStatus === 'ANSWERING' && currentQuizQuestion ? (
                <div className="w-full flex flex-col gap-4 pr-2">
                  <div
                    style={{color: THEME.colors.featheredModalCloseYellow}}
                    className="text-sm sm:text-base font-bold tracking-wide pr-10">
                    {`Câu ${quizStepIndex + 1}/2`}
                  </div>

                  <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                    {currentQuizQuestion.question}
                  </p>

                  {currentQuizQuestion.type === 'SHORT_ANSWER' && (
                    <div className="w-full flex flex-wrap items-center gap-3 pt-2">
                      <input
                        ref={quizInputRef}
                        type="text"
                        inputMode="numeric"
                        value={quizAnswerInput}
                        placeholder="Nhập số năm / số năm tồn tại..."
                        aria-label="Câu trả lời bằng số"
                        data-testid="quiz-short-input"
                        onChange={(e) => setQuizAnswerInput(e.target.value)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmitQuizAnswer(quizAnswerInput);
                          }
                        }}
                        style={{
                          backgroundColor: '#161616',
                          borderColor: '#FFD700',
                          userSelect: 'text',
                          WebkitUserSelect: 'text',
                        }}
                        className="flex-1 min-w-[160px] min-h-[48px] px-4 py-2.5 rounded-xl border text-white text-base font-bold placeholder:text-stone-500 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-yellow-400 pointer-events-auto touch-auto"
                      />

                      <TouchSafeButton
                        testId="quiz-short-submit"
                        onClick={() => handleSubmitQuizAnswer(quizAnswerInput)}
                        style={{
                          backgroundColor: THEME.colors.gildedActionBg,
                          color: THEME.colors.ebonyPanel,
                        }}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center">
                        <span>Xác nhận</span>
                      </TouchSafeButton>
                    </div>
                  )}

                  {currentQuizQuestion.type === 'TRUE_FALSE' && (
                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                      <TouchSafeButton
                        testId="quiz-tf-true"
                        onClick={() => handleSubmitQuizAnswer('Đúng')}
                        style={{
                          backgroundColor: '#1b1b1b',
                          borderColor: '#D4AF37',
                        }}
                        className="py-3 px-5 rounded-xl border text-white font-bold text-base flex items-center justify-center">
                        <span>Đúng</span>
                      </TouchSafeButton>

                      <TouchSafeButton
                        testId="quiz-tf-false"
                        onClick={() => handleSubmitQuizAnswer('Sai')}
                        style={{
                          backgroundColor: '#1b1b1b',
                          borderColor: '#D4AF37',
                        }}
                        className="py-3 px-5 rounded-xl border text-white font-bold text-base flex items-center justify-center">
                        <span>Sai</span>
                      </TouchSafeButton>
                    </div>
                  )}

                  {currentQuizQuestion.type === 'MULTIPLE_CHOICE' &&
                    currentQuizQuestion.options && (
                      <div className="w-full flex flex-col gap-2.5 pt-1">
                        {currentQuizQuestion.options.map((optText, idx) => {
                          const letter = ['A', 'B', 'C', 'D'][idx] ?? 'A';
                          return (
                            <TouchSafeButton
                              key={letter}
                              testId={`quiz-mc-${letter}`}
                              onClick={() => handleSubmitQuizAnswer(letter)}
                              style={{
                                backgroundColor: '#181818',
                                borderColor: 'rgba(212, 175, 55, 0.65)',
                              }}
                              className="w-full py-3 px-4 rounded-xl border text-left text-sm sm:text-base text-white font-medium flex items-center justify-start">
                              <span>{optText}</span>
                            </TouchSafeButton>
                          );
                        })}
                      </div>
                    )}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center text-center gap-5 py-4">
                  <p
                    data-testid="quiz-outcome-msg"
                    style={{
                      color:
                        quizRoundStatus === 'WON' ? '#FFD700' : '#FCA5A5',
                    }}
                    className="text-base sm:text-xl font-bold leading-relaxed px-4">
                    {quizRoundStatus === 'WON' ? QUIZ_WIN_MSG : QUIZ_FAIL_MSG}
                  </p>

                  <TouchSafeButton
                    autoFocus
                    testId="quiz-retry-round"
                    onClick={() => {
                      gameAudio.playConfirmSelect();
                      startNewQuizRound();
                    }}
                    style={{
                      backgroundColor: THEME.colors.gildedActionBg,
                      color: THEME.colors.ebonyPanel,
                    }}
                    className="px-7 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center">
                    <span>Làm tiếp lượt mới</span>
                  </TouchSafeButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
       * FEATHERED BLACK BADGE DETAIL MODAL (z-index: 70)
       * ===================================================================== */}
      {activeBadgeDetail !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeBadgeDetail.title}
          data-overlay-container=""
          data-testid="feathered-badge-detail-modal"
          style={{zIndex: 70, backgroundColor: 'rgba(0, 0, 0, 0.72)'}}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div className="min-h-full w-full flex flex-col items-center px-8 py-6">
            <div
              style={{
                backgroundColor: '#000000',
                boxShadow: '0 0 30px 15px rgba(0, 0, 0, 0.9)',
              }}
              className="m-auto relative w-full max-w-lg rounded-lg p-6 sm:p-8 text-white">
              <TouchSafeButton
                testId="feathered-badge-detail-close"
                ariaLabel="Đóng chi tiết huy hiệu"
                onClick={() => {
                  gameAudio.playCrispClick();
                  setActiveBadgeDetail(null);
                }}
                style={{color: THEME.colors.featheredModalCloseYellow}}
                className="absolute top-2 right-2 w-12 h-12 rounded-lg font-black text-xl flex items-center justify-center">
                <span>X</span>
              </TouchSafeButton>

              <h3
                style={{
                  fontFamily: THEME.fonts.heading,
                  color: THEME.colors.featheredModalCloseYellow,
                }}
                className="text-lg sm:text-xl font-bold mb-3 pr-10">
                {activeBadgeDetail.title}
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                {activeBadgeDetail.detailText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* START SCREEN ("Chơi" automatically resumes saved localStorage state if available) */}
      {gameState.status === 'START' && assetsReady && (
        <div
          ref={startScreenRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="vn-main-title"
          data-overlay-container=""
          data-modal="true"
          className="fixed inset-0 z-40 overflow-y-auto touch-auto">
          <div className="fixed inset-0 pointer-events-none">
            {menuBgLoaded ? (
              <img
                src={ASSETS_MANIFEST.menu_background}
                alt="Phủ cổ thời Hậu Lê"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                style={{
                  background: `linear-gradient(135deg, ${THEME.colors.menuFallbackTop} 0%, ${THEME.colors.menuFallbackBottom} 100%)`,
                }}
                className="w-full h-full"
              />
            )}
            <div
              style={{
                background:
                  'linear-gradient(90deg, rgba(16, 11, 8, 0.82) 0%, rgba(16, 11, 8, 0.45) 48%, rgba(16, 11, 8, 0.12) 100%)',
              }}
              className="absolute inset-0"
            />
          </div>

          <div className="relative z-10 min-h-full w-full flex flex-col px-8 sm:px-12 md:px-16 py-6 sm:py-10">
            <div className="my-auto w-full max-w-xl flex flex-col items-start">
              <div
                style={{backgroundColor: 'rgba(26, 17, 13, 0.85)'}}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium mb-3 shadow">
                <span>Dấu Ấn Dòng Chảy 1</span>
              </div>

              <h1
                id="vn-main-title"
                style={{
                  fontFamily: THEME.fonts.heading,
                  color: THEME.colors.gildedGoldBright,
                  textShadow:
                    '0 4px 18px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-2">
                {'Hậu Lê Phiêu Lưu Ký '}
              </h1>

              <p
                style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                }}
                className="text-stone-200/95 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md">
                {START_SCREEN_SUBTITLE}
              </p>

              <div className="flex flex-col items-start gap-3.5 sm:gap-4 w-full max-w-[280px] sm:max-w-[320px]">
                <TouchSafeButton
                  onClick={initGame}
                  autoFocus
                  testId="start-button"
                  style={{
                    aspectRatio: `${menuButtonAspectRatio}`,
                    backgroundColor: menuBtnLoaded
                      ? undefined
                      : THEME.colors.ebonyPanel,
                    borderColor: menuBtnLoaded
                      ? undefined
                      : THEME.colors.gildedActionBg,
                    backgroundImage: menuBtnLoaded
                      ? `url(${ASSETS_MANIFEST.menu_button_sprite})`
                      : undefined,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className={`w-full flex items-center justify-center px-6 py-3 shadow-2xl ${
                    menuBtnLoaded ? 'bg-transparent' : 'border-2 rounded-lg'
                  }`}>
                  <span
                    style={{
                      fontFamily: THEME.fonts.heading,
                      textShadow: '0 2px 6px rgba(0, 0, 0, 0.95)',
                    }}
                    className="text-lg sm:text-xl md:text-2xl font-bold text-amber-100 tracking-wide">
                    Chơi
                  </span>
                </TouchSafeButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP-LEFT MENU DROPDOWN (Includes "Màn hình chính" & distinct red "Xóa tiến trình") */}
      {isGameMenuOpen && gameState.status === 'PLAYING' && (
        <div
          data-overlay-container=""
          style={{zIndex: 45, backgroundColor: 'rgba(0, 0, 0, 0.45)'}}
          onPointerUp={() => {
            if (!isHowToPlayOpen) {
              gameAudio.playCrispClick();
              setIsGameMenuOpen(false);
            }
          }}
          className="fixed inset-0 overflow-y-auto touch-auto">
          <div
            ref={menuDropdownRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu Trò Chơi"
            data-testid="top-left-menu-dropdown"
            onPointerUp={(e) => e.stopPropagation()}
            style={{
              backgroundColor: THEME.colors.ebonyPanel,
              borderColor: THEME.colors.gildedBorder,
            }}
            className={`mt-[64px] ml-8 mr-8 w-[248px] sm:w-[272px] flex flex-col border-2 rounded-xl p-3.5 gap-2.5 shadow-2xl transition-opacity ${
              isHowToPlayOpen ? 'opacity-20 pointer-events-none' : 'opacity-100'
            }`}>
            <TouchSafeButton
              autoFocus={!isHowToPlayOpen}
              onClick={() => {
                gameAudio.playCrispClick();
                setIsGameMenuOpen(false);
              }}
              style={{
                backgroundColor: THEME.colors.gildedActionBg,
                color: THEME.colors.ebonyPanel,
              }}
              className="w-full py-2.5 px-4 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center shadow">
              <span>Tiếp tục</span>
            </TouchSafeButton>

            <TouchSafeButton
              onClick={() => {
                const nextMuted = gameAudio.toggleMute();
                setIsSfxMuted(nextMuted);
                try {
                  window.localStorage?.setItem(
                    'hlplk_sfx_muted',
                    nextMuted ? '1' : '0',
                  );
                } catch {}
                if (!nextMuted) gameAudio.playCrispClick();
              }}
              style={{backgroundColor: THEME.colors.ebonyButtonBg}}
              className="w-full py-2.5 px-4 rounded-lg border border-amber-700/50 text-amber-100 font-semibold text-sm sm:text-base flex items-center justify-center">
              <span>Âm thanh: {isSfxMuted ? 'Tắt' : 'Bật'}</span>
            </TouchSafeButton>

            <TouchSafeButton
              onClick={() => {
                gameAudio.playCrispClick();
                setIsMusicMuted((prev) => {
                  const next = !prev;
                  try {
                    window.localStorage?.setItem(
                      'hlplk_music_muted',
                      next ? '1' : '0',
                    );
                  } catch {}
                  return next;
                });
              }}
              style={{backgroundColor: THEME.colors.ebonyButtonBg}}
              className="w-full py-2.5 px-4 rounded-lg border border-amber-700/50 text-amber-100 font-semibold text-sm sm:text-base flex items-center justify-center">
              <span>Nhạc nền: {isMusicMuted ? 'Tắt' : 'Bật'}</span>
            </TouchSafeButton>

            <TouchSafeButton
              onClick={() => {
                gameAudio.playCrispClick();
                setIsHowToPlayOpen(true);
              }}
              style={{backgroundColor: THEME.colors.ebonyButtonBg}}
              className="w-full py-2.5 px-4 rounded-lg border border-amber-700/50 text-amber-100 font-semibold text-sm sm:text-base flex items-center justify-center">
              <span>Hướng dẫn</span>
            </TouchSafeButton>

            <TouchSafeButton
              testId="menu-return-main-screen"
              onClick={() => {
                gameAudio.playCrispClick();
                closeAllSubModals();
                setGameState((prev) => ({...prev, status: 'START'}));
              }}
              style={{backgroundColor: THEME.colors.ebonyButtonBg}}
              className="w-full py-2.5 px-4 rounded-lg border border-amber-700/50 text-amber-100 font-semibold text-sm sm:text-base flex items-center justify-center">
              <span>Màn hình chính</span>
            </TouchSafeButton>

            <TouchSafeButton
              testId="menu-reset-progress"
              onClick={handleClearProgressAndReturnStart}
              style={{
                background: 'linear-gradient(180deg, #991b1b 0%, #5c0f0f 100%)',
                borderColor: '#f87171',
                color: '#ffffff',
              }}
              className="w-full py-2.5 px-4 rounded-lg border-2 font-bold text-sm sm:text-base flex items-center justify-center shadow-lg">
              <span>Xóa tiến trình</span>
            </TouchSafeButton>
          </div>
        </div>
      )}

      {/* HOW TO PLAY SUB-MODAL */}
      {isHowToPlayOpen && (
        <MenuOverlay tone="neutral" zIndex={60} autoFocus>
          <div
            style={{
              backgroundColor: THEME.colors.ebonyPanelDeep,
              borderColor: THEME.colors.gildedActionBg,
            }}
            className="w-full max-w-md flex flex-col items-center border-2 rounded-xl p-6 shadow-2xl text-stone-100">
            <h2
              style={{
                fontFamily: THEME.fonts.heading,
                color: THEME.colors.gildedGoldBright,
              }}
              className="text-2xl font-bold text-center mb-4">
              Hướng dẫn đọc truyện
            </h2>

            <div className="w-full space-y-3 text-sm sm:text-base text-stone-200 leading-relaxed mb-6">
              <p>
                <strong className="text-amber-300">• Chuột / Cảm ứng:</strong>{' '}
                Nhấp chuột trái hoặc chạm vào khung thoại để hiện trọn vẹn câu
                đang chạy chữ hoặc chuyển sang câu thoại kế tiếp.
              </p>
              <p>
                <strong className="text-amber-300">• Khám phá Cảnh 2:</strong>{' '}
                Kiểm tra lần lượt cả 3 điểm khả nghi (A), (B), (C) trong kho để
                khám phá tờ giấy dó bí ẩn.
              </p>
              <p>
                <strong className="text-amber-300">
                  • Giải mã &amp; Gợi ý Cảnh 3:
                </strong>{' '}
                Đọc bài vè trên tờ giấy dó để tìm năm lịch sử gồm 4 chữ số. Bạn
                có thể dùng <strong>Ngọn Nến Tri Thức</strong> ở mục{' '}
                <strong>Gợi ý</strong> hoặc trả lời câu hỏi lịch sử để tích lũy
                thêm nến!
              </p>
            </div>

            <TouchSafeButton
              autoFocus
              onClick={() => {
                gameAudio.playCrispClick();
                setIsHowToPlayOpen(false);
              }}
              style={{
                backgroundColor: THEME.colors.gildedActionBg,
                color: THEME.colors.ebonyPanel,
              }}
              className="w-full py-3 px-6 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center">
              <span>Đóng</span>
            </TouchSafeButton>
          </div>
        </MenuOverlay>
      )}

      {gameState.status === 'PAUSED' && (
        <Overlay
          title="TẠM DỪNG"
          description="Nhấn Tiếp tục để quay lại hành trình"
          actionLabel="TIẾP TỤC"
          onAction={() =>
            setGameState((prev) => ({...prev, status: 'PLAYING'}))
          }
          tone="neutral"
        />
      )}

      {gameState.status === 'GAME_OVER' && (
        <Overlay
          title="KẾT THÚC"
          description="Thử lại hành trình"
          actionLabel="THỬ LẠI"
          onAction={initGame}
          tone="danger"
        />
      )}
    </div>
  );
}
