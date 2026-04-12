export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      albums: {
        Row: {
          cover_url: string | null
          created_at: string
          display_order: number
          id: string
          name: string
          name_en: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          display_order?: number
          id?: string
          name: string
          name_en: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          name_en?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          album_id: string
          created_at: string
          featured_order: number | null
          id: string
          image_url: string
          sort_order: number
        }
        Insert: {
          album_id: string
          created_at?: string
          featured_order?: number | null
          id?: string
          image_url: string
          sort_order?: number
        }
        Update: {
          album_id?: string
          created_at?: string
          featured_order?: number | null
          id?: string
          image_url?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          about_kicker_bs: string | null
          about_kicker_en: string | null
          about_p1_bs: string | null
          about_p1_en: string | null
          about_p2_bs: string | null
          about_p2_en: string | null
          about_title_bs: string | null
          about_title_en: string | null
          albums_empty_bs: string | null
          albums_empty_en: string | null
          albums_kicker_bs: string | null
          albums_kicker_en: string | null
          albums_open_series_bs: string | null
          albums_open_series_en: string | null
          albums_title_bs: string | null
          albums_title_en: string | null
          albums_view_all_bs: string | null
          albums_view_all_en: string | null
          albums_grid_columns: number
          albums_last_row_align: string
          contact_instagram_label_bs: string | null
          contact_instagram_label_en: string | null
          contact_instagram_url: string | null
          contact_intro_bs: string | null
          contact_intro_en: string | null
          contact_kicker_bs: string | null
          contact_kicker_en: string | null
          contact_label_email_bs: string | null
          contact_label_email_en: string | null
          contact_label_message_bs: string | null
          contact_label_message_en: string | null
          contact_label_name_bs: string | null
          contact_label_name_en: string | null
          contact_location_bs: string | null
          contact_location_en: string | null
          contact_mail_subject_fallback_bs: string | null
          contact_mail_subject_fallback_en: string | null
          contact_mail_subject_prefix_bs: string | null
          contact_mail_subject_prefix_en: string | null
          contact_ph_email_bs: string | null
          contact_ph_email_en: string | null
          contact_ph_message_bs: string | null
          contact_ph_message_en: string | null
          contact_ph_name_bs: string | null
          contact_ph_name_en: string | null
          contact_public_email: string | null
          contact_submit_bs: string | null
          contact_submit_en: string | null
          contact_title_bs: string | null
          contact_title_en: string | null
          featured_kicker_bs: string | null
          featured_kicker_en: string | null
          featured_subtitle_bs: string | null
          featured_subtitle_en: string | null
          featured_title_bs: string | null
          featured_title_en: string | null
          featured_grid_columns: number
          featured_last_row_align: string
          hero_category_bs: string | null
          hero_category_en: string | null
          hero_cta_work_bs: string | null
          hero_cta_work_en: string | null
          hero_scroll_hint_bs: string | null
          hero_scroll_hint_en: string | null
          hero_tagline_bs: string | null
          hero_tagline_en: string | null
          home_hero_image_url: string | null
          home_hero_interval_seconds: number
          home_hero_slides: Json
          id: number
          updated_at: string
        }
        Insert: {
          about_kicker_bs?: string | null
          about_kicker_en?: string | null
          about_p1_bs?: string | null
          about_p1_en?: string | null
          about_p2_bs?: string | null
          about_p2_en?: string | null
          about_title_bs?: string | null
          about_title_en?: string | null
          albums_empty_bs?: string | null
          albums_empty_en?: string | null
          albums_kicker_bs?: string | null
          albums_kicker_en?: string | null
          albums_open_series_bs?: string | null
          albums_open_series_en?: string | null
          albums_title_bs?: string | null
          albums_title_en?: string | null
          albums_view_all_bs?: string | null
          albums_view_all_en?: string | null
          albums_grid_columns?: number
          albums_last_row_align?: string
          contact_instagram_label_bs?: string | null
          contact_instagram_label_en?: string | null
          contact_instagram_url?: string | null
          contact_intro_bs?: string | null
          contact_intro_en?: string | null
          contact_kicker_bs?: string | null
          contact_kicker_en?: string | null
          contact_label_email_bs?: string | null
          contact_label_email_en?: string | null
          contact_label_message_bs?: string | null
          contact_label_message_en?: string | null
          contact_label_name_bs?: string | null
          contact_label_name_en?: string | null
          contact_location_bs?: string | null
          contact_location_en?: string | null
          contact_mail_subject_fallback_bs?: string | null
          contact_mail_subject_fallback_en?: string | null
          contact_mail_subject_prefix_bs?: string | null
          contact_mail_subject_prefix_en?: string | null
          contact_ph_email_bs?: string | null
          contact_ph_email_en?: string | null
          contact_ph_message_bs?: string | null
          contact_ph_message_en?: string | null
          contact_ph_name_bs?: string | null
          contact_ph_name_en?: string | null
          contact_public_email?: string | null
          contact_submit_bs?: string | null
          contact_submit_en?: string | null
          contact_title_bs?: string | null
          contact_title_en?: string | null
          featured_kicker_bs?: string | null
          featured_kicker_en?: string | null
          featured_subtitle_bs?: string | null
          featured_subtitle_en?: string | null
          featured_title_bs?: string | null
          featured_title_en?: string | null
          featured_grid_columns?: number
          featured_last_row_align?: string
          hero_category_bs?: string | null
          hero_category_en?: string | null
          hero_cta_work_bs?: string | null
          hero_cta_work_en?: string | null
          hero_scroll_hint_bs?: string | null
          hero_scroll_hint_en?: string | null
          hero_tagline_bs?: string | null
          hero_tagline_en?: string | null
          home_hero_image_url?: string | null
          home_hero_interval_seconds?: number
          home_hero_slides?: Json
          id?: number
          updated_at?: string
        }
        Update: {
          about_kicker_bs?: string | null
          about_kicker_en?: string | null
          about_p1_bs?: string | null
          about_p1_en?: string | null
          about_p2_bs?: string | null
          about_p2_en?: string | null
          about_title_bs?: string | null
          about_title_en?: string | null
          albums_empty_bs?: string | null
          albums_empty_en?: string | null
          albums_kicker_bs?: string | null
          albums_kicker_en?: string | null
          albums_open_series_bs?: string | null
          albums_open_series_en?: string | null
          albums_title_bs?: string | null
          albums_title_en?: string | null
          albums_view_all_bs?: string | null
          albums_view_all_en?: string | null
          albums_grid_columns?: number
          albums_last_row_align?: string
          contact_instagram_label_bs?: string | null
          contact_instagram_label_en?: string | null
          contact_instagram_url?: string | null
          contact_intro_bs?: string | null
          contact_intro_en?: string | null
          contact_kicker_bs?: string | null
          contact_kicker_en?: string | null
          contact_label_email_bs?: string | null
          contact_label_email_en?: string | null
          contact_label_message_bs?: string | null
          contact_label_message_en?: string | null
          contact_label_name_bs?: string | null
          contact_label_name_en?: string | null
          contact_location_bs?: string | null
          contact_location_en?: string | null
          contact_mail_subject_fallback_bs?: string | null
          contact_mail_subject_fallback_en?: string | null
          contact_mail_subject_prefix_bs?: string | null
          contact_mail_subject_prefix_en?: string | null
          contact_ph_email_bs?: string | null
          contact_ph_email_en?: string | null
          contact_ph_message_bs?: string | null
          contact_ph_message_en?: string | null
          contact_ph_name_bs?: string | null
          contact_ph_name_en?: string | null
          contact_public_email?: string | null
          contact_submit_bs?: string | null
          contact_submit_en?: string | null
          contact_title_bs?: string | null
          contact_title_en?: string | null
          featured_kicker_bs?: string | null
          featured_kicker_en?: string | null
          featured_subtitle_bs?: string | null
          featured_subtitle_en?: string | null
          featured_title_bs?: string | null
          featured_title_en?: string | null
          featured_grid_columns?: number
          featured_last_row_align?: string
          hero_category_bs?: string | null
          hero_category_en?: string | null
          hero_cta_work_bs?: string | null
          hero_cta_work_en?: string | null
          hero_scroll_hint_bs?: string | null
          hero_scroll_hint_en?: string | null
          hero_tagline_bs?: string | null
          hero_tagline_en?: string | null
          home_hero_image_url?: string | null
          home_hero_interval_seconds?: number
          home_hero_slides?: Json
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
