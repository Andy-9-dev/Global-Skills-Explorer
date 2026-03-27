import { supabase } from "./supabase"

export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get profile error:", error)
    return { success: false, error: error.message }
  }
}

export const upsertProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error("Error upserting profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Upsert profile error:", error)
    return { success: false, error: error.message }
  }
}

export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: error.message }
  }
}

export const uploadAvatar = async (userId, file) => {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/avatar.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError)
      return { success: false, error: uploadError.message }
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath)

    const avatarUrl = data.publicUrl

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single()

    if (!existingProfile) {
      const { error: createError } = await supabase
        .from("profiles")
        .insert([{
          id: userId,
          avatar_url: avatarUrl,
          email: "",
          full_name: "User",
          headline: "",
          country: ""
        }])

      if (createError) {
        console.error("Error creating profile:", createError)
        return { success: false, error: createError.message }
      }
    } else {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId)

      if (updateError) {
        console.error("Error updating avatar URL:", updateError)
        return { success: false, error: updateError.message }
      }
    }

    return { success: true, data: { avatar_url: avatarUrl } }
  } catch (error) {
    console.error("Upload avatar error:", error)
    return { success: false, error: error.message }
  }
}

export const initializeProfile = async (user) => {
  if (!user) return { success: false, error: "No user provided" }

  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single()

    if (existingProfile) {
      return { success: true, data: existingProfile }
    }

    const profileData = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
      avatar_url: user.user_metadata?.avatar_url || null,
      headline: "",
      country: "",
      created_at: new Date().toISOString()
    }

    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert([profileData])
      .select()
      .single()

    if (createError) {
      console.error("Error creating profile:", createError)
      return { success: false, error: createError.message }
    }

    return { success: true, data: newProfile }
  } catch (error) {
    console.error("Initialize profile error:", error)
    return { success: false, error: error.message }
  }
}
