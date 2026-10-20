// PX — tipos de los componentes (documentación). Global: window.PX, React 18.
type Stage = 'previaje' | 'viaje' | 'post';
type IconName = 'plus' | 'check' | 'chevron' | 'home' | 'route' | 'wallet' | 'user' | 'calendar' | 'pin' | 'vote' | 'baul';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primario = mandarina (uno por pantalla); secundario = borde; fantasma = sin fondo. */
  variant?: 'primario' | 'secundario' | 'fantasma';
  /** md = 48px, sm = 44px. */
  size?: 'md' | 'sm';
  icon?: IconName;
  iconRight?: IconName;
  /** Ancho completo. */
  full?: boolean;
  children?: React.ReactNode;
}
export interface StageSwitchProps {
  value?: Stage;
  defaultValue?: Stage;
  onChange?: (stage: Stage) => void;
}
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Color al estar seleccionado. */
  tone?: 'neutro' | Stage;
  icon?: IconName;
  children: React.ReactNode;
}
export interface TripCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  place?: string;
  /** Texto ya formateado, p. ej. "14–21 ene". */
  dates: string;
  stage?: Stage;
  people?: string[];
  /** URL de foto; sin foto, la cabecera usa el tinte de la etapa. */
  image?: string;
  /** Lo que falta, en una línea. */
  pending?: string;
}
export interface AvatarStackProps {
  people: string[];
  /** Por defecto 4. */
  max?: number;
}
export interface PollOptionProps {
  label: string;
  detail?: string;
  votes: number;
  /** Personas del grupo. */
  total: number;
  voted?: boolean;
  onVote?: () => void;
}
export interface BalanceRowProps {
  name: string;
  /** Positivo = te deben; negativo = te falta poner. */
  amount: number;
  direction?: 'a-favor' | 'pendiente' | 'a-mano';
}
export interface ItineraryItemProps {
  time: string;
  title: string;
  place?: string;
  done?: boolean;
  current?: boolean;
  last?: boolean;
}
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}
export interface BottomNavProps {
  items?: { id: string; label: string; icon: IconName }[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
}
export interface IconProps {
  name: IconName;
  size?: number;
  /** Texto accesible si el ícono va solo. */
  label?: string;
}
