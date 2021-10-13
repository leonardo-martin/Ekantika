export interface CompanyProps {
  id: string;
  city: CityProps;
  sector: SectorProps;
  type: TypeProps;
  district: StateProps;
  configuration_id: string;
  parent_id: string;
  uuid: string;
  cnpj: string;
  name: string;
  fantasy_name: string;
  business_model: string;
  zipcode: string;
  address: string;
  number: string;
  complement: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  main_id: string;
  holdingId?: string;
  state_registration: string;
  telephone: string;
  website: string;
  responsible_name: string;
  responsible_email: string;
  template_invite: string;
  template_forgot_password: string;
  neighborhood: string;
  active: string;
  plan_id: string;
  Branding: BrandingProps;
  Emails: EmailsProps;
  PersonalizationAnswer: PersonalizationAnswerProps[];
  PersonalizationAnswerTheme: PersonalizationAnswerThemeProps[];
  Alias: AliasProps;
  Parameterization: ParameterizationProps;
}

interface BrandingProps {
  alias: string;
  login_banner: string;
  logo: string;
  logo_login: string;
  favicon: string;
  color_primary: string;
  color_secondary: string;
}

interface EmailsProps {
  template_invite: string;
  template_invite_name: string;
  template_forgot_password: string;
  template_forgot_password_name: string;
  email_img_header: string;
  email_img_footer: string;
}

interface PersonalizationAnswerProps {
  id: string;
  company_id: string;
  default_answer_id: string;
  alias: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  name: string;
}

interface PersonalizationAnswerThemeProps {
  id: string;
  company_id: string;
  alias: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  name: string;
}

interface AliasProps {
  id: string;
  company_id: string;
  alias: string;
  created_at: string;
  updated_at: string;
}

interface ParameterizationProps {
  id: string;
  company_id: string;
  manager_percent: string;
  manager_qty_min: string;
  manager_qty_max: string;
  pair_percent: string;
  pair_qty_min: string;
  pair_qty_max: string;
  guest_percent: string;
  guest_qty_mix: string;
  guest_qty_max: string;
  managed_percent: string;
  managed_qty_min: string;
  managed_qty_max: string;
  range_performance_low_min: string;
  range_performance_low_max: string;
  range_performance_middle_min: string;
  range_performance_middle_max: string;
  range_performance_high_min: string;
  range_performance_high_max: string;
  range_fit_cultural_low_min: string;
  range_fit_cultural_low_max: string;
  range_fit_cultural_middle_min: string;
  range_fit_cultural_middle_max: string;
  range_fit_cultural_high_min: string;
  range_fit_cultural_high_max: string;
  created_at: string;
  updated_at: string;
}

interface SectorProps {
  id: string;
  name: string;
}

interface CityProps {
  id: string;
  name: string;
  slug: string;
}

interface TypeProps {
  id: string;
  name: string;
  slug: string;
}

interface StateProps {
  id: string;
  name: string;
  uf: string;
  slug: string;
}
