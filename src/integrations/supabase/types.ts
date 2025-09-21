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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      career_goals: {
        Row: {
          created_at: string
          description: string | null
          goal_type: string
          id: string
          progress_percentage: number | null
          status: string
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          goal_type: string
          id?: string
          progress_percentage?: number | null
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          goal_type?: string
          id?: string
          progress_percentage?: number | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      health_metrics: {
        Row: {
          bmi: number | null
          created_at: string
          date: string
          hydration_ml: number | null
          id: string
          sleep_hours: number | null
          steps: number | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          bmi?: number | null
          created_at?: string
          date?: string
          hydration_ml?: number | null
          id?: string
          sleep_hours?: number | null
          steps?: number | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          bmi?: number | null
          created_at?: string
          date?: string
          hydration_ml?: number | null
          id?: string
          sleep_hours?: number | null
          steps?: number | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      mood_logs: {
        Row: {
          created_at: string
          emotions: string[] | null
          id: string
          journal_entry: string | null
          mood_score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          emotions?: string[] | null
          id?: string
          journal_entry?: string | null
          mood_score: number
          user_id: string
        }
        Update: {
          created_at?: string
          emotions?: string[] | null
          id?: string
          journal_entry?: string | null
          mood_score?: number
          user_id?: string
        }
        Relationships: []
      }
      nutrition_logs: {
        Row: {
          calories: number | null
          carbs_g: number | null
          created_at: string
          date: string
          fat_g: number | null
          food_name: string
          id: string
          meal_type: string
          protein_g: number | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          date?: string
          fat_g?: number | null
          food_name: string
          id?: string
          meal_type: string
          protein_g?: number | null
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          date?: string
          fat_g?: number | null
          food_name?: string
          id?: string
          meal_type?: string
          protein_g?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          academic_year: string | null
          avatar_url: string | null
          career_interests: string[] | null
          created_at: string
          date_of_birth: string | null
          dietary_preferences: string[] | null
          full_name: string | null
          health_goals: string[] | null
          id: string
          university: string | null
          updated_at: string
          user_id: string
          year_of_study: number | null
        }
        Insert: {
          academic_year?: string | null
          avatar_url?: string | null
          career_interests?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          health_goals?: string[] | null
          id?: string
          university?: string | null
          updated_at?: string
          user_id: string
          year_of_study?: number | null
        }
        Update: {
          academic_year?: string | null
          avatar_url?: string | null
          career_interests?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string[] | null
          full_name?: string | null
          health_goals?: string[] | null
          id?: string
          university?: string | null
          updated_at?: string
          user_id?: string
          year_of_study?: number | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          calories_per_serving: number | null
          cook_time_minutes: number | null
          created_at: string
          description: string | null
          id: string
          ingredients: string[] | null
          instructions: string | null
          is_budget_friendly: boolean | null
          prep_time_minutes: number | null
          servings: number | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calories_per_serving?: number | null
          cook_time_minutes?: number | null
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: string[] | null
          instructions?: string | null
          is_budget_friendly?: boolean | null
          prep_time_minutes?: number | null
          servings?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calories_per_serving?: number | null
          cook_time_minutes?: number | null
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: string[] | null
          instructions?: string | null
          is_budget_friendly?: boolean | null
          prep_time_minutes?: number | null
          servings?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          challenge_type: string
          completed: boolean | null
          created_at: string
          current_value: number | null
          date: string
          id: string
          target_value: number
          user_id: string
        }
        Insert: {
          challenge_type: string
          completed?: boolean | null
          created_at?: string
          current_value?: number | null
          date?: string
          id?: string
          target_value: number
          user_id: string
        }
        Update: {
          challenge_type?: string
          completed?: boolean | null
          created_at?: string
          current_value?: number | null
          date?: string
          id?: string
          target_value?: number
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          category: string
          created_at: string
          current_level: number
          id: string
          skill_name: string
          target_level: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          current_level: number
          id?: string
          skill_name: string
          target_level: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          current_level?: number
          id?: string
          skill_name?: string
          target_level?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      well_being_scores: {
        Row: {
          career_score: number
          created_at: string
          id: string
          last_calculated: string | null
          mind_score: number
          nutrition_score: number
          overall_score: number
          physical_score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          career_score?: number
          created_at?: string
          id?: string
          last_calculated?: string | null
          mind_score?: number
          nutrition_score?: number
          overall_score?: number
          physical_score?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          career_score?: number
          created_at?: string
          id?: string
          last_calculated?: string | null
          mind_score?: number
          nutrition_score?: number
          overall_score?: number
          physical_score?: number
          updated_at?: string
          user_id?: string
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
